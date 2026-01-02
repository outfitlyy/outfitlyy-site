const selected = document.querySelector(".lang-selected");
const list = document.querySelector(".lang-list");
const i18nEls = document.querySelectorAll("[data-i18n]");
const toggle = document.getElementById("toggle-share");
const copyBtn = document.querySelector(".btn-copy-link");

const flagMap = {
  fr: "https://flagcdn.com/w40/fr.png",
  en: "https://flagcdn.com/w40/gb.png",
  es: "https://flagcdn.com/w40/es.png",
  it: "https://flagcdn.com/w40/it.png",
  de: "https://flagcdn.com/w40/de.png",
  nl: "https://flagcdn.com/w40/nl.png",
  pt: "https://flagcdn.com/w40/pt.png"
};

// -------- LANGUE --------
function setLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  i18nEls.forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });

  selected.querySelector("img").src = flagMap[lang];
  localStorage.setItem("lang", lang);
}

// toggle menu langue
selected.addEventListener("click", () => {
  list.style.display = list.style.display === "block" ? "none" : "block";
});

// click langue
list.addEventListener("click", e => {
  const item = e.target.closest(".lang-item");
  if (!item) return;

  setLanguage(item.dataset.lang);
  list.style.display = "none";
});

// langue sauvegardée
setLanguage(localStorage.getItem("lang") || "en");

// -------- COPIER LIEN --------
if (copyBtn) {
  copyBtn.addEventListener("click", e => {
    e.preventDefault();
    navigator.clipboard.writeText("https://outfitlyy.github.io/outfitlyy-site/");
    toggle.checked = false;
  });
}

// -------- CLICK OUTSIDE / SCROLL --------
document.addEventListener("click", e => {
  if (!e.target.closest(".lang-switcher")) list.style.display = "none";
  if (toggle && !e.target.closest(".share-wrapper")) toggle.checked = false;
});

window.addEventListener("scroll", () => {
  if (toggle) toggle.checked = false;
});
