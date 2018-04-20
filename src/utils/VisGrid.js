const VisGrid = () => {

  const GRID_WIDTH = 12;
  const GRID_HEIGHT = 13;

  const CELL_PIXEL_SIZE = 61;

  const TOTAL_SLOTS = GRID_WIDTH * GRID_HEIGHT;

  const gridCenter = {x:344, y:670};
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

    // Grab pre-sorted array for this cell.
    const proxArray = proximityLookups[forCell.id];

    // Skip 0 index as will be self.
    for (var i = 1; i < proxArray.length; i++) {

      // Must find original cell,
      // not clone from prox array
      const origIndex = proxArray[i].order;

      if (cells[origIndex].occupied == false) {

        return cells[origIndex];

      }

    }

    // All cells occupied :(
    return null;

  };

  const resetMates = (vistasToPair) => {

    const mateLookup = {};

    const clones = vistasToPair.slice(0);

    console.log(clones);

    let forCell;
    let otherCell;

    let recordDist = 999;
    let recordCell;
    let dist;
    let wasMatched = false;

    for (var i = clones.length - 1; i >= 0; i--) {

      wasMatched = false;
      recordDist = 999;

      forCell = clones[i].cell;

      // Skip if this cell is already set.
      if (mateLookup.hasOwnProperty(forCell.id)) {
        continue;
      }

      for (var j = clones.length - 1; j >= 0; j--) {
        otherCell = clones[j].cell;

        if (mateLookup.hasOwnProperty(otherCell.id) || otherCell == forCell) {
          continue;
        }

        dist = simpleDist(forCell, otherCell);

        if (dist < recordDist) {

          wasMatched = true;
          recordDist = dist;
          recordCell = otherCell;

        }

      }

      // Commit to the pair
      if (wasMatched == true) {
        mateLookup[forCell.id] = recordCell.id;
        mateLookup[recordCell.id] = forCell.id;
      } else {
        console.log('Singleton! No match');
      }

    }

    console.log('matching complete', clones.length, Object.keys(mateLookup).length);

    return mateLookup;

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
        const newCell = {order:cells.length, id:id, x:x, y:y, pixelX:pixelX, pixelY:pixelY, occupied:false};
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

  const buildLookupArrays = () => {

    proximityLookups = {};

    for (var i = 0; i < cells.length; i++) {

      const refCell = cells[i];

      const lookup = createProximityLookup(cells[i]);

      proximityLookups[refCell.id] = lookup;

    }

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

  function createProximityLookup(forCell) {

    // Make clone of array before resorting.
    const cellClones = cells.slice(0);

    const sorted = cellClones.sort(distanceFrom(forCell));

    return sorted;

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
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  return {
    getNextAvailableCell,
    getRandomAvailableCell,
    getNearestAvailableCell,
    reset,
    gridCenter,
    resetMates,
    cells,
  };

};

export default VisGrid();
