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

/* Contact form */
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let toast = document.querySelector(".form-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "form-toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }

  toast.textContent = "Message ready — form is demo-only for now.";
  toast.classList.add("show");
  contactForm.reset();

  setTimeout(() => toast.classList.remove("show"), 3000);
});

/* Resume download placeholder */
document.getElementById("download-resume").addEventListener("click", (e) => {
  e.preventDefault();
  let toast = document.querySelector(".form-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "form-toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = "Add your resume PDF and update this link.";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
});
