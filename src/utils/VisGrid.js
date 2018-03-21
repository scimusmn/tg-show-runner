const VisGrid = () => {

  let gridWidth = 15;
  let gridHeight = 10;
  let numCells = gridHeight * gridWidth;
  let cells = [];

  for (var i = 0; i < numCells; i++) {

    const col = i % gridWidth;
    const row = (i - col) / gridWidth;

    const newCell = {x:col, y:row, occuppied:false};
    cells.push(newCell);

  }

  const someFunc = (fragments, index) => {
    // frags = fragments;
    // slideIndex = Number(index);
  };

  const getNearestOpenCell = () => {

    const cell = cells[5];
    return cell;

  };

  return {
    getNearestOpenCell,
    someFunc,
  };

};

export default VisGrid();
