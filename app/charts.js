// charts.js — hand-drawn canvas charts. No libraries, no network.
// Every chart draws from the data passed in and labels its axes.

export function setupCanvas(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || canvas.parentElement.clientWidth || 640;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.height = height + "px";
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  return { ctx, width, height };
}

function axes(ctx, w, h, pad, minVal, maxVal, ticks) {
  ctx.strokeStyle = "#c9c2b4";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top);
  ctx.lineTo(pad.left, h - pad.bottom);
  ctx.lineTo(w - pad.right, h - pad.bottom);
  ctx.stroke();
  ctx.fillStyle = "#6b6455";
  ctx.font = "11px system-ui, sans-serif";
  ctx.textAlign = "right";
  const span = maxVal - minVal || 1;
  for (let i = 0; i <= ticks; i++) {
    const v = minVal + (span * i) / ticks;
    const y = h - pad.bottom - ((h - pad.top - pad.bottom) * i) / ticks;
    ctx.fillText(trimNumber(v), pad.left - 6, y + 4);
    ctx.strokeStyle = "#e8e2d4";
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
  }
}

function trimNumber(v) {
  if (Math.abs(v) < 10 && v % 1 !== 0) return v.toFixed(1);
  return String(Math.round(v));
}

export function drawBarChart(canvas, labels, values, opts) {
  const height = opts.height || 260;
  const { ctx, width, height: h } = setupCanvas(canvas, height);
  const pad = { left: 52, right: 16, top: 14, bottom: 34 };
  const maxVal = Math.max(...values) * 1.12;
  axes(ctx, width, h, pad, 0, maxVal, 4);
  const slot = (width - pad.left - pad.right) / values.length;
  const barW = Math.min(64, slot * 0.58);
  ctx.textAlign = "center";
  values.forEach((v, i) => {
    const x = pad.left + slot * i + slot / 2;
    const bh = ((h - pad.top - pad.bottom) * v) / maxVal;
    const y = h - pad.bottom - bh;
    ctx.fillStyle = opts.color || "#1b2a5e";
    ctx.fillRect(x - barW / 2, y, barW, bh);
    ctx.fillStyle = "#1b2a5e";
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.fillText(opts.format ? opts.format(v) : String(v), x, y - 6);
    ctx.fillStyle = "#6b6455";
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillText(labels[i], x, h - pad.bottom + 18);
  });
  if (opts.caption) {
    ctx.fillStyle = "#6b6455";
    ctx.font = "11px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(opts.caption, pad.left, h - 4);
  }
}

export function drawLineChart(canvas, labels, values, opts) {
  const height = opts.height || 260;
  const { ctx, width, height: h } = setupCanvas(canvas, height);
  const pad = { left: 52, right: 20, top: 18, bottom: 34 };
  const min = Math.min(0, ...values);
  const max = Math.max(...values) * 1.12;
  const span = max - min || 1;
  axes(ctx, width, h, pad, min, max, 4);
  const xAt = (i) => pad.left + ((width - pad.left - pad.right) * i) / (values.length - 1);
  const yAt = (v) => h - pad.bottom - ((h - pad.top - pad.bottom) * (v - min)) / span;
  ctx.strokeStyle = opts.color || "#d64533";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  values.forEach((v, i) => (i === 0 ? ctx.moveTo(xAt(i), yAt(v)) : ctx.lineTo(xAt(i), yAt(v))));
  ctx.stroke();
  ctx.textAlign = "center";
  values.forEach((v, i) => {
    ctx.fillStyle = opts.color || "#d64533";
    ctx.beginPath();
    ctx.arc(xAt(i), yAt(v), 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1b2a5e";
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.fillText(opts.format ? opts.format(v) : String(v), xAt(i), yAt(v) - 10);
    ctx.fillStyle = "#6b6455";
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillText(labels[i], xAt(i), h - pad.bottom + 18);
  });
}

export function drawDonut(canvas, segments, opts) {
  const height = opts.height || 260;
  const { ctx, width, height: h } = setupCanvas(canvas, height);
  const narrow = width < 560;
  // On a phone the legend goes under the donut instead of beside it.
  const cx = narrow ? width / 2 : width * 0.32;
  const cy = narrow ? (h - 96) / 2 + 8 : h / 2;
  const r = Math.min((narrow ? h - 96 : h) / 2 - 16, 92);
  let angle = -Math.PI / 2;
  const total = segments.reduce((s, seg) => s + seg.share, 0);
  segments.forEach((seg) => {
    const sweep = (seg.share / total) * Math.PI * 2;
    ctx.fillStyle = seg.color;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + sweep);
    ctx.closePath();
    ctx.fill();
    angle += sweep;
  });
  ctx.fillStyle = "#f7f4ee";
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1b2a5e";
  ctx.font = "bold 15px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(opts.center || "", cx, cy - 2);
  ctx.fillStyle = "#6b6455";
  ctx.font = "11px system-ui, sans-serif";
  ctx.fillText(opts.centerSub || "", cx, cy + 16);
  // Legend: beside the donut on desktop, below it on a phone.
  ctx.textAlign = "left";
  if (narrow) {
    let lx = 8;
    let ly = h - 84;
    segments.forEach((seg) => {
      ctx.fillStyle = seg.color;
      ctx.fillRect(lx, ly - 9, 12, 12);
      ctx.fillStyle = "#1b2a5e";
      ctx.font = "12px system-ui, sans-serif";
      ctx.fillText(seg.group + " " + seg.share + "%", lx + 18, ly + 2);
      ly += 26;
    });
  } else {
    let ly = cy - segments.length * 16;
    segments.forEach((seg) => {
      ctx.fillStyle = seg.color;
      ctx.fillRect(width * 0.58, ly - 9, 12, 12);
      ctx.fillStyle = "#1b2a5e";
      ctx.font = "13px system-ui, sans-serif";
      ctx.fillText(seg.group + " — " + seg.share + "%", width * 0.58 + 20, ly + 2);
      ly += 32;
    });
  }
}

export function drawHorizontalBars(canvas, items, opts) {
  const height = opts.height || 240;
  const { ctx, width, height: h } = setupCanvas(canvas, height);
  const maxVal = Math.max(...items.map((it) => it.share)) * 1.1;
  const rowH = (h - 20) / items.length;
  ctx.textAlign = "left";
  items.forEach((it, i) => {
    const y = 10 + rowH * i;
    ctx.fillStyle = "#1b2a5e";
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillText(it.source, 4, y + rowH / 2 - 2);
    const barX = 120;
    const barW = ((width - barX - 64) * it.share) / maxVal;
    ctx.fillStyle = it.color;
    ctx.fillRect(barX, y + 4, barW, rowH - 16);
    ctx.fillStyle = "#1b2a5e";
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.fillText(it.share.toFixed(1) + "%", barX + barW + 8, y + rowH / 2 + 2);
  });
}
