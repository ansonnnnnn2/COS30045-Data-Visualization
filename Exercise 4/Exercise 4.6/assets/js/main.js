const svgWidth = 1000;
const svgHeight = 750;

const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
  .style("border", "1px solid #ccc");


d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count
  };
}).then(data => {

  data.sort((a, b) => b.count - a.count);
  drawBarChart(data);
});

function drawBarChart(data) {
  const labelMargin = 160;  
  const chartWidth = 720;  

const maxCount = d3.max(data, d => d.count);
  const xScale = d3.scaleLinear()
    .domain([0, maxCount * 1.15])
    .range([labelMargin, labelMargin + chartWidth]);
    
const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([40, svgHeight - 40])
    .paddingInner(0.25);

  const barAndLabel = svg.selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  barAndLabel.append("rect")
    .attr("x", labelMargin)
    .attr("y", 0)
    .attr("width", d => xScale(d.count) - labelMargin)
    .attr("height", yScale.bandwidth())
    .attr("fill", "#6baed6");

  barAndLabel.append("text")
    .text(d => d.brand)
    .attr("x", labelMargin - 8)
    .attr("y", yScale.bandwidth() / 2 + 4)
    .attr("text-anchor", "end")
    .style("font-size", "11px")
    .style("fill", "#555")
    .style("font-family", "sans-serif");

  barAndLabel.append("text")
    .text(d => d.count)
    .attr("x", d => xScale(d.count) + 5)
    .attr("y", yScale.bandwidth() / 2 + 4)
    .attr("text-anchor", "start")
    .style("font-size", "10px")
    .style("fill", "#666")
    .style("font-family", "sans-serif");
}