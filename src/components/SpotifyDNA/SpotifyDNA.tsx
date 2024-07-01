import React, { useRef, useEffect } from 'react';
import Paper from 'paper';
import drawing from './drawing';

interface CanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {}

const SpotifyDNA: React.FC<CanvasProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      Paper.setup(canvas);
      drawing();
      // Handle canvas resizing if necessary
      Paper.view.onResize = () => {
        // Implement any resizing logic here
      };
    }
  }, []);

  return <canvas ref={canvasRef} {...props} id="canvas" style={{ width: '100%', height: '100%' }} />;
}

export default SpotifyDNA;
