import React, { useEffect, useRef } from 'react';

const TWO_PI = Math.PI * 2;

// Rough continent outlines as lat/lng arrays [lat, lng]
const CONTINENT_DOTS = (() => {
  const dots = [];
  // Africa
  for (let lat = -35; lat <= 37; lat += 3) {
    for (let lng = -18; lng <= 52; lng += 3) {
      if (
        (lat > -5 && lat < 37 && lng > -18 && lng < 52) ||
        (lat > -35 && lat < -5 && lng > 10 && lng < 42)
      ) dots.push([lat, lng]);
    }
  }
  // Europe
  for (let lat = 36; lat <= 71; lat += 3) {
    for (let lng = -10; lng <= 40; lng += 3) {
      dots.push([lat, lng]);
    }
  }
  // Asia
  for (let lat = 5; lat <= 70; lat += 3) {
    for (let lng = 40; lng <= 140; lng += 3) {
      dots.push([lat, lng]);
    }
  }
  // North America
  for (let lat = 25; lat <= 70; lat += 3) {
    for (let lng = -130; lng <= -60; lng += 3) {
      dots.push([lat, lng]);
    }
  }
  // South America
  for (let lat = -55; lat <= 12; lat += 3) {
    for (let lng = -80; lng <= -35; lng += 3) {
      dots.push([lat, lng]);
    }
  }
  // Australia
  for (let lat = -40; lat <= -10; lat += 3) {
    for (let lng = 113; lng <= 155; lng += 3) {
      dots.push([lat, lng]);
    }
  }
  return dots;
})();

// Connection nodes on the globe
const NODES = [
  [51, -0.1],   // London
  [40.7, -74],  // New York
  [35.7, 139],  // Tokyo
  [-1.3, 36.8], // Nairobi
  [1.3, 103.8], // Singapore
  [48.8, 2.3],  // Paris
  [19.1, 72.9], // Mumbai
  [-23.5, -46.6], // Sao Paulo
  [55.7, 37.6], // Moscow
  [37.6, -122], // San Francisco
  [-33.9, 18.4], // Cape Town
  [30.0, 31.2], // Cairo
];

// Connections between nodes
const CONNECTIONS = [
  [0, 3], [0, 4], [0, 1], [1, 6], [2, 4], [3, 11],
  [4, 6], [5, 0], [7, 3], [8, 0], [9, 1], [10, 3], [11, 10]
];

// Floating data labels
const DATA_LABELS = [
  { x: -0.70, y: -0.60, text: '653.654' },
  { x: 0.65,  y: -0.55, text: '483.215' },
  { x: 0.60,  y:  0.15, text: '457.266' },
  { x: 0.55,  y:  0.50, text: '451.246' },
  { x: -0.55, y:  0.55, text: '62.128'  },
  { x:  0.10, y:  0.72, text: '238.510' },
  { x: -0.65, y:  0.10, text: '93.31'   },
  { x: -0.50, y: -0.10, text: '823.11'  },
];

function latLngToXYZ(lat, lng, rotY) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + rotY) * (Math.PI / 180);
  return {
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
}

export const InteractiveGlobe = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const rotRef = useRef(180); // start showing Africa

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    resize();
    window.addEventListener('resize', resize);

    let last = null;
    const draw = (ts) => {
      if (!last) last = ts;
      const dt = ts - last;
      last = ts;

      // Anticlockwise = decrease rotation angle
      rotRef.current -= (dt / 1000) * 8; // 8 deg/sec

      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.38;
      const dpr = window.devicePixelRatio;

      ctx.clearRect(0, 0, W, H);

      // --- Outer glow ---
      const outerGlow = ctx.createRadialGradient(cx, cy, R * 0.5, cx, cy, R * 1.6);
      outerGlow.addColorStop(0, 'rgba(0, 100, 255, 0.05)');
      outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, W, H);

      // --- Globe base ---
      const globeGrad = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.25, R * 0.05, cx, cy, R);
      globeGrad.addColorStop(0, 'rgba(0, 160, 255, 0.18)');
      globeGrad.addColorStop(0.5, 'rgba(0, 80, 180, 0.08)');
      globeGrad.addColorStop(1, 'rgba(0, 10, 60, 0.6)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, TWO_PI);
      ctx.fillStyle = globeGrad;
      ctx.fill();

      // --- Globe edge glow ---
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, TWO_PI);
      ctx.strokeStyle = 'rgba(0, 160, 255, 0.5)';
      ctx.lineWidth = 2 * dpr;
      ctx.stroke();

      // --- Orbit rings ---
      const rings = [
        { rx: R * 1.18, ry: R * 0.25, angle: -0.3 },
        { rx: R * 1.30, ry: R * 0.20, angle: 0.5 },
      ];
      rings.forEach(ring => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ring.angle);
        ctx.scale(1, ring.ry / ring.rx);
        ctx.beginPath();
        ctx.arc(0, 0, ring.rx, 0, TWO_PI);
        ctx.restore();
        ctx.strokeStyle = 'rgba(0, 180, 255, 0.35)';
        ctx.lineWidth = 1 * dpr;
        ctx.stroke();
      });

      // --- Latitude / longitude grid lines ---
      ctx.lineWidth = 0.5 * dpr;
      ctx.strokeStyle = 'rgba(0, 150, 255, 0.12)';
      for (let lat = -60; lat <= 60; lat += 30) {
        const phi = (90 - lat) * (Math.PI / 180);
        const yRing = Math.cos(phi) * R;
        const rRing = Math.sin(phi) * R;
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(cx, cy + yRing, rRing, rRing * 0.1, 0, 0, TWO_PI);
        ctx.stroke();
        ctx.restore();
      }

      // --- Continent dots ---
      const rot = rotRef.current;
      CONTINENT_DOTS.forEach(([lat, lng]) => {
        const p = latLngToXYZ(lat, lng, rot);
        if (p.z < 0) return; // backface
        const sx = cx + p.x * R;
        const sy = cy - p.y * R;
        const brightness = 0.3 + p.z * 0.7;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.2 * dpr, 0, TWO_PI);
        ctx.fillStyle = `rgba(0, ${Math.floor(160 + brightness * 95)}, 255, ${brightness})`;
        ctx.fill();
      });

      // --- Node glow dots ---
      const nodePositions = NODES.map(([lat, lng]) => {
        const p = latLngToXYZ(lat, lng, rot);
        return { ...p, visible: p.z > 0 };
      });

      // --- Connection lines ---
      CONNECTIONS.forEach(([a, b]) => {
        const pa = nodePositions[a];
        const pb = nodePositions[b];
        if (!pa.visible || !pb.visible) return;
        const sax = cx + pa.x * R;
        const say = cy - pa.y * R;
        const sbx = cx + pb.x * R;
        const sby = cy - pb.y * R;
        ctx.beginPath();
        ctx.moveTo(sax, say);
        ctx.lineTo(sbx, sby);
        ctx.strokeStyle = 'rgba(0, 200, 255, 0.4)';
        ctx.lineWidth = 0.8 * dpr;
        ctx.stroke();
      });

      // --- Node dots ---
      nodePositions.forEach(p => {
        if (!p.visible) return;
        const sx = cx + p.x * R;
        const sy = cy - p.y * R;
        // Outer glow
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 12 * dpr);
        g.addColorStop(0, 'rgba(0, 220, 255, 0.8)');
        g.addColorStop(1, 'rgba(0, 220, 255, 0)');
        ctx.beginPath();
        ctx.arc(sx, sy, 12 * dpr, 0, TWO_PI);
        ctx.fillStyle = g;
        ctx.fill();
        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, 3 * dpr, 0, TWO_PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      });

      // --- Glint (specular highlight) ---
      const glint = ctx.createRadialGradient(
        cx - R * 0.28, cy - R * 0.28, 0,
        cx - R * 0.28, cy - R * 0.28, R * 0.45
      );
      glint.addColorStop(0, 'rgba(160, 220, 255, 0.30)');
      glint.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, TWO_PI);
      ctx.fillStyle = glint;
      ctx.fill();

      // --- Floating data labels ---
      ctx.font = `${11 * dpr}px 'Courier New', monospace`;
      DATA_LABELS.forEach(({ x, y, text }) => {
        const lx = cx + x * R * 1.45;
        const ly = cy + y * R * 1.45;
        ctx.fillStyle = 'rgba(0, 180, 255, 0.7)';
        ctx.fillText(text, lx, ly);
        // Tiny connecting line toward globe
        ctx.beginPath();
        ctx.moveTo(lx - 4 * dpr, ly - 3 * dpr);
        ctx.lineTo(cx + x * R * 0.98, cy + y * R * 0.98);
        ctx.strokeStyle = 'rgba(0, 150, 255, 0.25)';
        ctx.lineWidth = 0.7 * dpr;
        ctx.stroke();
      });

      // --- Icon hexagons (top left / bottom right) ---
      const icons = [
        { lx: cx - R * 1.0, ly: cy - R * 0.85 },
        { lx: cx - R * 0.85, ly: cy + R * 0.75 },
        { lx: cx + R * 0.9, ly: cy + R * 0.55 },
      ];
      icons.forEach(({ lx, ly }) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i - Math.PI / 6;
          const hx = lx + 14 * dpr * Math.cos(a);
          const hy = ly + 14 * dpr * Math.sin(a);
          i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(0, 200, 255, 0.55)';
        ctx.lineWidth = 1.2 * dpr;
        ctx.stroke();
        ctx.fillStyle = 'rgba(0, 80, 180, 0.25)';
        ctx.fill();
        // icon center dot
        ctx.beginPath();
        ctx.arc(lx, ly, 3 * dpr, 0, TWO_PI);
        ctx.fillStyle = 'rgba(0, 220, 255, 0.9)';
        ctx.fill();
      });

      // --- Particle sparks around the sphere ---
      const t = ts / 1000;
      for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * TWO_PI + t * (i % 2 === 0 ? 0.2 : -0.2);
        const r = R * (1.02 + 0.06 * Math.sin(t * 0.7 + i));
        const px2 = cx + r * Math.cos(angle);
        const py2 = cy + r * Math.sin(angle) * 0.35;
        const alpha = 0.2 + 0.5 * Math.abs(Math.sin(t + i));
        ctx.beginPath();
        ctx.arc(px2, py2, 1.5 * dpr, 0, TWO_PI);
        ctx.fillStyle = `rgba(0, 200, 255, ${alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Deep space background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #030d1f 0%, #000510 60%, #000000 100%)',
        }}
      />
      {/* Star field */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px),
            radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px, 200px 200px',
          backgroundPosition: '0 0, 60px 60px',
          opacity: 0.4,
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
};
