const VisGrid = () => {

  const GRID_WIDTH = 19;
  const GRID_HEIGHT = 16;

  const CELL_PIXEL_SIZE = 45;

  const TOTAL_SLOTS = GRID_WIDTH * GRID_HEIGHT;

  let gridCenter = {x:349, y:670};
  let cells = [];
  let proximityLookups = {};

  const getNextAvailableCell = () => {

    let openIndex = -1;

    for (let i = 0; i < cells.length; i++) {

      if (cells[i].occupied == false) {
        openIndex = i;
        break;
      }

    }

    return cells[openIndex];

  };

  const getRandomAvailableCell = () => {

    let randomIndex = Math.floor(Math.random() * cells.length);

    // Search upward from random index
    for (let i = randomIndex; i < cells.length; i++) {

      if (cells[i].occupied == false) {
        return cells[i];
      }

    }

    // Search downward from random index
    for (let i = randomIndex; i >= 0; i--) {

      if (cells[i].occupied == false) {
        return cells[i];
      }

    }

    // No cells are available
    return null;

  };

  const getNearestAvailableCell = (forCell) => {

    console.log('getNearestAvailableCell', forCell.id);
    // const proxArray = proximityLookups[forCell.id];

    const memoDistFrom = memoized(distanceFrom(forCell));
    const proxArray = cells.sort(memoDistFrom);

    for (var i = 0; i < proxArray.length; i++) {

      if (proxArray[i].occupied == false) {
        return cells[i];
      }

    }

    // All cells occupied :(
    return null;

  };

  const reset = () => {

    console.log('VisGrid.reset()');

    for (let i = 0; i < cells.length; i++) {

      cells[i].occupied = false;

    }

  };

  const buildSpiralGrid = () => {

    let x = 0;
    let y = 0;
    let delta = [0, -1];

    for (let i = Math.pow(Math.max(GRID_WIDTH, GRID_HEIGHT), 2); i > 0; i--) {

      if ((-GRID_WIDTH / 2 < x && x <= GRID_WIDTH / 2) && (-GRID_HEIGHT / 2 < y && y <= GRID_HEIGHT / 2)) {

        const pixelX = (x * CELL_PIXEL_SIZE) + gridCenter.x;
        const pixelY = (y * CELL_PIXEL_SIZE) + gridCenter.y;
        const id = '' + x + ',' + y;
        const newCell = {order:i, id:id, x:x, y:y, pixelX:pixelX, pixelY:pixelY, occupied:false};
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

  const calcProximityCells = (forCell) => {

    const sortPt = {};

  }

  const buildLookupArrays = () => {

    proximityLookups = {};

    const cellsClone = cells.slice(0);

    for (var i = 0; i < cellsClone.length; i++) {

      const refCell = cellsClone[i];

      const memoDistFrom = memoized(distanceFrom(refCell));

      console.log('Lookup built for:', refCell.id);
      proximityLookups[refCell.id] = cells.sort(memoDistFrom);

    }

    console.log('TOTAL_SLOTS',TOTAL_SLOTS);
    console.log('cells.length', cells.length);
    console.log('proximityLookups',Object.keys(proximityLookups).length);
    console.log(proximityLookups);

    // After lookups are built, resort by order
    sortByKey(cells, 'order');

  }

  function simpleDist(pointA, pointB) {

    const x = pointA.x - pointB.x;
    const y = pointA.y - pointB.y;

    return Math.sqrt(x * x + y * y);

  }

  // Build the grid.
  buildSpiralGrid();

  // Memoize distance sorts
  // for each cell.
  buildLookupArrays();

  function memoized(fn) {

    let lookupTable = {};

    let keymaker = function(args) {
      // console.log(JSON.stringify(args));
      return JSON.stringify(args)

    };

    return function() {
      let key = keymaker.call(this, arguments);

      return lookupTable[key] || (
      lookupTable[key] = fn.apply(this, arguments))
    }

  }

  function simpleDist(pointA, pointB) {
    let x = pointA.x - pointB.x;
    let y = pointA.y - pointB.y;

    return Math.sqrt(x * x + y * y);
  }

  function distanceFrom(pointC) {
    return function(pointA, pointB) {
      let distA = simpleDist(pointA, pointC);
      let distB = simpleDist(pointB, pointC);

      if (distA < distB) return -1;
      if (distA > distB) return 1;
      return 0;
    }
  }

  function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

  return {
    getNextAvailableCell,
    getRandomAvailableCell,
    getNearestAvailableCell,
    reset,
    cells,
  };

};

export default VisGrid();
