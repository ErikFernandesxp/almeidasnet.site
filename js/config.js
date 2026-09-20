/**
 * CONFIGURAÇÃO CENTRAL — ALMEIDAS.NET
 * -----------------------------------
 * Edite apenas este arquivo para atualizar links, textos, banners do
 * carrossel, o popup de indicação, planos, entretenimento e depoimentos.
 * Nenhum outro arquivo precisa ser alterado para essas mudanças.
 *
 * BANNERS DO CARROSSEL (heroSlides)
 *   Os banners são desenhados em código (anel animado, ícones flutuantes
 *   e texto), então já ficam prontos sem nenhuma imagem.
 *   Quer uma foto de pessoa no banner (como no site da Nex)? Coloque um
 *   PNG com fundo transparente, recortado, em images/hero/ e preencha
 *   "foto" no slide (ex.: foto: "images/hero/pessoa-1.png").
 *   Tamanho ideal: 900 x 1100px, PNG transparente, até ~400KB.
 *
 * POPUP "INDIQUE E GANHE" (popupIndiqueGanhe.slides)
 *   Também é desenhado em código. Se preferir uma arte pronta, preencha
 *   "imagem" (900 x 900px, JPG/PNG até ~500KB) e ela substitui o desenho.
 *
 * ÍCONES DE APP DOS PLANOS (planos > apps > icone)
 *   48 x 48px, PNG com fundo transparente. Troque o caminho em "icone"
 *   e preencha "nome" quando tiver o ícone real.
 *
 * ÍCONES DISPONÍVEIS para "arte", "chips" e "icone":
 *   wifi, bolt, gamepad, play, chat, video, headset, shield, check,
 *   phone, file, gauge, users, music, ball, book, smile, film, star
 */

window.ALMEIDASNET_CONFIG = {
  marca: "Almeidas.Net",

  // WhatsApp (formato https://wa.me/55DDDNUMERO) e como o número aparece no site
  whatsapp: "https://wa.me/5571993812371",
  whatsappExibicao: "(71) 99381-2371",
  whatsappMensagemPadrao: "Olá! Quero contratar um plano da Almeidas.Net.",

  // Botão de telefone flutuante e textos "ligue para"
  telefone: "(71) 99381-2371",
  telefoneLink: "tel:+5571993812371",

  endereco: "Tv. Domingos Silva, 35, Itapuã, Salvador - BA",
  enderecoMapa: "https://www.google.com/maps/search/?api=1&query=Tv.+Domingos+Silva,+35,+Itapu%C3%A3,+Salvador+-+BA",

  redesSociais: {
    instagram: "https://www.instagram.com/almeidas_net/",
    facebook: "#",  // INSERIR LINK
    youtube: "#",   // INSERIR LINK
  },

  centralAssinante: "https://ixc.almeidasnet.com.br",
  appIphone: "https://apps.apple.com/br/app/almeidasnet/id6774625446",
  appAndroid: "https://play.google.com/store/apps/details?id=br.com.almeidasnet.ixc",

  testeDeVelocidade: "https://www.speedtest.net/",
  segundaViaFatura: "https://ixc.almeidasnet.com.br",

  /* ------------------------------------------------------------------
     CARROSSEL (Hero)
     arte: wifi | velocidade | gamepad | headset (desenho do painel verde)
     numero: "auto" usa a maior velocidade dos planos abaixo (arte "velocidade")
     chips: ícones que flutuam em volta do painel
     ------------------------------------------------------------------ */
  heroSlides: [
    {
      arte: "wifi",
      tituloDestaque: "A internet",
      titulo: ["que transforma", "a sua rotina"],
      texto: "Fibra óptica de alta velocidade para a sua casa, o trabalho e a diversão.",
      botaoTexto: "Assine já!",
      botaoLink: "whatsapp:Olá! Quero assinar a Almeidas.Net.",
      mostrarTelefone: true,
      chips: ["play", "gamepad", "chat", "video"],
      foto: "",
      alt: "Internet fibra óptica Almeidas.Net",
    },
    {
      arte: "velocidade",
      numero: "auto",
      unidade: "mega",
      tituloDestaque: "Instalação",
      titulo: ["grátis e muita", "velocidade"],
      texto: "Assine agora e conecte a casa inteira, sem pagar pela instalação.",
      botaoTexto: "Quero assinar",
      botaoLink: "whatsapp:Olá! Quero assinar com instalação grátis.",
      mostrarTelefone: false,
      chips: ["video", "music", "chat", "wifi"],
      foto: "",
      alt: "Instalação grátis Almeidas.Net",
    },
    {
      arte: "gamepad",
      tituloDestaque: "Feito para",
      titulo: ["você dominar", "os jogos"],
      texto: "Conexão estável e baixa latência para jogar online sem lag, do casual ao competitivo.",
      botaoTexto: "Conheça os planos",
      botaoLink: "#planos",
      mostrarTelefone: false,
      chips: ["bolt", "star", "headset", "play"],
      foto: "",
      alt: "Internet para jogos online Almeidas.Net",
    },
    {
      arte: "headset",
      tituloDestaque: "Atendimento",
      titulo: ["humanizado de", "verdade"],
      texto: "Time próximo, pronto para resolver pelo WhatsApp, telefone ou pelo app.",
      botaoTexto: "Fale com a gente",
      botaoLink: "whatsapp:Olá! Quero falar com a Almeidas.Net.",
      mostrarTelefone: true,
      chips: ["chat", "shield", "phone", "check"],
      foto: "",
      alt: "Atendimento humanizado Almeidas.Net",
    },
  ],

  // Faixa verde logo abaixo do carrossel
  beneficiosFaixa: [
    { icone: "shield", texto: "Garantia de entrega da banda contratada" },
    { icone: "headset", texto: "Atendimento humanizado" },
    { icone: "check", texto: "Instalação GRÁTIS" },
  ],

  /* ------------------------------------------------------------------
     PLANOS — cada plano tem 3 linhas (incluso / grátis / apps premium
     com seletor), um botão "+ Adicionar no combo" e o preço.
     ATENÇÃO: valores, velocidades e apps abaixo são EXEMPLOS. Ajuste
     para os seus planos reais.
     ------------------------------------------------------------------ */
  planos: [
    {
      combo: "Combo Start",
      velocidade: "300",
      unidade: "mega",
      destaque: false,
      incluso: {
        legenda: "TV Plus 2 telas",
        apps: [
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
        ],
      },
      gratis: {
        qtdEscolha: 1,
        apps: [
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
        ],
      },
      premium: {
        precoApartir: "14,90",
        apps: [
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
        ],
      },
      precoDe: "134,90",
      precoFinal: "89,90",
    },
    {
      combo: "Combo Plus",
      velocidade: "500",
      unidade: "mega",
      destaque: true,
      incluso: {
        legenda: "TV Plus 4 telas",
        apps: [
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
        ],
      },
      gratis: {
        qtdEscolha: 1,
        apps: [
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
        ],
      },
      premium: {
        precoApartir: "14,90",
        apps: [
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
        ],
      },
      precoDe: "149,90",
      precoFinal: "99,90",
    },
    {
      combo: "Combo Turbo",
      velocidade: "700",
      unidade: "mega",
      destaque: false,
      incluso: {
        legenda: "TV Plus 6 telas",
        apps: [
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
        ],
      },
      gratis: {
        qtdEscolha: 2,
        apps: [
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
        ],
      },
      premium: {
        precoApartir: "14,90",
        apps: [
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
        ],
      },
      precoDe: "194,90",
      precoFinal: "129,90",
    },
    {
      combo: "Combo Premium",
      velocidade: "1000",
      unidade: "mega",
      destaque: false,
      incluso: {
        legenda: "TV Plus 8 telas",
        apps: [
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
        ],
      },
      gratis: {
        qtdEscolha: 2,
        apps: [
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
        ],
      },
      premium: {
        precoApartir: "14,90",
        apps: [
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
          { nome: "", icone: "images/apps/icone-app.png" },
        ],
      },
      precoDe: "239,90",
      precoFinal: "169,90",
    },
  ],

  /* ------------------------------------------------------------------
     GAMER — textos e números (confirme os números antes de publicar)
     ------------------------------------------------------------------ */
  gamer: {
    ativo: true,
    titulo: "Feito para dominar o jogo",
    texto: "Conexão rápida e estável, com baixa latência, ideal para partidas online sem interrupções. Jogue no seu melhor nível, sem lag.",
    botao: "Ver planos",
    numeros: [
      { valor: "< 10ms", legenda: "Latência local" },
      { valor: "1 Giga", legenda: "Velocidade máxima" },
      { valor: "24/7", legenda: "Estabilidade" },
    ],
  },

  /* ------------------------------------------------------------------
     ENTRETENIMENTO — faixa que se arrasta com o mouse/dedo.
     Cada card: titulo, texto, icone, e opcionalmente "imagem" (capa
     600 x 720px) e "link" (âncora, URL ou "whatsapp:mensagem").
     ------------------------------------------------------------------ */
  entretenimento: {
    titulo: "Na Almeidas.Net você encontra serviços de entretenimento",
    texto: "Velocidade de sobra para aproveitar tudo o que você gosta, sem travar.",
    cards: [
      { titulo: "Filmes e séries", texto: "Maratone sem interrupções, mesmo com a casa toda conectada.", icone: "film", imagem: "", link: "#planos" },
      { titulo: "Esportes", texto: "Transmissões ao vivo sem travar nos lances decisivos.", icone: "ball", imagem: "", link: "#planos" },
      { titulo: "Conteúdo infantil", texto: "Desenhos e jogos educativos com navegação fluida.", icone: "smile", imagem: "", link: "#planos" },
      { titulo: "Música", texto: "Playlists e podcasts sem travar, em qualquer cômodo.", icone: "music", imagem: "", link: "#planos" },
      { titulo: "Games", texto: "Baixa latência para jogar online com estabilidade.", icone: "gamepad", imagem: "", link: "#planos" },
      { titulo: "Educação", texto: "Aulas online e cursos sem interrupções, a qualquer hora.", icone: "book", imagem: "", link: "#planos" },
    ],
  },

  /* ------------------------------------------------------------------
     WI-FI 6 — para esconder a seção, mude "ativo" para false
     ------------------------------------------------------------------ */
  wifi6: {
    ativo: true,
    titulo: "Conheça o poder do Wi-Fi 6 da Almeidas.Net",
    texto: "Com o Wi-Fi 6 sua casa ou empresa recebe o que há de mais moderno em conectividade: mais velocidade, mais estabilidade e muito mais eficiência para a sua internet do dia a dia.",
    botao: "Fale conosco",
    itens: [
      "Mais velocidade real na banda contratada",
      "Menos interferência entre redes vizinhas",
      "Mais aparelhos conectados ao mesmo tempo",
    ],
  },

  /* ------------------------------------------------------------------
     DEPOIMENTOS — SUBSTITUA pelos depoimentos reais dos seus clientes
     (os de baixo são apenas exemplos de layout)
     ------------------------------------------------------------------ */
  depoimentos: [
    { nome: "Marina Costa", perfil: "Cliente residencial", texto: "Depois que contratei a Almeidas.Net, minha conexão ficou muito mais estável." },
    { nome: "Rodrigo Silva", perfil: "Home office", texto: "Uso para trabalhar e assistir streaming ao mesmo tempo e funciona muito bem." },
    { nome: "Lucas Pereira", perfil: "Cliente gamer", texto: "Para jogar online, a estabilidade fez bastante diferença." },
    { nome: "Ana Ribeiro", perfil: "Cliente residencial", texto: "Atendimento rápido e instalação sem complicação." },
  ],

  /* ------------------------------------------------------------------
     MENU RÁPIDO FLUTUANTE — painel do botão de lista (canto inferior
     direito). "link" aceita: âncora ("#planos"), URL externa ou
     "whatsapp:mensagem".
     ------------------------------------------------------------------ */
  menuRapido: [
    { texto: "Nossos planos", link: "#planos", icone: "wifi" },
    { texto: "Sua fatura", link: "https://ixc.almeidasnet.com.br", icone: "file" },
    { texto: "Quem somos", link: "#quem-somos", icone: "users" },
    { texto: "Entretenimento", link: "#entretenimento", icone: "film" },
    { texto: "Onde estamos", link: "#onde-estamos", icone: "pin" },
    { texto: "Fale conosco", link: "whatsapp:Olá! Quero falar com a Almeidas.Net.", icone: "chat" },
    { texto: "Teste de velocidade", link: "https://www.speedtest.net/", icone: "gauge" },
  ],

  /* ------------------------------------------------------------------
     POPUP "INDIQUE E GANHE" — aparece uma vez por visita, após alguns
     segundos, e também ao clicar em "Indique e ganhe" no menu.
     Para desativar o popup automático, mude "ativo" para false.
     ------------------------------------------------------------------ */
  popupIndiqueGanhe: {
    ativo: true,
    atrasoMs: 4000,
    slides: [
      {
        imagem: "",
        titulo: "Indique e ganhe",
        texto: "Indique amigos e familiares para a Almeidas.Net e ganhe benefícios.",
        botao: "Quero indicar",
        icone: "users",
        link: "whatsapp:Olá! Quero saber como funciona o programa Indique e Ganhe da Almeidas.Net.",
      },
      {
        imagem: "",
        titulo: "Instalação grátis",
        texto: "Assine agora e a instalação não custa nada.",
        botao: "Quero assinar",
        icone: "check",
        link: "whatsapp:Olá! Quero assinar com instalação grátis na Almeidas.Net.",
      },
    ],
  },
};
