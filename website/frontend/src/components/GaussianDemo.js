import { useState, useEffect } from 'react';

// Gaussian Distribution Demo component
export default function GaussianDemo() {
  const [numPoints, setNumPoints] = useState(100);
  const [stdDev, setStdDev] = useState(1);
  const [meanX, setMeanX] = useState(0);
  const [meanY, setMeanY] = useState(0);
  const [points, setPoints] = useState([]);

  // Generate Gaussian distributed points
  useEffect(() => {
    generatePoints();
  }, []);

  const generatePoints = () => {
    const newPoints = [];

    for (let i = 0; i < numPoints; i++) {
      const u1 = Math.random();
      const u2 = Math.random();

      const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

      const x = meanX + z1 * stdDev;
      const y = meanY + z2 * stdDev;

      newPoints.push({ x, y });
    }

    setPoints(newPoints);
  };

  // Find min and max values for setting SVG viewBox
  const getMinMax = () => {
    if (points.length === 0) return { minX: -5, maxX: 5, minY: -5, maxY: 5 };

    let minX = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = Number.MIN_VALUE;

    points.forEach(p => {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    });

    // Add padding
    const padding = Math.max(maxX - minX, maxY - minY) * 0.1;
    return {
      minX: minX - padding,
      maxX: maxX + padding,
      minY: minY - padding,
      maxY: maxY + padding
    };
  };

  const { minX, maxX, minY, maxY } = getMinMax();
  const viewBoxWidth = maxX - minX;
  const viewBoxHeight = maxY - minY;

  return (
    <div className="gaussian-demo bg-gray-800 rounded-lg p-6 my-6 shadow-lg max-w-3xl mx-auto">
      <h3 className="text-xl font-bold mb-4 text-cyan-400 border-b border-gray-700 pb-2">Gaussian Distribution Sampling</h3>

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
                  r="0.1"
                  fill="#5bc0be"
                  opacity="0.7"
                />
              ))}
            </svg>
          </div>

          <div className="text-center text-sm text-cyan-300 mb-3">
            {numPoints} points sampled from a Gaussian distribution
          </div>

          <button
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 shadow"
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
                <span className="text-cyan-400 font-medium">{numPoints}</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                value={numPoints}
                onChange={(e) => setNumPoints(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <label className="text-gray-300 text-sm">Standard Deviation</label>
                <span className="text-cyan-400 font-medium">{stdDev.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={stdDev}
                onChange={(e) => setStdDev(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <label className="text-gray-300 text-sm">Mean X</label>
                <span className="text-cyan-400 font-medium">{meanX.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={meanX}
                onChange={(e) => setMeanX(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <label className="text-gray-300 text-sm">Mean Y</label>
                <span className="text-cyan-400 font-medium">{meanY.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={meanY}
                onChange={(e) => setMeanY(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}