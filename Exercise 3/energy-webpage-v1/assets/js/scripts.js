document.addEventListener("DOMContentLoaded", () => {
  // Accordion FAQ Handling
  const accordions = document.querySelectorAll(".accordion-toggle");

  accordions.forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.nextElementSibling;
      const icon = button.querySelector("span");
      const isOpen = panel && panel.classList.contains("show");

      // Close other accordion panels
      document.querySelectorAll(".accordion-panel").forEach((p) => {
        p.classList.remove("show");
      });
      document.querySelectorAll(".accordion-toggle span").forEach((s) => {
        s.textContent = "+";
      });

      // Toggle current panel
      if (!isOpen && panel) {
        panel.classList.add("show");
        if (icon) icon.textContent = "−";
      }
    });
  });

  // Energy Calculator (RM Logic)
  const form = document.getElementById("energy-calculator");
  if (!form) return;

  const wattsInput = document.getElementById("power-watts");
  const hoursInput = document.getElementById("daily-hours");
  const tariffInput = document.getElementById("energy-tariff");

  const errWatts = document.getElementById("error-watts");
  const errHours = document.getElementById("error-hours");
  const errTariff = document.getElementById("error-tariff");

  const resultsPanel = document.getElementById("calculator-results");
  const outDailyKwh = document.getElementById("out-daily-kwh");
  const outAnnualKwh = document.getElementById("out-annual-kwh");
  const outMonthlyCost = document.getElementById("out-monthly-cost");
  const outAnnualCost = document.getElementById("out-annual-cost");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const watts = parseFloat(wattsInput.value);
    const hours = parseFloat(hoursInput.value);
    const tariffRM = parseFloat(tariffInput.value); // Entered directly in RM

    let isValid = true;

    // Validation
    if (isNaN(watts) || watts <= 0) {
      if (errWatts) errWatts.style.display = "block";
      isValid = false;
    } else if (errWatts) {
      errWatts.style.display = "none";
    }

    if (isNaN(hours) || hours <= 0 || hours > 24) {
      if (errHours) errHours.style.display = "block";
      isValid = false;
    } else if (errHours) {
      errHours.style.display = "none";
    }

    if (isNaN(tariffRM) || tariffRM <= 0) {
      if (errTariff) errTariff.style.display = "block";
      isValid = false;
    } else if (errTariff) {
      errTariff.style.display = "none";
    }

    if (!isValid) {
      if (resultsPanel) resultsPanel.style.display = "none";
      return;
    }

    // Formulas
    const dailyKwh = (watts * hours) / 1000;
    const annualKwh = dailyKwh * 365;
    const annualCost = annualKwh * tariffRM;
    const monthlyCost = annualCost / 12;

    // Render output
    outDailyKwh.textContent = dailyKwh.toFixed(2);
    outAnnualKwh.textContent = annualKwh.toFixed(1);
    outMonthlyCost.textContent = `RM ${monthlyCost.toFixed(2)}`;
    outAnnualCost.textContent = `RM ${annualCost.toFixed(2)}`;

    resultsPanel.style.display = "block";
  });
});