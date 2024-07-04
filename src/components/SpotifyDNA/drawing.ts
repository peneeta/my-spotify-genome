import Paper from 'paper';

const drawing = async (data: any) => {
  Paper.project.clear();

  const amplitude = 120;
  const wiggleAmplitude = 10; // Small amplitude for wiggling
  const wiggleFrequency = 0.01; // Frequency for wiggling
  const intersectionThreshold = 0; // Threshold to consider points as intersecting
  const numPeriods = 1.5; // Number of periods (peaks and troughs) to display
  const fractionOfWidth = 0.58; // Fraction of the width to use for the sine wave

  const strand1 = new Paper.Path({
    strokeColor: [0.8],
    strokeWidth: 4,
  });

  const strand2 = new Paper.Path({
    strokeColor: [0.8],
    strokeWidth: 4,
    strokeCap: 'round',
  });

  const width = 1300;
  const height = 640;
  const centerY = height / 2;

  const availableWidth = width * fractionOfWidth; // Width available for the sine wave
  const offsetX = (width - availableWidth) / 2; // Calculate the offset to center the drawing

  const frequency = (2 * Math.PI * numPeriods) / availableWidth; // Frequency to fit the desired number of periods

  const totalPoints = Math.floor(availableWidth); // Total points to cover the desired width

  for (let x = 0; x < totalPoints; x += 1) {
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

  // Function to find the intersection points of the two sine waves
  const findIntersections = (): number[] => {
    const intersections: number[] = [];
    for (let x = 0; x < totalPoints - 1; x++) {
      const y1_1 = centerY - Math.sin(x * frequency) * amplitude;
      const y1_2 = centerY - Math.sin((x + 1) * frequency) * amplitude;

      const y2_1 = centerY + Math.sin(x * frequency) * amplitude;
      const y2_2 = centerY + Math.sin((x + 1) * frequency) * amplitude;

      // Check if the lines between these points intersect
      if ((y1_1 > y2_1 && y1_2 < y2_2) || (y1_1 < y2_1 && y1_2 > y2_2)) {
        intersections.push(x);
      }
    }
    return intersections;
  };

  const intersections = findIntersections();

  // Function to get evenly spaced indices between intersection points
  const getEvenlySpacedIndices = (numIndices: number, intersections: number[]): number[] => {
    const indices: number[] = [];
    const numSections = intersections.length - 1;
    const totalLinesPerSection = Math.floor(numIndices / numSections);

    for (let i = 0; i < numSections; i++) {
      const start = intersections[i];
      const end = intersections[i + 1];
      const step = Math.floor((end - start) / totalLinesPerSection);
      for (let j = 0; j < totalLinesPerSection; j++) {
        indices.push(start + j * step);
      }
    }

    return indices;
  };

  // Number of vertical lines per peak/trough
  const totalLines = 20;

  // Initial evenly spaced indices for vertical lines
  const evenlySpacedIndices = getEvenlySpacedIndices(totalLines, intersections);

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
      if (
        evenlySpacedIndices.includes(i) &&
        Math.abs(segment1.point.y - segment2.point.y) > intersectionThreshold
      ) {
        const midpointY = (segment1.point.y + segment2.point.y) / 2;
        const lineIndex = evenlySpacedIndices.indexOf(i);
        const lineHeight = heights[lineIndex]; // Use the height from the JSON data

        const verticalLine = new Paper.Path.Line({
          from: new Paper.Point(segment1.point.x, midpointY - lineHeight / 2),
          to: new Paper.Point(segment1.point.x, midpointY + lineHeight / 2),
          strokeWidth: 6,
          strokeColor: [0.8],
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
    viewMatrix.translate(viewCenter.subtract(new Paper.Point(width / 2, height / 2)));
    viewMatrix.scale(viewScale, viewScale, new Paper.Point(width / 2, height / 2));
    Paper.view.matrix = viewMatrix;
  };

  applyViewTransform();
  Paper.view.onResize = applyViewTransform;
};

export default drawing;
