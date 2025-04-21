import React, { useState } from 'react';

export default function GifRefinement() {
  const [gifUrl, setGifUrl] = useState(null);

  const generate = async () => {
    const payload = {
      points: [[156.006,705.854], [215.257,732.63], [283.108,707.272], [244.042,670.948], [366.035,687.396], [331.768,625.715], [337.936,559.92], [249.525,582.537], [187.638,556.13], [165.912,631.197]],
      min_angle: 20,
      k: 5
    };

    const res = await fetch('http://localhost:5000/api/animate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Animation failed');

    const blob = await res.blob();
    setGifUrl(URL.createObjectURL(blob));
  };

  return (
    <div>
      <button onClick={generate}>Generate Refinement GIF</button>
      {gifUrl && <img src={gifUrl} alt="Refinement animation" />}
    </div>
  );
}
