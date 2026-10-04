let innerChartH;

function drawHistogram(data) {
  const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("border", "1px solid #ccc");

  innerChartH = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


  const cleanData = data.filter(d => d.energyConsumption <= 1800);


  const bins = binGenerator(cleanData);


  const minX = bins[0].x0;
  const maxX = bins[bins.length - 1].x1;
  const maxBinLength = d3.max(bins, d => d.length);

  xScale
    .domain([minX, maxX])
    .range([0, innerWidth]);

  yScale
    .domain([0, maxBinLength * 1.05])
    .range([innerHeight, 0]);


  innerChartH.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale));

  innerChartH.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale));

  // Labels
  innerChartH.append("text")
    .attr("class", "axis-label")
    .attr("x", 0)
    .attr("y", -15)
    .text("Number of TV Models (Frequency)");

  innerChartH.append("text")
    .attr("class", "axis-label")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + 45)
    .attr("text-anchor", "middle")
    .text("Energy Consumption (kWh/year)");

  // Draw Bars
  innerChartH.selectAll("rect.bin-bar")
    .data(bins)
    .join("rect")
    .attr("class", "bin-bar")
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 2))
    .attr("height", d => innerHeight - yScale(d.length))
    .attr("fill", barColor);
}