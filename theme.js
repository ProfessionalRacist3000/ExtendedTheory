// Инициализация темы при загрузке страницы
function initializeTheme() {
  // Проверяем сохраненную тему в localStorage
  const savedTheme = localStorage.getItem("theme");

  // Проверяем системные предпочтения
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Определяем текущую тему
  const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

  // Применяем тему
  setTheme(currentTheme);

  // Обновляем кнопку переключения
  updateThemeButton(currentTheme);
}

// Функция для установки темы
function setTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "dark");
  }
}

// Функция для переключения темы
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
  updateThemeButton(newTheme);
}

// Функция для обновления кнопки переключения
function updateThemeButton(theme) {
  const button = document.getElementById("theme-toggle-btn");
  if (!button) return;

  if (theme === "light") {
    button.innerHTML = "🌙";
    button.setAttribute("aria-label", "Переключить на темную тему");
  } else {
    button.innerHTML = "☀️";
    button.setAttribute("aria-label", "Переключить на светлую тему");
  }
}

// Инициализируем тему при загрузке страницы
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTheme);
} else {
  initializeTheme();
}
