
const GenerationSimulator = () => {

  const OFFSPRING_PER_PAIR = 3;

  const totalVistaCount = (_numGenerations, _seedVistaCount) => {

    let childCount = _seedVistaCount;
    let totalVistas = childCount;

    for (let i = 0; i < _numGenerations; i++) {

      // How many pairs of parents in this gen?
      const numPairs = Math.floor(childCount / 2);

      // Make children for each pair
      childCount = 0;
      for (let j = 0; j < numPairs; j++) {

        childCount += OFFSPRING_PER_PAIR;
        totalVistas += OFFSPRING_PER_PAIR;

      }

    }

    return totalVistas;

  };

  const simulateVistas = (_numGenerations, _seedVistaCount) => {

    let childCount = _seedVistaCount;
    let generation = 0;
    let vistas = [];

    // Include intiatial seeds..
    for (let k = 0; k < _seedVistaCount; k++) {

      const vista = {friendliness:0.1, generation:generation};
      vistas.push(vista);

    }

    for (let i = 0; i < _numGenerations; i++) {

      // How many pairs of parents in this gen?
      const numPairs = Math.floor(childCount / 2);

      // Make children for each pair
      generation++;
      childCount = 0;
      for (let j = 0; j < numPairs; j++) {

        childCount += OFFSPRING_PER_PAIR;

        for (let k = 0; k < OFFSPRING_PER_PAIR; k++) {

          const vista = {friendliness:0.1, generation:generation};
          vistas.push(vista);

        }

      }



    }

    return vistas;

  };

  return {
    totalVistaCount,
    simulateVistas,
  };

};

export default GenerationSimulator();
