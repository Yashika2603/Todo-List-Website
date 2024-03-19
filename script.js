const express=require("express"); //importing express module in script file as express
const app=express(); //running express as a function in app variable
const path=require("path"); //importing path module
app.use(express.urlencoded({extended:true})); //starting express body parser as a middleware
app.use(express.json()); //converting data to json
app.use(express.static(path.join(__dirname,"static"))); //creating static directory for express 
let Todo=require("./Todo/Js/script");

app.get("/gettodo", async (req, res) => {
    let result=await Todo.gettodo();
    res.send(result);
});

app.post("/addtodo", async (req,res) => {
    let {taskItem} = req.body;
    console.log(taskItem);
    let msg=await Todo.addtodo(taskItem);
    res.send(msg);
    res.redirect("/gettodo");
});

app.post("/edittodo", async (req,res)=>{
    const {index, newTask} = req.body;
    let msg= await Todo.edittodo(index, newTask);
    res.send(msg);
});

app.post("/deletetodo", async (req,res) => {
    const {index} =req.body;
    let msg=await Todo.deletetodo(index);
    res.send(msg);
});

app.post("/deleteall", async (req,res) =>{
    let msg=await Todo.deleteall();
    res.send(msg);
});

app.listen(3000, ()=>{
    console.log("Server started on http://localhost:3000");
}) //app.listen starts server here on port 3000 and printing message over console