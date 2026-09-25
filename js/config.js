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
  telefone: "(71) 99381-2371",
  telefoneLink: "tel:+5571993812371",

  endereco: "Tv. Domingos Silva, 35, Itapuã, Salvador - BA",
  enderecoMapa: "https://maps.app.goo.gl/psBKHfRxLYWE3ven6",

  // Bairros atendidos — aparecem como selos na seção "Consulte cobertura"
  bairrosAtendidos: ["Itapuã", "Piatã", "Stella Maris", "São Cristóvão"],

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
     POPUP DE ENTRADA — "para sua casa ou para um evento?". Aparece uma
     vez por visita, antes do popup "Indique e ganhe". Ao clicar numa
     opção, vai para a página certa (index.html ou eventos.html).
     Para desativar, mude "ativo" para false.
     ------------------------------------------------------------------ */
  popupPublico: {
    ativo: true,
    atrasoMs: 1200,
    titulo: "Vamos direto ao que você precisa",
    texto: "Escolha uma opção para ver o conteúdo certo.",
    opcoes: [
      {
        texto: "Internet para minha casa",
        subtexto: "Planos residenciais de fibra óptica",
        icone: "home",
        link: "index.html",
      },
      {
        texto: "Internet para minha empresa",
        subtexto: "Planos com IP fixo e suporte prioritário",
        icone: "office",
        link: "empresas.html",
      },
      {
        texto: "Internet para um evento",
        subtexto: "Estrutura temporária, com equipe no local",
        icone: "calendar",
        link: "eventos.html",
      },
    ],
  },

  /* ------------------------------------------------------------------
     PÁGINA "PARA SUA EMPRESA" (empresas.html) — planos, benefícios,
     depoimentos e FAQ dessa página. O formulário de contato dela monta
     a mensagem sozinho e manda pro WhatsApp, igual ao resto do site.
     whatsapp: deixe "" para usar o mesmo WhatsApp do site; ou coloque
     um número exclusivo do time comercial, ex. "https://wa.me/557..."
     ATENÇÃO: planos, textos e depoimentos abaixo são EXEMPLOS. Ajuste
     para a oferta B2B real.
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

  /* ------------------------------------------------------------------
     PÁGINA "INTERNET PARA EVENTOS" (eventos.html) — pacotes, benefícios,
     depoimentos e FAQ dessa página. O formulário de contato dela monta
     a mensagem sozinho e manda pro WhatsApp, igual ao resto do site.
     whatsapp: deixe "" para usar o mesmo WhatsApp do site; ou coloque
     um número exclusivo para orçamentos de evento, ex. "https://wa.me/557..."
     ATENÇÃO: pacotes, textos e depoimentos abaixo são EXEMPLOS. Ajuste
     para o serviço de eventos real de vocês.
     ------------------------------------------------------------------ */
  paginaEventos: {
    whatsapp: "",
    whatsappExibicao: "", // se preencher "whatsapp" acima, preencha aqui o número formatado para exibição

    hero: {
      titulo: "Internet montada para o seu evento, do início ao fim",
      texto: "Shows, feiras, congressos, casamentos e festas de um dia: levamos toda a estrutura de internet até o local, damos suporte durante o evento e desmontamos no final.",
      itens: [
        "Montagem e desmontagem no mesmo dia",
        "Equipe técnica presente durante todo o evento",
        "Link de backup, para nunca ficar sem conexão",
      ],
      botao: "Orçar meu evento",
    },

    // Faixa de confiança logo abaixo do herói — EXEMPLO, ajuste se quiser
    confianca: [
      { icone: "bolt", texto: "Montagem expressa no dia do evento" },
      { icone: "shield", texto: "Link de backup, sem depender de uma única conexão" },
      { icone: "headset", texto: "Equipe técnica acompanhando o evento" },
    ],

    /* ATENÇÃO: pacotes, recursos e "a partir de" abaixo são EXEMPLOS.
       Ajuste para os pacotes de evento reais. Deixe "precoApartir" vazio
       ("") para o card mostrar "Sob orçamento" no lugar do preço. */
    pacotes: [
      {
        nome: "Evento Express",
        duracao: "Até 6 horas · eventos pequenos",
        indicado: "Feiras de bairro, lançamentos e confraternizações",
        recursos: ["Wi-Fi para o público", "1 ponto de rede para pagamento/som", "Montagem e desmontagem incluídas"],
        precoApartir: "",
      },
      {
        nome: "Evento Completo",
        duracao: "Diária completa · até 12h",
        indicado: "Feiras, congressos e festas de médio porte",
        recursos: ["Wi-Fi dedicado de alta capacidade", "Pontos de rede para equipamentos", "Equipe técnica no local o dia todo", "Link de backup 4G"],
        precoApartir: "",
        destaque: true,
      },
      {
        nome: "Grande Porte",
        duracao: "Vários dias ou grande público",
        indicado: "Shows, congressos grandes e eventos com vários dias",
        recursos: ["Estrutura redundante", "Suporte técnico em tempo integral", "Projeto sob medida para o espaço", "Equipamento reaproveitado a cada evento"],
        precoApartir: "",
      },
    ],

    // "Por que a AlmeidasNet" — EXEMPLO, ajuste textos se quiser
    beneficios: [
      { icone: "bolt", titulo: "Equipamento próprio", texto: "Não dependemos de terceiros: toda a estrutura é nossa, pronta para reaproveitar em cada evento." },
      { icone: "check", titulo: "Setup rápido", texto: "Equipe treinada para montar e deixar tudo funcionando antes do seu evento começar." },
      { icone: "headset", titulo: "Suporte durante o evento", texto: "Alguém da equipe acompanha para resolver qualquer imprevisto na hora." },
      { icone: "file", titulo: "Sem burocracia", texto: "Orçamento sob medida para o porte do seu evento, sem contrato de fidelidade." },
    ],

    // Depoimentos de eventos atendidos — SUBSTITUA pelos depoimentos reais
    depoimentos: [
      { nome: "Rafael Souza", perfil: "Organizador de feira de negócios", texto: "A internet não caiu um minuto durante as 8 horas do evento, mesmo com mais de 300 pessoas conectadas." },
      { nome: "Camila Ferreira", perfil: "Casamento na praia", texto: "Contratamos para o casamento e a equipe cuidou de tudo, discretamente, sem ninguém perceber os cabos." },
      { nome: "Grupo Cultural Itapuã", perfil: "Festa junina do bairro", texto: "Chamamos praticamente em cima da hora e ainda assim conseguiram montar tudo a tempo." },
    ],

    faq: [
      { pergunta: "Com quanto tempo de antecedência preciso contratar?", resposta: "O ideal é fechar com alguns dias de antecedência para garantir equipamento e equipe disponíveis, mas fale com a gente mesmo em cima da hora — muitas vezes conseguimos encaixar." },
      { pergunta: "Vocês atendem eventos fora da área de cobertura?", resposta: "Sim, conseguimos levar a estrutura para fora da área normal de cobertura da AlmeidasNet; o orçamento considera o deslocamento da equipe." },
      { pergunta: "Precisa de energia elétrica no local?", resposta: "Sim, os equipamentos precisam de energia. Se o local não tiver, conseguimos combinar um gerador junto com o orçamento." },
      { pergunta: "Quantas pessoas conseguem ficar conectadas ao mesmo tempo?", resposta: "Depende do pacote escolhido — dimensionamos a estrutura de acordo com o público estimado do seu evento." },
      { pergunta: "O que acontece com o equipamento depois do evento?", resposta: "Desmontamos tudo no mesmo dia (ou no dia seguinte, se combinado antes) e o equipamento fica pronto para o próximo evento." },
    ],

    formTitulo: "Conte sobre o seu evento",
    formTexto: "Preencha os dados e te mandamos um orçamento sob medida.",
  },
};
