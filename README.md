# AlmeidasNet — Site Institucional

Site estático (HTML + CSS + JS puro, sem build) pronto para publicar no Vercel via GitHub.

## Estrutura

```
almeidasnet/
├── index.html
├── css/style.css
├── js/config.js        → TODOS os textos, links e planos editáveis
├── js/main.js           → interações (menu, carrossel, planos, popup)
└── images/
    ├── logo/             → logo-colorido.png (fundos claros), logo-claro.png (fundos escuros — usado no site), favicon.png
    ├── hero/              → fotos do carrossel (slide-1.jpg a slide-4.jpg)
    ├── apps/               → ícone genérico dos apps dos planos (icone-app.png)
    └── promo/               → imagens do popup "Indique e ganhe" (promo-1.jpg a 3.jpg)
```

## O que editar antes de publicar

Tudo fica em **`js/config.js`**, com instruções em comentário no topo do arquivo:

- `whatsapp`, `redesSociais`, `testeDeVelocidade` → seus links reais
- `heroSlides` → textos do carrossel. Troque as fotos em `images/hero/` (mantendo os nomes slide-1.jpg…slide-4.jpg) — **tamanho 1920×1080px, JPG/WebP até ~350KB**. Evite elementos importantes no terço esquerdo da foto, onde ficam o título e o botão.
- `planos` → cada plano tem `incluso`, `gratis` e `premium`, cada um com uma lista de `apps` (`nome` + `icone`). Deixei os nomes em branco de propósito — o ícone genérico (`images/apps/icone-app.png`, 48×48px transparente) aparece com "editar" embaixo até você trocar pelo ícone e nome reais.
- `popupIndiqueGanhe.slides` → o popup usa imagens quadradas prontas (o criativo já vem desenhado nelas, como no `images/promo/promo-1.jpg`, que mostra o tamanho: **900×900px, JPG/PNG até ~500KB**). Troque a imagem e o `link` de cada slide. Para desativar o popup, mude `ativo` para `false`.
- `menuRapido` → itens do menu que abre pelo botão de lista flutuante (canto inferior direito).

## Coisas que já usei do que você me mandou

- **Logo real**: recortei o arquivo que você enviou e gerei duas versões — `logo-colorido.png` (fundo claro) e `logo-claro.png`, com o texto em branco, para o header e o rodapé escuros.
- **Menu lateral flutuante**: botão de lista (abre o painel com os atalhos), telefone, WhatsApp, Instagram e voltar ao topo, no mesmo estilo da referência.
- **Popup "Indique e ganhe"**: mesma mecânica da referência (aparece uma vez, com "X" para fechar), mas com uma imagem própria da AlmeidasNet no lugar da foto da Nex Telecom — já que aquela é um material proprietário deles. Deixei o slot pronto para você (ou seu designer) colocar a arte final.
- **Cards de plano em formato combo**: "Incluso no combo", "Grátis — escolha X app(s)/mês" e "A partir de R$/apps" (com o seletor ‹ 0 ›), botão "+ Adicionar no combo", preço "DE" riscado e "Total no combo (com fidelidade)" — igual à lógica da referência. Os ícones dos apps ficaram como placeholder para você preencher.

## Deploy — GitHub + Vercel

1. Suba esta pasta para um repositório novo no GitHub:
   ```bash
   git init
   git add .
   git commit -m "AlmeidasNet - site institucional"
   git branch -M main
   git remote add origin SEU_REPOSITORIO_AQUI
   git push -u origin main
   ```
2. Em [vercel.com](https://vercel.com) → **Add New → Project** → importe o repositório.
3. Site estático: não precisa configurar Build Command nem Output Directory (Framework: **Other**). Clique em **Deploy**.
4. A cada `git push` na branch `main`, o Vercel publica a nova versão automaticamente.

## Sobre o Supabase

Este site não precisa de banco de dados — os "acessos" (2ª via, área do cliente, app) apontam para `ixc.almeidasnet.com.br` e as lojas de app. Se no futuro você quiser um formulário de contato salvando leads, ou o popup/depoimentos gerenciados dinamicamente, aí faz sentido plugar o Supabase. Me avise quando quiser evoluir para isso.

## Checklist antes de publicar

- [ ] Número de WhatsApp real e links de redes sociais em `config.js`
- [ ] Fotos reais do carrossel em `images/hero/` (1920×1080px)
- [ ] Ícones e nomes reais dos apps em cada plano (`config.js`)
- [ ] Arte final do popup "Indique e ganhe" em `images/promo/` (900×900px)
- [ ] Revisar preços e nomes dos combos
- [ ] Testar no celular (menu, carrossel, planos, popup, menu flutuante)
