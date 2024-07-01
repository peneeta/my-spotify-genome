import Paper from 'paper';
// import dnaStrand from './strand1_dna.svg';

const drawing = () => {
  Paper.project.clear()
  var amount = 6;
  var height = 10;

  var path = new Paper.Path({
    strokeColor: [0.8],
	  strokeWidth: 30,
	  strokeCap: 'smooth'
  })

  path.position = Paper.view.center;

  for (var i = 0; i <= amount; i++) {
    const x = (i / amount) * Paper.view.size.width;
    const y = 1 * Paper.view.size.height;
    path.add(new Paper.Point(x,y));
  }

  path.selected = true;

  Paper.view.onFrame = (event: any) => {
    for (var i = 0; i <= amount; i++) {
      var segment = path.segments[i];

      // A cylic value between -1 and 1
    var sinus = Math.sin(event.time * 3 + i);
    
    // Change the y position of the segment point:
    segment.point.y = sinus * height + 100;
  }
      // Uncomment the following line and run the script again
      // to smooth the path:
      path.smooth();
    }  

  // Paper.project.importSVG(dnaStrand, (item: any) => {
  //   if (!item) {
  //     console.error('Failed to load svg')
  //     return
  //   }

  //   let path = item.clone() as paper.Path;
  //   if (path instanceof Paper.Path) {
  //     console.log("path is a paper.Path")
  //   }

  //   // Remove the original imported SVG to prevent it from rendering
  //   item.remove();

  //   path.position = Paper.view.center;
  //   path.strokeCap = 'round';
  //   path.selected = true; // just to see the movement

    

  // })

};

export default drawing;
