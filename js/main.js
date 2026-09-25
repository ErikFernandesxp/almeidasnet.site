(function () {
  "use strict";

  var CFG = window.ALMEIDASNET_CONFIG;
  var REDUCED = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var SLIDE_MS = 7000;
  var promoAutoShow = function () {}; // renderPromoPopup() preenche isto; renderAudiencePopup() chama depois de fechar

  /* ==========================================================================
     Utilidades
     ========================================================================== */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function waLink(mensagem) {
    return CFG.whatsapp + "?text=" + encodeURIComponent(mensagem || CFG.whatsappMensagemPadrao);
  }

  // "#algo" -> âncora | "whatsapp:mensagem" -> WhatsApp | outro -> URL externa
  function resolveLink(link) {
    if (!link) return { href: "#", external: false };
    if (link === "popup:") return { href: "#", external: false, popup: true };
    if (link.indexOf("whatsapp:") === 0) return { href: waLink(link.slice(9)), external: true };
    if (link.charAt(0) === "#") return { href: link, external: false };
    return { href: link, external: true };
  }
  function linkAttrs(link) {
    var l = resolveLink(link);
    if (l.popup) return 'href="#" data-open-popup';
    return 'href="' + esc(l.href) + '"' + (l.external ? ' target="_blank" rel="noopener"' : "");
  }

  /* ==========================================================================
     Ícones (SVG inline, sem dependências)
     ========================================================================== */
  var ICONS = {
    wifi: '<path d="M2 8.8a15 15 0 0 1 20 0"/><path d="M5.5 12.4a10 10 0 0 1 13 0"/><path d="M9 16a5 5 0 0 1 6 0"/><path d="M12 19.5h.01"/>',
    bolt: '<path d="M13 2 3 14h7l-1 8 11-14h-7z"/>',
    gamepad: '<path d="M6 12h4M8 10v4M15 13h.01M18 11h.01"/><path d="M17.3 5H6.7a4 4 0 0 0-4 3.6L2 16a3 3 0 0 0 5.1 2.1l1.4-1.4a2 2 0 0 1 1.4-.6h4.2a2 2 0 0 1 1.4.6l1.4 1.4A3 3 0 0 0 22 16l-.7-7.4a4 4 0 0 0-4-3.6z"/>',
    play: '<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4z"/>',
    chat: '<path d="M21 15.5a2 2 0 0 1-2 2h-5l-4 3v-3H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>',
    video: '<rect x="2" y="6" width="13" height="12" rx="2"/><path d="m15 10 6-3v10l-6-3"/>',
    headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h3v5H5.5A1.5 1.5 0 0 1 4 17.5zM20 14h-3v5h1.5a1.5 1.5 0 0 0 1.5-1.5z"/><path d="M18 19a4 3 0 0 1-4 2h-2"/>',
    shield: '<path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',
    check: '<circle cx="12" cy="12" r="10"/><path d="m8 12.5 3 3 5-6"/>',
    tick: '<path d="M20 6 9 17l-5-5"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    "phone-app": '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
    file: '<path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5M9 13h6M9 17h6"/>',
    gauge: '<path d="M12 14l4-4"/><path d="M3.3 18a10 10 0 1 1 17.4 0"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    ball: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2c3.2 3 3.2 17 0 20"/><path d="M12 2c-3.2 3-3.2 17 0 20"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z"/>',
    home: '<path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7M3 13h18"/>',
    office: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 8h.01M9 12h.01M9 16h.01M15 8h.01M15 12h.01M15 16h.01"/><path d="M9 21v-3.5h6V21"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M8 2.5v4M16 2.5v4M3 9.5h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.5 9a2.5 2.5 0 1 1 3.4 2.3c-.9.4-1.4 1-1.4 2M12 17h.01"/>',
    pin: '<path d="M12 21s7-6.5 7-11.5a7 7 0 1 0-14 0C5 14.5 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "arrow-up": '<path d="M12 19V5M5 12l7-7 7 7"/>',
    "chevron-left": '<path d="M15 18l-6-6 6-6"/>',
    "chevron-right": '<path d="M9 18l6-6-6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    youtube: '<path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8z"/><path d="m10 15 5-3-5-3z"/>',
    // ícones preenchidos (marcas)
    whatsapp: '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.58 1.36 5.07L2 22l5.18-1.36a9.9 9.9 0 0 0 4.86 1.24h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.17c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.02.29-3.43-.72-2.9-1.2-4.76-4.15-4.9-4.34-.14-.19-1.17-1.55-1.17-2.96s.73-2.1 1-2.39c.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.32.02.51-.1.19-.15.31-.3.48-.14.16-.3.36-.43.49-.14.14-.29.29-.13.57.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.64-.14.26.1 1.66.78 1.94.92.29.14.48.21.55.33.07.12.07.68-.17 1.36z"/>',
    "play-store": '<path d="M4 2.6v18.8a1 1 0 0 0 1.5.9l15.6-9.4a1 1 0 0 0 0-1.7L5.5 1.7A1 1 0 0 0 4 2.6z"/>',
    apple: '<path d="M16.4 12.6c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9s-1.9-.9-3.2-.8C6.5 7.2 5 8.1 4.2 9.6c-1.7 3-.4 7.4 1.2 9.8.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2.1-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.4-.9-2.4-3.6zM14.2 5.6c.6-.8 1.1-1.8.9-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2.1-.5 2.8-1.3z"/>'
  };
  var FILLED = { whatsapp: 1, "play-store": 1, apple: 1 };

  function icon(name) {
    var body = ICONS[name];
    if (!body) return "";
    var filled = FILLED[name];
    return (
      '<svg class="ico" viewBox="0 0 24 24" fill="' + (filled ? "currentColor" : "none") + '"' +
      (filled ? "" : ' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"') +
      ' aria-hidden="true" focusable="false">' + body + "</svg>"
    );
  }
  function hydrateIcons(root) {
    $$("i[data-icon]", root).forEach(function (el) {
      if (!el.firstChild) el.innerHTML = icon(el.getAttribute("data-icon"));
    });
  }

  /* ==========================================================================
     Inicialização
     ========================================================================== */
  document.addEventListener("DOMContentLoaded", function () {
    injectConfigLinks();
    renderStrip();
    renderBairros();
    renderHero();
    renderPlanos();
    renderGamer();
    renderEntretenimento();
    renderWifi();
    renderDepoimentos();
    renderFloatingMenu();
    renderPromoPopup();
    renderAudiencePopup();
    hydrateIcons(document);

    setupNav();
    setupCarousel();
    setupScroller();
    setupPlanInteractions();
    setupAccordion();
    setupFloatingMenu();
    setupCoverageForm();
    setupBackToTop();
    $$(".plans-grid, .testimonials").forEach(attachProgress);
    setupReveal();
    var y = $("#current-year");
    if (y) y.textContent = new Date().getFullYear();
  });

  // Helpers reaproveitados por outras páginas do site (ex.: empresas.html)
  window.AlmeidasNetUI = { icon: icon, esc: esc, waLink: waLink, resolveLink: resolveLink, linkAttrs: linkAttrs, hydrateIcons: hydrateIcons };

  /* ==========================================================================
     Links vindos do config
     ========================================================================== */
  function injectConfigLinks() {
    function each(sel, fn) { $$(sel).forEach(fn); }
    each("[data-wa]", function (el) { el.href = waLink(el.getAttribute("data-wa-msg")); });
    each("[data-wa-text]", function (el) { el.textContent = CFG.whatsappExibicao; });
    each("[data-tel]", function (el) { el.href = CFG.telefoneLink; });
    each("[data-tel-text]", function (el) { el.textContent = CFG.telefone; });
    each("[data-central-assinante]", function (el) { el.href = CFG.centralAssinante; });
    each("[data-app-iphone]", function (el) { el.href = CFG.appIphone; });
    each("[data-app-android]", function (el) { el.href = CFG.appAndroid; });
    each("[data-teste-velocidade]", function (el) { el.href = CFG.testeDeVelocidade; });
    each("[data-segunda-via]", function (el) { el.href = CFG.segundaViaFatura; });
    each("[data-mapa]", function (el) { el.href = CFG.enderecoMapa; });
    each("[data-downdetector]", function (el) { el.href = CFG.downdetector || "https://downdetector.com.br/"; });
    each("[data-contrato]", function (el) { if (CFG.contratoServico) { el.href = CFG.contratoServico; el.hidden = false; } });
    each("[data-ig]", function (el) { el.href = CFG.redesSociais.instagram; });
    each("[data-fb]", function (el) { el.href = CFG.redesSociais.facebook; });
    each("[data-yt]", function (el) { el.href = CFG.redesSociais.youtube; });
  }

  /* ==========================================================================
     Faixa de benefícios
     ========================================================================== */
  function renderStrip() {
    var wrap = $("#strip-grid");
    if (!wrap || !CFG.beneficiosFaixa) return;
    wrap.innerHTML = CFG.beneficiosFaixa.map(function (b) {
      return '<div class="strip-item"><span class="strip-item__icon">' + icon(b.icone) + "</span><span>" + esc(b.texto) + "</span></div>";
    }).join("");
  }

  function renderBairros() {
    var wrap = $("#coverage-bairros");
    if (!wrap || !CFG.bairrosAtendidos) return;
    wrap.innerHTML = CFG.bairrosAtendidos.map(function (b) { return "<span>" + icon("pin") + esc(b) + "</span>"; }).join("");
  }

  /* ==========================================================================
     Hero / Carrossel
     ========================================================================== */
  function maxSpeed() {
    var max = 0;
    (CFG.planos || []).forEach(function (p) { var v = parseInt(p.velocidade, 10); if (v > max) max = v; });
    return max || "1000";
  }

  function swirlSVG(i) {
    var flip = i % 2 === 1 ? ' style="transform:scaleY(-1)"' : "";
    return (
      '<svg class="hero-slide__swirl" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true"' + flip + ">" +
      '<defs><linearGradient id="sg' + i + '" x1="0" y1="1" x2="1" y2="0">' +
      '<stop offset="0" stop-color="#5FFF00" stop-opacity="0"/><stop offset=".5" stop-color="#5FFF00" stop-opacity=".95"/><stop offset="1" stop-color="#19B506" stop-opacity="0"/></linearGradient>' +
      '<filter id="sb' + i + '" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter></defs>' +
      '<g filter="url(#sb' + i + ')"><path d="M-60 640C200 660 430 570 530 380S700 60 900 30" stroke="url(#sg' + i + ')" stroke-width="54"/>' +
      '<path d="M-60 720C250 720 480 610 590 430S770 130 900 100" stroke="url(#sg' + i + ')" stroke-width="26" opacity=".6"/></g>' +
      '<path d="M-60 640C200 660 430 570 530 380S700 60 900 30" stroke="url(#sg' + i + ')" stroke-width="4"/>' +
      "</svg>"
    );
  }

  function heroArtHTML(s) {
    var glyph = { wifi: "wifi", gamepad: "gamepad", headset: "headset", velocidade: "bolt" }[s.arte] || "wifi";
    var core;
    if (s.arte === "velocidade") {
      var num = s.numero === "auto" || !s.numero ? maxSpeed() : s.numero;
      core = '<div class="hero-art__number"><strong>' + esc(num) + "</strong><span>" + esc(s.unidade || "mega") + "</span></div>";
    } else {
      core = '<div class="hero-art__glyph">' + icon(glyph) + "</div>";
    }
    var chips = (s.chips || []).slice(0, 4).map(function (c, i) {
      return '<span class="chip-wrap chip-wrap--' + (i + 1) + '"><span class="chip">' + icon(c) + "</span></span>";
    }).join("");
    return (
      '<div class="hero-art hero-art--' + esc(s.arte || "wifi") + '">' +
      '<svg class="hero-art__orbit" viewBox="0 0 600 600" aria-hidden="true">' +
      '<circle class="o-dots" cx="300" cy="300" r="284" fill="none" stroke="#5FFF00" stroke-width="5" stroke-linecap="round" stroke-dasharray="0.1 20" opacity=".85"/>' +
      '<circle class="o-arc" cx="300" cy="300" r="256" fill="none" stroke="#5FFF00" stroke-width="3" stroke-linecap="round" stroke-dasharray="380 1230" opacity=".75"/></svg>' +
      '<div class="hero-art__panel">' + core + "</div>" +
      (s.foto ? '<img class="hero-art__photo" src="' + esc(s.foto) + '" alt="' + esc(s.alt || "") + '" />' : "") +
      chips + "</div>"
    );
  }

  function renderHero() {
    var track = $("#hero-track");
    if (!track) return;
    track.innerHTML = CFG.heroSlides.map(function (s, i) {
      var tag = i === 0 ? "h1" : "h2";
      var lines = (s.titulo || []).map(function (l) { return "<span>" + esc(l) + "</span>"; }).join("");
      var actions =
        "<a class=\"btn btn--lime btn--lg\" " + linkAttrs(s.botaoLink) + ">" + esc(s.botaoTexto) + icon("arrow") + "</a>" +
        (s.mostrarTelefone
          ? '<a class="hero-phone" data-wa data-wa-msg="' + esc(CFG.whatsappMensagemPadrao) + '" href="' + esc(waLink()) + '" target="_blank" rel="noopener">' + icon("whatsapp") + "<span>" + esc(CFG.whatsappExibicao) + "</span></a>"
          : "");
      return (
        '<div class="hero-slide' + (i === 0 ? " is-active" : "") + '" role="group" aria-roledescription="slide" aria-label="' + (i + 1) + " de " + CFG.heroSlides.length + '">' +
        '<div class="hero-slide__bg">' + swirlSVG(i) + "</div>" +
        '<div class="container hero-slide__inner">' +
        '<div class="hero-slide__copy">' +
        "<" + tag + ' class="hero-title"><span class="hero-title__accent">' + esc(s.tituloDestaque) + "</span>" + lines + "</" + tag + ">" +
        '<p class="hero-slide__text">' + esc(s.texto) + "</p>" +
        '<div class="hero-slide__actions">' + actions + "</div></div>" +
        heroArtHTML(s) +
        "</div></div>"
      );
    }).join("");
  }

  function setupCarousel() {
    var root = $(".hero");
    if (!root) return;
    var slides = $$(".hero-slide", root);
    var dotsWrap = $("#hero-dots");
    var prevBtn = $(".hero__arrow--prev", root);
    var nextBtn = $(".hero__arrow--next", root);
    var index = 0;

    root.style.setProperty("--slide-ms", SLIDE_MS + "ms");
    if (REDUCED) root.classList.add("no-autoplay");

    dotsWrap.innerHTML = slides.map(function (_, i) {
      return '<button type="button" class="hero__dot" aria-label="Ir para o slide ' + (i + 1) + '"><span class="hero__dot-fill"></span></button>';
    }).join("");
    var dots = $$(".hero__dot", dotsWrap);
    dots.forEach(function (d, i) { d.addEventListener("click", function () { goTo(i); }); });

    function render() {
      slides.forEach(function (el, i) { el.classList.toggle("is-active", i === index); el.setAttribute("aria-hidden", i === index ? "false" : "true"); });
      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === index);
        if (i === index) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
      });
    }
    function goTo(i) {
      var n = (i + slides.length) % slides.length;
      if (n === index) return;
      index = n;
      render();
    }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    // o preenchimento da bolinha ativa é o cronômetro do slide
    dotsWrap.addEventListener("animationend", function (e) {
      if (e.animationName === "dotFill") next();
    });

    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    // pausa ao passar o mouse / focar
    root.addEventListener("mouseenter", function () { root.classList.add("is-paused"); });
    root.addEventListener("mouseleave", function () { root.classList.remove("is-paused"); root.style.setProperty("--mx", 0); root.style.setProperty("--my", 0); });
    root.addEventListener("focusin", function () { root.classList.add("is-paused"); });
    root.addEventListener("focusout", function () { root.classList.remove("is-paused"); });

    // arrastar / deslizar no celular
    var sx = null, sy = null;
    root.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; root.classList.add("is-paused"); }, { passive: true });
    root.addEventListener("touchend", function (e) {
      root.classList.remove("is-paused");
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      var dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? next() : prev(); }
      sx = null;
    }, { passive: true });

    // paralaxe suave dos ícones flutuantes (só com mouse)
    if (!REDUCED) {
      var raf = 0;
      root.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return;
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0;
          var r = root.getBoundingClientRect();
          root.style.setProperty("--mx", (((e.clientX - r.left) / r.width) - 0.5) * 2);
          root.style.setProperty("--my", (((e.clientY - r.top) / r.height) - 0.5) * 2);
        });
      });
    }

    render();
  }

  /* ==========================================================================
     Planos
     ========================================================================== */
  /* ---------- Preço (sempre em centavos, para não errar conta) ---------- */
  function toCents(v) {
    var s = String(v == null ? "0" : v).replace(/[^\d,.\-]/g, "");
    if (s.indexOf(",") !== -1) s = s.replace(/\./g, "").replace(",", ".");
    var n = parseFloat(s);
    return isNaN(n) ? 0 : Math.round(n * 100);
  }
  function moneyParts(cents) {
    var s = (Math.abs(cents) / 100).toFixed(2).split(".");
    return s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + s[1];
  }
  function money(cents) { return "R$ " + moneyParts(cents); }

  function extrasFor(p) { return p.adicionais || CFG.adicionais || []; }
  function appNome(a, i) { return (a.nome && a.nome.trim()) || "App " + (i + 1); }

  /* Estado escolhido em cada card: apps grátis, apps premium e adicionais */
  var planState = [];

  /* ---------- HTML do card ---------- */
  function appIconRowHTML(apps) {
    var MAX = 5;
    var html = apps.slice(0, MAX).map(function (a, i) {
      return '<span class="app-icon" title="' + esc(appNome(a, i)) + '"><img src="' + esc(a.icone) + '" alt="' + esc(a.nome || "") + '" loading="lazy" width="36" height="36"></span>';
    }).join("");
    if (apps.length > MAX) html += '<span class="app-icon app-icon--more">+' + (apps.length - MAX) + "</span>";
    return '<div class="app-icon-row">' + html + "</div>";
  }

  function pickIconRowHTML(apps) {
    return '<div class="app-icon-row app-icon-row--pick">' + apps.map(function (a, i) {
      return '<button type="button" class="app-icon app-icon--pick" data-app="' + i + '" aria-pressed="false" title="' + esc(appNome(a, i)) + '" aria-label="Escolher ' + esc(appNome(a, i)) + '">' +
        '<img src="' + esc(a.icone) + '" alt="" loading="lazy" width="36" height="36"><span class="app-icon__check">' + icon("tick") + "</span></button>";
    }).join("") + "</div>";
  }

  function stepperHTML(target, label) {
    return (
      '<div class="stepper__control">' +
      '<button type="button" class="stepper__btn" data-target="' + target + '" data-step="-1" aria-label="Diminuir ' + esc(label) + '">' + icon("minus") + "</button>" +
      '<span class="stepper__value" data-qty="' + target + '" aria-live="polite">0</span>' +
      '<button type="button" class="stepper__btn" data-target="' + target + '" data-step="1" aria-label="Aumentar ' + esc(label) + '">' + icon("plus") + "</button></div>"
    );
  }

  function planRowHTML(key, opts) {
    return (
      '<div class="plan-row plan-row--' + key + '">' +
      '<div class="plan-row__head"><span class="plan-row__title">' + icon(opts.icone) + esc(opts.titulo) + "</span>" +
      '<button type="button" class="plan-row__more" data-row="' + key + '">Ver mais</button></div>' +
      (opts.legenda ? '<p class="plan-row__legend"' + (opts.legendaAttr || "") + ">" + esc(opts.legenda) + "</p>" : "") +
      opts.icones +
      (opts.stepper ? '<div class="stepper"><span class="stepper__label">' + esc(opts.stepper) + "</span>" + stepperHTML("premium", opts.stepper) + "</div>" : "") +
      "</div>"
    );
  }

  function extrasHTML(p, idx) {
    var list = extrasFor(p);
    if (!list.length) return "";
    var pid = "extras-" + idx;
    return (
      '<div class="plan-extras" data-extras>' +
      '<button type="button" class="plan-extras__toggle" aria-expanded="false" aria-controls="' + pid + '">' +
      '<span class="plan-extras__title"><span class="plan-extras__plus">' + icon("plus") + "</span>Adicionar no combo</span>" +
      '<span class="plan-extras__badge" data-extras-badge hidden></span></button>' +
      '<div class="plan-extras__panel" id="' + pid + '"><div class="plan-extras__inner"><div class="plan-extras__list">' +
      list.map(function (x) {
        var control = x.tipo === "quantidade"
          ? '<div class="stepper stepper--inline">' + stepperHTML("extra:" + x.id, x.nome) + "</div>"
          : '<button type="button" class="switch" role="switch" aria-checked="false" data-target="extra:' + esc(x.id) + '" aria-label="Adicionar ' + esc(x.nome) + '"><span></span></button>';
        return (
          '<div class="extra" data-extra="' + esc(x.id) + '"><div class="extra__info"><strong>' + esc(x.nome) + "</strong>" +
          (x.detalhe ? "<small>" + esc(x.detalhe) + "</small>" : "") + "</div>" + control + "</div>"
        );
      }).join("") +
      "</div></div></div></div>"
    );
  }

  function planoCardHTML(p, idx) {
    return (
      '<article class="plan-card' + (p.destaque ? " plan-card--destaque" : "") + '" data-idx="' + idx + '">' +
      (p.destaque ? '<span class="plan-card__tag">Mais escolhido</span>' : "") +
      '<div class="plan-card__header"><p class="plan-card__combo">' + esc(p.combo) + "</p>" +
      '<p class="plan-card__speed"><strong>' + esc(p.velocidade) + "</strong><span>" + esc(p.unidade) + "</span></p></div>" +
      '<div class="plan-card__body">' +
      planRowHTML("incluso", { icone: "check", titulo: "Incluso no combo", legenda: p.incluso.legenda, icones: appIconRowHTML(p.incluso.apps) }) +
      planRowHTML("gratis", { icone: "star", titulo: "Grátis • escolha " + p.gratis.qtdEscolha + " app(s)/mês", legenda: "0 de " + p.gratis.qtdEscolha + " escolhido(s)", legendaAttr: " data-free-count", icones: pickIconRowHTML(p.gratis.apps) }) +
      planRowHTML("premium", { icone: "bolt", titulo: "A partir de R$ " + p.premium.precoApartir + "/apps", icones: appIconRowHTML(p.premium.apps), stepper: "Apps premium" }) +
      "</div>" +
      extrasHTML(p, idx) +
      '<div class="plan-card__price">' +
      '<p class="plan-card__price-de">DE: <s data-de></s><br>Sem fidelidade*</p>' +
      '<p class="plan-card__price-label">Total no combo (com fidelidade)</p>' +
      '<div class="plan-card__price-row"><p class="plan-card__price-final" data-total></p>' +
      '<a class="btn btn--dark btn--sm" data-assinar target="_blank" rel="noopener" href="#">Assine já</a></div>' +
      '<p class="plan-card__adds" data-adds hidden></p></div></article>'
    );
  }

  /* ---------- Mensagem do pedido para o WhatsApp ---------- */
  function buildOrderMessage(p, st, extras, totalC, deC) {
    var L = [];
    L.push("Olá! Quero assinar a AlmeidasNet", "");
    L.push("*Plano:* " + p.combo + " — " + p.velocidade + " " + p.unidade);
    if (p.incluso && p.incluso.legenda) L.push("*Incluso no combo:* " + p.incluso.legenda);
    if (st.gratis.length) L.push("*Apps grátis:* " + st.gratis.map(function (i) { return appNome(p.gratis.apps[i], i); }).join(", "));
    if (st.premium > 0) {
      var unit = toCents(p.premium.precoApartir);
      L.push("*Apps premium:* " + st.premium + "x (a partir de " + money(unit) + " cada) = " + money(unit * st.premium));
    }
    var chosen = extras.filter(function (x) { return (st.extras[x.id] || 0) > 0; });
    if (chosen.length) {
      L.push("*Adicionais:*");
      chosen.forEach(function (x) {
        var q = st.extras[x.id];
        L.push("- " + x.nome + (q > 1 ? " (" + q + "x)" : "") + " — " + money(toCents(x.preco) * q));
      });
    }
    L.push("", "*Total com fidelidade:* " + money(totalC) + "/mês", "*Sem fidelidade:* " + money(deC) + "/mês");
    return L.join("\n");
  }

  /* ---------- Recalcula o card (preço, botões e link do WhatsApp) ---------- */
  function updatePlan(idx) {
    var card = $('.plan-card[data-idx="' + idx + '"]');
    if (!card) return;
    var p = CFG.planos[idx], st = planState[idx], extras = extrasFor(p);

    var extrasC = 0;
    extras.forEach(function (x) { extrasC += toCents(x.preco) * (st.extras[x.id] || 0); });
    var premiumC = st.premium * toCents(p.premium.precoApartir);
    var addC = extrasC + premiumC;
    var totalC = toCents(p.precoFinal) + addC;
    var deC = toCents(p.precoDe) + addC;

    var totalEl = $("[data-total]", card);
    var novo = "<small>R$</small>" + moneyParts(totalC);
    if (totalEl.innerHTML !== novo) {
      totalEl.innerHTML = novo;
      totalEl.classList.remove("is-bump"); void totalEl.offsetWidth; totalEl.classList.add("is-bump");
    }
    $("[data-de]", card).textContent = money(deC);
    var adds = $("[data-adds]", card);
    adds.hidden = addC === 0;
    if (addC > 0) adds.textContent = "Inclui " + money(addC) + " em adicionais";

    // apps grátis
    $$(".app-icon--pick", card).forEach(function (b) {
      var on = st.gratis.indexOf(parseInt(b.getAttribute("data-app"), 10)) !== -1;
      b.classList.toggle("is-selected", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    $("[data-free-count]", card).textContent = st.gratis.length + " de " + p.gratis.qtdEscolha + " escolhido(s)";

    // apps premium + adicionais
    var ativos = 0;
    var pv = $('[data-qty="premium"]', card);
    if (pv) pv.textContent = st.premium;
    extras.forEach(function (x) {
      var q = st.extras[x.id] || 0;
      var row = $('.extra[data-extra="' + x.id + '"]', card);
      if (!row) return;
      if (q > 0) ativos++;
      row.classList.toggle("is-on", q > 0);
      var sw = $(".switch", row);
      if (sw) sw.setAttribute("aria-checked", q > 0 ? "true" : "false");
      var qv = $(".stepper__value", row);
      if (qv) qv.textContent = q;
    });

    var badge = $("[data-extras-badge]", card);
    if (badge) {
      badge.hidden = ativos === 0;
      badge.textContent = ativos;
      badge.setAttribute("aria-label", ativos + (ativos === 1 ? " selecionado" : " selecionados"));
      badge.title = ativos + (ativos === 1 ? " selecionado" : " selecionados");
    }

    $("[data-assinar]", card).href = waLink(buildOrderMessage(p, st, extras, totalC, deC));
  }

  function renderPlanos() {
    var wrap = $("#planos-grid");
    if (!wrap) return;
    planState = CFG.planos.map(function () { return { gratis: [], premium: 0, extras: {} }; });
    wrap.innerHTML = CFG.planos.map(planoCardHTML).join("");
    CFG.planos.forEach(function (_, i) { updatePlan(i); });
  }

  function setupPlanInteractions() {
    var grid = $("#planos-grid");
    if (!grid) return;
    grid.addEventListener("click", function (e) {
      var card = e.target.closest(".plan-card");
      if (!card) return;
      var idx = parseInt(card.getAttribute("data-idx"), 10);
      var p = CFG.planos[idx], st = planState[idx];

      var tg = e.target.closest(".plan-extras__toggle");
      if (tg) {
        var box = tg.closest(".plan-extras");
        var open = !box.classList.contains("is-open");
        box.classList.toggle("is-open", open);
        tg.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }

      var more = e.target.closest(".plan-row__more");
      if (more) { openAppsModal(p, more.getAttribute("data-row")); return; }

      var pick = e.target.closest(".app-icon--pick");
      if (pick) {
        var i = parseInt(pick.getAttribute("data-app"), 10);
        var pos = st.gratis.indexOf(i);
        if (pos !== -1) st.gratis.splice(pos, 1);
        else {
          st.gratis.push(i);
          // passou do limite: sai o mais antigo, para a troca ser direta
          while (st.gratis.length > p.gratis.qtdEscolha) st.gratis.shift();
        }
        updatePlan(idx);
        return;
      }

      var sw = e.target.closest(".switch");
      if (sw) {
        var id = sw.getAttribute("data-target").slice(6);
        st.extras[id] = st.extras[id] ? 0 : 1;
        updatePlan(idx);
        return;
      }

      var step = e.target.closest(".stepper__btn");
      if (step) {
        var target = step.getAttribute("data-target");
        var d = parseInt(step.getAttribute("data-step"), 10);
        if (target === "premium") {
          st.premium = Math.min(Math.max(st.premium + d, 0), p.premium.apps.length);
        } else {
          var xid = target.slice(6);
          var def = extrasFor(p).filter(function (x) { return x.id === xid; })[0];
          var max = (def && def.max) || 5;
          st.extras[xid] = Math.min(Math.max((st.extras[xid] || 0) + d, 0), max);
        }
        updatePlan(idx);
      }
    });
  }

  /* ---------- Modal de apps ("Ver mais") ---------- */
  var lastFocus = null;
  function openModal(modal, focusEl) {
    lastFocus = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    if (focusEl) setTimeout(function () { focusEl.focus(); }, 60);
  }
  function closeModal(modal) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (!$(".modal.is-open")) document.body.classList.remove("no-scroll");
    if (lastFocus && lastFocus.focus) { lastFocus.focus(); lastFocus = null; }
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { var m = $(".modal.is-open"); if (m) closeModal(m); }
  });

  function openAppsModal(plano, key) {
    var modal = $("#apps-modal");
    var row = plano[key];
    var title = key === "incluso" ? "Incluso no " + plano.combo
      : key === "gratis" ? "Grátis: escolha " + row.qtdEscolha + " app(s) por mês"
      : "Apps premium (a partir de R$ " + row.precoApartir + "/apps)";
    var sub = key === "incluso" && row.legenda ? row.legenda : plano.combo + " • " + plano.velocidade + " " + plano.unidade;
    modal.innerHTML =
      '<div class="modal__card apps__card" role="dialog" aria-modal="true" aria-label="' + esc(title) + '">' +
      '<button type="button" class="modal__close" aria-label="Fechar">' + icon("x") + "</button>" +
      "<h3>" + esc(title) + "</h3><p>" + esc(sub) + "</p>" +
      '<div class="apps__grid">' + row.apps.map(function (a) {
        return '<div class="apps__item"><img src="' + esc(a.icone) + '" alt="" width="56" height="56">' + (a.nome ? "<span>" + esc(a.nome) + "</span>" : "") + "</div>";
      }).join("") + "</div></div>";
    var closeBtn = $(".modal__close", modal);
    closeBtn.addEventListener("click", function () { closeModal(modal); });
    modal.onclick = function (e) { if (e.target === modal) closeModal(modal); };
    openModal(modal, closeBtn);
  }

  /* ==========================================================================
     Gamer / Wi-Fi 6 / Depoimentos (textos vêm do config)
     ========================================================================== */
  function renderGamer() {
    var g = CFG.gamer, sec = $("#gamer");
    if (!sec || !g || !g.ativo) return;
    sec.hidden = false;
    $("#gamer-titulo").textContent = g.titulo;
    $("#gamer-texto").textContent = g.texto;
    $("#gamer-botao").textContent = g.botao;
    $("#gamer-stats").innerHTML = (g.numeros || []).map(function (n) {
      return '<div class="gamer-stat"><strong>' + esc(n.valor) + "</strong><span>" + esc(n.legenda) + "</span></div>";
    }).join("");
  }

  function renderWifi() {
    var w = CFG.wifi6, sec = $("#wifi6");
    if (!sec || !w || !w.ativo) return;
    sec.hidden = false;
    $("#wifi-titulo").textContent = w.titulo;
    $("#wifi-texto").textContent = w.texto;
    $("#wifi-botao").textContent = w.botao;
    $("#wifi-itens").innerHTML = (w.itens || []).map(function (t) { return "<li>" + icon("tick") + "<span>" + esc(t) + "</span></li>"; }).join("");
  }

  function renderDepoimentos() {
    var wrap = $("#depoimentos-grid");
    if (!wrap) return;
    wrap.innerHTML = (CFG.depoimentos || []).map(function (d) {
      var ini = d.nome.split(" ").map(function (p) { return p.charAt(0); }).slice(0, 2).join("").toUpperCase();
      return (
        '<figure class="testimonial" style="margin:0"><div class="testimonial__avatar">' + esc(ini) + "</div>" +
        '<div class="testimonial__stars" aria-label="5 estrelas">★★★★★</div>' +
        "<p>" + esc(d.texto) + "</p>" +
        '<figcaption class="testimonial__who"><strong>' + esc(d.nome) + "</strong><span>" + esc(d.perfil) + "</span></figcaption></figure>"
      );
    }).join("");
  }

  /* ==========================================================================
     Entretenimento (faixa arrastável)
     ========================================================================== */
  function entCardHTML(c, clone) {
    var media = c.imagem ? '<img src="' + esc(c.imagem) + '" alt="" draggable="false" loading="lazy">' : icon(c.icone);
    return (
      '<article class="ent-card"' + (clone ? ' data-clone aria-hidden="true"' : "") + '><div class="ent-card__media">' + media + "</div>" +
      "<h3>" + esc(c.titulo) + "</h3><p>" + esc(c.texto) + "</p>" +
      "<a class=\"btn btn--sm\" " + linkAttrs(c.link) + ' draggable="false"' + (clone ? ' tabindex="-1"' : "") + ">Ver mais</a></article>"
    );
  }

  function renderEntretenimento() {
    var e = CFG.entretenimento, sc = $("#entret-scroller");
    if (!sc || !e) return;
    $("#entret-titulo").textContent = e.titulo;
    $("#entret-texto").textContent = e.texto;
    // repete a lista para o movimento poder girar sem fim
    var sets = e.cards.length > 1 ? Math.max(3, Math.ceil((window.innerWidth * 1.3) / (e.cards.length * 294)) + 2) : 1;
    var html = e.cards.map(function (c) { return entCardHTML(c, false); }).join("");
    for (var s = 1; s < sets; s++) html += e.cards.map(function (c) { return entCardHTML(c, true); }).join("");
    sc.innerHTML = html;
  }

  function setupScroller() {
    var sc = $("#entret-scroller");
    if (!sc) return;
    var n = CFG.entretenimento.cards.length;
    var cards = $$(".ent-card", sc);
    var loop = cards.length > n;
    var SPEED = (CFG.entretenimento.velocidade || 45); // pixels por segundo

    function setW() { return loop ? cards[n].offsetLeft - cards[0].offsetLeft : 0; }
    function pitch() { return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 300; }
    var W = setW();
    function wrap(v) {
      if (!loop || !W) return v;
      while (v >= 2 * W) v -= W;
      while (v < W) v += W;
      return v;
    }
    if (loop) sc.scrollLeft = W;

    /* ----- movimento automático ----- */
    var hover = false, dragging = false, visible = true, holdUntil = 0;
    var pos = sc.scrollLeft, lastSet = sc.scrollLeft, last = 0;
    var canAuto = loop && !REDUCED;

    function tick(t) {
      requestAnimationFrame(tick);
      var dt = last ? Math.min((t - last) / 1000, 0.1) : 0;
      last = t;
      if (!canAuto || hover || dragging || !visible || document.hidden || t < holdUntil) {
        pos = sc.scrollLeft; lastSet = pos;
        return;
      }
      if (Math.abs(sc.scrollLeft - lastSet) > 2) pos = sc.scrollLeft; // alguém mexeu na mão
      W = setW() || W;
      pos = wrap(pos + SPEED * dt);
      sc.scrollLeft = pos;
      lastSet = sc.scrollLeft;
    }
    if (canAuto) requestAnimationFrame(tick);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: 0.05 }).observe(sc);
    }
    function hold(ms) { holdUntil = performance.now() + ms; }
    sc.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") hover = true; });
    sc.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") hover = false; });
    sc.addEventListener("focusin", function () { hover = true; });
    sc.addEventListener("focusout", function () { hover = false; });
    sc.addEventListener("touchstart", function () { holdUntil = Infinity; }, { passive: true });
    sc.addEventListener("touchend", function () { hold(2500); }, { passive: true });
    sc.addEventListener("wheel", function () { hold(1500); }, { passive: true });

    // ao parar de rolar (mão/toque), volta o scroll para a faixa do meio
    var settle = 0;
    sc.addEventListener("scroll", function () {
      if (!loop) return;
      clearTimeout(settle);
      settle = setTimeout(function () {
        var v = wrap(sc.scrollLeft);
        if (Math.abs(v - sc.scrollLeft) > 1) { sc.scrollLeft = v; pos = v; lastSet = sc.scrollLeft; }
      }, 160);
    }, { passive: true });

    /* ----- arrastar com o mouse ----- */
    var down = false, startX = 0, startL = 0;
    sc.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") return;
      down = true; startX = e.clientX; startL = sc.scrollLeft;
    });
    window.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 4) { sc.classList.add("is-dragging"); dragging = true; }
      var target = startL - dx;
      if (loop && W) {
        while (target >= 2 * W) { target -= W; startL -= W; }
        while (target < W) { target += W; startL += W; }
      }
      sc.scrollLeft = target;
    });
    window.addEventListener("pointerup", function () {
      if (!down) return;
      down = false; dragging = false;
      hold(1200);
      setTimeout(function () { sc.classList.remove("is-dragging"); }, 0);
    });

    /* ----- setas e teclado ----- */
    function step(dir) {
      hold(1600);
      sc.scrollBy({ left: dir * pitch(), behavior: "smooth" });
    }
    var prev = $("#entret-prev"), next = $("#entret-next");
    if (prev) prev.addEventListener("click", function () { step(-1); });
    if (next) next.addEventListener("click", function () { step(1); });
    sc.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { step(1); e.preventDefault(); }
      if (e.key === "ArrowLeft") { step(-1); e.preventDefault(); }
    });
    window.addEventListener("resize", function () { W = setW() || W; });
  }

  /* ==========================================================================
     Menu rápido flutuante
     ========================================================================== */
  function renderFloatingMenu() {
    var panel = $("#floating-menu-panel");
    if (!panel) return;
    panel.innerHTML =
      '<div class="floating-menu__title">Menu</div>' +
      CFG.menuRapido.map(function (item, i) {
        return "<a role=\"menuitem\" style=\"--i:" + i + "\" " + linkAttrs(item.link) + ">" + icon(item.icone || "arrow") + "<span>" + esc(item.texto) + "</span></a>";
      }).join("");
  }

  function setupFloatingMenu() {
    var btn = $("#floating-menu-btn"), panel = $("#floating-menu-panel");
    if (!btn || !panel) return;
    var hint = $("#menu-hint"), hintTimer = 0;
    function hideHint() { if (hint) hint.classList.remove("is-show"); }
    function close() { panel.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); }
    function open() { panel.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); hideHint(); }
    // selo "Menu" aparece de tempos em tempos para chamar atenção
    if (hint && !REDUCED) {
      var pulse = function () {
        if (panel.classList.contains("is-open")) return;
        hint.classList.add("is-show");
        clearTimeout(hintTimer);
        hintTimer = setTimeout(hideHint, 3200);
      };
      setTimeout(function () { pulse(); setInterval(pulse, 11000); }, 3800);
    }
    btn.addEventListener("click", function (e) { e.stopPropagation(); panel.classList.contains("is-open") ? close() : open(); });
    panel.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
    document.addEventListener("click", function (e) { if (!panel.contains(e.target) && !btn.contains(e.target)) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ==========================================================================
     Popup "Indique e ganhe"
     ========================================================================== */
  function renderPromoPopup() {
    var cfg = CFG.popupIndiqueGanhe, root = $("#promo-popup");
    if (!root || !cfg || !cfg.slides || !cfg.slides.length) return;

    var slidesHTML = cfg.slides.map(function (s, i) {
      var inner = s.imagem
        ? '<a ' + linkAttrs(s.link) + '><img src="' + esc(s.imagem) + '" alt="' + esc(s.titulo || "Promoção AlmeidasNet") + '"></a>'
        : '<a class="promo-art' + ((s.titulo || "").length > 18 ? " promo-art--long" : "") + '" ' + linkAttrs(s.link) + ">" +
          '<span class="promo-art__icon">' + icon(s.icone || "users") + "</span>" +
          "<h3>" + esc(s.titulo) + "</h3><p>" + esc(s.texto) + "</p>" +
          '<span class="btn btn--lime btn--sm">' + esc(s.botao || "Saiba mais") + icon("arrow") + "</span></a>";
      return '<div class="promo__slide' + (i === 0 ? " is-active" : "") + '">' + inner + "</div>";
    }).join("");

    var multi = cfg.slides.length > 1;
    root.innerHTML =
      '<div class="modal__card promo__card" role="dialog" aria-modal="true" aria-label="Indique e ganhe">' +
      '<button type="button" class="modal__close" aria-label="Fechar">' + icon("x") + "</button>" +
      '<div class="promo__track">' + slidesHTML + "</div>" +
      (multi
        ? '<div class="promo__controls"><button type="button" class="promo__arrow" data-dir="-1" aria-label="Anterior">' + icon("chevron-left") + "</button>" +
          '<div class="promo__dots">' + cfg.slides.map(function (_, i) { return '<span class="promo__dot' + (i === 0 ? " is-active" : "") + '"></span>'; }).join("") + "</div>" +
          '<button type="button" class="promo__arrow" data-dir="1" aria-label="Próximo">' + icon("chevron-right") + "</button></div>"
        : "") +
      "</div>";

    var slides = $$(".promo__slide", root), dots = $$(".promo__dot", root), idx = 0, timer = null;
    function render() {
      slides.forEach(function (el, i) { el.classList.toggle("is-active", i === idx); });
      dots.forEach(function (el, i) { el.classList.toggle("is-active", i === idx); });
    }
    function goTo(i) { idx = (i + slides.length) % slides.length; render(); }
    function restart() {
      if (timer) clearInterval(timer);
      if (multi && !REDUCED) timer = setInterval(function () { goTo(idx + 1); }, 5000);
    }
    $$(".promo__arrow", root).forEach(function (b) {
      b.addEventListener("click", function () { goTo(idx + parseInt(b.getAttribute("data-dir"), 10)); restart(); });
    });

    var closeBtn = $(".modal__close", root);
    function dismiss() {
      closeModal(root);
      if (timer) clearInterval(timer);
      try { sessionStorage.setItem("almeidasnet_popup_visto", "1"); } catch (err) {}
    }
    function show() { openModal(root, closeBtn); restart(); }
    closeBtn.addEventListener("click", dismiss);
    root.addEventListener("click", function (e) { if (e.target === root) dismiss(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && root.classList.contains("is-open")) dismiss(); });

    // botões "Indique e ganhe" abrem o popup quando quiser
    $$("[data-open-popup]").forEach(function (b) {
      b.addEventListener("click", function (ev) {
        ev.preventDefault();
        var panel = $("#nav-panel"); if (panel && panel.classList.contains("is-open")) { $("#nav-toggle").click(); }
        goTo(0); show();
      });
    });

    // abertura automática (uma vez por visita) — disparada pelo popup de
    // entrada (residencial/evento) assim que ele for fechado; ver promoAutoShow
    promoAutoShow = function () {
      var seen = false;
      try { seen = !!sessionStorage.getItem("almeidasnet_popup_visto"); } catch (err) {}
      if (cfg.ativo && !seen) {
        setTimeout(function () { if (!$(".modal.is-open")) show(); }, cfg.atrasoMs || 4000);
      }
    };
  }

  /* ==========================================================================
     Popup de entrada — "para sua casa ou para um evento?"
     Aparece antes do popup de indique e ganhe (uma vez por visita). Ao
     escolher, ou ao fechar, libera o popup de indique e ganhe (se houver).
     ========================================================================== */
  function renderAudiencePopup() {
    var cfg = CFG.popupPublico, root = $("#audience-popup");
    if (!root || !cfg || !cfg.opcoes || !cfg.opcoes.length) { promoAutoShow(); return; }

    root.innerHTML =
      '<div class="modal__card gate__card" role="dialog" aria-modal="true" aria-label="' + esc(cfg.titulo) + '">' +
      '<button type="button" class="modal__close" aria-label="Fechar">' + icon("x") + "</button>" +
      '<div class="gate__head"><h3>' + esc(cfg.titulo) + "</h3><p>" + esc(cfg.texto) + "</p></div>" +
      '<div class="gate__options">' +
      cfg.opcoes.map(function (o) {
        return (
          '<a class="gate-option" ' + linkAttrs(o.link) + '><span class="gate-option__icon">' + icon(o.icone) + "</span>" +
          '<span class="gate-option__text"><strong>' + esc(o.texto) + '</strong><span class="gate-option__sub">' + esc(o.subtexto) + "</span></span>" +
          '<span class="gate-option__go">' + icon("arrow") + "</span></a>"
        );
      }).join("") +
      "</div></div>";

    var closeBtn = $(".modal__close", root);
    function dismiss() {
      closeModal(root);
      try { sessionStorage.setItem("almeidasnet_publico_escolhido", "1"); } catch (err) {}
      promoAutoShow();
    }
    closeBtn.addEventListener("click", dismiss);
    root.addEventListener("click", function (e) { if (e.target === root) dismiss(); });

    // se a opção aponta pra página atual, só fecha o popup (evita recarregar à toa)
    var here = (location.pathname.split("/").pop() || "index.html");
    $$(".gate-option", root).forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === here) {
        a.addEventListener("click", function (e) { e.preventDefault(); dismiss(); });
      } else {
        a.addEventListener("click", function () {
          try { sessionStorage.setItem("almeidasnet_publico_escolhido", "1"); } catch (err) {}
        });
      }
    });

    var seen = false;
    try { seen = !!sessionStorage.getItem("almeidasnet_publico_escolhido"); } catch (err) {}
    if (cfg.ativo && !seen) {
      setTimeout(function () { if (!$(".modal.is-open")) openModal(root, closeBtn); }, cfg.atrasoMs || 1200);
    } else {
      promoAutoShow();
    }
  }

  /* ==========================================================================
     Navbar (sticky + drawer mobile + seção atual)
     ========================================================================== */
  function setupNav() {
    var nav = $("#site-nav"), toggle = $("#nav-toggle"), panel = $("#nav-panel"), overlay = $("#nav-overlay");
    if (!nav) return;

    function onScroll() { nav.classList.toggle("site-nav--scrolled", nav.getBoundingClientRect().top <= 0 && window.scrollY > 40); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function setOpen(open) {
      if (open) document.documentElement.style.setProperty("--drawer-top", Math.max(nav.getBoundingClientRect().bottom, 0) + "px");
      panel.classList.toggle("is-open", open);
      overlay.classList.toggle("is-open", open);
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      document.body.classList.toggle("no-scroll", open);
    }
    toggle.addEventListener("click", function () { setOpen(!panel.classList.contains("is-open")); });
    overlay.addEventListener("click", function () { setOpen(false); });
    $$("a", panel).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1320) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && panel.classList.contains("is-open")) setOpen(false); });

    // destaca o item do menu da seção que está na tela
    var map = {};
    $$(".site-nav__links a[href^='#']").forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          Object.keys(map).forEach(function (k) { map[k].classList.toggle("is-current", k === en.target.id); });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }
  }

  /* ==========================================================================
     Demais interações
     ========================================================================== */
  function setupAccordion() {
    var items = $$(".accordion-item");
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

  function setupCoverageForm() {
    var form = $("#coverage-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (id) { return $(id, form).value.trim(); };
      var msg =
        "Olá! Quero consultar cobertura da AlmeidasNet\n" +
        "Nome: " + v("#cf-nome") + "\n" +
        "Rua/Av: " + v("#cf-rua") + "\n" +
        "Bairro: " + v("#cf-bairro") + "\n" +
        "Meu WhatsApp: " + v("#cf-whatsapp");
      window.open(waLink(msg), "_blank", "noopener");
    });
  }

  function setupBackToTop() {
    var btn = $(".back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", function () { btn.classList.toggle("is-visible", window.scrollY > 700); }, { passive: true });
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* Linha de progresso embaixo dos carrosséis de deslizar (celular) */
  function attachProgress(sc) {
    var bar = document.createElement("div");
    bar.className = "snap-progress";
    bar.setAttribute("aria-hidden", "true");
    bar.innerHTML = "<span></span>";
    sc.insertAdjacentElement("afterend", bar);
    var thumb = $("span", bar);
    function update() {
      var max = sc.scrollWidth - sc.clientWidth;
      if (max <= 2) { bar.style.visibility = "hidden"; return; }
      bar.style.visibility = "";
      var w = Math.max((sc.clientWidth / sc.scrollWidth) * 100, 22);
      thumb.style.width = w + "%";
      thumb.style.transform = "translateX(" + (sc.scrollLeft / max) * ((100 - w) / w) * 100 + "%)";
    }
    sc.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    setTimeout(update, 600);
  }

  function setupReveal() {
    // grupos de cards entram um depois do outro
    $$(".atender__grid, .plans-grid, .testimonials, .strip__grid, .cta-cards, .accordion, .footer-grid").forEach(function (g) {
      g.removeAttribute("data-reveal");
      g.classList.add("stagger");
      Array.prototype.forEach.call(g.children, function (ch, i) { ch.style.setProperty("--i", i); });
    });
    var targets = $$("[data-reveal], .stagger");
    if (!("IntersectionObserver" in window) || !targets.length) {
      targets.forEach(function (t) { t.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (t) { io.observe(t); });
  }
})();
