// main.js — hash router and page rendering for Japan in Numbers.
// Pages: overview, population, economy, labour, health, education, environment.
// All controls are wired: nav, year buttons, chart-type toggle, region
// filter and prefecture search, and every chart is drawn from data.js.

import * as D from "./data.js";
import { drawBarChart, drawLineChart, drawDonut, drawHorizontalBars } from "./charts.js";

const app = document.getElementById("app");

const NAV = [
  { hash: "#/", label: "Overview", key: "overview" },
  { hash: "#/population", label: "Population", key: "population" },
  { hash: "#/economy", label: "Economy", key: "economy" },
  { hash: "#/labour", label: "Labour", key: "labour" },
  { hash: "#/health", label: "Health", key: "health" },
  { hash: "#/education", label: "Education", key: "education" },
  { hash: "#/environment", label: "Environment", key: "environment" }
];

let econMode = "bar";
let popYear = 2024;

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function sourceLine(text) {
  return '<p class="src">Source: ' + esc(text) + "</p>";
}

function kpiCards(items) {
  return '<div class="kpis">' + items.map((it) =>
    '<article class="kpi"><div class="kpi-label">' + esc(it.label) + "</div>" +
    '<div class="kpi-value">' + esc(it.value) + "</div>" +
    '<div class="kpi-detail">' + esc(it.detail || "") + "</div>" +
    '<div class="kpi-src">' + esc(it.source) + "</div></article>"
  ).join("") + "</div>";
}

function factTable(rows, headA, headB) {
  return '<table class="facts"><thead><tr><th>' + esc(headA) + "</th><th>" + esc(headB) +
    "</th><th>Source &amp; year</th></tr></thead><tbody>" + rows.map((r) =>
    "<tr><td>" + esc(r.label) + "</td><td><strong>" + esc(r.value) + "</strong>" +
    (r.detail ? " <span class='muted'>" + esc(r.detail) + "</span>" : "") +
    "</td><td>" + esc(r.source) + "</td></tr>").join("") + "</tbody></table>";
}

function renderOverview() {
  app.innerHTML =
    '<section class="hero"><h1>Japan in Numbers</h1>' +
    '<p class="lede">A clear, sourced atlas of Japan — population, economy, work, health, ' +
    "education and the environment. Every figure names its source and year.</p>" +
    '<p class="meta">Country: Japan &nbsp;·&nbsp; Currency: yen (JPY) &nbsp;·&nbsp; Last updated 26 November 2026</p></section>' +
    kpiCards(D.HEADLINES) +
    '<section class="panel"><h2>At a glance</h2>' +
    "<p>Japan is the world's fourth-largest economy and its most aged large society. " +
    "In 2024 the population fell to 124.0 million, births fell to 720,988 — the lowest " +
    "since records began — while life expectancy stayed among the world's longest at 84.0 years. " +
    "Unemployment held at 2.5%, and consumer prices rose 2.7%.</p>" +
    sourceLine("Statistics Bureau; MHLW Vital Statistics; IMF World Economic Outlook, 2024") +
    "</section>" +
    '<section class="panel"><h2>Explore by topic</h2><div class="topics">' +
    NAV.slice(1).map((n) => '<a class="topic" href="' + n.hash + '"><strong>' + esc(n.label) +
    "</strong><span>Open the " + esc(n.label.toLowerCase()) + " page →</span></a>").join("") +
    "</div></section>" +
    '<section class="panel"><h2>Where the numbers come from</h2><ul class="sources">' +
    D.SOURCES.map((s) => "<li><strong>" + esc(s.name) + "</strong> — " + esc(s.what) + "</li>").join("") +
    "</ul></section>";
}

function renderPopulation() {
  const years = D.POPULATION_SERIES.map((p) => p.year);
  const yearRow = D.VITAL.find((v) => v.year === popYear) || D.VITAL[D.VITAL.length - 1];
  app.innerHTML =
    "<section><h1>Population</h1>" +
    '<p class="lede">Japan\'s population has fallen every year since 2011. Pick a year to see that year\'s births, deaths and fertility.</p></section>' +
    '<div class="controls" role="group" aria-label="Choose a year">' +
    D.VITAL.map((v) => '<button class="pill' + (v.year === popYear ? " active" : "") +
      '" data-year="' + v.year + '">' + v.year + "</button>").join("") + "</div>" +
    '<div id="year-facts"></div>' +
    '<section class="panel"><h2>Population, ' + years[0] + "–" + years[years.length - 1] + " (millions)</h2>" +
    '<canvas id="pop-chart" aria-label="Population chart"></canvas>' +
    sourceLine("Statistics Bureau of Japan, Population Estimates and Census, 2010–2024") + "</section>" +
    '<section class="panel"><h2>Age structure, 2024</h2>' +
    '<canvas id="age-chart" aria-label="Age structure chart"></canvas>' +
    '<p>Nearly three in ten people are aged 65 or over — the highest share in the world. ' +
    "The working-age share keeps shrinking as the 65+ group grows.</p>" +
    sourceLine("Statistics Bureau, Population Estimates, 1 October 2024") + "</section>" +
    '<section class="panel"><h2>Births, deaths and fertility</h2>' +
    '<table class="facts"><thead><tr><th>Year</th><th>Births</th><th>Deaths</th><th>Fertility rate</th></tr></thead><tbody>' +
    D.VITAL.map((v) => "<tr><td>" + v.year + "</td><td>" + v.births.toLocaleString("en-US") +
      "</td><td>" + v.deaths.toLocaleString("en-US") + "</td><td>" + v.tfr.toFixed(2) + "</td></tr>").join("") +
    "</tbody></table>" + sourceLine("MHLW Vital Statistics, 2010–2024") + "</section>";
  document.getElementById("year-facts").innerHTML = kpiCards([
    { label: "Births in " + popYear, value: yearRow.births.toLocaleString("en-US"), detail: "Live births", source: "MHLW Vital Statistics, " + popYear },
    { label: "Deaths in " + popYear, value: yearRow.deaths.toLocaleString("en-US"), detail: "Natural decrease " + (yearRow.deaths - yearRow.births).toLocaleString("en-US"), source: "MHLW Vital Statistics, " + popYear },
    { label: "Fertility rate in " + popYear, value: yearRow.tfr.toFixed(2), detail: "Children per woman", source: "MHLW Vital Statistics, " + popYear }
  ]);
  app.querySelectorAll("[data-year]").forEach((b) => b.addEventListener("click", () => {
    popYear = Number(b.dataset.year);
    renderPopulation();
  }));
  drawBarChart(document.getElementById("pop-chart"),
    D.POPULATION_SERIES.map((p) => String(p.year)),
    D.POPULATION_SERIES.map((p) => p.total),
    { color: "#1b2a5e", format: (v) => v.toFixed(2) });
  drawDonut(document.getElementById("age-chart"), D.AGE_STRUCTURE,
    { center: "124.0m", centerSub: "people, 2024" });
}

function renderEconomy() {
  app.innerHTML =
    "<section><h1>Economy</h1>" +
    '<p class="lede">Nominal GDP, prices and trade — with the yen\'s slide visible in the dollar figures after 2021.</p></section>' +
    kpiCards(D.ECONOMY_FACTS) +
    '<section class="panel"><h2>Nominal GDP (US$ trillion)</h2>' +
    '<div class="controls" role="group" aria-label="Chart type">' +
    '<button class="pill' + (econMode === "bar" ? " active" : "") + '" data-mode="bar">Bar chart</button>' +
    '<button class="pill' + (econMode === "line" ? " active" : "") + '" data-mode="line">Line chart</button></div>' +
    '<canvas id="gdp-chart" aria-label="GDP chart"></canvas>' +
    sourceLine("IMF World Economic Outlook, 2020–2024. Dollar figures fall after 2021 mainly because the yen weakened.") + "</section>" +
    '<section class="panel"><h2>Consumer price inflation (% per year)</h2>' +
    '<canvas id="cpi-chart" aria-label="Inflation chart"></canvas>' +
    sourceLine("Statistics Bureau, Consumer Price Index, annual average, 2020–2024") + "</section>" +
    '<section class="panel"><h2>Trade in goods (¥ trillion)</h2>' +
    '<table class="facts"><thead><tr><th>Year</th><th>Exports</th><th>Imports</th><th>Balance</th></tr></thead><tbody>' +
    D.TRADE.map((t) => "<tr><td>" + t.year + "</td><td>¥" + t.exports.toFixed(1) + "</td><td>¥" + t.imports.toFixed(1) +
      "</td><td>¥" + (t.exports - t.imports).toFixed(1) + "</td></tr>").join("") +
    "</tbody></table>" + sourceLine("Ministry of Finance, Trade Statistics of Japan, 2022–2024") + "</section>";
  app.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", () => {
    econMode = b.dataset.mode;
    renderEconomy();
  }));
  const labels = D.GDP_SERIES.map((g) => String(g.year));
  const values = D.GDP_SERIES.map((g) => g.gdp);
  if (econMode === "line") {
    drawLineChart(document.getElementById("gdp-chart"), labels, values, { color: "#d64533", format: (v) => "$" + v.toFixed(2) + "tn" });
  } else {
    drawBarChart(document.getElementById("gdp-chart"), labels, values, { color: "#1b2a5e", format: (v) => "$" + v.toFixed(2) + "tn" });
  }
  drawLineChart(document.getElementById("cpi-chart"),
    D.CPI_SERIES.map((c) => String(c.year)),
    D.CPI_SERIES.map((c) => c.cpi),
    { color: "#3d8b4f", format: (v) => v.toFixed(1) + "%" });
}

function renderLabour() {
  app.innerHTML =
    "<section><h1>Labour</h1>" +
    '<p class="lede">A tight labour market: unemployment at 2.5% and 1.25 job openings for every applicant in 2024.</p></section>' +
    factTable(D.LABOUR_FACTS, "Indicator", "Figure") +
    '<section class="panel"><h2>Unemployment rate (% of labour force)</h2>' +
    '<canvas id="unemp-chart" aria-label="Unemployment chart"></canvas>' +
    sourceLine("Statistics Bureau, Labour Force Survey, annual average, 2019–2024") + "</section>" +
    '<section class="panel"><h2>Largest prefectures by population</h2>' +
    '<div class="controls"><label for="region-filter">Region</label> ' +
    '<select id="region-filter">' + D.REGIONS.map((r) => "<option>" + esc(r) + "</option>").join("") + "</select>" +
    '<label for="pref-search">Search</label> <input id="pref-search" type="search" placeholder="Type a prefecture, e.g. Osaka"></div>' +
    '<div id="pref-results"></div>' +
    sourceLine("Statistics Bureau, Population Estimates, 1 October 2024") + "</section>";
  drawLineChart(document.getElementById("unemp-chart"),
    D.UNEMPLOYMENT.map((u) => String(u.year)),
    D.UNEMPLOYMENT.map((u) => u.rate),
    { color: "#1b2a5e", format: (v) => v.toFixed(1) + "%" });
  const regionSel = document.getElementById("region-filter");
  const searchBox = document.getElementById("pref-search");
  const results = document.getElementById("pref-results");
  function renderPrefs() {
    const q = searchBox.value.trim().toLowerCase();
    const region = regionSel.value;
    const list = D.PREFECTURES.filter((p) =>
      (region === "All regions" || p.region === region) &&
      (!q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q)));
    results.innerHTML = list.length
      ? '<table class="facts"><thead><tr><th>Prefecture</th><th>Capital</th><th>Region</th><th>Population (m)</th></tr></thead><tbody>' +
        list.map((p) => "<tr><td>" + esc(p.name) + "</td><td>" + esc(p.capital) + "</td><td>" + esc(p.region) +
          "</td><td>" + p.population.toFixed(2) + "</td></tr>").join("") + "</tbody></table>"
      : '<p class="empty">No prefecture matches that search. Try another name.</p>';
  }
  regionSel.addEventListener("change", renderPrefs);
  searchBox.addEventListener("input", renderPrefs);
  renderPrefs();
}

function renderHealth() {
  app.innerHTML =
    "<section><h1>Health</h1>" +
    '<p class="lede">Long lives and universal coverage: life expectancy 84.0 years, with more hospital beds per person than any other OECD country.</p></section>' +
    factTable(D.HEALTH_FACTS, "Indicator", "Figure") +
    '<section class="panel"><h2>Life expectancy at birth (years)</h2>' +
    '<canvas id="life-chart" aria-label="Life expectancy chart"></canvas>' +
    sourceLine("MHLW, abridged life tables. 2024: men 81.09, women 87.13; average shown as 84.0.") + "</section>" +
    '<section class="panel"><h2>How to read these numbers</h2>' +
    "<p>Japan's health system covers every resident through public insurance, and patients " +
    "pay 30% of costs at the point of care (less for children and older people). High bed numbers " +
    "reflect long hospital stays, not only more treatment — Japan's average length of stay is far above the OECD average.</p>" +
    sourceLine("OECD Health at a Glance 2023") + "</section>";
  drawBarChart(document.getElementById("life-chart"),
    ["Men", "Women", "Average"],
    [81.09, 87.13, 84.0],
    { color: "#2f6fb2", format: (v) => v.toFixed(2) });
}

function renderEducation() {
  app.innerHTML =
    "<section><h1>Education</h1>" +
    '<p class="lede">Top of the class in maths and science, and the highest tertiary attainment in the OECD.</p></section>' +
    factTable(D.EDUCATION_FACTS, "Indicator", "Figure") +
    '<section class="panel"><h2>PISA 2022 scores (OECD average in brackets)</h2>' +
    '<canvas id="pisa-chart" aria-label="PISA chart"></canvas>' +
    sourceLine("OECD PISA 2022: mathematics 536 (OECD 472), reading 516 (476), science 547 (485)") + "</section>" +
    '<section class="panel"><h2>School life</h2>' +
    "<p>Compulsory schooling runs from age 6 to 15. Almost all pupils continue to upper secondary " +
    "school, and about two in three young adults now hold a tertiary qualification — the highest rate in the OECD. " +
    "The school year starts in April, and the university entrance season in January–March shapes family life across the country.</p>" +
    sourceLine("OECD Education at a Glance 2024") + "</section>";
  drawBarChart(document.getElementById("pisa-chart"),
    ["Maths", "Reading", "Science"],
    [536, 516, 547],
    { color: "#3d8b4f", format: (v) => String(v) });
}

function renderEnvironment() {
  app.innerHTML =
    "<section><h1>Environment</h1>" +
    '<p class="lede">Emissions are falling slowly, renewables passed a quarter of electricity, and two-thirds of the country is forest.</p></section>' +
    factTable(D.ENVIRONMENT_FACTS, "Indicator", "Figure") +
    '<section class="panel"><h2>Electricity generation mix, fiscal 2023 (%)</h2>' +
    '<canvas id="energy-chart" aria-label="Energy mix chart"></canvas>' +
    sourceLine("METI, fiscal 2023 generation mix. Shares sum to 100%.") + "</section>" +
    '<section class="panel"><h2>Climate targets</h2>' +
    "<p>Japan aims for carbon neutrality by 2050 and a 46% cut in greenhouse-gas emissions by fiscal 2030 " +
    "against fiscal 2013. Energy-related CO2 fell to 1.01 billion tonnes in fiscal 2023, helped by " +
    "restarts of nuclear plants and growth in solar power.</p>" +
    sourceLine("Government of Japan; Ministry of the Environment, FY2023") + "</section>";
  drawHorizontalBars(document.getElementById("energy-chart"), D.ENERGY_MIX, { height: 220 });
}

const PAGES = {
  overview: renderOverview,
  population: renderPopulation,
  economy: renderEconomy,
  labour: renderLabour,
  health: renderHealth,
  education: renderEducation,
  environment: renderEnvironment
};

export function route() {
  const key = (location.hash || "#/").replace(/^#\/?/, "") || "overview";
  const page = PAGES[key] || PAGES.overview;
  document.querySelectorAll("nav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.page === key);
  });
  page();
  window.scrollTo(0, 0);
  // Redraw charts after a resize so canvas stays sharp and in bounds.
  window.addEventListener("resize", () => {
    clearTimeout(window.__jnResizeTimer);
    window.__jnResizeTimer = setTimeout(route, 150);
  });
}

window.addEventListener("hashchange", route);
route();
