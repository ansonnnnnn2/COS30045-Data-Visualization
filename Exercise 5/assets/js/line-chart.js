{
  const width = 800;
  const height = 500;
  const margin = { top: 40, right: 30, bottom: 60, left: 70 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select("#line-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("border", "1px solid #ccc");

  const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  d3.csv("data/ARE_Spot_Prices.csv", d => {
    return {
      year: +d.Year || +d.year,
      averagePrice: +d.Average || +d.average || +d.averagePrice || +d[Object.keys(d)[Object.keys(d).length - 1]]
    };
  }).then(data => {
    data.sort((a, b) => a.year - b.year);
    drawLineChart(data);
  }).catch(err => {
    console.error("Error loading ARE_Spot_Prices.csv:", err);
  });

  function drawLineChart(data) {
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.year))
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.averagePrice) * 1.1])
      .range([innerHeight, 0]);

    const bottomAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
    const leftAxis = d3.axisLeft(yScale);

    innerChart.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis)
      .selectAll("text")
      .style("font-size", "12px");

    innerChart.append("g")
      .attr("class", "y-axis")
      .call(leftAxis)
      .selectAll("text")
      .style("font-size", "12px");

    innerChart.append("text")
      .attr("x", 0)
      .attr("y", -15)
      .attr("text-anchor", "start")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#333")
      .text("Average Spot Price ($/MWh)");

    innerChart.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 45)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#333")
      .text("Year");

    const lineGenerator = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.averagePrice));

    innerChart.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#2b7bba")
      .attr("stroke-width", 2.5)
      .attr("d", lineGenerator);

    innerChart.selectAll("circle.dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.averagePrice))
      .attr("r", 4)
      .attr("fill", "#2b7bba");
  }
}