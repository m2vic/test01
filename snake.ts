type LadderOrSnake = [number, number];

interface SnakesAndLadders {
  ladders: LadderOrSnake[];
  snakes: LadderOrSnake[];
}

interface PathResult {
  position: number;
  moves: number;
  diceRolls: number[];
}

function quickestPath(board:{ladders:[number,number][];snakes:[number,number][]}): number[] {
  const ladders = new Map(board.ladders);
  const snakes = new Map(board.snakes);

  const queue: PathResult[] = [{ position: 1, moves: 0, diceRolls: [] }];
  const visited = new Set<number>();

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current.position === 100) {
      return current.diceRolls;
    }

    if (!visited.has(current.position)) {
      visited.add(current.position);
      for (let i = 1; i <= 6; i++) {
        const nextPosition = getNextPosition(
          current.position + i,
          ladders,
          snakes
        );
        queue.push({
          position: nextPosition,
          moves: current.moves + 1,
          diceRolls: [...current.diceRolls, i],
        });
      }
    }
  }


  return [];
}

function getNextPosition(position: number, ladders: Map<number, number>, snakes: Map<number, number>): number {

  if (ladders.has(position)) {
    return ladders.get(position)!;
  } else if (snakes.has(position)) {
    return snakes.get(position)!;
  }
  return position;
}




