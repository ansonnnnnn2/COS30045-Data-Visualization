const width = 800;
const height = 450;
const margin = { top: 40, right: 30, bottom: 60, left: 70 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const barColor = "#6baed6";
const bodyBackgroundColor = "#ffffff";

let xScale = d3.scaleLinear();
let yScale = d3.scaleLinear();

let xScaleS = d3.scaleLinear();
let yScaleS = d3.scaleLinear();

const colorScale = d3.scaleOrdinal()
  .domain(["LED", "OLED", "LCD"])
  .range(["#2b7bba", "#e6550d", "#31a354"]);

const binGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .thresholds(14);

const filters = [
  { id: "all", label: "All Screen Types", isActive: true },
  { id: "LED", label: "LED", isActive: false },
  { id: "OLED", label: "OLED", isActive: false },
  { id: "LCD", label: "LCD", isActive: false }
];

const tooltipWidth = 110;
const tooltipHeight = 40;