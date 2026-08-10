import React, { useEffect, useRef } from 'react';

const TWO_PI = Math.PI * 2;

/**
 * Ultra-Luminous Realistic & Futuristic 3D World Globe
 * Realistic filled continent boundaries, glowing atmosphere, 3D orbital rings,
 * dynamic scanning beams, high-contrast network arcs, and floating telemetry HUD.
 */

// Realistic Polygonal Country & Continent Outlines (Lat/Lng coordinate paths)
const COUNTRY_BOUNDARIES = [
  // Kenya & East Africa Detailed Border
  [
    [4.5, 34.0], [4.5, 41.5], [1.8, 41.8], [-1.7, 41.0], [-4.7, 39.2],
    [-4.7, 38.0], [-3.0, 37.6], [-1.0, 34.0], [0.5, 34.0], [4.5, 34.0]
  ],
  // Africa Outline
  [
    [37, -10], [37, 10], [32, 32], [30, 34], [12, 44], [11, 51],
    [2, 45], [-11, 40], [-26, 33], [-34, 26], [-34, 18], [-22, 14],
    [-5, 12], [4, 9], [5, -8], [15, -17], [28, -13], [35, -6], [37, -10]
  ],
  // Madagascar
  [[-12, 49], [-16, 50], [-25, 47], [-25, 44], [-16, 44], [-12, 49]],

  // Europe & UK
  [
    [36, -9], [43, -9], [44, -1], [48, -5], [51, 1], [54, 8],
    [55, 12], [60, 11], [70, 20], [71, 28], [60, 30], [55, 21],
    [45, 14], [38, 24], [36, 28], [37, 15], [38, 13], [44, 8], [36, -9]
  ],
  [
    [50, -5], [58, -6], [58, -2], [54, 1], [50, -5] // UK
  ],

  // Arabian Peninsula
  [[30, 33], [30, 48], [24, 56], [16, 53], [12, 44], [30, 33]],

  // Indian Subcontinent
  [[24, 68], [32, 75], [28, 88], [22, 89], [15, 80], [8, 77], [13, 74], [24, 68]],

  // East Asia & Japan
  [
    [42, 130], [38, 118], [22, 114], [21, 108], [10, 104], [1, 104],
    [15, 108], [25, 120], [35, 120], [45, 135], [55, 135], [42, 130]
  ],
  [
    [31, 130], [35, 135], [43, 145], [40, 140], [33, 132], [31, 130] // Japan
  ],

  // North America
  [
    [70, -165], [70, -70], [60, -60], [45, -64], [30, -80], [25, -80],
    [25, -97], [15, -92], [15, -88], [8, -78], [15, -95], [20, -105],
    [30, -115], [48, -124], [60, -140], [65, -168], [70, -165]
  ],

  // South America
  [
    [12, -73], [10, -60], [-5, -35], [-22, -41], [-35, -57], [-54, -68],
    [-50, -75], [-18, -70], [-5, -81], [5, -77], [12, -73]
  ],

  // Australia & New Zealand
  [
    [-12, 130], [-12, 142], [-25, 153], [-38, 148], [-35, 117], [-22, 114], [-12, 130]
  ],
  [
    [-35, 173], [-46, 167], [-46, 170], [-35, 178], [-35, 173] // NZ
  ],
];

// Dense point matrix test for detailed continent shading
function isLand(lat, lng) {
  if (lat >= -35 && lat <= 37 && lng >= -18 && lng <= 52) return true; // Africa
  if (lat >= 36 && lat <= 71 && lng >= -10 && lng <= 45) return true; // Europe
  if (lat >= -10 && lat <= 75 && lng >= 35 && lng <= 145) return true; // Asia
  if (lat >= 7 && lat <= 72 && lng >= -168 && lng <= -52) return true; // North America
  if (lat >= -56 && lat <= 13 && lng >= -82 && lng <= -34) return true; // South America
  if (lat >= -44 && lat <= -10 && lng >= 112 && lng <= 178) return true; // Australia
  return false;
}

const DENSE_DOTS = (() => {
  const points = [];
  const step = 1.5;
  for (let lat = -70; lat <= 75; lat += step) {
    for (let lng = -180; lng <= 180; lng += step) {
      if (isLand(lat, lng)) {
        points.push([lat, lng]);
      }
    }
  }
  return points;
})();

// Global Hub Nodes
const GLOBAL_NODES = [
  { lat: -1.286, lng: 36.817, name: 'Nairobi (HQ)', hub: true },
  { lat: 51.507, lng: -0.127, name: 'London', hub: false },
  { lat: 40.712, lng: -74.006, name: 'New York', hub: false },
  { lat: 35.676, lng: 139.650, name: 'Tokyo', hub: false },
  { lat: 25.204, lng: 55.270,  name: 'Dubai', hub: false },
  { lat: 1.352,  lng: 103.819, name: 'Singapore', hub: false },
  { lat: 48.856, lng: 2.352,   name: 'Paris', hub: false },
  { lat: 19.076, lng: 72.877,  name: 'Mumbai', hub: false },
  { lat: -33.924,lng: 18.424,  name: 'Cape Town', hub: false },
  { lat: 37.774, lng: -122.419,name: 'San Francisco', hub: false },
];

const NETWORK_ARCS = [
  [0, 1], [0, 4], [0, 8], [0, 7],
  [1, 2], [1, 6], [1, 4],
  [2, 9], [4, 5], [5, 3],
];

const TELEMETRY_LABELS = [
  { x:  0.68, y: -0.50, text: '653.654', val: 'SYS_OK' },
  { x:  0.72, y: -0.15, text: '483.215', val: 'SEC_ACTIVE' },
  { x:  0.65, y:  0.30, text: '457.266', val: 'ENC_TLS1.3' },
  { x:  0.45, y:  0.65, text: '451.246', val: 'LAT_12ms' },
  { x: -0.40, y:  0.65, text: '62.128',  val: 'NODE_KE' },
  { x:  0.10, y: -0.68, text: '238.510', val: 'OPS_99.9%' },
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
  const rotRef = useRef(150);

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

      // Smooth anticlockwise rotation
      rotRef.current -= dt * 9.0;

      const W = canvas.width;
      const H = canvas.height;

      // Position globe in the right column on desktop, and below text on mobile
      const isMobile = W < 1024;
      const cx = isMobile ? W / 2 : W * 0.66;
      const cy = isMobile ? H * 0.68 : H * 0.50;
      const R = Math.min(W, H) * (isMobile ? 0.34 : 0.34);
      const dpr = window.devicePixelRatio;
      const rot = rotRef.current;

      ctx.clearRect(0, 0, W, H);

      // 1. Deep Space Star Particles Background
      for (let i = 0; i < 40; i++) {
        const sx = (Math.sin(i * 99 + timestamp * 0.0001) * 0.5 + 0.5) * W;
        const sy = (Math.cos(i * 33 + timestamp * 0.0001) * 0.5 + 0.5) * H;
        const sa = (Math.sin(i + timestamp * 0.002) * 0.4 + 0.6);
        ctx.fillStyle = `rgba(100, 255, 218, ${sa * 0.4})`;
        ctx.fillRect(sx, sy, 1.5 * dpr, 1.5 * dpr);
      }

      // 2. Outer atmosphere halo & glow
      const haloGrad = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.45);
      haloGrad.addColorStop(0, 'rgba(0, 229, 255, 0.35)');
      haloGrad.addColorStop(0.4, 'rgba(0, 150, 255, 0.18)');
      haloGrad.addColorStop(0.8, 'rgba(0, 80, 200, 0.06)');
      haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.45, 0, TWO_PI);
      ctx.fillStyle = haloGrad;
      ctx.fill();

      // 3. Dark Sphere Base with Neon Glow Edge
      const sphereGrad = ctx.createRadialGradient(
        cx - R * 0.3, cy - R * 0.3, R * 0.05,
        cx, cy, R
      );
      sphereGrad.addColorStop(0, 'rgba(5, 30, 65, 0.85)');
      sphereGrad.addColorStop(0.7, 'rgba(2, 16, 40, 0.95)');
      sphereGrad.addColorStop(1, 'rgba(1, 8, 22, 0.98)');

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, TWO_PI);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Sharp atmospheric rim stroke
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, TWO_PI);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.85)';
      ctx.lineWidth = 2.5 * dpr;
      ctx.shadowBlur = 15 * dpr;
      ctx.shadowColor = '#00F0FF';
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // 4. 3D Orbital Cyber Rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(0.35); // tilt angle
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 1.25, R * 0.35, 0, 0, TWO_PI);
      ctx.strokeStyle = 'rgba(0, 255, 220, 0.4)';
      ctx.lineWidth = 1.2 * dpr;
      ctx.stroke();

      // Orbital Particle Satellite
      const ringAngle = (timestamp * 0.001) % TWO_PI;
      const pxRing = Math.cos(ringAngle) * (R * 1.25);
      const pyRing = Math.sin(ringAngle) * (R * 0.35);
      ctx.beginPath();
      ctx.arc(pxRing, pyRing, 4 * dpr, 0, TWO_PI);
      ctx.fillStyle = '#F96900';
      ctx.shadowBlur = 12 * dpr;
      ctx.shadowColor = '#F96900';
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // 5. 3D Grid lines (Latitude / Longitude)
      ctx.lineWidth = 0.6 * dpr;
      ctx.strokeStyle = 'rgba(0, 180, 255, 0.15)';
      for (let lat = -60; lat <= 60; lat += 20) {
        const phi = (90 - lat) * (Math.PI / 180);
        const yCenter = cy - Math.cos(phi) * R;
        const rRing = Math.sin(phi) * R;
        ctx.beginPath();
        ctx.ellipse(cx, yCenter, rRing, rRing * 0.20, 0, 0, TWO_PI);
        ctx.stroke();
      }

      // 6. Realistic Country Boundaries & Shaded Landmasses
      COUNTRY_BOUNDARIES.forEach(path => {
        let first = true;
        let visibleCount = 0;
        ctx.beginPath();
        path.forEach(([lat, lng]) => {
          const p = latLngToXYZ(lat, lng, rot);
          if (p.z > 0) {
            visibleCount++;
            const sx = cx + p.x * R;
            const sy = cy - p.y * R;
            if (first) {
              ctx.moveTo(sx, sy);
              first = false;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            first = true;
          }
        });

        if (visibleCount > 2) {
          ctx.strokeStyle = '#64FFDA';
          ctx.lineWidth = 1.8 * dpr;
          ctx.shadowBlur = 8 * dpr;
          ctx.shadowColor = '#64FFDA';
          ctx.stroke();

          ctx.fillStyle = 'rgba(0, 225, 255, 0.12)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 7. Dense Dot-Matrix Land Shading Overlay
      DENSE_DOTS.forEach(([lat, lng]) => {
        const p = latLngToXYZ(lat, lng, rot);
        if (p.z <= 0) return;
        const sx = cx + p.x * R;
        const sy = cy - p.y * R;
        const alpha = Math.max(0.15, p.z * 0.9);

        ctx.beginPath();
        ctx.arc(sx, sy, 1.1 * dpr, 0, TWO_PI);
        ctx.fillStyle = `rgba(100, 255, 218, ${alpha})`;
        ctx.fill();
      });

      // 8. Global Hub Nodes & Dynamic 3D Arcs
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

      NETWORK_ARCS.forEach(([idxA, idxB]) => {
        const nA = nodePos[idxA];
        const nB = nodePos[idxB];
        if (!nA.visible || !nB.visible) return;

        const midX = (nA.sx + nB.sx) / 2;
        const midY = (nA.sy + nB.sy) / 2;
        const dist = Math.hypot(nA.sx - nB.sx, nA.sy - nB.sy);
        const lift = dist * 0.28;

        const dirX = midX - cx;
        const dirY = midY - cy;
        const len = Math.hypot(dirX, dirY) || 1;
        const ctrlX = midX + (dirX / len) * lift;
        const ctrlY = midY + (dirY / len) * lift;

        ctx.beginPath();
        ctx.moveTo(nA.sx, nA.sy);
        ctx.quadraticCurveTo(ctrlX, ctrlY, nB.sx, nB.sy);
        ctx.strokeStyle = idxA === 0 || idxB === 0 ? 'rgba(249, 105, 0, 0.95)' : 'rgba(0, 220, 255, 0.65)';
        ctx.lineWidth = (idxA === 0 || idxB === 0 ? 2.2 : 1.2) * dpr;
        ctx.shadowBlur = 6 * dpr;
        ctx.shadowColor = idxA === 0 || idxB === 0 ? '#F96900' : '#00E5FF';
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Moving pulse packet
        const progress = (timestamp / 1600 + idxA * 0.3) % 1;
        const px = (1 - progress) * (1 - progress) * nA.sx + 2 * (1 - progress) * progress * ctrlX + progress * progress * nB.sx;
        const py = (1 - progress) * (1 - progress) * nA.sy + 2 * (1 - progress) * progress * ctrlY + progress * progress * nB.sy;

        ctx.beginPath();
        ctx.arc(px, py, 3.2 * dpr, 0, TWO_PI);
        ctx.fillStyle = idxA === 0 || idxB === 0 ? '#F96900' : '#64FFDA';
        ctx.shadowBlur = 10 * dpr;
        ctx.shadowColor = idxA === 0 || idxB === 0 ? '#F96900' : '#64FFDA';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Hub Nodes (Nairobi + Global Hubs)
      nodePos.forEach(n => {
        if (!n.visible) return;
        const size = n.hub ? 14 : 9;

        if (n.hub) {
          const pulseR = (size + Math.sin(timestamp / 180) * 6) * dpr;
          ctx.beginPath();
          ctx.arc(n.sx, n.sy, pulseR, 0, TWO_PI);
          ctx.strokeStyle = 'rgba(249, 105, 0, 0.95)';
          ctx.lineWidth = 2.0 * dpr;
          ctx.shadowBlur = 10 * dpr;
          ctx.shadowColor = '#F96900';
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        const g = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, size * 1.6 * dpr);
        g.addColorStop(0, n.hub ? 'rgba(249, 105, 0, 1.0)' : 'rgba(0, 240, 255, 0.95)');
        g.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, size * 1.6 * dpr, 0, TWO_PI);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.sx, n.sy, (n.hub ? 4.5 : 3.0) * dpr, 0, TWO_PI);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.font = `bold ${(n.hub ? 12 : 10) * dpr}px 'Inter', sans-serif`;
        ctx.fillStyle = n.hub ? '#F96900' : 'rgba(230, 241, 255, 0.95)';
        ctx.shadowBlur = 4 * dpr;
        ctx.shadowColor = '#000000';
        ctx.fillText(n.name, n.sx + (size + 5) * dpr, n.sy + 4 * dpr);
        ctx.shadowBlur = 0;
      });

      // 9. Futuristic Telemetry Labels HUD
      ctx.font = `${10 * dpr}px 'Courier New', monospace`;
      TELEMETRY_LABELS.forEach(({ x, y, text, val }) => {
        const lx = cx + x * R * 1.45;
        const ly = cy + y * R * 1.45;

        ctx.fillStyle = 'rgba(10, 25, 47, 0.85)';
        ctx.strokeStyle = 'rgba(100, 255, 218, 0.45)';
        ctx.lineWidth = 1.0 * dpr;
        ctx.beginPath();
        ctx.roundRect(lx - 4 * dpr, ly - 12 * dpr, 90 * dpr, 20 * dpr, 4 * dpr);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#64FFDA';
        ctx.fillText(text, lx, ly);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(val, lx + 48 * dpr, ly);
      });

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
      {/* Deep Space Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #0B192F 0%, #060D1A 60%, #03060C 100%)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block', opacity: 1.0 }}
      />
    </div>
  );
};
