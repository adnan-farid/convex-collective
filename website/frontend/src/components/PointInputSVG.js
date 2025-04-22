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
    <div className="point-input-container">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={viewBox}
        onClick={handleClick}
        style={{
          border: '1px solid #555',
          backgroundColor: '#2d3748',
          cursor: 'crosshair',
          display: 'block',
          maxWidth: '100%'
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        {}
        {/* add grid axis if desired */}
        {/* <line x1="0" y1="50" x2="100" y2="50" stroke="#4a5568" strokeWidth="0.2" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="#4a5568" strokeWidth="0.2" /> */}

        {}
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
      <button
        onClick={handleClearPoints}
        style={{
          marginTop: '8px',
          padding: '4px 8px',
          fontSize: '0.8rem',
        }}
      >
        Clear Points
      </button>
    </div>
  );
}