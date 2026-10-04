function populateFilters(data) {
  const container = d3.select("#filters_screen");

  container.selectAll("button")
    .data(filters)
    .join("button")
    .attr("class", d => `filter-btn ${d.isActive ? "active" : ""}`)
    .text(d => d.label)
    .on("click", (event, d) => {
      // Toggle active states
      filters.forEach(f => f.isActive = false);
      d.isActive = true;

      container.selectAll("button")
        .classed("active", f => f.isActive);

      updateHistogram(data, d.id);
    });
}

function updateHistogram(data, filterId) {

  const filteredData = (filterId === "all")
    ? data.filter(d => d.energyConsumption <= 1800)
    : data.filter(d => d.screenTech === filterId && d.energyConsumption <= 1800);

  const updatedBins = binGenerator(filteredData);


  innerChartH.selectAll("rect.bin-bar")
    .data(updatedBins)
    .join("rect")
    .attr("class", "bin-bar")
    .transition()
    .duration(600)
    .ease(d3.easeCubicOut)
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 2))
    .attr("height", d => innerHeight - yScale(d.length))
    .attr("fill", barColor);
}

let tooltipGroup;

function createTooltip() {
  tooltipGroup = innerChartS.append("g")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("pointer-events", "none");


  tooltipGroup.append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("fill", "#2b7bba")
    .attr("opacity", 0.9);


  tooltipGroup.append("text")
    .attr("x", tooltipWidth / 2)
    .attr("y", tooltipHeight / 2 + 4)
    .attr("text-anchor", "middle")
    .style("fill", "#ffffff")
    .style("font-size", "11px")
    .style("font-weight", "600");
}

function handleMouseEvents() {
  innerChartS.selectAll("circle.dot")
    .on("mouseenter", function (event, d) {
      const cx = +d3.select(this).attr("cx");
      const cy = +d3.select(this).attr("cy");


      tooltipGroup
        .attr("transform", `translate(${cx - tooltipWidth / 2}, ${cy - tooltipHeight - 10})`)
        .transition()
        .duration(200)
        .style("opacity", 1);

      tooltipGroup.select("text")
        .text(`${d.screenSize}" | ${d.screenTech}`);
    })
    .on("mouseleave", function () {
      tooltipGroup
        .transition()
        .duration(200)
        .style("opacity", 0);
    });
}