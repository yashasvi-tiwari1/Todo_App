import express, {Request, Response} from "express";
import {Todo} from "../models/todo";

const router = express.Router()

router.get('/', [],(req:Request,res:Response) => {
    let todos = Todo.find((err:any,todos:any) => {
        if(err) {
            res.send("Error");
        }
        else{
            res.send(todos);
        }
    })
})


router.post('/', async (req,res) => {
    const {title,description} = req.body;
    const todo = {description};
    const newTodo = new Todo(todo);
    try{
        await newTodo.save();
        res.status(201).send(newTodo)

    }
    catch (error){
        res.status(409).send(error)
    }
})

router.delete('/:id', (req,res)=>{
    let todo = Todo.deleteOne({_id : req.params.id},(err:any)=>{
        if(err){
            res.send(err);
        }
        else{
            res.sendStatus(200);
        }
    })
})

router.put('/:id',(req,res)=>{
    let todo = Todo.findByIdAndUpdate(req.params.id,req.body,
        (err:any,todo:any)=>{
        if(err){
            res.send(err);
        }
        else{
            res.sendStatus(201);
        }
        })
})

router.delete('/',(req,res)=>{
    let todo = Todo.deleteMany({},(err:any)=>{
        if(err){
            res.send(err);
        }
        else{
            res.sendStatus(201);
        }
    })
})

export {router as todoRouter}