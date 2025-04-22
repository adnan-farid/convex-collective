import React, { useState, useRef, useCallback } from 'react';

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;
const DEFAULT_VIEWBOX = "0 0 150 100";
const POINT_RADIUS = 1.0;
const POINT_COLOR = "#ff6b6b";

export default function PointInputSVG({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  viewBox = DEFAULT_VIEWBOX,
  onPointsUpdate
}) {
  const [points, setPoints] = useState([]);
  const svgRef = useRef();

  const handleClick = useCallback((event) => {
    if (!svgRef.current) return; // Safety check

    const svg = svgRef.current;
    const svgPoint = svg.createSVGPoint();

    svgPoint.x = event.clientX;
    svgPoint.y = event.clientY;

    const inverseMatrix = svg.getScreenCTM().inverse();
    const transformedPoint = svgPoint.matrixTransform(inverseMatrix);

    const newPoint = { x: transformedPoint.x, y: transformedPoint.y };

    const updatedPoints = [...points, newPoint];
    setPoints(updatedPoints);

    if (onPointsUpdate) {
      onPointsUpdate(updatedPoints);
    }
  }, [points, onPointsUpdate]);

  const handleClearPoints = () => {
    setPoints([]);
    if (onPointsUpdate) {
      onPointsUpdate([]);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg max-w-3xl mx-auto my-6">
      <h3 className="text-xl font-bold mb-4 text-white border-b border-gray-700 pb-2">Interactive Point Input</h3>

      <div className="text-gray-300 text-sm mb-4">
        Click anywhere on the canvas below to add points. The points can be used for custom distribution visualization.
      </div>

      <div className="bg-gray-900 rounded-lg p-4 mb-4 shadow-inner">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          viewBox={viewBox}
          onClick={handleClick}
          className="w-full h-64 bg-gray-950 rounded-lg cursor-crosshair"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines for reference */}
          <line x1="0" y1="50" x2="150" y2="50" stroke="#4a5568" strokeWidth="0.2" />
          <line x1="75" y1="0" x2="75" y2="100" stroke="#4a5568" strokeWidth="0.2" />

          {/* Grid markers */}
          <text x="150" y="50" fill="#718096" fontSize="3" textAnchor="end">x-axis</text>
          <text x="75" y="5" fill="#718096" fontSize="3" textAnchor="middle">y-axis</text>

          {/* User placed points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={POINT_RADIUS}
              fill={POINT_COLOR}
              style={{ pointerEvents: 'none' }}
            />
          ))}
        </svg>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">
        </span>
        <button
          onClick={handleClearPoints}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 shadow text-sm"
        >
          Clear All Points
        </button>
      </div>
    </div>
  );
}