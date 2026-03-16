// Создаем общие стили для анимаций
const commonAnimationStyles = document.createElement("style");
commonAnimationStyles.textContent = `
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
document.head.appendChild(commonAnimationStyles);

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
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Наблюдаем за всеми text-block элементами
document.querySelectorAll(".text-block").forEach((el, index) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
  observer.observe(el);
});

// Наблюдаем за h2 элементами
document.querySelectorAll("h2").forEach((el, index) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
  observer.observe(el);
});

// Наблюдаем за creator секцией
const creator = document.querySelector(".creator");
if (creator) {
  creator.style.opacity = "0";
  creator.style.transform = "translateY(30px)";
  creator.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
  observer.observe(creator);
}

// Наблюдаем за avatar элементом
const avatar = document.querySelector(".avatar");
if (avatar) {
  avatar.style.opacity = "0";
  avatar.style.transform = "scale(0.8)";
  avatar.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
  observer.observe(avatar);
}

// Добавляем класс animate-in при пересечении и убираем скрытый стиль
const style = document.createElement("style");
style.textContent = `
  .text-block.animate-in,
  h2.animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  .creator.animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  .avatar.animate-in {
    opacity: 1 !important;
    transform: scale(1) !important;
  }

  .role-list span:nth-child(odd) {
    animation: fadeInTilt 0.5s ease-out forwards;
  }

  @keyframes fadeInTilt {
    from {
      opacity: 0;
      transform: translateY(10px) rotateZ(-0.5deg);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotateZ(0);
    }
  }
`;
document.head.appendChild(style);

// Анимация для списка ролей в creator
const roleList = document.querySelector(".role-list");
if (roleList) {
  const spans = roleList.querySelectorAll("span");
  spans.forEach((span, index) => {
    span.style.opacity = "0";
    span.style.animation = `fadeInTilt 0.5s ease-out ${0.3 + index * 0.08}s forwards`;
  });
}

// Анимация для footer links при загрузке страницы
window.addEventListener("load", () => {
  // Добавляем hover эффект для text-block элементов
  document.querySelectorAll(".text-block").forEach((block) => {
    block.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.8)";
    });
    block.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.6)";
    });
    this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
  });

  // Анимация для creator при hover
  if (creator) {
    creator.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 30px 80px rgba(0, 0, 0, 0.9)";
    });
    creator.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.7)";
    });
    creator.style.transition =
      "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease";
  }

  // Анимация для avatar при hover
  if (avatar) {
    avatar.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) rotateZ(2deg)";
      this.style.boxShadow = "0 20px 70px rgba(196, 30, 59, 0.4)";
    });
    avatar.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotateZ(0)";
      this.style.boxShadow = "0 12px 50px rgba(196, 30, 59, 0.25)";
    });
    avatar.style.transition =
      "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease";
  }
});

// Плавный скролл к якорям
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    }
  });
});
