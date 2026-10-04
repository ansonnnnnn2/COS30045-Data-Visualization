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
  data.sort((a, b) => b.count - a.count);

  drawBarChart(data);
});

const drawBarChart = data => {
  const barHeight = 20;
  const barSpacing = 5;

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("width", d => d.count)
    .attr("height", barHeight)
    .attr("x", 0)
    .attr("y", (d, i) => (barHeight + barSpacing) * i)
    .attr("fill", "blue");
};