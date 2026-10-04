let innerChartS;

function drawScatterplot(data) {
  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("border", "1px solid #ccc");


  innerChartS = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


  const ratedData = data.filter(d => d.starRating > 0);


  const maxStar = d3.max(ratedData, d => d.starRating) || 9;
  const maxEnergy = d3.max(ratedData, d => d.energyConsumption) || 1800;

  xScaleS
    .domain([0, maxStar + 1])
    .range([0, innerWidth]);

  yScaleS
    .domain([0, maxEnergy * 1.05])
    .range([innerHeight, 0]);


  innerChartS.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScaleS));

  innerChartS.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScaleS));


  innerChartS.append("text")
    .attr("class", "axis-label")
    .attr("x", 0)
    .attr("y", -15)
    .text("Energy Consumption (kWh/year)");

  innerChartS.append("text")
    .attr("class", "axis-label")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + 45)
    .attr("text-anchor", "middle")
    .text("Star Rating");


  innerChartS.selectAll("circle.dot")
    .data(ratedData)
    .join("circle")
    .attr("class", "dot")
    .attr("cx", d => xScaleS(d.starRating))
    .attr("cy", d => yScaleS(d.energyConsumption))
    .attr("r", 4.5)
    .attr("fill", d => colorScale(d.screenTech))
    .attr("opacity", 0.5);

 
  const legend = innerChartS.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${innerWidth - 110}, 10)`);

  colorScale.domain().forEach((tech, i) => {
    const legendRow = legend.append("g")
      .attr("transform", `translate(0, ${i * 22})`);

    legendRow.append("rect")
      .attr("width", 14)
      .attr("height", 14)
      .attr("fill", colorScale(tech));

    legendRow.append("text")
      .attr("x", 20)
      .attr("y", 11)
      .style("font-size", "12px")
      .style("fill", "#444")
      .text(tech);
  });
}