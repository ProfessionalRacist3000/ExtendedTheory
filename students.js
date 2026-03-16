// Создаем общие стили для анимаций
const animationStyles = document.createElement("style");
animationStyles.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes popIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Hover эффект для footer links */
  .footer-links a,
  .footer-list a,
  .social-links a {
    position: relative;
    transition: color 0.3s ease;
  }

  .footer-links a::after,
  .footer-list a::after,
  .social-links a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1.5px;
    background: var(--accent);
    transition: width 0.3s ease;
  }

  .footer-links a:hover::after,
  .footer-list a:hover::after,
  .social-links a:hover::after {
    width: 100%;
  }
`;
document.head.appendChild(animationStyles);

// Плавный скролл для якорей
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    }
  });
});
// Intersection Observer для анимации элементов при скролле
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("is-active"));
    this.classList.add("is-active");
  });
});
