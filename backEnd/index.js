import express from "express";
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
app.use(express.json()); 
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "React-todolist",
  password: "123456",
  port: 5432,
});
db.connect();

app.get("/todos",async (req,res)=>{
    const result = await db.query('SELECT * FROM todos order by id ');
    res.json(result.rows);

  });

app.post("/add",async (req,res)=>{
 const {task}=req.body;
 const result = await db.query("insert into todos (task) values ($1) returning * ",[task]);
 res.json(result.rows[0])

})
app.patch("/status/:id",async(req,res)=>{
    const {id}=req.params;
    const {status}=req.body;
    await db.query("UPDATE todos set completed=$1 where id=$2",[!status,id]);
})
app.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params;
    await db.query("delete from todos where id=$1",[id]);
})

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });