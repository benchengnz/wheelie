// components/organisms/WheelDisplay.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import { Slice } from '../../app/page';

interface WheelDisplayProps {
  slices: Slice[];
}

const WheelDisplay: React.FC<WheelDisplayProps> = ({ slices }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spinning, setSpinning] = useState<boolean>(false);
  const currentRotation = useRef<number>(0);
  const animationFrameId = useRef<number>(1);
  const drumrollRef = useRef<HTMLAudioElement>(null);
  const spinDuration = 5200; // 6 seconds

  // Draw the wheel
  const drawWheel = (
    rotation: number,
    highlightIndex: number | null = null
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    ctx.clearRect(0, 0, width, height);

    const numSlices = slices.length;
    if (numSlices === 0) return;

    const sliceAngle = (2 * Math.PI) / numSlices;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    for (let i = 0; i < numSlices; i++) {
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, centerX, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = slices[i].color;
      ctx.fill();

      // Draw border with highlight if applicable
      if (i === highlightIndex) {
        ctx.strokeStyle = 'gold';
        ctx.lineWidth = 5;
      } else {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
      }
      ctx.stroke();

      // Draw slice text
      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#000';
      ctx.font = 'bold 16px Arial';
      const textRadius = centerX * 0.7;
      ctx.fillText(slices[i].text, textRadius, 0);
      ctx.restore();
    }
    ctx.restore();

    // Draw fixed pointer at the top
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(centerX - 10, 10);
    ctx.lineTo(centerX + 10, 10);
    ctx.lineTo(centerX, 30);
    ctx.closePath();
    ctx.fill();
  };

  // Easing function
  const easeOutQuad = (t: number): number => 1 - (1 - t) * (1 - t);

  const handleSpin = () => {
    if (spinning || slices.length === 0) return;
    setSpinning(true);

    // Play drumroll
    if (drumrollRef.current) {
      drumrollRef.current.currentTime = 0;
      drumrollRef.current.play();
    }

    const numSlices = slices.length;
    const sliceAngle = (2 * Math.PI) / numSlices;
    const winningIndex = Math.floor(Math.random() * numSlices);
    const sliceCenter = winningIndex * sliceAngle + sliceAngle / 2;
    let deltaRotation = -Math.PI / 2 - sliceCenter;
    deltaRotation =
      ((deltaRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const extraSpins = 5;
    const finalRotation =
      currentRotation.current + extraSpins * 2 * Math.PI + deltaRotation;
    const startRotation = currentRotation.current;
    const rotationChange = finalRotation - startRotation;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      let t = elapsed / spinDuration;
      if (t > 1) t = 1;
      currentRotation.current = startRotation + rotationChange * easeOutQuad(t);
      drawWheel(currentRotation.current);
      if (t < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        drawWheel(currentRotation.current, winningIndex);
        setSpinning(false);
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    drawWheel(currentRotation.current);
  }, [slices]);

  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: '50%',
          width: '100%',
          height: '100%',
        }}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={handleSpin}
        disabled={spinning}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textTransform: 'none',
          borderRadius: '50%',
          padding: '20px 30px',
          fontSize: '18px',
          zIndex: 1,
        }}
      >
        Start
      </Button>
      <audio ref={drumrollRef} src='/drum-roll.mp3' />
    </div>
  );
};

export default WheelDisplay;
