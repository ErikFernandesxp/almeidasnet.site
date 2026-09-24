(function () {
  "use strict";

  var CFG = window.ALMEIDASNET_CONFIG;
  var UI = window.AlmeidasNetUI;
  if (!CFG || !UI || !CFG.paginaEventos) return;
  var PE = CFG.paginaEventos;

  var icon = UI.icon, esc = UI.esc, hydrateIcons = UI.hydrateIcons;
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function waLinkEvento(msg) {
    var num = PE.whatsapp || CFG.whatsapp;
    return num + "?text=" + encodeURIComponent(msg || "Olá! Quero orçar internet para um evento.");
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupEventoLinks();
    renderHero();
    renderHighlights();
    renderPacotes();
    renderBenefits();
    renderTestimonials();
    renderFaq();
    renderFormIntro();
    setupForm();
  });

  function setupEventoLinks() {
    var href = waLinkEvento();
    $$("[data-wa-evento]").forEach(function (el) { el.href = href; });
    $$("[data-wa-evento-text]").forEach(function (el) { el.textContent = PE.whatsappExibicao || CFG.whatsappExibicao; });
  }

  function renderHero() {
    var h = PE.hero;
    if (!h) return;
    $("#evt-hero-titulo").textContent = h.titulo;
    $("#evt-hero-texto").textContent = h.texto;
    $("#evt-hero-botao").textContent = h.botao;
    $("#evt-hero-itens").innerHTML = (h.itens || []).map(function (t) {
      return "<li>" + icon("check") + "<span>" + esc(t) + "</span></li>";
    }).join("");
    hydrateIcons($("#evt-hero-itens"));
  }

  function renderHighlights() {
    var wrap = $("#evt-highlights");
    if (!wrap) return;
    wrap.innerHTML = (PE.confianca || []).map(function (c) {
      return '<div class="evt-highlight"><span class="evt-highlight__icon">' + icon(c.icone) + "</span><span>" + esc(c.texto) + "</span></div>";
    }).join("");
    hydrateIcons(wrap);
  }

  function renderPacotes() {
    var wrap = $("#evt-plans");
    if (!wrap) return;
    wrap.innerHTML = (PE.pacotes || []).map(function (p) {
      var preco = p.precoApartir
        ? '<p class="evt-plan__price"><small>A partir de</small>R$ ' + esc(p.precoApartir) + "</p>"
        : '<p class="evt-plan__price"><small>Investimento</small>Sob orçamento</p>';
      var msg = "Olá! Quero orçar o pacote " + p.nome + " (" + p.duracao + ") para o meu evento.";
      return (
        '<article class="evt-plan' + (p.destaque ? " evt-plan--destaque" : "") + '">' +
        (p.destaque ? '<span class="evt-plan__tag">Mais escolhido</span>' : "") +
        "<h3>" + esc(p.nome) + '</h3><p class="evt-plan__duracao">' + esc(p.duracao) + "</p>" +
        '<p class="evt-plan__indicado">' + esc(p.indicado) + "</p>" +
        '<ul class="evt-plan__list">' + (p.recursos || []).map(function (r) { return "<li>" + icon("check") + "<span>" + esc(r) + "</span></li>"; }).join("") + "</ul>" +
        preco +
        '<a class="btn btn--dark" href="' + esc(waLinkEvento(msg)) + '" target="_blank" rel="noopener">' + icon("whatsapp") + "Orçar este pacote</a>" +
        "</article>"
      );
    }).join("");
    hydrateIcons(wrap);
  }

  function renderBenefits() {
    var wrap = $("#evt-benefits");
    if (!wrap) return;
    wrap.innerHTML = (PE.beneficios || []).map(function (b) {
      return (
        '<div class="atender-card"><span class="atender-card__icon">' + icon(b.icone) + "</span>" +
        "<strong>" + esc(b.titulo) + "</strong><p>" + esc(b.texto) + "</p></div>"
      );
    }).join("");
    hydrateIcons(wrap);
  }

  function renderTestimonials() {
    var wrap = $("#evt-depo-grid");
    if (!wrap) return;
    wrap.innerHTML = (PE.depoimentos || []).map(function (d) {
      var ini = d.nome.split(" ").map(function (p) { return p.charAt(0); }).slice(0, 2).join("").toUpperCase();
      return (
        '<figure class="testimonial" style="margin:0"><div class="testimonial__avatar">' + esc(ini) + "</div>" +
        '<div class="testimonial__stars" aria-label="5 estrelas">★★★★★</div>' +
        "<p>" + esc(d.texto) + "</p>" +
        '<figcaption class="testimonial__who"><strong>' + esc(d.nome) + "</strong><span>" + esc(d.perfil) + "</span></figcaption></figure>"
      );
    }).join("");
  }

  function renderFaq() {
    var wrap = $("#evt-faq");
    if (!wrap) return;
    wrap.innerHTML = (PE.faq || []).map(function (f) {
      return (
        '<div class="accordion-item"><button class="accordion-item__question" aria-expanded="false">' + esc(f.pergunta) + '<i data-icon="plus"></i></button>' +
        "<div class=\"accordion-item__answer\"><div>" + esc(f.resposta) + "</div></div></div>"
      );
    }).join("");
    hydrateIcons(wrap);

    var items = $$(".accordion-item", wrap);
    items.forEach(function (item) {
      var btn = $(".accordion-item__question", item), panel = $(".accordion-item__answer", item);
      btn.addEventListener("click", function () {
        var wasOpen = item.classList.contains("is-open");
        items.forEach(function (o) {
          o.classList.remove("is-open");
          $(".accordion-item__question", o).setAttribute("aria-expanded", "false");
          $(".accordion-item__answer", o).style.maxHeight = null;
        });
        if (!wasOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }

  function renderFormIntro() {
    var t = $("#evt-form-titulo"), p = $("#evt-form-texto");
    if (t) t.textContent = PE.formTitulo;
    if (p) p.textContent = PE.formTexto;
  }

  function setupForm() {
    var form = $("#evt-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (id) { return $(id, form).value.trim(); };
      var msg =
        "Olá! Quero orçar internet para um evento.\n" +
        "Nome: " + v("#ev-nome") + "\n" +
        "Tipo de evento: " + v("#ev-tipo") + "\n" +
        "WhatsApp: " + v("#ev-whatsapp") + "\n" +
        "Data do evento: " + v("#ev-data") +
        (v("#ev-publico") ? "\nPúblico estimado: " + v("#ev-publico") : "") +
        (v("#ev-mensagem") ? "\nMensagem: " + v("#ev-mensagem") : "");
      window.open(waLinkEvento(msg), "_blank", "noopener");
    });
  }
})();
