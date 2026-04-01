function toggleTheme() {
  var next =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
  _syncThemeIcon();
}

function _syncThemeIcon() {
  var dark = document.documentElement.dataset.theme === "dark";
  document.querySelectorAll(".theme-toggle").forEach(function (b) {
    b.textContent = dark ? "\u2600" : "\u263E";
    b.setAttribute(
      "aria-label",
      dark ? "Passer en mode clair" : "Passer en mode sombre",
    );
  });
}

document.addEventListener("DOMContentLoaded", _syncThemeIcon);
