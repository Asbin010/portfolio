// script.js
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-theme");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Optional: Animate sections when scrolling into view
  const sections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 10;
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, {
    threshold: 0.3,
  });

  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(50px)";
    section.style.transition = "all 0.6s ease-out";
    observer.observe(section);
  });
});
