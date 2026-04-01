function toggleTheme() {
  var current = document.documentElement.dataset.theme;
  var next = current === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.textContent = next === "dark" ? "\u2600" : "\u263E";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var isDark = document.documentElement.dataset.theme === "dark";
  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.textContent = isDark ? "\u2600" : "\u263E";
  });
});
