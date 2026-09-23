# AlmeidasNet Telecom — Site institucional

Site estático (HTML + CSS + JS puro, sem build), pronto para publicar na Vercel via GitHub.
Visual inspirado na estrutura do site da Nex Telecom, com as cores da AlmeidasNet
(verde `#19B506`, verde neon `#5FFF00`, preto e o laranja do botão "Área do assinante").

## Estrutura

```
almeidasnet/
├── index.html          → site residencial
├── empresas.html        → página "Para sua empresa" (planos B2B + formulário de contato)
├── css/style.css       → cores e tamanhos no topo (variáveis :root), compartilhado pelas 2 páginas
├── js/config.js        → TODOS os textos, links, planos e banners editáveis
├── js/main.js          → interações do site residencial (compartilhado pelas 2 páginas)
├── js/empresas.js      → interações exclusivas da página empresas.html
└── images/
    ├── logo/           → logo-colorido.png (topo), logo-claro.png (rodapé), marca.png, favicon.png
    ├── hero/           → (opcional) fotos recortadas para os banners
    ├── apps/           → ícone genérico dos apps dos planos (icone-app.png)
    └── promo/          → (opcional) arte pronta do popup "Indique e ganhe"
```

## Página "Para sua empresa" (empresas.html)

Página B2B separada, reaproveitando o visual do site: herói com os diferenciais, faixa de
confiança, planos empresariais (cards com recursos e preço "a partir de" ou "Sob consulta"),
"Por que escolher a AlmeidasNet", depoimentos de empresas, FAQ e um formulário de contato que
monta a mensagem sozinha e manda pro WhatsApp — tudo editável em `paginaEmpresas`, dentro do
`js/config.js`. O menu do site (nas duas páginas) tem um link "Para sua empresa" ↔ "Para sua
casa" para ir e voltar entre as duas. Por padrão o WhatsApp é o mesmo do site; se o time
comercial usar outro número, preencha `paginaEmpresas.whatsapp` e `whatsappExibicao`.

## O que tem na página (na ordem)

Barra branca com logo grande e contatos → navbar verde fixa (com efeitos de hover, botões
"Área do assinante", "Assine agora" e "Indique e ganhe") → carrossel animado → faixa verde de
diferenciais → "Como podemos te atender hoje?" → Planos → Gamer → Entretenimento (faixa que se
arrasta) → Wi-Fi 6 → Consulte cobertura (com os bairros atendidos) → Quem somos + Depoimentos →
FAQ → App → CTAs → Rodapé.
Flutuantes: menu rápido, telefone, WhatsApp, Instagram e voltar ao topo. Popup "Indique e ganhe".

## Configurado com os seus dados


- **WhatsApp**: (71) 99381-2371 (`whatsapp` e `whatsappExibicao` no config.js)
- **Telefone flutuante**: aponta para o mesmo número. Se tiver um fixo, troque `telefone` e `telefoneLink`
- **Teste de velocidade**: https://www.speedtest.net/
- Endereço, CNPJ e Instagram (@almeidas_net) no rodapé

## Planos: como funciona a conta

- Cada card calcula o total na hora: preço do plano + adicionais marcados + apps premium.
- O cliente escolhe os apps grátis (limite = `qtdEscolha`), liga/desliga adicionais e ajusta quantidades.
- **"Assine já"** abre o WhatsApp com o pedido pronto: plano, apps escolhidos, adicionais e total
  (com e sem fidelidade).
- **Mudar valores:** em `planos` (config.js) edite `precoFinal` (com fidelidade), `precoDe` (sem fidelidade, riscado),
  `velocidade` e `premium.precoApartir`. Use vírgula nos centavos (`"89,90"`). O resto se recalcula.
- O "Adicionar no combo" fica recolhido e abre ao clicar; mostra uma bolinha com quantos itens estão marcados.
- Os adicionais ficam em `adicionais` no `js/config.js` (valem para todos os planos; um plano pode ter os
  próprios com `adicionais: [...]` dentro dele).

## O que editar antes de publicar (tudo em `js/config.js`)

- `adicionais`: **nomes e valores são exemplos.** Coloque os reais

- `planos`: **os valores, velocidades e apps são exemplos.** Ajuste para os planos reais
- `depoimentos`: **são exemplos.** Troque por depoimentos reais de clientes
- `gamer.numeros` (latência, velocidade, estabilidade) e `wifi6`: confirme se refletem o que vocês
  entregam. Para esconder o Wi-Fi 6, mude `wifi6.ativo` para `false`
- `redesSociais.facebook` / `youtube`: inserir os links
- `heroSlides`: textos dos banners. Os banners são desenhados em código. Para colocar a foto de uma
  pessoa (como na Nex), salve um PNG recortado (fundo transparente, ~900×1100px) em `images/hero/`
  e preencha `foto: "images/hero/pessoa-1.png"` no slide
- `popupIndiqueGanhe`: textos do popup, ou `imagem` (900×900px) para usar uma arte pronta
- `entretenimento.cards`: cada card aceita `imagem` (capa 600×720px) no lugar do ícone. A faixa anda sozinha em
  loop; ajuste a velocidade em `entretenimento.velocidade` (px/segundo, `0` para parar). Pausa com o mouse em cima
- Ícones dos apps dos planos: troque `icone` e preencha `nome` (48×48px, PNG transparente)
- `bairrosAtendidos`: lista de bairros exibida na seção "Consulte cobertura"
- `paginaEmpresas`: **planos, benefícios e depoimentos são exemplos.** Ajuste para a oferta B2B real

## Deploy — GitHub + Vercel

1. Suba esta pasta para um repositório no GitHub:
   ```bash
   git init && git add . && git commit -m "AlmeidasNet - site institucional"
   git branch -M main
   git remote add origin SEU_REPOSITORIO_AQUI
   git push -u origin main
   ```
2. Na [Vercel](https://vercel.com): **Add New → Project** → importe o repositório (Framework: **Other**, sem build). **Deploy**.
3. Cada `git push` na `main` publica a nova versão.

## Checklist antes de publicar

- [ ] Planos e preços reais
- [ ] Depoimentos reais
- [ ] Confirmar números do Gamer e o texto do Wi-Fi 6
- [ ] Links de Facebook/YouTube (ou remover os ícones)
- [ ] Foto de pessoa nos banners (opcional)
- [ ] Bairros atendidos (`bairrosAtendidos`) e conteúdo da página "Para sua empresa" (`paginaEmpresas`)
- [ ] Testar no celular
