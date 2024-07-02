import React, { useRef, useEffect } from 'react';
import Paper from 'paper';
import drawing from './drawing';

interface CanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  data: any;
}

const SpotifyDNA: React.FC<CanvasProps> = ({ data, ...canvasProps }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      Paper.setup(canvas);
      drawing(data);
      // Handle canvas resizing if necessary
      Paper.view.onResize = () => {
        // Implement any resizing logic here
      };
    }
  }, []);

  return (
    <>

    <div className="flex flex-col items-center justify-center align-center">
      <canvas ref={canvasRef} {...canvasProps} id="canvas" style={{ width: '60%', height: '40%' }} />
    </div>
      
    </>
    

  )
  
  
}

export default SpotifyDNA;
