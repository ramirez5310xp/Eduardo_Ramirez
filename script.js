document.addEventListener("DOMContentLoaded", () => {
  // Envía los clics a GA4 y los deja disponibles en el dataLayer de GTM.
  if (typeof window.gtag === "function") {
    document.addEventListener("click", (event) => {
      const target = event.target.closest("a, button, .project-card");
      if (!target) return;

      const text = (target.getAttribute("aria-label") || target.textContent || "")
        .replace(/\s+/g, " ").trim().slice(0, 100);
      const link = target.closest("a");
      const params = { item_name: text || "Elemento sin texto" };
      if (link && !/^(mailto:|tel:)/i.test(link.href)) params.link_url = link.href;
      window.gtag("event", "portfolio_click", params);
    });
  }

  const root = document.documentElement;
  const languageButtons = document.querySelectorAll(".language-btn");
  const englishText = [
    [".nav-links a[href='#sobre-mi']", "About"], [".nav-links a[href='#stack']", "Skills"],
    [".nav-links a[href='#proyectos']", "Projects"], [".nav-links a[href='#trayectoria']", "Experience"],
    [".nav-links a[href='#contacto']", "Contact"], [".badge", "● El Salvador · Available for opportunities"],
    [".hero h1", "Hi, I'm Eduardo Ramírez"], [".typing-wrapper", "Computer Science graduate · Full Stack Developer"],
    [".hero-buttons a[href='#proyectos']", "View Projects"], ["#stack .section-title", "Technical Skills"],
    ["#stack .section-subtitle", "Technologies, frameworks, and tools for end-to-end business software development."],
    ["#proyectos .section-title", "Featured Projects"],
    ["#proyectos .section-subtitle", "Experience applied to real processes: what each system solves, my contributions, and the technologies used."],
    ["#trayectoria .section-title", "Experience and Education"],
    ["#trayectoria .section-subtitle", "Professional experience in business software development and ongoing education."],
    ["#apoyo .section-title", "Did you like my portfolio?"],
    ["#apoyo > .container > p", "Leave a like or register your visit. Each option can be saved once in this browser."],
    ["#apoyo .feedback-status", "Your interaction is saved in this browser."],
    ["#apoyo .feedback-note", "This counter is local to this browser; it does not identify people or sync across devices."],
    ["#contacto .section-title", "Shall we work together?"],
    ["#contacto > .container > p", "Available for Full Stack Developer positions (Java / .NET / Angular / React) or business software consulting in El Salvador and remotely."],
    ["#copyEmailBtn", "Copy email"], [".contact-email", "Send email"],
    [".filter-btn[data-filter='all']", "All"], ["#likeButton", "Like"],
  ];
  const spanishText = [
    [".nav-links a[href='#sobre-mi']", "Sobre mí"], [".nav-links a[href='#stack']", "Stack"],
    [".nav-links a[href='#proyectos']", "Proyectos"], [".nav-links a[href='#trayectoria']", "Trayectoria"],
    [".nav-links a[href='#contacto']", "Contacto"], [".badge", "● El Salvador · Disponible para proyectos"],
    [".hero h1", "Hola, soy Eduardo Ramírez"], [".typing-wrapper", "Licenciado en Informática · Desarrollador Full Stack"],
    [".hero-buttons a[href='#proyectos']", "Ver Proyectos"], ["#stack .section-title", "Habilidades técnicas"],
    ["#stack .section-subtitle", "Tecnologías, frameworks y herramientas que domino para desarrollo empresarial de extremo a extremo."],
    ["#proyectos .section-title", "Proyectos destacados"],
    ["#proyectos .section-subtitle", "Experiencia aplicada a procesos concretos: qué resuelve cada sistema, qué parte desarrollé y qué tecnologías utilicé."],
    ["#trayectoria .section-title", "Trayectoria y formación"],
    ["#trayectoria .section-subtitle", "Experiencia comprobada en desarrollo empresarial y formación académica continua."],
    ["#apoyo .section-title", "¿Te gustó mi portafolio?"],
    ["#apoyo > .container > p", "Deja un like o registra tu visita. Puedes guardar cada opción una vez desde este navegador."],
    ["#apoyo .feedback-status", "Tu interacción queda guardada en este navegador."],
    ["#apoyo .feedback-note", "El marcador es local a este navegador; no identifica personas ni sincroniza datos entre dispositivos."],
    ["#contacto .section-title", "¿Trabajamos juntos?"],
    ["#contacto > .container > p", "Disponible para posiciones como Desarrollador Full Stack (Java / .NET / Angular / React) o consultoría de software empresarial en El Salvador y modalidad remota."],
    ["#copyEmailBtn", "Copiar correo"], [".contact-email", "Enviar email"],
    [".filter-btn[data-filter='all']", "Todos"], ["#likeButton", "Me gusta"],
  ];
  let currentLanguage = localStorage.getItem("portfolio-language") === "en" ? "en" : "es";
  function setLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;
    (language === "en" ? englishText : spanishText).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (!element) return;
      if (element.matches("h1, h2, h3")) {
        const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
        if (textNode) textNode.textContent = value;
        else element.textContent = value;
      } else if (element.matches("a, button")) {
        const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
        if (textNode) textNode.textContent = value;
      } else element.textContent = value;
    });
    const typingHeading = document.querySelector(".typing-wrapper");
    typingHeading.innerHTML = language === "en"
      ? 'Computer Science graduate <span aria-hidden="true">·</span> Full Stack Developer'
      : 'Licenciado en Informática <span aria-hidden="true">·</span> Desarrollador Full Stack';
    document.querySelector('.filter-btn[data-filter="dotnet"]').textContent = language === "en" ? ".NET / Angular" : ".NET / Angular";
    document.querySelector('.filter-btn[data-filter="java"]').textContent = "Java / Spring Boot";
    document.querySelector('.filter-btn[data-filter="fullstack"]').textContent = "Full Stack & BI";
    document.querySelector('[data-feedback="like"]').firstChild.textContent = language === "en" ? "♥ Like " : "♥ Me gusta ";
    document.querySelector('[data-feedback="visit"]').firstChild.textContent = language === "en" ? "Register visit " : "Registrar visita ";
    languageButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.language === language)));
    localStorage.setItem("portfolio-language", language);
    document.title = language === "en" ? "Eduardo Ramírez | Computer Science & Full Stack Developer" : "Eduardo Ramírez | Lic. en Informática & Full Stack Developer";
    document.querySelector('meta[name="description"]').content = language === "en"
      ? "Portfolio of Eduardo Ramírez, Computer Science graduate and Full Stack developer in Java, .NET, Angular, and React."
      : "Portafolio de Eduardo Ramírez, Licenciado en Informática y desarrollador Full Stack en Java, .NET, Angular y React.";
    const savedFeedback = ["like", "visit"].map((type) => {
      try { return { type, entry: JSON.parse(localStorage.getItem(`portfolio-feedback-${type}`)) }; }
      catch (error) { return null; }
    }).find((item) => item && item.entry && item.entry.timestamp);
    if (savedFeedback) {
      const date = new Date(savedFeedback.entry.timestamp).toLocaleString(language === "en" ? "en-US" : "es-SV");
      document.getElementById("feedbackStatus").textContent = language === "en"
        ? `${savedFeedback.type === "like" ? "Like" : "Visit"} registered: ${date}.`
        : `${savedFeedback.type === "like" ? "Me gusta" : "Visita"} registrado: ${date}.`;
    }
  }
  languageButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.language)));
  setLanguage(currentLanguage);

  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  root.setAttribute("data-theme", savedTheme === "light" ? "light" : "dark");

  function updateThemeButton() {
    const isDark = root.getAttribute("data-theme") === "dark";
    themeToggle.innerHTML = `<svg class="ui-icon" aria-hidden="true"><use href="#${isDark ? "i-sun" : "i-moon"}" /></svg>`;
    themeToggle.setAttribute("aria-label", isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
  }

  updateThemeButton();
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    updateThemeButton();
  });

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    navLinks.classList.toggle("open", !isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      projectCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden", !matches);
        card.setAttribute("aria-hidden", String(!matches));
        card.tabIndex = matches ? 0 : -1;
      });
    });
  });

  const modal = document.getElementById("projectModal");
  const modalDialog = modal.querySelector(".modal-dialog");
  const modalStack = document.getElementById("modalStack");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalScope = document.getElementById("modalScope");
  let modalOpener = null;
  let previousBodyOverflow = "";

  function openProjectModal(card) {
    modalOpener = card;
    modalStack.textContent = card.dataset.stack;
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalScope.replaceChildren(...card.dataset.scope.split("|").map((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      return listItem;
    }));
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.getElementById("closeModal").focus();
  }

  function closeProjectModal() {
    if (!modal.classList.contains("open")) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = previousBodyOverflow;
    if (modalOpener) modalOpener.focus();
  }

  projectCards.forEach((card) => {
    card.addEventListener("click", () => openProjectModal(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProjectModal(card);
      }
    });
  });

  document.getElementById("closeModal").addEventListener("click", closeProjectModal);
  document.getElementById("modalBackdrop").addEventListener("click", closeProjectModal);

  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
  }

  // Marcador local: limita cada tipo de interacción a una por navegador.
  const feedbackLabels = { like: "Me gusta", visit: "Visita" };
  const feedbackStatus = document.getElementById("feedbackStatus");
  document.querySelectorAll(".feedback-btn").forEach((button) => {
    const type = button.dataset.feedback;
    const storageKey = `portfolio-feedback-${type}`;
    const countElement = document.getElementById(type === "like" ? "likeCount" : "visitCount");
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(storageKey)); } catch (error) { /* Storage no disponible o registro inválido. */ }

    countElement.textContent = saved ? "1" : "0";
    if (saved && saved.timestamp) {
      const date = new Date(saved.timestamp).toLocaleString(currentLanguage === "en" ? "en-US" : "es-SV");
      feedbackStatus.textContent = currentLanguage === "en"
        ? `${type === "like" ? "Like" : "Visit"} registered: ${date}.`
        : `${feedbackLabels[type]} registrado: ${date}.`;
    }
    button.disabled = Boolean(saved);
    if (saved) button.setAttribute("aria-label", `${feedbackLabels[type]} ya registrado en este navegador`);

    button.addEventListener("click", () => {
      if (button.disabled) return;
      const entry = { timestamp: new Date().toISOString() };
      try {
        localStorage.setItem(storageKey, JSON.stringify(entry));
        button.disabled = true;
        button.setAttribute("aria-label", `${feedbackLabels[type]} ya registrado en este navegador`);
        countElement.textContent = "1";
        const date = new Date(entry.timestamp).toLocaleString(currentLanguage === "en" ? "en-US" : "es-SV");
        feedbackStatus.textContent = currentLanguage === "en"
          ? `${type === "like" ? "Like" : "Visit"} registered: ${date}.`
          : `${feedbackLabels[type]} registrado: ${date}.`;
      } catch (error) {
        feedbackStatus.textContent = currentLanguage === "en"
          ? "Could not save in this browser. Check your storage settings."
          : "No se pudo guardar en este navegador. Revisa la configuración de almacenamiento.";
      }
    });
  });

  document.getElementById("copyEmailBtn").addEventListener("click", async (event) => {
    try {
      await navigator.clipboard.writeText(event.currentTarget.dataset.email);
      showToast("Correo copiado al portapapeles.");
    } catch (error) {
      showToast("No fue posible copiar el correo. Usa el botón «Enviar email».");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (modal.classList.contains("open")) closeProjectModal();
      closeMenu();
    }

    if (event.key === "Tab" && modal.classList.contains("open")) {
      const focusableElements = modalDialog.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  });

  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("active"));
});
