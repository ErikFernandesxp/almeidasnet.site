/**
 * CONFIGURAÇÃO CENTRAL — ALMEIDASNET
 * -----------------------------------
 * Edite apenas este arquivo para atualizar links, textos, fotos do
 * carrossel, o popup de indicação e os planos exibidos no site.
 * Nenhum outro arquivo precisa ser alterado para essas mudanças.
 *
 * IMAGENS DO CARROSSEL (heroSlides.imagem):
 *   - Tamanho: 1920 x 1080px (paisagem, 16:9) — veja o placeholder
 *     em images/hero/slide-1.jpg para a referência exata
 *   - Formato: JPG ou WebP, até ~350KB por imagem
 *   - Evite informação importante no terço esquerdo: é onde o título
 *     e o botão ficam por cima (com um degradê escuro de apoio)
 *   - Troque os arquivos em images/hero/ mantendo o mesmo nome
 *
 * IMAGENS DO POPUP "INDIQUE E GANHE" (popupIndiqueGanhe.slides.imagem):
 *   - Tamanho: 900 x 900px (quadrado) — veja images/promo/promo-1.jpg
 *   - Formato: JPG ou PNG, até ~500KB
 *   - A imagem é o próprio criativo (texto/CTA já desenhados nela);
 *     o clique na imagem abre o link configurado em "link"
 *
 * ÍCONES DE APP DOS PLANOS (planos > apps > icone):
 *   - Tamanho: 48 x 48px, PNG com fundo transparente — veja
 *     images/apps/icone-app.png (placeholder genérico)
 *   - Troque o caminho em "icone" quando tiver o ícone real
 */

window.ALMEIDASNET_CONFIG = {
  // Link do WhatsApp (use o formato https://wa.me/55DDDNUMERO)
  whatsapp: "https://wa.me/5571301958110",
  whatsappMensagemPadrao: "Olá! Quero contratar um plano da AlmeidasNet.",

  telefone: "(71) 3019-5811",
  telefoneLink: "tel:+557130195811",

  redesSociais: {
    instagram: "https://www.instagram.com/almeidas_net/",
    facebook: "#",  // INSERIR LINK
    youtube: "#",   // INSERIR LINK
  },

  centralAssinante: "https://ixc.almeidasnet.com.br",
  appIphone: "https://apps.apple.com/br/app/almeidasnet/id6774625446",
  appAndroid: "https://play.google.com/store/apps/details?id=br.com.almeidasnet.ixc",

  testeDeVelocidade: "#", // INSERIR LINK
  segundaViaFatura: "https://ixc.almeidasnet.com.br",

  /* ------------------------------------------------------------------
     CARROSSEL (Hero) — troque "imagem" pela foto real e edite os textos
     ------------------------------------------------------------------ */
  heroSlides: [
    {
      imagem: "images/hero/slide-1.jpg",
      alt: "Internet fibra óptica AlmeidasNet",
      kicker: "100% fibra óptica",
      titulo: "Internet rápida para acompanhar o seu ritmo",
      texto: "Fibra óptica de alta velocidade para sua casa, trabalho e entretenimento.",
      botaoTexto: "Conheça nossos planos",
      botaoLink: "#planos",
    },
    {
      imagem: "images/hero/slide-2.jpg",
      alt: "Conexão estável AlmeidasNet",
      kicker: "Estabilidade o dia inteiro",
      titulo: "Conexão estável para todos os momentos",
      texto: "Mais estabilidade para streaming, chamadas, estudos, trabalho e jogos online.",
      botaoTexto: "Ver planos",
      botaoLink: "#planos",
    },
    {
      imagem: "images/hero/slide-3.jpg",
      alt: "Internet para jogos online AlmeidasNet",
      kicker: "Feita para o seu jogo",
      titulo: "Seu jogo merece uma conexão de verdade",
      texto: "Baixa latência e estabilidade para você jogar sem preocupação.",
      botaoTexto: "Conheça os planos",
      botaoLink: "#planos",
    },
    {
      imagem: "images/hero/slide-4.jpg",
      alt: "AlmeidasNet Telecom",
      kicker: "AlmeidasNet",
      titulo: "Conectando você ao que importa",
      texto: "Atendimento próximo, tecnologia de ponta e uma equipe pronta para te ajudar.",
      botaoTexto: "Fale conosco",
      botaoLink: "whatsapp:Olá! Quero falar com a AlmeidasNet.",
    },
  ],

  /* ------------------------------------------------------------------
     PLANOS — cada plano tem 3 linhas (incluso / grátis / apps premium
     com seletor), um botão "+ Adicionar no combo" e o preço. Preencha
     os arrays "apps" com nome + ícone real quando tiver; até lá, os
     nomes aparecem como texto e o ícone usa o placeholder genérico.
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
     MENU RÁPIDO FLUTUANTE — itens do painel que abre ao clicar no botão
     de lista, no canto inferior direito. "link" aceita: âncora da
     própria página ("#planos"), URL externa, ou "whatsapp:mensagem".
     ------------------------------------------------------------------ */
  menuRapido: [
    { texto: "Nossos Planos", link: "#planos" },
    { texto: "Sua Fatura", link: "https://ixc.almeidasnet.com.br" },
    { texto: "Quem Somos", link: "#depoimentos" },
    { texto: "Entretenimento", link: "#entretenimento" },
    { texto: "Nossas Lojas", link: "#onde-estamos" },
    { texto: "Fale Conosco", link: "whatsapp:Olá! Quero falar com a AlmeidasNet." },
    { texto: "Teste de Velocidade", link: "#" },
  ],

  /* ------------------------------------------------------------------
     POPUP "INDIQUE E GANHE" — aparece uma vez por visita, após alguns
     segundos. Cada slide é uma imagem quadrada já com o criativo
     pronto (texto/CTA desenhados nela); o clique abre "link".
     Para desativar o popup, mude "ativo" para false.
     ------------------------------------------------------------------ */
  popupIndiqueGanhe: {
    ativo: true,
    atrasoMs: 4000,
    slides: [
      {
        imagem: "images/promo/promo-1.jpg",
        alt: "Indique e ganhe AlmeidasNet",
        link: "whatsapp:Olá! Quero saber como funciona o programa Indique e Ganhe da AlmeidasNet.",
      },
      {
        imagem: "images/promo/promo-2.jpg",
        alt: "Promoção AlmeidasNet",
        link: "whatsapp:Olá! Quero saber mais sobre as promoções da AlmeidasNet.",
      },
      {
        imagem: "images/promo/promo-3.jpg",
        alt: "Promoção AlmeidasNet",
        link: "whatsapp:Olá! Quero saber mais sobre as promoções da AlmeidasNet.",
      },
    ],
  },
};
