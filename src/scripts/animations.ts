export function initRevealAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -80px 0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    observer.observe(el);
  });
}

export function initCounters() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll("[data-counter]");
          counters.forEach((counter: Element) => {
            const el = counter as HTMLElement;
            const target = parseInt(el.dataset.counter || "0", 10);
            const suffix = el.dataset.suffix || "";
            const duration = 2000;
            const start = performance.now();

            function update(now: number) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(eased * target);
              el.textContent = current + suffix;
              if (progress < 1) {
                requestAnimationFrame(update);
              }
            }

            requestAnimationFrame(update);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const counterSection = document.getElementById("stats-section");
  if (counterSection) observer.observe(counterSection);
}

export function initParallax() {
  const heroBg = document.getElementById("hero-bg");
  if (!heroBg) return;

  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    if (scroll < window.innerHeight) {
      heroBg.style.transform = `translateY(${scroll * 0.4}px)`;
    }
  }, { passive: true });
}
