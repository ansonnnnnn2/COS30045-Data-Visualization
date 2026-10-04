const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
  .style("border", "1px solid black");

d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count
  };
}).then(data => {
  console.log("Data loaded successfully!");
  console.log("Total rows:", data.length);
  console.log("Max count:", d3.max(data, d => d.count));
  console.log("Min count:", d3.min(data, d => d.count));

  data.sort((a, b) => b.count - a.count);

  drawBarChart(data);
});

function drawBarChart(data) {
  console.log("Data ready for Exercise 4.5:", data);
}