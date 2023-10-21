import React, { useRef, useEffect } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  let frameId;

  const hearta = (k) => 15 * Math.sin(k) ** 3;
  const heartb = (k) => 12 * Math.cos(k) - 5 * Math.cos(2*k) - 2 * Math.cos(3*k) - Math.cos(4*k);

  const drawHeart = (ctx, endK) => {
    ctx.beginPath();
    for (let k = 0; k <= endK; k += 0.01) {
      let x = hearta(k) * 20;
      let y = heartb(k) * 20;
      ctx.lineTo(x + 300, -y + 300); // Offset by 300 to center the heart on the canvas
    }
    ctx.closePath();
    ctx.fillStyle = "#f73487";
    ctx.fill();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let k = 0;
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawHeart(context, k);
      k += 0.01;
      if (k <= 6.28) {
        frameId = requestAnimationFrame(animate);
      }
    }
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="App" style={{ backgroundColor: 'black', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <canvas ref={canvasRef} width={600} height={600} />
    </div>
  );
}

export default App;
