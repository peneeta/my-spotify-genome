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

  return (
    <>

    <div className="flex flex-col items-center justify-center align-center">
      <canvas ref={canvasRef} {...props} id="canvas" style={{ width: '60%', height: '40%' }} />
    </div>
      
    </>
    

  )
  
  
}

export default SpotifyDNA;
