import Paper from 'paper';

const drawing = () => {
  Paper.project.clear()

  const amplitude = 100;
  const frequency = 0.01;
  const wiggleAmplitude = 5; // Small amplitude for wiggling
  const wiggleFrequency = 0.05; // Frequency for wiggling

    // Create the second path (inverse sine wave)
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


  // Animate the paths to create the wiggling effect
  Paper.view.onFrame = (event: any) => {
    for (let i = 0; i < strand1.segments.length; i++) {
      const segment1 = strand1.segments[i];
      const segment2 = strand2.segments[i];

      const x = segment1.point.x;

      const baseY1 = centerY + Math.sin(x * frequency) * amplitude; // Static sine wave
      const baseY2 = centerY - Math.sin(x * frequency) * amplitude; // Static inverse sine wave

      const wiggleY1 = Math.sin(event.time * 3 + i * wiggleFrequency) * wiggleAmplitude;
      const wiggleY2 = Math.sin(event.time * 3 + i * wiggleFrequency) * wiggleAmplitude;

      segment1.point.y = baseY1 + wiggleY1;
      segment2.point.y = baseY2 + wiggleY2;
    }

    strand1.smooth();
    strand2.smooth();
  };

};

export default drawing;
