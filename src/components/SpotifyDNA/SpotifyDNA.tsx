import React, { useRef, useEffect } from 'react';
import Paper from 'paper';
import drawing from './drawing';

interface CanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  data: any;
}

const SpotifyDNA: React.FC<CanvasProps> = ({ data, ...canvasProps }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const setupPaper = async () => {
      const canvas = canvasRef.current;
      if (canvas) {
        Paper.setup(canvas);
        Paper.view.onResize = () => resizeCanvas();

        // Initial setup
        resizeCanvas();
        if (data) {
          drawing(data);
        }
      }
    };

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const parent = canvas.parentElement;
        if (parent) {
          canvas.width = parent.clientWidth;
          canvas.height = parent.clientHeight;
          Paper.view.viewSize = new Paper.Size(canvas.width, canvas.height);
        }
      }
    };

    setupPaper();

    // Cleanup on unmount
    return () => {
      if (Paper.view) {
        Paper.view.onResize = null;
      }
    };
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center align-center">
      <canvas ref={canvasRef} {...canvasProps} id="canvas" style={{ width: '60rem', height: '40rem' }} />
    </div>
  );
};

export default SpotifyDNA;
