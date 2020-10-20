const fs = require('fs')
const csv = require('csv-parser')
const graphs = [];
const address = [];

fs.createReadStream('input-routes.csv')
  .pipe(csv())
  .on('data', function (row) {
    
    if(graphs.find((node) => {node.name == row.to})){
        //found to nodes
       
    }
   
   

    let node = {
        name: row.to,
        weight: row.weight,
        visited: false,
        next: []
    }
    let node2 = {
        name: row.from,
        weight : row.weight,
        visited: false,
        next: []
    }
    graphs.push(node)
  })
  .on('end', function () {
    console.log(graphs)
    // TODO: SAVE users data to another file
  })

 
//const express = require('express');
//const Joi = require('joi'); 
//const app = express();
//app.use(express.json());

//const courses=[
//     {id:1, name:'courses'},
//     {id:1, name:'courses'},
//     {id:1, name:'courses'},      

//];

//app.get('/',(req,res)=>{
//    res.send("testing");

//});

//app.get('/api/courses',(req,res)=>{
//   res.send(JSON.stringify([1,2,3]));
//});

//app.get('/api/courses/:id',(req,res)=>{
 //   let course = courses.find(c=>c.id === parseInt(req.params.id));/
//    if(!course) res.status(404).send("give id course not found");
//    res.send(course);
// });

//app.post('/api/courses',(res,req)=>{
//    const schema = {
//        name:Joi.string().min(3).required()
//    }
//    const result = Joi.validate(req.body,schema)
//    if(result.error){
//        res.status(400).send(result.error.details[0].message);
//        return;
//    }
//    const course = {
//        id : courses.length+1,
//        name:req.body.name
//    };
//    course.push(course);
//    res.send(course);

//}); 

//app.get('/api/course/:id',(req,res)=>{
//   res.send(req.params.id);
//});
//
//const port = process.env.PORT || 3000;
//app.listen(port,()=>{
  
//    console.log(`listeining to port ${port}`);

//});

//const Logger = require('./logger');
//const logger = new Logger();
//logger.on('messageLogged',(args)=> {
//    console.log("recieved the message",args);
    
//});
//logger.log('message');