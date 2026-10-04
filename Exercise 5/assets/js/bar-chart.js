const width = 800;
const height = 500;
const margin = { top: 40, right: 30, bottom: 60, left: 70 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const svg = d3.select("#bar-chart")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .style("border", "1px solid #ccc");

const innerChart = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data/Data_exercise 5.1.csv", d => {
  return {
    screenType: d["Screen_Tech"] || d["Screen Technology"] || Object.values(d)[0],
    energy: +(d["Mean(Labelled energy consumption (kWh/year))"] || d["Mean(Energy consumption (kWh))"] || Object.values(d)[1])
  };
}).then(data => {
  console.log("5.1 Data loaded:", data);
  // Sort descending
  data.sort((a, b) => b.energy - a.energy);
  drawBarChart(data);
}).catch(err => {
  console.error("Error loading CSV file:", err);
});

// Draw Chart
function drawBarChart(data) {
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.screenType))
    .range([0, innerWidth])
    .paddingInner(0.3)
    .paddingOuter(0.2);

  const maxEnergy = d3.max(data, d => d.energy);
  const yScale = d3.scaleLinear()
    .domain([0, maxEnergy * 1.15])
    .range([innerHeight, 0]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  innerChart.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(xAxis)
    .selectAll("text")
    .style("font-size", "13px")
    .style("text-transform", "uppercase");

  innerChart.append("g")
    .attr("class", "y-axis")
    .call(yAxis)
    .selectAll("text")
    .style("font-size", "12px");

  innerChart.append("text")
    .attr("x", 0)
    .attr("y", -15)
    .attr("text-anchor", "start")
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .style("fill", "#444")
    .text("Energy Consumption (kWh/year)");

  innerChart.selectAll("rect.bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.screenType))
    .attr("y", d => yScale(d.energy))
    .attr("width", xScale.bandwidth())
    .attr("height", d => innerHeight - yScale(d.energy))
    .attr("fill", "#6baed6");

  innerChart.selectAll(".bar-label")
    .data(data)
    .join("text")
    .attr("class", "bar-label")
    .attr("x", d => xScale(d.screenType) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.energy) - 8)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .style("font-weight", "600")
    .style("fill", "#333")
    .text(d => Math.round(d.energy));
}