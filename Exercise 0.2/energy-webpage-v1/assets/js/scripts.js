document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".accordion-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const panel = toggle.nextElementSibling;
      const icon = toggle.querySelector("span");

      // Toggle display
      if (panel.classList.contains("show")) {
        panel.classList.remove("show");
        if (icon) icon.textContent = "+";
      } else {
        // Close other panels
        document.querySelectorAll(".accordion-panel").forEach((p) => p.classList.remove("show"));
        document.querySelectorAll(".accordion-toggle span").forEach((s) => (s.textContent = "+"));

        panel.classList.add("show");
        if (icon) icon.textContent = "−";
      }
    });
  });
});