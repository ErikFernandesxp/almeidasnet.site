(function () {
  "use strict";

  var CFG = window.ALMEIDASNET_CONFIG;

  function waLink(mensagem) {
    var msg = encodeURIComponent(mensagem || CFG.whatsappMensagemPadrao);
    return CFG.whatsapp + "?text=" + msg;
  }

  // Resolve os links usados em config (menu rápido, botões do carrossel, popup):
  // "#algo" -> âncora da própria página
  // "whatsapp:mensagem" -> abre o WhatsApp com essa mensagem
  // qualquer outra coisa -> tratado como URL externa
  function resolveLink(link) {
    if (!link) return { href: "#", external: false };
    if (link.indexOf("whatsapp:") === 0) {
      return { href: waLink(link.slice("whatsapp:".length)), external: true };
    }
    if (link.indexOf("#") === 0) {
      return { href: link, external: false };
    }
    return { href: link, external: true };
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectConfigLinks();
    renderHero();
    renderPlanos();
    renderFloatingMenu();
    renderPromoPopup();
    setupHeader();
    setupMobileMenu();
    setupCarousel();
    setupAccordion();
    setupPlanCardInteractions();
    setupFloatingMenu();
    setupBackToTop();
    setupYear();
    setupRevealOnce();
  });

  /* ---------- Links vindos da configuração ---------- */
  function injectConfigLinks() {
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      el.href = waLink(el.getAttribute("data-wa-msg"));
    });
    document.querySelectorAll("[data-tel]").forEach(function (el) {
      el.href = CFG.telefoneLink;
    });
    document.querySelectorAll("[data-tel-text]").forEach(function (el) {
      el.textContent = CFG.telefone;
    });
    document.querySelectorAll("[data-central-assinante]").forEach(function (el) {
      el.href = CFG.centralAssinante;
    });
    document.querySelectorAll("[data-app-iphone]").forEach(function (el) {
      el.href = CFG.appIphone;
    });
    document.querySelectorAll("[data-app-android]").forEach(function (el) {
      el.href = CFG.appAndroid;
    });
    document.querySelectorAll("[data-teste-velocidade]").forEach(function (el) {
      el.href = CFG.testeDeVelocidade;
    });
    document.querySelectorAll("[data-segunda-via]").forEach(function (el) {
      el.href = CFG.segundaViaFatura;
    });
    document.querySelectorAll("[data-ig]").forEach(function (el) {
      el.href = CFG.redesSociais.instagram;
    });
    document.querySelectorAll("[data-fb]").forEach(function (el) {
      el.href = CFG.redesSociais.facebook;
    });
    document.querySelectorAll("[data-yt]").forEach(function (el) {
      el.href = CFG.redesSociais.youtube;
    });
  }

  /* ---------- Hero / Carrossel (fotos editáveis via config) ---------- */
  function renderHero() {
    var track = document.getElementById("hero-track");
    if (!track) return;

    track.innerHTML = CFG.heroSlides
      .map(function (slide, i) {
        var link = resolveLink(slide.botaoLink);
        return (
          '<div class="hero-slide' + (i === 0 ? " is-active" : "") + '" style="background-image:linear-gradient(90deg, rgba(7,20,39,.88), rgba(7,20,39,.35) 60%, rgba(7,20,39,.15)), url(\'' + slide.imagem + "')\" role=\"img\" aria-label=\"" + slide.alt + '">' +
          '<div class="container">' +
          '<div class="hero-slide__content">' +
          '<span class="hero-slide__kicker">' + slide.kicker + "</span>" +
          "<h1>" + slide.titulo + "</h1>" +
          "<p>" + slide.texto + "</p>" +
          '<a class="btn btn--primary" href="' + link.href + '"' + (link.external ? ' target="_blank" rel="noopener"' : "") + ">" + slide.botaoTexto + "</a>" +
          "</div></div></div>"
        );
      })
      .join("");
  }

  /* ---------- Planos (plan-row / app-icon / stepper, a partir do config.js) ---------- */
  function renderPlanos() {
    var wrap = document.getElementById("planos-grid");
    if (!wrap) return;

    wrap.innerHTML = CFG.planos.map(planoCardHTML).join("");
  }

  function appIconRowHTML(apps) {
    return (
      '<div class="app-icon-row">' +
      apps
        .map(function (a) {
          var temNome = a.nome && a.nome.trim().length > 0;
          return (
            '<span class="app-icon">' +
            '<img src="' + a.icone + '" alt="' + (temNome ? a.nome : "ícone do app") + '" loading="lazy">' +
            '<span class="app-icon__label' + (temNome ? "" : " app-icon__label--empty") + '">' +
            (temNome ? a.nome : "editar") +
            "</span></span>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function planRowHTML(opts) {
    // opts: { titulo, subtitulo, apps, stepper }
    return (
      '<div class="plan-row">' +
      '<div class="plan-row__head">' +
      "<span>" + opts.titulo + "</span>" +
      '<button type="button" class="plan-row__toggle">Ver mais</button>' +
      "</div>" +
      (opts.subtitulo
        ? '<p class="plan-row__subtitle">' + opts.subtitulo + "</p>"
        : '<p class="plan-row__subtitle plan-row__subtitle--empty">Edite a legenda deste item no config.js</p>') +
      appIconRowHTML(opts.apps) +
      (opts.stepper
        ? '<div class="stepper">' +
          '<span class="stepper__label">Apps premium</span>' +
          '<div class="stepper__control">' +
          '<button type="button" class="stepper__btn" data-step="-1" aria-label="Diminuir">‹</button>' +
          '<span class="stepper__value">0</span>' +
          '<button type="button" class="stepper__btn" data-step="1" aria-label="Aumentar">›</button>' +
          "</div></div>"
        : "") +
      "</div>"
    );
  }

  function planoCardHTML(p) {
    return (
      '<article class="plan-card' + (p.destaque ? " plan-card--destaque" : "") + '">' +
      (p.destaque ? '<span class="plan-card__tag">Mais escolhido</span>' : "") +

      '<div class="plan-card__header">' +
      '<p class="plan-card__combo">' + p.combo + "</p>" +
      '<p class="plan-card__speed"><span class="plan-card__speed-num">' + p.velocidade + "</span>" + p.unidade + "</p>" +
      "</div>" +

      '<div class="plan-card__body">' +

      planRowHTML({
        titulo: "Incluso no combo",
        subtitulo: p.incluso.legenda,
        apps: p.incluso.apps,
      }) +

      planRowHTML({
        titulo: "Grátis • escolha " + p.gratis.qtdEscolha + " app(s)/mês",
        apps: p.gratis.apps,
      }) +

      planRowHTML({
        titulo: "A partir de R$ " + p.premium.precoApartir + "/apps",
        apps: p.premium.apps,
        stepper: true,
      }) +

      "</div>" +

      '<button type="button" class="plan-card__combo-toggle">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>' +
      "<span>Adicionar no combo</span>" +
      "</button>" +

      '<div class="plan-card__price">' +
      '<p class="plan-card__price-de">DE: <s>R$ ' + p.precoDe + "</s><br><span>Sem Fidelidade*</span></p>" +
      '<p class="plan-card__price-total-label">Total no combo (com fidelidade)</p>' +
      '<div class="plan-card__price-row">' +
      '<p class="plan-card__price-final"><span>R$</span> ' + p.precoFinal + "</p>" +
      '<a class="btn btn--dark btn--sm" target="_blank" rel="noopener" href="' +
      waLink("Olá! Tenho interesse no " + p.combo + " (" + p.velocidade + " " + p.unidade + ") da AlmeidasNet.") +
      '">Assine já</a>' +
      "</div></div>" +

      "</article>"
    );
  }

  function setupPlanCardInteractions() {
    var grid = document.getElementById("planos-grid");
    if (!grid) return;

    grid.addEventListener("click", function (e) {
      // "Ver mais" expande/recolhe a legenda e os ícones daquela linha
      var toggle = e.target.closest(".plan-row__toggle");
      if (toggle) {
        var row = toggle.closest(".plan-row");
        row.classList.toggle("is-expanded");
        toggle.textContent = row.classList.contains("is-expanded") ? "Ver menos" : "Ver mais";
        return;
      }

      // "+ Adicionar no combo" alterna um estado visual de selecionado
      var addBtn = e.target.closest(".plan-card__combo-toggle");
      if (addBtn) {
        addBtn.classList.toggle("is-added");
        var label = addBtn.querySelector("span");
        label.textContent = addBtn.classList.contains("is-added") ? "Adicionado ao combo" : "Adicionar no combo";
        return;
      }

      // Seletor de apps premium (‹ 0 ›)
      var stepBtn = e.target.closest(".stepper__btn");
      if (stepBtn) {
        var stepper = stepBtn.closest(".stepper");
        var valueEl = stepper.querySelector(".stepper__value");
        var max = stepper.closest(".plan-row").querySelectorAll(".app-icon").length;
        var current = parseInt(valueEl.textContent, 10) || 0;
        var delta = parseInt(stepBtn.getAttribute("data-step"), 10);
        current = Math.min(Math.max(current + delta, 0), max);
        valueEl.textContent = current;
      }
    });
  }

  /* ---------- Menu rápido flutuante ---------- */
  function renderFloatingMenu() {
    var panel = document.getElementById("floating-menu-panel");
    if (!panel) return;

    panel.innerHTML =
      '<div class="floating-menu__title">Menu</div>' +
      '<div class="floating-menu__list">' +
      CFG.menuRapido
        .map(function (item) {
          var link = resolveLink(item.link);
          return (
            '<a href="' + link.href + '"' + (link.external ? ' target="_blank" rel="noopener"' : "") + ">" +
            item.texto +
            "</a>"
          );
        })
        .join("") +
      "</div>";
  }

  function setupFloatingMenu() {
    var toggle = document.getElementById("floating-menu-btn");
    var panel = document.getElementById("floating-menu-panel");
    if (!toggle || !panel) return;

    function close() {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
    function open() {
      panel.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      panel.classList.contains("is-open") ? close() : open();
    });
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });
    document.addEventListener("click", function (e) {
      if (!panel.contains(e.target) && e.target !== toggle) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- Popup "Indique e ganhe" (imagens editáveis, com link) ---------- */
  function renderPromoPopup() {
    var cfg = CFG.popupIndiqueGanhe;
    var root = document.getElementById("promo-popup");
    if (!root || !cfg || !cfg.ativo || !cfg.slides || !cfg.slides.length) return;

    if (sessionStorage.getItem("almeidasnet_popup_visto")) return;

    var slidesHTML = cfg.slides
      .map(function (slide, i) {
        var link = resolveLink(slide.link);
        return (
          '<div class="promo-popup__slide' + (i === 0 ? " is-active" : "") + '">' +
          '<a href="' + link.href + '"' + (link.external ? ' target="_blank" rel="noopener"' : "") + ">" +
          '<img src="' + slide.imagem + '" alt="' + slide.alt + '">' +
          "</a></div>"
        );
      })
      .join("");

    var controlsHTML = "";
    if (cfg.slides.length > 1) {
      controlsHTML =
        '<div class="promo-popup__controls">' +
        '<button type="button" class="promo-popup__arrow promo-popup__arrow--prev" aria-label="Anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>' +
        '<div class="promo-popup__dots">' +
        cfg.slides.map(function (_, i) { return '<span class="promo-popup__dot' + (i === 0 ? " is-active" : "") + '"></span>'; }).join("") +
        "</div>" +
        '<button type="button" class="promo-popup__arrow promo-popup__arrow--next" aria-label="Próximo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>' +
        "</div>";
    }

    root.innerHTML =
      '<div class="promo-popup__card">' +
      '<button type="button" class="promo-popup__close" aria-label="Fechar">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg>' +
      "</button>" +
      '<div class="promo-popup__track">' + slidesHTML + "</div>" +
      controlsHTML +
      "</div>";

    var index = 0;
    var slideEls = Array.prototype.slice.call(root.querySelectorAll(".promo-popup__slide"));
    var dotEls = Array.prototype.slice.call(root.querySelectorAll(".promo-popup__dot"));
    var timer = null;

    function render() {
      slideEls.forEach(function (el, i) { el.classList.toggle("is-active", i === index); });
      dotEls.forEach(function (el, i) { el.classList.toggle("is-active", i === index); });
    }
    function goTo(i) { index = (i + slideEls.length) % slideEls.length; render(); }
    function restart() {
      if (timer) clearInterval(timer);
      if (slideEls.length > 1) timer = setInterval(function () { goTo(index + 1); }, 5000);
    }

    var prevBtn = root.querySelector(".promo-popup__arrow--prev");
    var nextBtn = root.querySelector(".promo-popup__arrow--next");
    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(index - 1); restart(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(index + 1); restart(); });

    setTimeout(function () {
      root.classList.add("is-open");
      document.body.classList.add("no-scroll");
      restart();
    }, cfg.atrasoMs);

    function closePopup() {
      root.classList.remove("is-open");
      document.body.classList.remove("no-scroll");
      if (timer) clearInterval(timer);
      sessionStorage.setItem("almeidasnet_popup_visto", "1");
    }

    root.querySelector(".promo-popup__close").addEventListener("click", closePopup);
    root.addEventListener("click", function (e) {
      if (e.target === root) closePopup();
    });
  }

  /* ---------- Header sticky (muda de aparência ao rolar) ---------- */
  function setupHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      if (window.scrollY > 12) header.classList.add("site-header--scrolled");
      else header.classList.remove("site-header--scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Menu mobile ---------- */
  function setupMobileMenu() {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.getElementById("primary-nav");
    var overlay = document.querySelector(".nav-overlay");
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    }
    function open() {
      nav.classList.add("is-open");
      toggle.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("no-scroll");
    }

    toggle.addEventListener("click", function () {
      nav.classList.contains("is-open") ? close() : open();
    });
    if (overlay) overlay.addEventListener("click", close);
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) close();
    });
  }

  /* ---------- Carrossel do Hero ---------- */
  function setupCarousel() {
    var root = document.querySelector(".hero-carousel");
    if (!root) return;

    var dotsWrap = root.querySelector(".hero-carousel__dots");
    var prevBtn = root.querySelector(".hero-carousel__arrow--prev");
    var nextBtn = root.querySelector(".hero-carousel__arrow--next");
    var index = 0;
    var timer = null;
    var DURATION = 6500;

    function slides() {
      return Array.prototype.slice.call(root.querySelectorAll(".hero-slide"));
    }

    dotsWrap.innerHTML = "";
    slides().forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero-carousel__dot";
      dot.setAttribute("aria-label", "Ir para slide " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
        restart();
      });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function render() {
      var s = slides();
      s.forEach(function (el, i) {
        el.classList.toggle("is-active", i === index);
      });
      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === index);
      });
    }

    function goTo(i) {
      index = (i + slides().length) % slides().length;
      render();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, DURATION);
    }

    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });

    root.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
    root.addEventListener("mouseleave", restart);

    render();
    restart();
  }

  /* ---------- FAQ Accordion ---------- */
  function setupAccordion() {
    var items = document.querySelectorAll(".accordion-item");
    items.forEach(function (item) {
      var btn = item.querySelector(".accordion-item__question");
      var panel = item.querySelector(".accordion-item__answer");
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        items.forEach(function (other) {
          other.classList.remove("is-open");
          other.querySelector(".accordion-item__question").setAttribute("aria-expanded", "false");
          other.querySelector(".accordion-item__answer").style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- Botão voltar ao topo ---------- */
  function setupBackToTop() {
    var btn = document.querySelector(".back-to-top");
    if (!btn) return;
    window.addEventListener(
      "scroll",
      function () {
        btn.classList.toggle("is-visible", window.scrollY > 700);
      },
      { passive: true }
    );
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function setupYear() {
    var el = document.getElementById("current-year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Uma única entrada orquestrada por seção (sem excesso) ---------- */
  function setupRevealOnce() {
    var targets = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || targets.length === 0) {
      targets.forEach(function (t) { t.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach(function (t) { io.observe(t); });
  }
})();
