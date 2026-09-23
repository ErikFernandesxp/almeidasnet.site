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
  marca: "AlmeidasNet",

  // WhatsApp (formato https://wa.me/55DDDNUMERO) e como o número aparece no site
  whatsapp: "https://wa.me/5571993812371",
  whatsappExibicao: "(71) 99381-2371",
  whatsappMensagemPadrao: "Olá! Quero contratar um plano da AlmeidasNet",

  // Botão de telefone flutuante e textos "ligue para"
  telefone: "(71) 3019-5811",
  telefoneLink: "tel:30195811",

  endereco: "Itapuã, Salvador - BA",
  enderecoMapa: "https://maps.app.goo.gl/psBKHfRxLYWE3ven6",

  // Bairros atendidos — aparecem como selos na seção "Consulte cobertura"
  bairrosAtendidos: ["Itapuã", "Piatã", "Stella Maris", "São Cristóvão", "Cassange"],

  redesSociais: {
    instagram: "https://www.instagram.com/almeidas_net/",
    facebook: "#",  // INSERIR LINK
    youtube: "#",   // INSERIR LINK
  },

  centralAssinante: "https://ixc.almeidasnet.com.br",
  appIphone: "https://apps.apple.com/br/app/almeidasnet/id6774625446",
  appAndroid: "https://play.google.com/store/apps/details?id=br.com.almeidasnet.ixc",

  testeDeVelocidade: "https://www.speedtest.net/",
  downdetector: "https://downdetector.com.br/", // aparece em "Links rápidos" do rodapé
  contratoServico: "", // link do contrato de prestação de serviço (PDF). Vazio = o botão fica escondido
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
      botaoLink: "whatsapp:Olá! Quero assinar a AlmeidasNet",
      mostrarTelefone: true,
      chips: ["play", "gamepad", "chat", "video"],
      foto: "",
      alt: "Internet fibra óptica AlmeidasNet",
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
      alt: "Instalação grátis AlmeidasNet",
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
      alt: "Internet para jogos online AlmeidasNet",
    },
    {
      arte: "headset",
      tituloDestaque: "Atendimento",
      titulo: ["humanizado de", "verdade"],
      texto: "Time próximo, pronto para resolver pelo WhatsApp, telefone ou pelo app.",
      botaoTexto: "Fale com a gente",
      botaoLink: "whatsapp:Olá! Quero falar com a AlmeidasNet",
      mostrarTelefone: true,
      chips: ["chat", "shield", "phone", "check"],
      foto: "",
      alt: "Atendimento humanizado AlmeidasNet",
    },
  ],

  // Faixa verde logo abaixo do carrossel
  beneficiosFaixa: [
    { icone: "shield", texto: "Garantia de entrega da banda contratada" },
    { icone: "headset", texto: "Atendimento humanizado" },
    { icone: "check", texto: "Instalação GRÁTIS" },
  ],

  /* ------------------------------------------------------------------
     PLANOS — para mudar os VALORES, edite só estes campos de cada plano:
       velocidade            → número grande do card (ex.: "300")
       precoFinal            → valor COM fidelidade (o total grande do card)
       precoDe               → valor SEM fidelidade (o riscado, "DE: R$ ...")
       premium.precoApartir  → valor de cada app premium
     Use vírgula nos centavos e sem "R$": "89,90".
     O total é recalculado sozinho quando o cliente marca apps premium
     e adicionais (a soma entra nos dois valores) — não precisa mexer.
     Os adicionais (Telefonia, IP, Mesh) ficam em "adicionais", mais abaixo.
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
     ADICIONAIS ("Adicionar no combo") — aparecem em TODOS os planos e
     entram na conta do total e na mensagem do WhatsApp.
       tipo: "toggle"      → liga/desliga (ex.: telefonia fixa, IP público)
       tipo: "quantidade"  → contador (ex.: AP Wi-Fi Mesh), "max" = limite
     ATENÇÃO: nomes e valores abaixo são EXEMPLOS. Coloque os reais.
     Para um plano ter adicionais diferentes, crie "adicionais: [...]"
     dentro do próprio plano com a mesma estrutura.
     ------------------------------------------------------------------ */
  adicionais: [
    { id: "telefonia", nome: "Telefonia Fixa", detalhe: "por R$ 24,90 mensais", preco: "24,90", tipo: "toggle" },
    { id: "ip", nome: "IP Público", detalhe: "R$ 60,00 / mês", preco: "60,00", tipo: "toggle" },
    { id: "mesh", nome: "AP Wi-Fi Mesh", detalhe: "opcional por R$ 29,90 cada", preco: "29,90", tipo: "quantidade", max: 5 },
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
    titulo: "Na AlmeidasNet você encontra serviços de entretenimento",
    velocidade: 45, // velocidade do movimento automático (px por segundo). 0 = parado
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
    titulo: "Conheça o poder do Wi-Fi 6 da AlmeidasNet",
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
    { nome: "Marina Costa", perfil: "Cliente residencial", texto: "Depois que contratei a AlmeidasNet, minha conexão ficou muito mais estável." },
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
    { texto: "Fale conosco", link: "whatsapp:Olá! Quero falar com a AlmeidasNet", icone: "chat" },
    { texto: "Teste de velocidade", link: "https://www.speedtest.net/", icone: "gauge" },
    { texto: "Área do assinante", link: "https://ixc.almeidasnet.com.br", icone: "users" },
    { texto: "Indique e ganhe", link: "popup:", icone: "star" }, // "popup:" abre o popup Indique e ganhe
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
        texto: "Indique amigos e familiares para a AlmeidasNet e ganhe benefícios.",
        botao: "Quero indicar",
        icone: "users",
        link: "whatsapp:Olá! Quero saber como funciona o programa Indique e Ganhe da AlmeidasNet",
      },
      {
        imagem: "",
        titulo: "Instalação grátis  (mediante a Consulta)",
        texto: "Assine agora e a instalação não custa nada.",
        botao: "Quero assinar",
        icone: "check",
        link: "whatsapp:Olá! Quero assinar com instalação grátis na AlmeidasNet",
      },
    ],
  },
  /* ------------------------------------------------------------------
     PÁGINA "PARA SUA EMPRESA" (empresas.html) — planos, benefícios,
     depoimentos e FAQ dessa página. O formulário de contato dela monta
     a mensagem sozinho e manda pro WhatsApp, igual ao resto do site.
     whatsapp: deixe "" para usar o mesmo WhatsApp do site; ou coloque
     um número exclusivo do time comercial, ex. "https://wa.me/557..."
     ------------------------------------------------------------------ */
  paginaEmpresas: {
    whatsapp: "",
    whatsappExibicao: "", // se preencher "whatsapp" acima, preencha aqui o número formatado para exibição

    hero: {
      titulo: "Internet dedicada para a sua empresa nunca parar",
      texto: "Link estável, suporte prioritário e um time comercial que entende do seu negócio. Da loja de bairro ao escritório com vários pontos.",
      itens: [
        "IP fixo dedicado incluso",
        "Suporte prioritário 24/7",
        "Instalação expressa para empresas",
      ],
      botao: "Falar com um consultor",
    },

    // Faixa de confiança logo abaixo do herói — EXEMPLO, ajuste os números
    confianca: [
      { icone: "gauge", texto: "SLA de atendimento em até 4h" },
      { icone: "shield", texto: "Rede monitorada 24 horas" },
      { icone: "users", texto: "Gerente de conta dedicado" },
    ],

    /* ATENÇÃO: planos, recursos e "a partir de" abaixo são EXEMPLOS.
       Ajuste para os planos empresariais reais. Deixe "precoApartir"
       vazio ("") para o card mostrar "Sob consulta" no lugar do preço. */
    planos: [
      {
        nome: "Empresarial Start",
        velocidade: "300 mega",
        indicado: "Pequenos negócios e escritórios com poucos pontos",
        recursos: ["IP fixo dedicado", "Suporte em horário comercial", "Instalação em até 48h"],
        precoApartir: "249,90",
      },
      {
        nome: "Empresarial Pro",
        velocidade: "600 mega",
        indicado: "Empresas com vários dispositivos e uso constante",
        recursos: ["IP fixo dedicado", "Suporte prioritário 24/7", "Link com redundância", "Gerente de conta"],
        precoApartir: "459,90",
        destaque: true,
      },
      {
        nome: "Empresarial Corporate",
        velocidade: "1000 mega",
        indicado: "Operações críticas, filiais e múltiplos pontos",
        recursos: ["Link dedicado simétrico", "SLA personalizado", "Suporte prioritário 24/7", "Gerente de conta"],
        precoApartir: "",
      },
    ],

    // "Por que a AlmeidasNet" — EXEMPLO, ajuste textos se quiser
    beneficios: [
      { icone: "bolt", titulo: "Link estável", texto: "Rede dimensionada para uso intenso, sem quedas em horário de pico." },
      { icone: "headset", titulo: "Suporte prioritário", texto: "Atendimento empresarial com fila própria, sem esperar como cliente comum." },
      { icone: "file", titulo: "Contrato flexível", texto: "Planos que acompanham o crescimento da sua empresa, sem burocracia." },
      { icone: "check", titulo: "Instalação expressa", texto: "Equipe própria para colocar sua empresa online o quanto antes." },
    ],

    // Depoimentos de empresas — SUBSTITUA pelos depoimentos reais
    depoimentos: [
      { nome: "Fernanda Dias", perfil: "Clínica odontológica", texto: "Migramos para a AlmeidasNet e o atendimento prioritário fez toda a diferença no dia a dia da clínica." },
      { nome: "Marcos Vinícius", perfil: "Escritório de contabilidade", texto: "Nunca mais tivemos queda de link em horário de fechamento de balanço." },
      { nome: "Patrícia Nunes", perfil: "Loja de conveniência", texto: "O gerente de conta resolve tudo direto pelo WhatsApp, sem enrolação." },
    ],

    faq: [
      { pergunta: "Atendem empresas em qualquer bairro?", resposta: "Atendemos toda a área de cobertura da AlmeidasNet Fale com um consultor informando o endereço para confirmarmos a disponibilidade." },
      { pergunta: "O IP fixo já vem incluso?", resposta: "Sim, todos os planos empresariais incluem IP fixo dedicado, sem custo adicional." },
      { pergunta: "Como funciona o suporte prioritário?", resposta: "Clientes empresariais têm uma fila de atendimento própria, com SLA de resposta combinado no contrato." },
      { pergunta: "Consigo migrar de outro provedor sem perder e-mail e sistemas?", resposta: "Sim. Nosso time acompanha a migração e planeja a troca para não impactar o funcionamento da empresa." },
    ],

    formTitulo: "Fale com o nosso time comercial",
    formTexto: "Conte um pouco sobre a sua empresa e retornamos com uma proposta.",
  },
};
