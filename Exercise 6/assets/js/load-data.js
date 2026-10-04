d3.csv("data/Ex6_TVdata_withStar.csv", d => {
  return {
    brand: d.brand,
    model: d.model,
    screenTech: d.screenTech,
    screenSize: +d.screenSize,
    // Checks "star", "star2", or "starRating"
    starRating: +(d.star || d.star2 || d.starRating || 0),
    energyConsumption: +d.energyConsumption
  };
}).then(data => {
  console.log("Loaded data sample:", data[0]);

  // 1. Draw the Histogram (Exercise 6.1)
  drawHistogram(data);

  // 2. Add Filter Buttons (Exercise 6.2)
  populateFilters(data);

  // 3. Draw the Scatterplot (Exercise 6.3)
  drawScatterplot(data);

  // 4. Set up Tooltips and Mouse Events (Exercise 6.4)
  createTooltip();
  handleMouseEvents();
}).catch(err => {
  console.error("Error loading CSV file:", err);
});