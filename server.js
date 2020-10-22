const fs = require('fs')
const csv = require('csv-parser')
const graph = new Map();
const address = [];

function graphNode(name, weight){
  this.name = name;
  this.weight = weight;
  this.distance = null;
  this.visited = false;
}

fs.createReadStream('input-routes.csv')
  .pipe(csv())
  .on('data', function (row) {
      if(graph.has(row.from)){
        let list = graph.get(row.from);
        list.push(new graphNode(row.to, parseInt(row.weight)))
      } else {
        graph.set(row.from, [new graphNode(row.from, parseInt(row.weight)), new graphNode(row.to, parseInt(row.weight))])
      }

      if(graph.has(row.to)){
        let list = graph.get(row.to);
        list.push(new graphNode(row.from, parseInt(row.weight)))
      } else {
        graph.set(row.to, [new graphNode(row.to, parseInt(row.weight)), new graphNode(row.from, parseInt(row.weight))])
      }
  })
  .on('end', function () {
    getBestRoute(graph, graph.get('GRU'), graph.get('SCL'))
  })

  function getBestRoute(graph, startNode, endNode) {
    let visited = {};
    let unvisted = {};

    let resultSet = new Map();
    for(const [key, value] of graph.entries()){
        resultSet.set(key, {distance: null, previous: null })
        unvisted[key] = true;
    }

    let current = startNode[0];
    current.distance = 0;
    resultSet.set(current.name, {distance: 0, previous: null})
    let res;

    while(Object.keys(unvisted).length > 0){
     
        //mark as visited
        current.visited = true;
        delete unvisted[current.name]
        visited[current.name] = true;

        //update distance of neighbours
        nlist = graph.get(current.name)
        console.log("Current: ", current)
        currentRes = resultSet.get(current.name)
        // console.log("Graph" , graph)
        for(i in nlist){
            if(i == 0)
              continue
            res = resultSet.get(nlist[i].name)
            
            if(res.distance == null || res.distance > (nlist[i].weight + currentRes.distance)){
              let val = (currentRes.distance) ? currentRes.distance : 0;
              val = val + nlist[i].weight;
              nlist[i].distance = val;
              resultSet.set(nlist[i].name, {distance: nlist[i].distance, previous: current.name}) 
            }
        }

        //move on to shortest distant neighbour
        let shortest = {
          distance : null
        }
        for(i in nlist){
            if((shortest.distance == null || nlist[i].distance < shortest.distance) && !nlist[i].visited){
              shortest = nlist[i]
            }
        }

        current = shortest;
    }

    // console.log(graph)
    console.log("result" , resultSet)

    let shortestPath = []
    current = resultSet.get(endNode[0].name)
    console.log("Start Node: ", startNode[0].name )
    console.log("End Node: ", endNode[0].name)
    console.log("Current Node: ", current)
    shortestPath.push(endNode[0].name)

    console.log("cost: ", current.distance)


    while(current.previous != startNode[0].name ) {  
      shortestPath.push(current.previous);
      current =  resultSet.get(current.previous)
      ;
    }

    shortestPath.push(startNode[0].name)
    shortestPath.reverse()
    console.log("shortest: ", shortestPath)
  }