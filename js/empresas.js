(function () {
  "use strict";

  var CFG = window.ALMEIDASNET_CONFIG;
  var UI = window.AlmeidasNetUI;
  if (!CFG || !UI || !CFG.paginaEmpresas) return;
  var PE = CFG.paginaEmpresas;

  var icon = UI.icon, esc = UI.esc, hydrateIcons = UI.hydrateIcons;
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function waLinkEmpresa(msg) {
    var num = PE.whatsapp || CFG.whatsapp;
    return num + "?text=" + encodeURIComponent(msg || "Olá! Quero falar com o time comercial da AlmeidasNet");
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupEmpresaLinks();
    renderHero();
    renderTrust();
    renderPlans();
    renderBenefits();
    renderTestimonials();
    renderFaq();
    renderFormIntro();
    setupForm();
  });

  function setupEmpresaLinks() {
    var href = waLinkEmpresa();
    $$("[data-wa-empresas]").forEach(function (el) { el.href = href; });
    $$("[data-wa-empresas-text]").forEach(function (el) { el.textContent = PE.whatsappExibicao || CFG.whatsappExibicao; });
  }

  function renderHero() {
    var h = PE.hero;
    if (!h) return;
    $("#biz-hero-titulo").textContent = h.titulo;
    $("#biz-hero-texto").textContent = h.texto;
    $("#biz-hero-botao").textContent = h.botao;
    $("#biz-hero-itens").innerHTML = (h.itens || []).map(function (t) {
      return "<li>" + icon("check") + "<span>" + esc(t) + "</span></li>";
    }).join("");
    hydrateIcons($("#biz-hero-itens"));
  }

  function renderTrust() {
    var wrap = $("#biz-trust");
    if (!wrap) return;
    wrap.innerHTML = (PE.confianca || []).map(function (c) {
      return '<div class="biz-trust-item"><span class="biz-trust-item__icon">' + icon(c.icone) + "</span><span>" + esc(c.texto) + "</span></div>";
    }).join("");
    hydrateIcons(wrap);
  }

  function renderPlans() {
    var wrap = $("#biz-plans");
    if (!wrap) return;
    wrap.innerHTML = (PE.planos || []).map(function (p) {
      var preco = p.precoApartir
        ? '<p class="biz-plan__price"><small>A partir de</small>R$ ' + esc(p.precoApartir) + "/mês</p>"
        : '<p class="biz-plan__price"><small>Investimento</small>Sob consulta</p>';
      var msg = "Olá! Quero falar sobre o plano " + p.nome + " (" + p.velocidade + ") para a minha empresa.";
      return (
        '<article class="biz-plan' + (p.destaque ? " biz-plan--destaque" : "") + '">' +
        (p.destaque ? '<span class="biz-plan__tag">Mais escolhido</span>' : "") +
        "<h3>" + esc(p.nome) + '</h3><p class="biz-plan__speed">' + esc(p.velocidade) + "</p>" +
        '<p class="biz-plan__indicado">' + esc(p.indicado) + "</p>" +
        '<ul class="biz-plan__list">' + (p.recursos || []).map(function (r) { return "<li>" + icon("check") + "<span>" + esc(r) + "</span></li>"; }).join("") + "</ul>" +
        preco +
        '<a class="btn btn--dark" href="' + esc(waLinkEmpresa(msg)) + '" target="_blank" rel="noopener">' + icon("whatsapp") + "Falar sobre este plano</a>" +
        "</article>"
      );
    }).join("");
    hydrateIcons(wrap);
  }

  function renderBenefits() {
    var wrap = $("#biz-benefits");
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
    var wrap = $("#biz-depo-grid");
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
    var wrap = $("#biz-faq");
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
    var t = $("#biz-form-titulo"), p = $("#biz-form-texto");
    if (t) t.textContent = PE.formTitulo;
    if (p) p.textContent = PE.formTexto;
  }

  function setupForm() {
    var form = $("#biz-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (id) { return $(id, form).value.trim(); };
      var msg =
        "Olá! Quero falar sobre um plano empresarial da AlmeidasNet\n" +
        "Nome: " + v("#be-nome") + "\n" +
        "Empresa: " + v("#be-empresa") + "\n" +
        "WhatsApp: " + v("#be-whatsapp") +
        (v("#be-porte") ? "\nPontos/funcionários: " + v("#be-porte") : "") +
        (v("#be-mensagem") ? "\nMensagem: " + v("#be-mensagem") : "");
      window.open(waLinkEmpresa(msg), "_blank", "noopener");
    });
  }
})();
