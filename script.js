document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const typingElement = document.getElementById("typingText");
  const roles = [
    "Licenciado en Informática · Full Stack Developer",
    "Java, Spring Boot y .NET",
    "Angular, React y SQL Server"
  ];

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typingElement.textContent = roles[0];
  } else {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      typingElement.textContent = currentRole.substring(0, charIndex);
      charIndex += isDeleting ? -1 : 1;

      let delay = isDeleting ? 35 : 65;
      if (!isDeleting && charIndex > currentRole.length) {
        isDeleting = true;
        delay = 1600;
      } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        charIndex = 0;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
      }

      window.setTimeout(typeEffect, delay);
    }

    typeEffect();
  }

  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  root.setAttribute("data-theme", savedTheme === "light" ? "light" : "dark");

  function updateThemeButton() {
    const isDark = root.getAttribute("data-theme") === "dark";
    themeToggle.textContent = isDark ? "☀️" : "🌙";
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
  const modalImg = document.getElementById("modalImg");
  const modalStack = document.getElementById("modalStack");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalRepo = document.getElementById("modalRepo");
  const modalDemo = document.getElementById("modalDemo");
  let modalOpener = null;
  let previousBodyOverflow = "";

  function openProjectModal(card) {
    const image = card.querySelector("img");
    modalOpener = card;
    modalImg.src = image.src;
    modalImg.alt = image.alt;
    modalStack.textContent = card.dataset.stack;
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalRepo.href = card.dataset.repo;
    modalDemo.href = card.dataset.demo;
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

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("active"));
  }
});
