// общие анимациии
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

  /* Анимация заголовков и основного контента */
  .page h1, 
  .page h2,
  .summary__title {
    animation: fadeIn 0.8s ease-out forwards;
    opacity: 0;
  }

  .summary__subtitle,
  .form__description {
    animation: fadeIn 0.8s ease-out 0.2s forwards;
    opacity: 0;
  }
`;
document.head.appendChild(animationStyles);

// Плавный скролл 
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // номер карты 
  document.getElementById("cardnumber").addEventListener("input", function (e) {
    let v = e.target.value.replace(/\D/g, "").substring(0, 16);
    e.target.value = v.replace(/(.{4})/g, "$1 ").trim();
  });

  // срок годности
  document.getElementById("expiry").addEventListener("input", function (e) {
    let v = e.target.value.replace(/\D/g, "").substring(0, 4);
    if (v.length >= 2) v = v.substring(0, 2) + " / " + v.substring(2);
    e.target.value = v;
  });

  // CVV
  document.getElementById("cvv").addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/\D/g, "").substring(0, 3);
  });

  document.getElementById("cardholder").addEventListener("input", function (e) {
    e.target.value = e.target.value.toUpperCase();
  });

  // купить
  document.getElementById("submitBtn").addEventListener("click", function () {
    const agree = document.getElementById("agree").checked;
    if (!agree) {
      document.getElementById("agree").closest(".agreement").style.outline =
        "1px solid var(--accent)";
      document
        .getElementById("agree")
        .closest(".agreement").style.borderRadius = "6px";
      setTimeout(() => {
        document.getElementById("agree").closest(".agreement").style.outline =
          "";
      }, 1600);
      return;
    }
    document.getElementById("successOverlay").classList.add("visible");
  });

  // ответ кнопки ввода промокода
  document.querySelector(".promo-btn").addEventListener("click", function () {
    const val = document.getElementById("promo").value.trim().toUpperCase();
    if (val === "METAL2025") {
      this.textContent = "✓ Применён";
      this.style.borderColor = "var(--accent)";
      this.style.color = "var(--accent2)";
    } else if (val) {
      this.textContent = "Неверный";
      this.style.borderColor = "#555";
      setTimeout(() => {
        this.textContent = "Применить";
        this.style.borderColor = "";
      }, 2000);
    }
  });
});
