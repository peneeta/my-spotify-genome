import Paper from 'paper';
import { generateColors } from './helpers';

const drawing = async (data: any) => {
  Paper.project.clear();

  const amplitude = 120;
  const wiggleAmplitude = 10; // Small amplitude for wiggling
  const wiggleFrequency = 0.01; // Frequency for wiggling
  const numPeriods = 2; // Number of periods (peaks and troughs) to display
  const fractionOfWidth = 0.60; // Fraction of the width to use for the sine wave

  const colors = generateColors();
  console.log(colors);

  const strand1 = new Paper.Path({
    strokeColor: [0.8],
    strokeWidth: 4,
  });

  const strand2 = new Paper.Path({
    strokeColor: [0.8],
    strokeWidth: 4,
    strokeCap: 'round',
  });

  const width = 1350;
  const height = 640;
  const centerY = height / 2;
  const offset = 100; // offsets the sin wave so the head and tail look better

  const availableWidth = width * fractionOfWidth; // Width available for the sine wave
  const offsetX = (width - availableWidth) / 2; // Calculate the offset to center the drawing

  const frequency = (2 * Math.PI * numPeriods) / availableWidth; // Frequency to fit the desired number of periods

  const totalPoints = Math.floor(availableWidth); // Total points to cover the desired width

  for (let x = -offset; x < totalPoints-offset; x += 1) {
    const xPos = (x / totalPoints) * availableWidth + offsetX; // Adjust xPos by adding offsetX
    const y1 = centerY - Math.sin(x * frequency) * amplitude; // Inverse sine wave
    const y2 = centerY + Math.sin(x * frequency) * amplitude;

    strand1.add(new Paper.Point(xPos, y1));
    strand2.add(new Paper.Point(xPos, y2));
  }

  strand1.smooth();
  strand2.smooth();

  // Create a group to hold the vertical lines
  const verticalLines = new Paper.Group();

  // Function to get evenly spaced indices between start and end points
  const getEvenlySpacedIndices = (numIndices: number, start: number, end: number): number[] => {
    const indices: number[] = [];
    const totalRange = end - start;
    let mainStep = totalRange / (numIndices - 1);
  
    const specialSteps = [0, 1, 7, 13, 19, 20];
    const specialStepMultiplier = 2.6; // Adjust this multiplier to increase the step value for special indices
    const regularStepMultiplier = 0.55; // Adjust this multiplier to decrease the step value for regular indices
  
    for (let i = 0; i < numIndices; i++) {
      let step = mainStep;
      
      if (specialSteps.includes(i)) {
        step *= specialStepMultiplier;
      } else {
        step *= regularStepMultiplier;
      }
      
      if (i === 0) {
        indices.push(start);
      } else {
        const prevIndex = indices[indices.length - 1];
        const newIndex = prevIndex + step;
        if (newIndex > end) {
          indices.push(end);
        } else {
          indices.push(Math.round(newIndex));
        }
      }
    }
  
    return indices;
  };
  
  // Number of vertical lines per peak/trough
  const totalLines = 20;

  // Manually set start and end points
  const start = 50; // Replace with your desired start point
  const end = totalPoints - 50; // Replace with your desired end point

  // Initial evenly spaced indices for vertical lines
  const evenlySpacedIndices = getEvenlySpacedIndices(totalLines, start, end);

  // Extract heights from the JSON data
  const heights = await data.items.map((item: { popularity: any }) => item.popularity);

  // Animate the paths to create the wiggling effect
  Paper.view.onFrame = (event: any) => {
    verticalLines.removeChildren(); // Clear previous lines

    for (let i = 0; i < strand1.segments.length; i++) {
      const segment1 = strand1.segments[i];
      const segment2 = strand2.segments[i];

      const x = segment1.point.x;

      const baseY1 = centerY - Math.sin((x - offsetX) / availableWidth * totalPoints * frequency) * amplitude; // Static sine wave
      const baseY2 = centerY + Math.sin((x - offsetX) / availableWidth * totalPoints * frequency) * amplitude; // Static inverse sine wave

      const wiggleY1 = Math.sin(event.time * 0.8 + i * wiggleFrequency) * wiggleAmplitude;
      const wiggleY2 = Math.sin(event.time * 0.8 + i * wiggleFrequency) * wiggleAmplitude;

      segment1.point.y = baseY1 + wiggleY1;
      segment2.point.y = baseY2 + wiggleY2;

      // Draw vertical line only for evenly spaced indices
      if (evenlySpacedIndices.includes(i)) {
        const midpointY = (segment1.point.y + segment2.point.y) / 2;
        const lineIndex = evenlySpacedIndices.indexOf(i);
        const lineHeight = heights[lineIndex] || 0; // Use the height from the JSON data, default to 50 if not available

        const verticalLine = new Paper.Path.Line({
          from: new Paper.Point(segment1.point.x, midpointY - lineHeight / 2),
          to: new Paper.Point(segment1.point.x, midpointY + lineHeight / 2),
          strokeWidth: 6,
          strokeColor: colors[lineIndex],
          strokeCap: 'round',
        });
        verticalLines.addChild(verticalLine);
      }
    }

    strand1.smooth();
    strand2.smooth();
  };

  // Apply view matrix transformation to handle window resizing
  const applyViewTransform = () => {
    const viewScale = Paper.view.size.width / width;
    const viewCenter = Paper.view.center;
    const viewMatrix = new Paper.Matrix();
    viewMatrix.translate(viewCenter.subtract(new Paper.Point((width /2) - offset, height / 2)));
    viewMatrix.scale(viewScale, viewScale, new Paper.Point((width / 2) - offset, height / 2));
    Paper.view.matrix = viewMatrix;
  };

  applyViewTransform();
  Paper.view.onResize = applyViewTransform;
};

export default drawing;
