import { useState, useEffect } from 'react';

export default function ExplosionDemo() {
  const [numPoints, setNumPoints] = useState(100);
  const [intensity, setIntensity] = useState(2.0);
  const [points, setPoints] = useState([]);

  // Generate explosion distribution points
  useEffect(() => {
    generatePoints();
  }, []);

  // Function to generate points using explosion distribution
  const generatePoints = () => {
    const newPoints = [];

    // Generate explosion distribution (similar to Python implementation)
    for (let i = 0; i < numPoints; i++) {
      // Random angle between 0 and 2π
      const angle = Math.random() * 2 * Math.PI;

      // Exponential distribution for radius
      // Using -ln(1-u)/λ where u is uniform(0,1) and λ=1/intensity
      const radius = -Math.log(1 - Math.random()) * intensity;

      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      newPoints.push({ x, y });
    }

    setPoints(newPoints);
  };

  // Find min and max values for setting SVG viewBox
  const getMinMax = () => {
    if (points.length === 0) return { minX: -10, maxX: 10, minY: -10, maxY: 10 };

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
    <div className="explosion-demo bg-gray-800 rounded-lg p-6 my-6 shadow-lg max-w-3xl mx-auto">
      <h3 className="text-xl font-bold mb-4 text-red-400 border-b border-gray-700 pb-2">Explosion Distribution Sampling</h3>

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
                  r="0.2"
                  fill="#ff6b6b"
                  opacity="0.7"
                  stroke="#000"
                  strokeWidth="0.05"
                />
              ))}
            </svg>
          </div>

          <div className="text-center text-sm text-red-300 mb-3">
            {numPoints} points from Explosion Distribution (Intensity={intensity.toFixed(1)})
          </div>

          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 shadow"
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
                <span className="text-red-400 font-medium">{numPoints}</span>
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
                <label className="text-gray-300 text-sm">Intensity</label>
                <span className="text-red-400 font-medium">{intensity.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.1"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="bg-gray-800 p-3 rounded mt-4 text-sm text-gray-300 border border-gray-700">
              <p className="mb-2">Higher intensity values spread points further from center.</p>
              <p>Points density decreases exponentially with distance from origin.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}