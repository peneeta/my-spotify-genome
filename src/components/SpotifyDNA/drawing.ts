import Paper from 'paper';

const drawing = (data: any) => {
  Paper.project.clear();

  const amplitude = 130;
  const wiggleAmplitude = 10; // Small amplitude for wiggling
  const wiggleFrequency = 0.01; // Frequency for wiggling
  const intersectionThreshold = 30; // Threshold to consider points as intersecting
  const numPeriods = 2; // Number of periods (peaks and troughs) to display
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

  const width = Paper.view.size.width;
  const h = Paper.view.size.height;
  const centerY = h / 2;
  const availableWidth = width * fractionOfWidth; // Width available for the sine wave
  const frequency = (2 * Math.PI * numPeriods) / availableWidth; // Frequency to fit the desired number of periods

  const totalPoints = Math.floor(availableWidth); // Total points to cover the desired width
  const xOffset = (width - availableWidth) / 2; // Offset to center the sine wave horizontally

  for (let x = 0; x < totalPoints; x += 1) {
    const xPos = (x / totalPoints) * availableWidth + xOffset;
    const y1 = centerY - Math.sin(x * frequency) * amplitude; // Inverse sine wave
    const y2 = centerY + Math.sin(x * frequency) * amplitude;

    strand1.add(new Paper.Point(xPos, y1));
    strand2.add(new Paper.Point(xPos, y2));
  }

  strand1.smooth();
  strand2.smooth();

  // Create a group to hold the vertical lines
  const verticalLines = new Paper.Group();

  // Function to get evenly spaced indices
  const getEvenlySpacedIndices = (numIndices: number, maxIndex: number) => {
    const step = Math.floor(maxIndex / numIndices);
    return Array.from({ length: numIndices }, (_, i) => i * step);
  };

  // Number of vertical lines per peak/trough
  const totalLines = 20;

  // Initial evenly spaced indices for vertical lines
  const evenlySpacedIndices = getEvenlySpacedIndices(totalLines, totalPoints);

  // Extract heights from the JSON data
  const heights = data.items.map((item: { popularity: any }) => item.popularity);

  console.log(heights);

  // Animate the paths to create the wiggling effect
  Paper.view.onFrame = (event: any) => {
    verticalLines.removeChildren(); // Clear previous lines

    for (let i = 0; i < strand1.segments.length; i++) {
      const segment1 = strand1.segments[i];
      const segment2 = strand2.segments[i];

      const x = segment1.point.x;

      const baseY1 = centerY + Math.sin((x / availableWidth) * totalPoints * frequency) * amplitude; // Static sine wave
      const baseY2 = centerY - Math.sin((x / availableWidth) * totalPoints * frequency) * amplitude; // Static inverse sine wave

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
};

export default drawing;
