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
    <div className="convex-hull-demo bg-gray-800 rounded-lg p-6 my-6 shadow-lg max-w-3xl mx-auto">
      <h3 className="text-xl font-bold mb-4 text-green-400 border-b border-gray-700 pb-2">Convex Hull Sampling</h3>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-gray-900 rounded-lg p-4 mb-4 shadow-inner">
            <svg
              viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`}
              className="w-full h-64 bg-gray-950 rounded-lg"
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

          <div className="text-center text-sm text-green-300 mb-3">
            {numPoints} random points — radius {radius.toFixed(1)}
          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 shadow"
            onClick={generatePoints}
          >
            Generate New Points
          </button>
        </div>

        <div className="flex-1">
          <div className="bg-gray-900 rounded-lg p-4 shadow-inner">
            <h4 className="font-bold mb-3 text-white text-base border-b border-gray-800 pb-2">Parameters</h4>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <label className="text-gray-300 text-sm">Number of Points</label>
                <span className="text-green-400 font-medium">{numPoints}</span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                value={numPoints}
                onChange={(e) => setNumPoints(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <label className="text-gray-300 text-sm">Radius</label>
                <span className="text-green-400 font-medium">{radius.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="bg-gray-800 p-3 rounded mt-4 text-sm text-gray-300 border border-gray-700">
              <p className="mb-2">Convex hull connects the outermost points in the set.</p>
              <p>Adjusting the radius changes how spread out the points are.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
