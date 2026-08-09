/* Theme toggle */
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

function getPreferredTheme() {
  const stored = localStorage.getItem("theme");
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function setTheme(theme) {
  if (theme === "light") {
    html.setAttribute("data-theme", "light");
  } else {
    html.removeAttribute("data-theme");
  }
  localStorage.setItem("theme", theme);
}

setTheme(getPreferredTheme());

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme") === "light" ? "light" : "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

/* Mobile nav */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navMenu.classList.toggle("open");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navMenu.classList.remove("open");
  });
});

/* Active nav link on scroll */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

/* Contact form — posts to FormSubmit → aymanashrafbskk@gmail.com */
const contactForm = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");
const formNext = document.getElementById("form-next");

function showToast(message) {
  let toast = document.querySelector(".form-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "form-toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 5000);
}

/* After FormSubmit redirects back */
const params = new URLSearchParams(window.location.search);
if (params.get("sent") === "1") {
  showToast("Message sent! I'll get back to you soon.");
  const cleanUrl = window.location.pathname + "#contact";
  window.history.replaceState({}, "", cleanUrl);
}

contactForm.addEventListener("submit", () => {
  const base = window.location.href.split("#")[0].split("?")[0];
  formNext.value = `${base}?sent=1#contact`;
  sendBtn.disabled = true;
  sendBtn.textContent = "Sending…";
});

/* Resume download placeholder */
document.getElementById("download-resume").addEventListener("click", (e) => {
  e.preventDefault();
  showToast("Add your resume PDF and update this link.");
});
