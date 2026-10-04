{
  const width = 800;
  const height = 500;
  const margin = 40;
  const radius = Math.min(width, height) / 2 - margin;

  const svg = d3.select("#donut-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("border", "1px solid #ccc");

  const innerChart = svg.append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  d3.csv("data/Data_exercise 5.3.csv", d => {
    const keys = Object.keys(d);
    return {
      category: d.sizeCategory || d.Category || d.Size || d[keys[0]],
      count: +(d.count || d.Count || d.total || d[keys[1]])
    };
  }).then(data => {
    drawDonutChart(data);
  }).catch(err => {
    console.error("Error loading Data_exercise 5.3.csv:", err);
  });

  function drawDonutChart(data) {
    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.category))
      .range(["#2b7bba", "#6baed6", "#a1d99b"]);

    const pie = d3.pie()
      .value(d => d.count)
      .sort(null);

    const arcGenerator = d3.arc()
      .innerRadius(radius * 0.55)
      .outerRadius(radius)
      .padAngle(0.02)
      .cornerRadius(4);

    const labelArc = d3.arc()
      .innerRadius(radius * 0.75)
      .outerRadius(radius * 0.75);

    const arcs = innerChart.selectAll("path.slice")
      .data(pie(data))
      .join("path")
      .attr("class", "slice")
      .attr("d", arcGenerator)
      .attr("fill", d => colorScale(d.data.category))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    innerChart.selectAll("text.label")
      .data(pie(data))
      .join("text")
      .attr("class", "label")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .style("font-size", "13px")
      .style("font-weight", "bold")
      .style("fill", "#fff")
      .text(d => `${d.data.category} (${d.data.count})`);
  }
}