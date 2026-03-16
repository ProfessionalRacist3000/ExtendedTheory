const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px",
};

// Создаем стили для анимаций
const explosionStyle = document.createElement("style");
explosionStyle.textContent = `
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

  @keyframes heroFadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

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

  .about__image {
    position: relative;
  }

  .about__image.animate-pop {
    animation: popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .hero__overlay h1 {
    animation: heroFadeIn 0.8s ease-out forwards;
  }

  .hero__bar {
    animation: heroFadeIn 0.8s ease-out 0.2s forwards;
    opacity: 0;
  }

  .about__text {
    animation: slideInLeft 0.7s ease-out forwards;
    opacity: 0;
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .cta {
    animation: fadeInUp 0.8s ease-out 0.3s forwards;
    opacity: 0;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Hover эффект для footer links - ЕДИНАЯ АНИМАЦИЯ ДЛЯ ВСЕХ СТРАНИЦ */
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
document.head.appendChild(explosionStyle);

// Наблюдатель для картинки с гитаристом
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
      entry.target.classList.add("animate-pop", "animated");
      imageObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Применяем к картинке при загрузке страницы
const guitaristImage = document.querySelector(".about__image");
if (guitaristImage) {
  // Начальное скрытие
  guitaristImage.style.opacity = "0";
  guitaristImage.style.transform = "scale(0.3)";

  // Наблюдаем за элементом
  imageObserver.observe(guitaristImage);

  // Если картинка уже видна в окне запускаем анимацию
  setTimeout(() => {
    if (!guitaristImage.classList.contains("animated")) {
      const rect = guitaristImage.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        guitaristImage.classList.add("animate-pop", "animated");
      }
    }
  }, 300);
}

// Плавное появление заголовка и описания при загрузке
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero__overlay h1");
  const heroBar = document.querySelector(".hero__bar");
  const aboutText = document.querySelector(".about__text");
  const cta = document.querySelector(".cta");

  // Запускаем анимации с задержками
  if (heroTitle)
    heroTitle.style.animation = "heroFadeIn 0.8s ease-out forwards";
  if (heroBar)
    heroBar.style.animation = "heroFadeIn 0.8s ease-out 0.2s forwards";
  if (aboutText)
    aboutText.style.animation = "slideInLeft 0.7s ease-out forwards";
  if (cta) cta.style.animation = "fadeInUp 0.8s ease-out 0.3s forwards";
});

// Добавляем интерактивность для кнопки CTA
const ctaButton = document.querySelector(".cta__button");
if (ctaButton) {
  ctaButton.style.transition =
    "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease";

  ctaButton.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.08) translateY(-2px)";
    this.style.boxShadow = "0 20px 40px rgba(192, 57, 43, 0.4)";
  });

  ctaButton.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) translateY(0)";
    this.style.boxShadow = "0 10px 20px rgba(192, 57, 43, 0.3)";
  });
}

// Плавный скролл для навигации
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Эффект параллакса для фона при скролле 
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
  }
});



console.log("✅ Анимации загружены успешно!");
