import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../Animation.css';
import PointInputSVG from './PointInputSVG';

export default function ConvexHullDemo() {
  const [frames, setFrames] = useState([]);
  const [idx, setIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [speed, setSpeed] = useState(1000); 
  const timerRef = useRef(null);

  // const pts = [
  //   [ 1.0,  0.0], [ 0.5,  0.866], [-0.5,  0.866],
  //   [-1.0,  0.0], [-0.5, -0.866], [ 0.5, -0.866],
  //   [ 0.0,  0.0], [ 0.8,  0.2], [ 0.2,  0.5],
  //   [-0.3,  0.4], [-0.4, -0.2], [ 1.2,  0.3],
  //   [-1.1,  0.2], [-0.8, -1.0], [ 0.6, -1.2]
  // ];

    const [userDefinedPoints, setUserDefinedPoints] = useState([]);
    const handlePointsUpdate = useCallback((updatedPoints) => {
      setUserDefinedPoints(updatedPoints);
    }, []);

  const loadFrames = async () => {
    if (userDefinedPoints.length === 0) {
      alert("Please add some points by clicking in the input area first.");
      return;
  }
    try {
      // Convert the points from [{x: x, y: y}, ...] to [[x, y], ...] format before sending to the backend.
      const pointsAsArrays = userDefinedPoints.map(point => [point.x, -point.y]); // -point.y is needed due to different coordinate systems
      const res = await fetch('http://localhost:5000/api/animate_hull', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ points: pointsAsArrays}),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || res.statusText);
      setFrames(json.frames);
      setIdx(0);
    } catch (err) {
      console.error("ConvexHullDemo load error:", err);
      alert("Failed to load hull frames:\n" + err.message);
    }
  };

  const onKey = useCallback(e => {
    if (autoplay || frames.length === 0) return;
    if (e.key === 'ArrowLeft' && idx > 0)  setIdx(i => i - 1);
    if (e.key === 'ArrowRight' && idx < frames.length - 1) setIdx(i => i + 1);
  }, [autoplay, frames, idx]);

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  useEffect(() => {
    if (autoplay && frames.length > 1) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setIdx(i => (i + 1) % frames.length);
      }, speed);
    } else {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => clearInterval(timerRef.current);
  }, [autoplay, frames, speed]);

  return (
    <div className="convex-hull-demo">
      <h3>3D Convex Hull &amp; Lower‐Face Projection</h3>
        <div className="point-input-section" style={{ marginBottom: '1rem', padding: '10px', borderRadius: '4px' }}>
               <PointInputSVG onPointsUpdate={handlePointsUpdate} />
               {}
               <p style={{marginTop: '8px', fontSize: '0.9rem', color: '#555'}}>
                  Points added: {userDefinedPoints.length}
               </p>
            </div>

      <div className="controls">
        <button onClick={loadFrames}>
          Generate &amp; Animate Hull
        </button>{' '}
        <button
          onClick={() => setAutoplay(a => !a)}
          disabled={frames.length < 2}
        >
          {autoplay ? 'Pause ⏸' : 'Play ▶️'}
        </button>
      </div>

      {frames.length > 0 && (
        <div className="controls" style={{ marginTop: '0.5rem', alignItems: 'center' }}>
          <label className="speed-slider">
            <input
              type="range"
              min={100}
              max={2000}
              step={100}
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))} // and here
              style={{ verticalAlign: 'middle', marginLeft: '5px'}}
            />
            ({(speed / 1000).toFixed(1)}s)
          </label>
        </div>
      )}

      <div className="frame-container" style={{ marginTop: '1rem' }}>
        {frames.length > 0 ? (
          <img
            src={frames[idx]}
            alt={`Hull step ${idx + 1} of ${frames.length}`}
            style={{ maxWidth: '100%', border: '1px solid #ccc', borderRadius: 4 }}
          />
        ) : (
          <p>Click “Generate &amp; Animate Hull” to begin.</p>
        )}
      </div>

      {frames.length > 0 && (
        <div className="controls" style={{ marginTop: '0.5rem' }}>
          <button
            onClick={() => { setIdx(i => Math.max(0, i - 1)); }}
            disabled={idx === 0}
          >
            ◀ Prev
          </button>{' '}
          <span style={{ margin: '0 1em' }}>
            {idx + 1} / {frames.length}
          </span>{' '}
          <button
            onClick={() => { setIdx(i => Math.min(frames.length - 1, i + 1)); }}
            disabled={idx === frames.length - 1}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
