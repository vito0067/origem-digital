"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

type Props = {
  /** Progresso da rolagem da hero, de 0 a 1. */
  progress?: number;
  /** Caminho da malha dentro de /public */
  glb?: string;
  /** Chamado quando o 3D não pode rodar (aparelho fraco, sem WebGL, arquivo faltando) */
  onFail?: () => void;
  /** Quantas voltas a peça dá ao longo da rolagem da hero. 1 = volta completa. */
  giro?: number;
  /** Voltas por minuto do giro lento que roda sozinho, parado ou rolando. */
  giroLento?: number;
  /**
   * `true` (padrão): a peça vai e volta dentro de um arco, sempre legível.
   * `false`: volta a dar voltas completas, como antes.
   */
  balanco?: boolean;
  /** Abertura do balanço, em radianos. 0.6 ≈ 34° para cada lado. */
  arco?: number;
  /** Cor base do metal. */
  cor?: string;
};

export default function MarcaTridimensional({
  progress = 0,
  glb = "/media/marca.glb",
  onFail,
  giro = 0.2,
  giroLento = 0.9,
  balanco = true,
  arco = 0.6,
  cor = "#00e5ff",
}: Props) {
  const caixa = useRef<HTMLDivElement>(null);
  const progressoRef = useRef(progress);
  const falhouRef = useRef(false);
  /**
   * O quanto a peça ainda está desmontada: 1 = triângulos espalhados,
   * 0 = marca inteira. Fica num ref porque quem escreve é o laço de
   * animação, e mudar isto não pode redesenhar o componente.
   */
  const montagemRef = useRef<{ value: number } | null>(null);

  useEffect(() => {
    progressoRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const alvo = caixa.current;
    if (!alvo) return;

    const falhar = () => {
      if (falhouRef.current) return;
      falhouRef.current = true;
      onFail?.();
    };

    const nav = navigator as Navigator & { deviceMemory?: number };
    if (
      window.innerWidth < 820 ||
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
      (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 4)
    ) {
      falhar();
      return;
    }

    let renderizador: THREE.WebGLRenderer;
    try {
      renderizador = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      falhar();
      return;
    }

    let animacao = 0;
    let encerrado = false;

    const cena = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderizador.outputColorSpace = THREE.SRGBColorSpace;
    renderizador.toneMapping = THREE.ACESFilmicToneMapping;
    renderizador.toneMappingExposure = 1.15;
    alvo.appendChild(renderizador.domElement);
    Object.assign(renderizador.domElement.style, {
      width: "100%",
      height: "100%",
      display: "block",
    });

    // Metal sem ambiente ao redor fica chapado: este ambiente invisível
    // é o que ele reflete, e é o que dá o brilho de render de estúdio.
    const pmrem = new THREE.PMREMGenerator(renderizador);
    cena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    cena.add(new THREE.AmbientLight(0xffffff, 0.3));

    const chave = new THREE.DirectionalLight(0xffffff, 2.4);
    chave.position.set(5, 6, 8);
    cena.add(chave);

    const ciano = new THREE.DirectionalLight(new THREE.Color("#22d3ee"), 3.0);
    ciano.position.set(-7, -2, 3);
    cena.add(ciano);

    const fundo = new THREE.PointLight(new THREE.Color("#22d3ee"), 55, 40);
    fundo.position.set(0, 1, -7);
    cena.add(fundo);

    const grupo = new THREE.Group();
    cena.add(grupo);

    // A geometria de marca.glb é gravada comprimida (EXT_meshopt_
    // compression) — foi assim que ela caiu de 932 KB para uma fração
    // disso. Sem este decodificador o arquivo não abre, e a capa cai
    // para a imagem de reserva sem avisar ninguém.
    //
    // O decodificador vem junto com o three.js: não baixa nada de fora
    // e só entra em cena junto com o 3D, que já é carregado à parte.
    //
    // Se um dia alguém regravar o .glb sem compressão, esta linha pode
    // ficar: o carregador só a usa quando o arquivo pede.
    new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).load(
      glb,
      (gltf) => {
        if (encerrado) return;
        const peca = gltf.scene;

        // A malha veio sem textura: aplicamos o metal da marca.
        // Vidro tecnológico: base azul escura, bordas em neon, refração real.
        // Depende do environment map montado acima — sem ele, não parece vidro.
        const metal = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#001b2b"),
          emissive: new THREE.Color(cor),
          emissiveIntensity: 0.4,
          roughness: 0.05,
          metalness: 0.1,
          transmission: 0.6,
          ior: 1.5,
          thickness: 2,
          envMapIntensity: 1.2,
          transparent: true,
        });
        /**
         * A MARCA SE MONTA PEÇA POR PEÇA.
         *
         * Cada triângulo começa espalhado no espaço, girado ao acaso, e
         * converge para o lugar dele. Em pouco mais de um segundo a
         * peça está inteira.
         *
         * COMO É FEITO SEM PESAR NADA:
         * O arquivo continua exatamente o mesmo — a montagem acontece na
         * placa de vídeo. Ao carregar, a malha é separada em triângulos
         * soltos (`toNonIndexed`) e cada vértice ganha duas informações
         * extras: o centro do triângulo dele e uma direção de sorteio.
         * Um trecho curto enxertado no material desloca cada triângulo
         * por essa direção, na medida do `uMontagem` — que vai de 1
         * (tudo espalhado) a 0 (tudo no lugar).
         *
         * Por que no material e não em JavaScript: mexer em 34 mil
         * vértices a cada quadro pelo processador travaria a página. Na
         * placa de vídeo, é de graça.
         *
         * Por que o giro é por triângulo e não por vértice: os três
         * vértices de um triângulo compartilham o mesmo centro e a mesma
         * direção sorteada, então o triângulo viaja inteiro, como um
         * caco — em vez de se esticar no caminho.
         */
        const montagem = { value: 1 };

        peca.traverse((o) => {
          const m = o as THREE.Mesh;
          if (!m.isMesh) return;

          const solta = m.geometry.toNonIndexed();
          const pos = solta.getAttribute("position");
          const total = pos.count;

          const centros = new Float32Array(total * 3);
          const sorteio = new Float32Array(total * 3);

          for (let t = 0; t < total; t += 3) {
            // centro do triângulo: média dos três cantos
            let cx = 0, cy = 0, cz = 0;
            for (let k = 0; k < 3; k++) {
              cx += pos.getX(t + k);
              cy += pos.getY(t + k);
              cz += pos.getZ(t + k);
            }
            cx /= 3; cy /= 3; cz /= 3;

            const rx = Math.random() * 2 - 1;
            const ry = Math.random() * 2 - 1;
            const rz = Math.random() * 2 - 1;

            for (let k = 0; k < 3; k++) {
              const i = (t + k) * 3;
              centros[i] = cx; centros[i + 1] = cy; centros[i + 2] = cz;
              sorteio[i] = rx; sorteio[i + 1] = ry; sorteio[i + 2] = rz;
            }
          }

          solta.setAttribute("aCentro", new THREE.BufferAttribute(centros, 3));
          solta.setAttribute("aSorteio", new THREE.BufferAttribute(sorteio, 3));
          m.geometry.dispose();
          m.geometry = solta;
          m.material = metal;
        });

        metal.onBeforeCompile = (shader) => {
          shader.uniforms.uMontagem = montagem;
          shader.vertexShader = shader.vertexShader
            .replace(
              "#include <common>",
              `#include <common>
               uniform float uMontagem;
               attribute vec3 aCentro;
               attribute vec3 aSorteio;`
            )
            .replace(
              "#include <begin_vertex>",
              `#include <begin_vertex>
               // afasta o triângulo inteiro na direção sorteada e gira
               // em torno do próprio centro, na medida de uMontagem
               float m = uMontagem;
               vec3 fora = aSorteio * m * 2.6;
               vec3 doCentro = transformed - aCentro;
               float giro = m * 3.0 * aSorteio.y;
               float s = sin(giro), c = cos(giro);
               doCentro = vec3(
                 doCentro.x * c - doCentro.z * s,
                 doCentro.y,
                 doCentro.x * s + doCentro.z * c
               );
               transformed = aCentro + doCentro + fora;`
            );
        };
        // força o material a ser recompilado com o trecho acima
        metal.customProgramCacheKey = () => "marca-montagem";
        montagemRef.current = montagem;

        // centraliza e normaliza o tamanho, seja qual for a escala do arquivo
        const limites = new THREE.Box3().setFromObject(peca);
        const centro = limites.getCenter(new THREE.Vector3());
        const tamanho = limites.getSize(new THREE.Vector3());
        peca.position.sub(centro);
        peca.scale.setScalar(3.4 / Math.max(tamanho.x, tamanho.y, tamanho.z));

        // A conversão devolveu a marca espelhada (O à esquerda, D à direita).
        // Meia volta no eixo vertical corrige a leitura sem deformar nada.
        const eixo = new THREE.Group();
        eixo.rotation.y = Math.PI;
        eixo.add(peca);
        grupo.add(eixo);
      },
      undefined,
      () => falhar()
    );

    const destino = { x: 0, y: 0 };
    const atual = { x: 0, y: 0 };
    const aoMover = (e: MouseEvent) => {
      destino.y = (e.clientX / window.innerWidth - 0.5) * 0.45;
      destino.x = (e.clientY / window.innerHeight - 0.5) * 0.26;
    };
    window.addEventListener("mousemove", aoMover, { passive: true });

    /**
     * A PEÇA REAGE À VELOCIDADE DA ROLAGEM.
     *
     * Rolar depressa empurra o giro; parar de rolar faz o empurrão se
     * dissipar e a peça volta ao balanço calmo. É o mesmo princípio da
     * faixa de segmentos, e é o que faz o objeto parecer ter inércia em
     * vez de girar num ritmo fixo alheio ao que a pessoa faz.
     *
     * O empurrão tem teto: uma rolagem brusca não pode transformar a
     * marca num borrão girando.
     */
    let impulso = 0;
    /** Giro acumulado que veio da rolagem, somado ao balanço próprio. */
    let giroExtra = 0;
    let ultimoY = window.scrollY;
    const TETO_IMPULSO = 2.4;

    const aoRolarPagina = () => {
      const y = window.scrollY;
      impulso += (y - ultimoY) * 0.012;
      impulso = Math.max(-TETO_IMPULSO, Math.min(TETO_IMPULSO, impulso));
      ultimoY = y;
    };
    window.addEventListener("scroll", aoRolarPagina, { passive: true });

    const redimensionar = () => {
      const l = alvo.clientWidth;
      const a = alvo.clientHeight;
      if (!l || !a) return;
      camera.aspect = l / a;
      camera.updateProjectionMatrix();
      renderizador.setSize(l, a, false);
    };
    redimensionar();
    const observador = new ResizeObserver(redimensionar);
    observador.observe(alvo);

    let visivel = true;
    const vigia = new IntersectionObserver(
      ([e]) => {
        visivel = e.isIntersecting;
      },
      { threshold: 0.02 }
    );
    vigia.observe(alvo);

    /** Segundos que a peça leva para se juntar depois de carregar. */
    const MONTAGEM = 1.3;
    let comecoMontagem = 0;
    let ultimoQuadro = performance.now();

    const quadro = () => {
      animacao = requestAnimationFrame(quadro);
      if (!visivel || document.hidden) return;

      const agora = performance.now();
      const dt = Math.min(0.05, (agora - ultimoQuadro) / 1000);
      ultimoQuadro = agora;

      const p = progressoRef.current;

      // A montagem começa a contar no primeiro quadro DEPOIS que a peça
      // chegou, e não quando o componente nasce: se contasse antes, o
      // tempo de baixar o arquivo comeria a animação e, numa conexão
      // lenta, a marca simplesmente apareceria pronta.
      const montagem = montagemRef.current;
      if (montagem) {
        if (!comecoMontagem) comecoMontagem = agora;
        const t = Math.min(1, (agora - comecoMontagem) / (MONTAGEM * 1000));
        // desacelera no fim: os cacos "assentam" no lugar
        montagem.value = Math.pow(1 - t, 3);
      }

      atual.x += (destino.x - atual.x) * 0.06;
      atual.y += (destino.y - atual.y) * 0.06;

      // o empurrão da rolagem vira giro e some sozinho
      giroExtra += impulso * dt;
      impulso *= 0.92;

      const tempo = performance.now() / 1000;

      // Movimento próprio da peça + o giro que a rolagem provoca.
      //
      // Em `balanco` ela vai e volta dentro de um arco, em vez de dar
      // voltas completas. Girando sem parar, a marca passava boa parte
      // do tempo de perfil — virava uma lâmina fina e ilegível bem na
      // capa, onde ela precisa ser reconhecida. Balançando, nunca sai de
      // uma posição em que dá para ler o logo.
      const velocidade = (giroLento * Math.PI * 2) / 60;
      const proprio = balanco
        ? Math.sin(tempo * velocidade * 3) * arco
        : tempo * velocidade;

      grupo.rotation.y = atual.y + proprio + giroExtra + p * Math.PI * 2 * giro;
      grupo.rotation.x = atual.x + Math.sin(tempo * 0.35) * 0.06 + p * 0.25;
      grupo.position.y = p * -0.7 + Math.sin(tempo * 0.5) * 0.06;
      grupo.scale.setScalar(1 + p * 0.16);

      renderizador.render(cena, camera);
    };
    quadro();

    return () => {
      encerrado = true;
      cancelAnimationFrame(animacao);
      window.removeEventListener("mousemove", aoMover);
      window.removeEventListener("scroll", aoRolarPagina);
      montagemRef.current = null;
      observador.disconnect();
      vigia.disconnect();
      cena.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        if (m.material) (m.material as THREE.Material).dispose();
      });
      renderizador.dispose();
      renderizador.domElement.parentNode?.removeChild(renderizador.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glb, giro, giroLento, balanco, arco, cor]);

  return <div ref={caixa} className="h-full w-full" aria-hidden />;
}
