import { useState, useEffect } from 'react';

export default function ConvexHullDemo() {
  const [numPoints, setNumPoints] = useState(50);
  const [radius, setRadius] = useState(5.0);
  const [points, setPoints] = useState([]);
  const [hullPoints, setHullPoints] = useState([]);

  useEffect(() => {
    generatePoints();
  }, []);

  const generatePoints = () => {
    const newPoints = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const r = Math.sqrt(Math.random()) * radius;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      newPoints.push({ x, y });
    }
    setPoints(newPoints);
    computeConvexHull(newPoints);
  };

  // Gift Wrapping (Jarvis March) Algorithm for Convex Hull
  const computeConvexHull = (pts) => {
    if (pts.length < 3) {
      setHullPoints([]);
      return;
    }

    const leftmost = pts.reduce((left, p) => (p.x < left.x ? p : left), pts[0]);
    const hull = [];
    let pointOnHull = leftmost;

    do {
      hull.push(pointOnHull);
      let endpoint = pts[0];
      for (let j = 1; j < pts.length; j++) {
        if (
          endpoint === pointOnHull ||
          cross(pointOnHull, endpoint, pts[j]) < 0
        ) {
          endpoint = pts[j];
        }
      }
      pointOnHull = endpoint;
    } while (pointOnHull !== hull[0]);

    setHullPoints(hull);
  };

  const cross = (o, a, b) => {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  };

  const getMinMax = () => {
    if (points.length === 0) return { minX: -10, maxX: 10, minY: -10, maxY: 10 };

    let minX = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = Number.MIN_VALUE;

    points.forEach((p) => {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    });

    const padding = Math.max(maxX - minX, maxY - minY) * 0.1;
    return {
      minX: minX - padding,
      maxX: maxX + padding,
      minY: minY - padding,
      maxY: maxY + padding,
    };
  };

  const { minX, maxX, minY, maxY } = getMinMax();
  const viewBoxWidth = maxX - minX;
  const viewBoxHeight = maxY - minY;

  return (
    <div className="bg-gray-800 rounded-lg p-4 my-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3 className="text-lg font-bold mb-3 text-green-400">Convex Hull Sampling</h3>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="bg-gray-900 rounded-lg p-3 mb-3">
            <svg
              viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`}
              className="w-full h-48 bg-gray-950 rounded-lg"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Grid lines */}
              <line x1={minX} y1="0" x2={maxX} y2="0" stroke="#555" strokeWidth="0.1" />
              <line x1="0" y1={minY} x2="0" y2={maxY} stroke="#555" strokeWidth="0.1" />

              {/* Points */}
              {points.map((point, i) => (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r="0.15"
                  fill="#68d391"
                  opacity="0.7"
                />
              ))}

              {/* Convex Hull Path */}
              {hullPoints.length > 0 && (
                <polygon
                  points={hullPoints.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="rgba(72,187,120,0.2)"
                  stroke="#48bb78"
                  strokeWidth="0.2"
                />
              )}
            </svg>
          </div>

          <div className="text-center text-xs text-gray-400 mb-2">
            {numPoints} random points — radius {radius.toFixed(1)}
          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm"
            onClick={generatePoints}
          >
            Generate New Points
          </button>
        </div>

        <div className="flex-1">
          <div className="bg-gray-900 rounded-lg p-3">
            <h4 className="font-bold mb-2 text-white text-sm">Parameters</h4>

            <div className="mb-2">
              <label className="block text-gray-400 mb-1 text-xs">Number of Points: {numPoints}</label>
              <input
                type="range"
                min="5"
                max="200"
                value={numPoints}
                onChange={(e) => setNumPoints(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-400 mb-1 text-xs">Radius: {radius.toFixed(1)}</label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="bg-gray-800 p-2 rounded mt-3 text-xs text-gray-300">
              <p>Convex hull connects outermost points</p>
              <p>Changing radius changes point spread</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
