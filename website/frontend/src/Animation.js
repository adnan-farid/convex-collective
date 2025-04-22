import React, { useState, useEffect, useCallback } from 'react';
import './Animation.css';

export default function FrameRefinement() {
  const [frames, setFrames] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: add input handling and parsing for point sets, min angle, and k steiner points
  const points = [[156.006,705.854], [215.257,732.63], [283.108,707.272], [244.042,670.948], [366.035,687.396], [331.768,625.715], [337.936,559.92], [249.525,582.537], [187.638,556.13], [165.912,631.197]];
  const min_angle = 20, k = 5;

  const loadFrames = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/animate', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({points, min_angle, k}),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || res.status);
      setFrames(json.frames);
      setIndex(0);
    } catch (e) {
      console.error("couldn't load frames:", e);
      setError("Failed to load animation frames. Please ensure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  // arrow key handler
  const onKey = useCallback(e => {
    if (!frames.length) return;
    if (e.key === 'ArrowLeft' && index > 0)  setIndex(i => i - 1);
    if (e.key === 'ArrowRight' && index < frames.length - 1) setIndex(i => i + 1);
  }, [frames, index]);

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  return (
    <div className="frame-refinement">
      <div className="controls">
        <button
          onClick={loadFrames}
          disabled={loading}
          className="load-button"
        >
          {loading ? 'Loading...' : 'Load Refinement Frames'}
        </button>
      </div>

      <div className="frame-display">
        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading animation frames...</p>
          </div>
        ) : frames.length > 0 ? (
          <div className="image-container">
            <img
              src={frames[index]}
              alt={`Step ${index+1}/${frames.length}`}
              className="frame-image"
            />
          </div>
        ) : (
          <div className="no-frames">
            <p>No frames loaded. Click the button above to load animation frames.</p>
            <div className="placeholder-image">
              <svg width="200" height="200" viewBox="0 0 200 200">
                <polygon points="100,10 40,190 190,78 10,78 160,190" fill="none" stroke="#5bc0be" strokeWidth="3"/>
                <circle cx="100" cy="100" r="90" fill="none" stroke="#5bc0be" strokeWidth="3" strokeDasharray="5,5"/>
              </svg>
            </div>
          </div>
        )}
      </div>

      {frames.length > 0 && (
        <div className="navigation">
          <button
            onClick={()=>setIndex(i=>Math.max(0, i-1))}
            disabled={index===0}
            className="nav-button"
          >◀ Previous</button>

          <div className="frame-counter">
            Frame {index+1} of {frames.length}
          </div>

          <button
            onClick={()=>setIndex(i=>Math.min(frames.length-1, i+1))}
            disabled={index===frames.length-1}
            className="nav-button"
          >Next ▶</button>
        </div>
      )}
    </div>
  );
}