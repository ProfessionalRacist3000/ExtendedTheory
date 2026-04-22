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
  const STORAGE_KEY = "extendedTheoryFormData";

  // Функция для сохранения данных в localStorage
  function saveFormData() {
    const formData = {
      plan: document.querySelector('input[name="plan"]:checked')?.value || "",
      fname: document.getElementById("fname")?.value || "",
      lname: document.getElementById("lname")?.value || "",
      email: document.getElementById("email")?.value || "",
      phone: document.getElementById("phone")?.value || "",
      level: document.getElementById("level")?.value || "",
      goal: document.getElementById("goal")?.value || "",
      card: document.getElementById("card")?.value || "",
      expiry: document.getElementById("expiry")?.value || "",
      cvv: document.getElementById("cvv")?.value || "",
      cardholder: document.getElementById("cardholder")?.value || "",
      promo: document.getElementById("promo")?.value || "",
      agree: document.getElementById("agree")?.checked || false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    console.log("Данные формы сохранены в localStorage");
  }

  // Функция для восстановления данных из localStorage
  function loadFormData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const formData = JSON.parse(savedData);

        if (formData.plan) {
          const planInput = document.querySelector(
            `input[name="plan"][value="${formData.plan}"]`,
          );
          if (planInput) planInput.checked = true;
        }

        if (document.getElementById("fname"))
          document.getElementById("fname").value = formData.fname || "";
        if (document.getElementById("lname"))
          document.getElementById("lname").value = formData.lname || "";
        if (document.getElementById("email"))
          document.getElementById("email").value = formData.email || "";
        if (document.getElementById("phone"))
          document.getElementById("phone").value = formData.phone || "";
        if (document.getElementById("level"))
          document.getElementById("level").value = formData.level || "";
        if (document.getElementById("goal"))
          document.getElementById("goal").value = formData.goal || "";
        if (document.getElementById("card"))
          document.getElementById("card").value = formData.card || "";
        if (document.getElementById("expiry"))
          document.getElementById("expiry").value = formData.expiry || "";
        if (document.getElementById("cvv"))
          document.getElementById("cvv").value = formData.cvv || "";
        if (document.getElementById("cardholder"))
          document.getElementById("cardholder").value =
            formData.cardholder || "";
        if (document.getElementById("promo"))
          document.getElementById("promo").value = formData.promo || "";
        if (document.getElementById("agree"))
          document.getElementById("agree").checked = formData.agree || false;

        console.log("✅ Данные формы загружены из localStorage");
      } catch (error) {
        console.error("❌ Ошибка при загрузке данных:", error);
      }
    }
  }

  // Сохраняем при изменении плана
  document.querySelectorAll('input[name="plan"]').forEach((input) => {
    input.addEventListener("change", saveFormData);
  });

  // Сохраняем при изменении личных данных
  ["fname", "lname", "email", "phone", "level", "goal"].forEach((id) => {
    if (document.getElementById(id)) {
      document.getElementById(id).addEventListener("input", saveFormData);
      document.getElementById(id).addEventListener("change", saveFormData);
    }
  });

  // Форматирование карты
  if (document.getElementById("card")) {
    document.getElementById("card").addEventListener("input", function (e) {
      let v = e.target.value.replace(/\D/g, "").substring(0, 16);
      e.target.value = v.replace(/(.{4})/g, "$1 ").trim();
      saveFormData();
    });
  }

  // Срок действия
  if (document.getElementById("expiry")) {
    document.getElementById("expiry").addEventListener("input", function (e) {
      let v = e.target.value.replace(/\D/g, "").substring(0, 4);
      if (v.length >= 2) v = v.substring(0, 2) + " / " + v.substring(2);
      e.target.value = v;
      saveFormData();
    });
  }

  // CVV
  if (document.getElementById("cvv")) {
    document.getElementById("cvv").addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/\D/g, "").substring(0, 3);
      saveFormData();
    });
  }

  // Имя на карте
  if (document.getElementById("cardholder")) {
    document
      .getElementById("cardholder")
      .addEventListener("input", function (e) {
        e.target.value = e.target.value.toUpperCase();
        saveFormData();
      });
  }

  // Сохраняем при изменении промокода
  if (document.getElementById("promo")) {
    document.getElementById("promo").addEventListener("input", function (e) {
      saveFormData();
    });
  }

  // Сохраняем при изменении чекбокса согласия
  if (document.getElementById("agree")) {
    document.getElementById("agree").addEventListener("change", function (e) {
      saveFormData();
    });
  }

  // Загружаем данные при загрузке страницы
  loadFormData();

  // Обработчик кнопки "Оплатить курс"
  if (document.getElementById("submitBtn")) {
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
      // Сохраняем данные финально
      saveFormData();

      // Показываем оверлей и переходим на страницу подтверждения
      document.getElementById("successOverlay").classList.add("visible");
      setTimeout(() => {
        window.location.href = "confirmation.html";
      }, 1500);
    });
  }

  // Ответ кнопки ввода промокода
  const promoBtn = document.querySelector(".promo-btn");
  if (promoBtn) {
    promoBtn.addEventListener("click", function () {
      const val = document.getElementById("promo").value.trim().toUpperCase();
      if (val === "ASHVEIN") {
        this.textContent = "✓ Применён";
        this.style.borderColor = "var(--accent)";
        this.style.color = "var(--accent2)";
        saveFormData();
      } else if (val) {
        this.textContent = "Неверный";
        this.style.borderColor = "#555";
        setTimeout(() => {
          this.textContent = "Применить";
          this.style.borderColor = "";
        }, 2000);
      }
    });
  }

  // Восстанавливаем стиль кнопки промокода, если промокод уже был применен
  const promoInput = document.getElementById("promo");
  if (
    promoBtn &&
    promoInput &&
    promoInput.value.trim().toUpperCase() === "METAL2025"
  ) {
    promoBtn.textContent = "✓ Применён";
    promoBtn.style.borderColor = "var(--accent)";
    promoBtn.style.color = "var(--accent2)";
  }

  console.log("📦 Локальное хранилище (localStorage):");
  console.log("   Все данные формы автоматически сохраняются при вводе.");
  console.log(
    "   Чтобы очистить данные, выполни: localStorage.removeItem('extendedTheoryFormData')",
  );
  console.log(
    "   Чтобы увидеть сохраненные данные, выполни: console.log(localStorage.getItem('extendedTheoryFormData'))",
  );

  // Обработчик переключения темы
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }
});
