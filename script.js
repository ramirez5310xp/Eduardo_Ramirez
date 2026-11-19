document.addEventListener("DOMContentLoaded", () => {
  // 1. Efecto de escritura automática personalizado con tu perfil
  const roles = [
    "Licenciado en Informática · Full Stack Developer",
    "Especialista en Java, Spring Boot & .NET Core",
    "Desarrollo Empresarial con Angular, React & SQL Server"
  ];
  const typingElement = document.getElementById("typingText");
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    typingElement.textContent = isDeleting
      ? currentRole.substring(0, charIndex--)
      : currentRole.substring(0, charIndex++);

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length + 1) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }
    setTimeout(typeEffect, speed);
  }
  typeEffect();

  // 2. Cambio de Tema Oscuro / Claro
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";

  root.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

  themeToggle.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    themeToggle.textContent = nextTheme === "dark" ? "☀️" : "🌙";
  });

  // 3. Menú móvil
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // 4. Filtro interactivo de proyectos
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden", !match);
      });
    });
  });

  // 5. Modal de vista ampliada para cada proyecto
  const modal = document.getElementById("projectModal");
  const modalImg = document.getElementById("modalImg");
  const modalStack = document.getElementById("modalStack");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalRepo = document.getElementById("modalRepo");
  const modalDemo = document.getElementById("modalDemo");

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      modalImg.src = img.src;
      modalStack.textContent = card.dataset.stack;
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      modalRepo.href = card.dataset.repo;
      modalDemo.href = card.dataset.demo;
      modal.classList.add("open");
    });
  });

  function closeProjectModal() {
    modal.classList.remove("open");
  }

  document.getElementById("closeModal").addEventListener("click", closeProjectModal);
  document.getElementById("modalBackdrop").addEventListener("click", closeProjectModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProjectModal();
  });

  // 6. Copiar correo con notificación Toast
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const toast = document.getElementById("toast");

  copyEmailBtn.addEventListener("click", () => {
    const email = copyEmailBtn.dataset.email;
    navigator.clipboard.writeText(email).then(() => {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2600);
    });
  });

  // 7. Animación Reveal al hacer scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});
