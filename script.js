document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // عناصر اصلی سایت
  const menuToggle =
    document.querySelector("#menuToggle") ||
    document.querySelector(".menu-toggle") ||
    document.querySelector(".menu-toggle-btn");

  const nav =
    document.querySelector("#navMenu") ||
    document.querySelector(".nav-links") ||
    document.querySelector("nav");

  const navLinks = document.querySelectorAll("nav a, .nav-links a, #navMenu a");

  // =====================================
  // 1. منوی موبایل
  // =====================================

  if (menuToggle && nav) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        nav.classList.contains("active") &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        nav.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // =====================================
  // 2. انیمیشن ظاهرشدن بخش‌ها
  // =====================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // =====================================
  // 3. افکت نور روی کارت پروژه‌ها
  // =====================================

  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--mouse-x", "50%");
      card.style.setProperty("--mouse-y", "50%");
    });
  });

  // =====================================
  // 4. مشخص‌کردن لینک فعال منو
  // =====================================

  const sections = document.querySelectorAll(
    "section[id], header[id], footer[id]",
  );

  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.id;

          navLinks.forEach((link) => {
            const linkTarget = link.getAttribute("href");
            const isActive = linkTarget === `#${sectionId}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        threshold: 0.25,
        rootMargin: "-15% 0px -55% 0px",
      },
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // =====================================
  // 5. اسکرول نرم برای لینک‌های داخلی
  // =====================================

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });

      if (window.location.hash !== href) {
        history.replaceState(null, "", href);
      }
    });
  });

  // =====================================
  // 6. سال فعلی در فوتر
  // =====================================

  const yearElements = document.querySelectorAll("#currentYear, .current-year");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // =====================================
  // 7. بررسی بارگذاری اسکریپت
  // =====================================

  console.info("AH Studio: JavaScript loaded successfully.");
});
