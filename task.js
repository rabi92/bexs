const fs = require('fs')
const csv = require('csv-parser')
const graph = [];

fs.createReadStream('input-routes.csv')
  .pipe(csv())
  .on('data', function (row) {
    
    const graph = {
        To,
        name: row.from,
        weight: row.weight,
        visited: false,
        
    }
    users.push(graph)
  })
  console.log("graph");
 