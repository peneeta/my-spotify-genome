import Paper from 'paper';

const drawing = () => {
    let myPath = new Paper.Path;

    Paper.view.onMouseDown = (event: paper.MouseEvent) => {
        myPath.strokeColor = new Paper.Color('white');
        myPath.strokeWidth = 3;
    };

    Paper.view.onMouseDrag = (event: paper.MouseEvent) => {
        myPath.add(event.point);
    };
};

export default drawing;
