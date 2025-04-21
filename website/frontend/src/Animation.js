import React, { useState, useEffect, useCallback } from 'react';

export default function FrameRefinement() {
  const [frames, setFrames] = useState([]);
  const [index, setIndex] = useState(0);

  // TODO: add input handling and parsing for point sets, min angle, and k steiner points
  const points = [[156.006,705.854], [215.257,732.63], [283.108,707.272], [244.042,670.948], [366.035,687.396], [331.768,625.715], [337.936,559.92], [249.525,582.537], [187.638,556.13], [165.912,631.197]];
  const min_angle = 20, k = 5;

  const loadFrames = async () => {
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
    <div>
      <button onClick={loadFrames}>Load Refinement Frames</button>
      <div style={{marginTop:20}}>
        {frames.length > 0 
          ? <img 
              src={frames[index]} 
              alt={`Step ${index+1}/${frames.length}`} 
              style={{maxWidth:'100%'}} 
            />
          : <p>No frames loaded.</p>
        }
      </div>
      {frames.length > 0 && (
        <div>
          <button 
            onClick={()=>setIndex(i=>Math.max(0, i-1))} 
            disabled={index===0}
          >◀ Prev</button>
          <span style={{margin:'0 1em'}}>{index+1} / {frames.length}</span>
          <button 
            onClick={()=>setIndex(i=>Math.min(frames.length-1, i+1))} 
            disabled={index===frames.length-1}
          >Next ▶</button>
        </div>
      )}
    </div>
  );
}
