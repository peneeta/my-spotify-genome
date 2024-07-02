import Paper from 'paper';

const drawing = () => {
  Paper.project.clear();

  const amplitude = 100;
  const frequency = 0.0094;
  const wiggleAmplitude = 10; // Small amplitude for wiggling
  const wiggleFrequency = 0.01; // Frequency for wiggling

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

  for (let x = 0; x < width; x += 1) {
    const y1 = centerY - Math.sin(x * frequency) * amplitude; // Inverse sine wave
    const y2 = centerY + Math.sin(x * frequency) * amplitude;

    strand1.add(new Paper.Point(x, y1));
    strand2.add(new Paper.Point(x, y2));
  }

  strand1.smooth();
  strand2.smooth();

  // Create a group to hold the vertical lines
  const verticalLines = new Paper.Group();

  // Function to get random indices
  const getRandomIndices = (numIndices: number, maxIndex: number) => {
    const indices: number[] = [];
    while (indices.length < numIndices) {
      const randIndex = Math.floor(Math.random() * maxIndex);
      if (!indices.includes(randIndex)) {
        indices.push(randIndex);
      }
    }
    return indices;
  };

  // Initial random indices for vertical lines
  const randomIndices = getRandomIndices(20, strand1.segments.length);

  // Animate the paths to create the wiggling effect
  Paper.view.onFrame = (event: any) => {
    verticalLines.removeChildren(); // Clear previous lines

    for (let i = 0; i < strand1.segments.length; i++) {
      const segment1 = strand1.segments[i];
      const segment2 = strand2.segments[i];

      const x = segment1.point.x;

      const baseY1 = centerY + Math.sin(x * frequency) * amplitude; // Static sine wave
      const baseY2 = centerY - Math.sin(x * frequency) * amplitude; // Static inverse sine wave

      const wiggleY1 = Math.sin(event.time * 0.8 + i * wiggleFrequency) * wiggleAmplitude;
      const wiggleY2 = Math.sin(event.time * 0.8 + i * wiggleFrequency) * wiggleAmplitude;

      segment1.point.y = baseY1 + wiggleY1;
      segment2.point.y = baseY2 + wiggleY2;

      // Draw vertical line only for random indices
      if (randomIndices.includes(i)) {
        const verticalLine = new Paper.Path.Line({
          from: segment1.point,
          to: segment2.point,
          strokeWidth: 6,
          strokeColor: [0.8],
        });
        verticalLines.addChild(verticalLine);
      }
    }

    strand1.smooth();
    strand2.smooth();
  };
};

export default drawing;
