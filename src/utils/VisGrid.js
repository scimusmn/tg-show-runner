const VisGrid = () => {

  const GRID_WIDTH = 14;
  const GRID_HEIGHT = 17;

  const CELL_PIXEL_SIZE = 50;

  const TOTAL_SLOTS = GRID_WIDTH * GRID_HEIGHT;

  let gridCenter = {x:380, y:660};
  let cells = [];

  const getNextAvailableCell = () => {

    // Temp
    let openIndex = -1;

    for (let i = 0; i < cells.length; i++) {

      if (cells[i].occupied == false) {
        openIndex = i;
        break;
      }

    }

    return cells[openIndex];

  };

  const getNearestAvailableCell = (fromIndex) => {

    // Temp
    const rIndex = Math.floor(Math.random() * cells.length);
    return cells[rIndex];

  };

  const buildSpiralGrid = () => {

    let x = 0;
    let y = 0;
    let delta = [0, -1];

    for (let i = Math.pow(Math.max(GRID_WIDTH, GRID_HEIGHT), 2); i > 0; i--) {

      if ((-GRID_WIDTH / 2 < x && x <= GRID_WIDTH / 2) && (-GRID_HEIGHT / 2 < y && y <= GRID_HEIGHT / 2)) {

        const pixelX = (x * CELL_PIXEL_SIZE) + gridCenter.x;
        const pixelY = (y * CELL_PIXEL_SIZE) + gridCenter.y;
        const newCell = {x:x, y:y, pixelX:pixelX, pixelY:pixelY, occupied:false};
        cells.push(newCell);

        // console.log('Cell', cells.length, 'of', TOTAL_SLOTS, ' | ', newCell);
      }

      if (x === y || (x < 0 && x === -y) || (x > 0 && x === 1 - y)) {
        // Change direction
        delta = [-delta[1], delta[0]];
      }

      x += delta[0];
      y += delta[1];

    }

  }

  buildSpiralGrid();

  return {
    getNextAvailableCell,
    getNearestAvailableCell,
    cells,
  };

};

export default VisGrid();
