import React, { useEffect, useRef } from 'react';

const TWO_PI = Math.PI * 2;

/**
 * Realistic & Futuristic 3D World Globe
 * High-density dot-matrix continents, atmospheric glow, glowing network arcs,
 * tech icon nodes, and floating telemetry matching the reference image.
 */

// Accurate polygonal landmass test for realistic continent outlines
function isLand(lat, lng) {
  // Africa
  if (lat >= -35 && lat <= 37 && lng >= -18 && lng <= 52) {
    if (lat > 20 && lng > 35) return true; // Egypt / Red Sea
    if (lat > 10 && lat <= 37 && lng >= -17 && lng <= 50) return true; // N. Africa
    if (lat > -5 && lat <= 10 && lng >= -15 && lng <= 45) return true; // Central
    if (lat > -35 && lat <= -5 && lng >= 10 && lng <= 40) return true; // S. Africa
    if (lat >= -26 && lat <= -12 && lng >= 43 && lng <= 50) return true; // Madagascar
  }
  // Europe
  if (lat >= 36 && lat <= 71 && lng >= -10 && lng <= 45) {
    if (lat > 50 && lng < 0 && lng > -10) return true; // UK / Ireland
    if (lat > 54 && lng > 4 && lng < 30) return true; // Scandinavia / Baltic
    if (lat >= 36 && lat <= 54 && lng >= -9 && lng <= 40) return true; // S & C Europe
  }
  // Middle East & Asia
  if (lat >= -10 && lat <= 75 && lng >= 35 && lng <= 145) {
    if (lat >= 12 && lat <= 32 && lng >= 35 && lng <= 60) return true; // Arabia
    if (lat >= 8 && lat <= 35 && lng >= 68 && lng <= 90) return true; // India
    if (lat >= 10 && lat <= 55 && lng >= 95 && lng <= 145) return true; // E Asia / China
    if (lat >= 30 && lat <= 45 && lng >= 129 && lng <= 145) return true; // Japan
    if (lat >= -10 && lat <= 10 && lng >= 95 && lng <= 140) return true; // SE Asia islands
  }
  // North America
  if (lat >= 7 && lat <= 72 && lng >= -168 && lng <= -52) {
    if (lat >= 15 && lat <= 72 && lng >= -130 && lng <= -60) return true; // US / Canada
    if (lat >= 7 && lat <= 30 && lng >= -115 && lng <= -75) return true; // Mexico / CA
    if (lat >= 60 && lng >= -55 && lng <= -20) return true; // Greenland
  }
  // South America
  if (lat >= -56 && lat <= 13 && lng >= -82 && lng <= -34) {
    if (lat >= -55 && lat <= 12 && lng >= -80 && lng <= -35) return true;
  }
  // Australia / NZ
  if (lat >= -44 && lat <= -10 && lng >= 112 && lng <= 178) {
    if (lat >= -40 && lat <= -10 && lng >= 113 && lng <= 154) return true; // Aus
    if (lat >= -47 && lat <= -34 && lng >= 165 && lng <= 178) return true; // NZ
  }
  return false;
}

// Generate realistic dense dot-matrix points
const DENSE_CONTINENT_DOTS = (() => {
  const points = [];
  const step = 1.6; // High resolution sampling
  for (let lat = -70; lat <= 75; lat += step) {
    for (let lng = -180; lng <= 180; lng += step) {
      if (isLand(lat, lng)) {
        // Add tiny pseudo-random jitter for organic technology point cloud effect
        const jitterLat = lat + (Math.sin(lat * 12.3 + lng * 4.5) * 0.2);
        const jitterLng = lng + (Math.cos(lat * 8.1 + lng * 11.2) * 0.2);
        points.push([jitterLat, jitterLng]);
      }
    }
  }
  return points;
})();

// Major Global Tech Hub Nodes (Lat, Lng, Name)
const GLOBAL_NODES = [
  { lat: -1.286, lng: 36.817, name: 'Nairobi', hub: true },   // Salinova HQ
  { lat: 51.507, lng: -0.127, name: 'London', hub: false },
  { lat: 40.712, lng: -74.006, name: 'New York', hub: false },
  { lat: 35.676, lng: 139.650, name: 'Tokyo', hub: false },
  { lat: 25.204, lng: 55.270,  name: 'Dubai', hub: false },
  { lat: 1.352,  lng: 103.819, name: 'Singapore', hub: false },
  { lat: 48.856, lng: 2.352,   name: 'Paris', hub: false },
  { lat: 19.076, lng: 72.877,  name: 'Mumbai', hub: false },
  { lat: -33.924,lng: 18.424,  name: 'Cape Town', hub: false },
  { lat: 37.774, lng: -122.419,name: 'San Francisco', hub: false },
  { lat: -23.550,lng: -46.633, name: 'Sao Paulo', hub: false },
  { lat: -33.868,lng: 151.209, name: 'Sydney', hub: false },
];

// Network connections (arcs) between global nodes
const NETWORK_ARCS = [
  [0, 1], [0, 4], [0, 8], [0, 7], // Nairobi -> London, Dubai, Cape Town, Mumbai
  [1, 2], [1, 6], [1, 4],          // London -> NY, Paris, Dubai
  [2, 9], [2, 10],                 // NY -> SF, Sao Paulo
  [4, 5], [4, 7],                  // Dubai -> Singapore, Mumbai
  [5, 3], [5, 11],                 // Singapore -> Tokyo, Sydney
  [9, 3],                          // SF -> Tokyo
];

// Telemetry & Code Cards overlay data
const TELEMETRY_LABELS = [
  { x: -0.72, y: -0.62, text: '653.654', val: 'SYS_OK' },
  { x:  0.68, y: -0.58, text: '483.215', val: 'SEC_ACTIVE' },
  { x:  0.62, y:  0.18, text: '457.266', val: 'ENC_TLS1.3' },
  { x:  0.58, y:  0.52, text: '451.246', val: 'LAT_12ms' },
  { x: -0.58, y:  0.58, text: '62.128',  val: 'NODE_KE' },
  { x:  0.12, y:  0.74, text: '238.510', val: 'OPS_99.9%' },
  { x: -0.68, y:  0.12, text: '93.31',   val: 'API_200' },
  { x: -0.52, y: -0.12, text: '823.11',  val: 'DB_SYNC' },
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
  const rotRef = useRef(150); // Start showing Africa & Europe centered

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

    let lastTime = null;

    const draw = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const dt = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      // Smooth anticlockwise rotation (rotates leftwards)
      rotRef.current -= dt * 7.5; // 7.5 deg / sec

      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.37;
      const dpr = window.devicePixelRatio;
      const rot = rotRef.current;

      ctx.clearRect(0, 0, W, H);

      // 1. --- Deep space radial background glow ---
      const bgGlow = ctx.createRadialGradient(cx, cy, R * 0.3, cx, cy, R * 1.8);
      bgGlow.addColorStop(0, 'rgba(0, 80, 180, 0.12)');
      bgGlow.addColorStop(0.5, 'rgba(0, 40, 100, 0.05)');
      bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, W, H);

      // 2. --- Outer Cyber Ring & Atmosphere Rim ---
      // Outer subtle ring
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.12, 0, TWO_PI);
      ctx.strokeStyle = 'rgba(0, 180, 255, 0.15)';
      ctx.lineWidth = 1 * dpr;
      ctx.stroke();

      // Pulsing outer atmosphere halo
      const pulse = Math.sin(timestamp / 800) * 0.03;
      const haloGrad = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * (1.18 + pulse));
      haloGrad.addColorStop(0, 'rgba(0, 200, 255, 0.35)');
      haloGrad.addColorStop(0.4, 'rgba(0, 140, 255, 0.15)');
      haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * (1.18 + pulse), 0, TWO_PI);
      ctx.fillStyle = haloGrad;
      ctx.fill();

      // 3. --- Inner Globe Dark Sphere Base ---
      const sphereGrad = ctx.createRadialGradient(
        cx - R * 0.3, cy - R * 0.3, R * 0.1,
        cx, cy, R
      );
      sphereGrad.addColorStop(0, 'rgba(0, 35, 75, 0.85)');
      sphereGrad.addColorStop(0.6, 'rgba(2, 18, 42, 0.92)');
      sphereGrad.addColorStop(1, 'rgba(1, 8, 22, 0.98)');

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, TWO_PI);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Sharp atmospheric rim stroke
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, TWO_PI);
      ctx.strokeStyle = 'rgba(0, 220, 255, 0.65)';
      ctx.lineWidth = 2.2 * dpr;
      ctx.stroke();

      // 4. --- 3D Latitude and Longitude Grid Lines ---
      ctx.lineWidth = 0.6 * dpr;
      ctx.strokeStyle = 'rgba(0, 160, 255, 0.12)';

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 20) {
        const phi = (90 - lat) * (Math.PI / 180);
        const yCenter = cy - Math.cos(phi) * R;
        const radiusRing = Math.sin(phi) * R;
        ctx.beginPath();
        ctx.ellipse(cx, yCenter, radiusRing, radiusRing * 0.18, 0, 0, TWO_PI);
        ctx.stroke();
      }

      // Longitude meridians
      for (let l = 0; l < 12; l++) {
        const angle = ((l * 30 + rot) * Math.PI) / 180;
        const xOffset = Math.sin(angle) * R;
        const visible = Math.cos(angle) > 0;
        if (visible) {
          ctx.beginPath();
          ctx.ellipse(cx, cy, Math.abs(xOffset), R, 0, 0, TWO_PI);
          ctx.strokeStyle = 'rgba(0, 180, 255, 0.08)';
          ctx.stroke();
        }
      }

      // 5. --- High-Density Dot-Matrix Continent Points ---
      DENSE_CONTINENT_DOTS.forEach(([lat, lng]) => {
        const p = latLngToXYZ(lat, lng, rot);
        if (p.z <= 0) return; // Hide backfacing points

        const sx = cx + p.x * R;
        const sy = cy - p.y * R;

        // Depth lighting & perspective weighting
        const depth = p.z; // 0 (edge) to 1 (front center)
        const dotSize = (0.9 + depth * 1.3) * dpr;
        const alpha = Math.max(0.15, depth * 0.95);

        // Highlight Kenya/East Africa region in signature bright teal/orange
        const isEastAfrica = lat >= -5 && lat <= 12 && lng >= 32 && lng <= 44;
        const color = isEastAfrica
          ? `rgba(249, 105, 0, ${alpha})` // Orange highlight for Kenya/East Africa
          : `rgba(100, 255, 218, ${alpha})`; // Bright cyan for world continents

        ctx.beginPath();
        ctx.arc(sx, sy, dotSize, 0, TWO_PI);
        ctx.fillStyle = color;
        ctx.fill();
      });

      // 6. --- Global Node Positioning & Network Arcs ---
      const nodePos = GLOBAL_NODES.map(node => {
        const p = latLngToXYZ(node.lat, node.lng, rot);
        return {
          ...node,
          ...p,
          sx: cx + p.x * R,
          sy: cy - p.y * R,
          visible: p.z > 0,
        };
      });

      // Draw curved 3D network arcs between nodes
      NETWORK_ARCS.forEach(([idxA, idxB]) => {
        const nA = nodePos[idxA];
        const nB = nodePos[idxB];

        if (!nA.visible || !nB.visible) return;

        // Arc mid control point lifted away from sphere surface for 3D curvature
        const midX = (nA.sx + nB.sx) / 2;
        const midY = (nA.sy + nB.sy) / 2;
        const dist = Math.hypot(nA.sx - nB.sx, nA.sy - nB.sy);
        const lift = dist * 0.25;

        // Vector pointing outward from sphere center
        const dirX = (midX - cx);
        const dirY = (midY - cy);
        const len = Math.hypot(dirX, dirY) || 1;
        const ctrlX = midX + (dirX / len) * lift;
        const ctrlY = midY + (dirY / len) * lift;

        ctx.beginPath();
        ctx.moveTo(nA.sx, nA.sy);
        ctx.quadraticCurveTo(ctrlX, ctrlY, nB.sx, nB.sy);

        const isNairobiArc = idxA === 0 || idxB === 0;
        ctx.strokeStyle = isNairobiArc
          ? 'rgba(249, 105, 0, 0.75)' // Orange connection to Nairobi HQ
          : 'rgba(0, 220, 255, 0.45)'; // Cyan arc for global connections
        ctx.lineWidth = (isNairobiArc ? 1.6 : 1.0) * dpr;
        ctx.stroke();

        // Traveling pulse packet along arcs
        const progress = (timestamp / 2000 + idxA * 0.3) % 1;
        const px = (1 - progress) * (1 - progress) * nA.sx + 2 * (1 - progress) * progress * ctrlX + progress * progress * nB.sx;
        const py = (1 - progress) * (1 - progress) * nA.sy + 2 * (1 - progress) * progress * ctrlY + progress * progress * nB.sy;

        ctx.beginPath();
        ctx.arc(px, py, 2.5 * dpr, 0, TWO_PI);
        ctx.fillStyle = isNairobiArc ? '#F96900' : '#64FFDA';
        ctx.fill();
      });

      // Draw Global Node Glowing Icons & Labels
      nodePos.forEach(n => {
        if (!n.visible) return;

        const size = n.hub ? 14 : 9;

        // Outer pulse ring for Nairobi HQ
        if (n.hub) {
          const pulseR = (size + Math.sin(timestamp / 200) * 4) * dpr;
          ctx.beginPath();
          ctx.arc(n.sx, n.sy, pulseR, 0, TWO_PI);
          ctx.strokeStyle = 'rgba(249, 105, 0, 0.8)';
          ctx.lineWidth = 1.5 * dpr;
          ctx.stroke();
        }

        // Radial glow background
        const g = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, size * 1.5 * dpr);
        g.addColorStop(0, n.hub ? 'rgba(249, 105, 0, 0.9)' : 'rgba(0, 220, 255, 0.8)');
        g.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, size * 1.5 * dpr, 0, TWO_PI);
        ctx.fillStyle = g;
        ctx.fill();

        // Core node dot
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, (n.hub ? 4 : 2.5) * dpr, 0, TWO_PI);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Node city name text
        ctx.font = `${(n.hub ? 11 : 9) * dpr}px 'Inter', sans-serif`;
        ctx.fillStyle = n.hub ? '#F96900' : 'rgba(230, 241, 255, 0.85)';
        ctx.fillText(n.name, n.sx + (size + 4) * dpr, n.sy + 3 * dpr);
      });

      // 7. --- Specular Top Glint Light ---
      const glintGrad = ctx.createRadialGradient(
        cx - R * 0.35, cy - R * 0.35, 0,
        cx - R * 0.35, cy - R * 0.35, R * 0.5
      );
      glintGrad.addColorStop(0, 'rgba(120, 220, 255, 0.28)');
      glintGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, TWO_PI);
      ctx.fillStyle = glintGrad;
      ctx.fill();

      // 8. --- Futuristic Telemetry Floating Cards & HUD Data ---
      ctx.font = `${10 * dpr}px 'Courier New', monospace`;
      TELEMETRY_LABELS.forEach(({ x, y, text, val }) => {
        const lx = cx + x * R * 1.48;
        const ly = cy + y * R * 1.48;

        // Floating telemetry box
        ctx.fillStyle = 'rgba(10, 25, 47, 0.75)';
        ctx.strokeStyle = 'rgba(100, 255, 218, 0.25)';
        ctx.lineWidth = 0.8 * dpr;
        ctx.beginPath();
        ctx.roundRect(lx - 4 * dpr, ly - 12 * dpr, 85 * dpr, 20 * dpr, 4 * dpr);
        ctx.fill();
        ctx.stroke();

        // Text
        ctx.fillStyle = '#64FFDA';
        ctx.fillText(text, lx, ly);
        ctx.fillStyle = 'rgba(136, 146, 176, 0.9)';
        ctx.fillText(val, lx + 45 * dpr, ly);

        // Leader line connecting to globe
        ctx.beginPath();
        ctx.moveTo(lx - 4 * dpr, ly - 2 * dpr);
        ctx.lineTo(cx + x * R * 1.02, cy + y * R * 1.02);
        ctx.strokeStyle = 'rgba(100, 255, 218, 0.2)';
        ctx.lineWidth = 0.7 * dpr;
        ctx.stroke();
      });

      // 9. --- Hexagonal Tech Icon Nodes ---
      const hexNodes = [
        { x: cx - R * 1.05, y: cy - R * 0.75, symbol: '⚡' },
        { x: cx - R * 0.92, y: cy + R * 0.78, symbol: '🔒' },
        { x: cx + R * 0.98, y: cy + R * 0.62, symbol: '📡' },
        { x: cx + R * 1.08, y: cy - R * 0.70, symbol: '☁️' },
      ];
      hexNodes.forEach(({ x, y, symbol }) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const hx = x + 15 * dpr * Math.cos(angle);
          const hy = y + 15 * dpr * Math.sin(angle);
          i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(23, 42, 69, 0.85)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(100, 255, 218, 0.6)';
        ctx.lineWidth = 1.2 * dpr;
        ctx.stroke();

        ctx.font = `${11 * dpr}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(symbol, x, y);
        ctx.textAlign = 'start';
        ctx.textBaseline = 'alphabetic';
      });

      // 10. --- Orbiting Equatorial Micro-Sparks ---
      const t = timestamp / 1000;
      for (let i = 0; i < 24; i++) {
        const sparkAngle = (i / 24) * TWO_PI - t * (i % 2 === 0 ? 0.25 : -0.15);
        const sparkR = R * (1.04 + 0.05 * Math.sin(t * 0.8 + i));
        const px = cx + sparkR * Math.cos(sparkAngle);
        const py = cy + sparkR * Math.sin(sparkAngle) * 0.32;
        const alpha = 0.2 + 0.6 * Math.abs(Math.sin(t * 1.2 + i));

        ctx.beginPath();
        ctx.arc(px, py, (1.2 + (i % 3) * 0.4) * dpr, 0, TWO_PI);
        ctx.fillStyle = i % 4 === 0 ? `rgba(249, 105, 0, ${alpha})` : `rgba(100, 255, 218, ${alpha})`;
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
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep Space Radial Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #0B192F 0%, #060D1A 60%, #03060C 100%)',
        }}
      />

      {/* Cyber Grid Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(100, 255, 218, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100, 255, 218, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
};
