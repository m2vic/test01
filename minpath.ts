class PriorityQueue<T> {
  public value: { val: T; priority: number }[] = [];

  enqueue(val: T, priority: number): void {
    this.value.push({ val, priority });
    this.sort();
  }

  dequeue(): { val: T; priority: number } | undefined {
    return this.value.shift();
  }

  sort(): void {
    this.value.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  private adjacencyList: {
    [key: string]: { vertex: string; weight: number }[];
  } = {};

  addVertex(vertex: string): void {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1: string, vertex2: string, weight: number): void {
    const edges1 = this.adjacencyList[vertex1];
    const edges2 = this.adjacencyList[vertex2];
    const existingEdge1 = edges1.find((edge) => edge.vertex === vertex2);
    const existingEdge2 = edges2.find((edge) => edge.vertex === vertex1);

    if (!existingEdge1) {
      edges1.push({ vertex: vertex2, weight: weight });
    }
    if (!existingEdge2) {
      edges2.push({ vertex: vertex1, weight: weight });
    }
  }

  dijkstra(start: string, end: string): number | undefined {
    const nodes = new PriorityQueue<string>();
    const distance: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    let smallest: string;
    let path: string[] = [];

    for (let vertex in this.adjacencyList) {
      if (vertex == start) {
        distance[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distance[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    while (nodes.value.length) {
      smallest = nodes.dequeue()!.val;

      if (smallest === end) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest]!;
        }
        return distance[end];
      }

      if (smallest || distance[smallest] !== Infinity) {
        for (let neighbour in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbour];
          let candidate = distance[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.vertex;

          if (candidate < distance[nextNeighbor]) {
            distance[nextNeighbor] = candidate;
            previous[nextNeighbor] = smallest;
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
  }
}

function minEnergy(
  start: number,
  shops: number[],
  buses: number[],
  target: number
): number {
  const weightedGraph = new WeightedGraph();
  let result;
  let arr = [];
  arr.push(start);
  arr.push(target);
  shops.forEach((shop) => {
    arr.push(shop);
  });

  buses.forEach((bus) => {
    arr.push(bus);
  });

  arr.sort((a, b) => a - b);
  arr.forEach((nums) => {
    weightedGraph.addVertex(nums.toString());
  });

  for (let i = 0; i <= buses.length - 1; i++) {
    for (let j = i + 1; j <= buses.length - 1; j++) {
      weightedGraph.addEdge(buses[i].toString(), buses[j].toString(), 0);
    }
  }

  for (let i = 0; i < arr.length - 1; i++) {
    weightedGraph.addEdge(
      arr[i].toString(),
      arr[i + 1].toString(),
      arr[i + 1] - arr[i]
    );
  }

  let sortShop = shops.sort((a, b) => a - b);
  if (sortShop.length == 0) {
    result = weightedGraph.dijkstra(start.toString(), target.toString());
    return result!;
  }

  let startToShop = weightedGraph.dijkstra(
    start.toString(),
    sortShop[0].toString()
  );
  let lastShopToDestination = weightedGraph.dijkstra(
    sortShop[sortShop.length - 1].toString(),
    target.toString()
  );

  result = startToShop! + lastShopToDestination!;

  if (shops.length > 1) {
    for (let i = 0; i < shops.length - 1; i++) {
      let shopToNextShop = weightedGraph.dijkstra(
        sortShop[i].toString(),
        sortShop[i + 1].toString()
      );
      result += shopToNextShop!;
    }
  }

  return result;
}
