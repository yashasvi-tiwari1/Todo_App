import {json} from "express";
import {todoRouter} from "./routes/todo";
import mongoose from "mongoose";
const cors = require('cors')
const express = require('express');


const app = express();
let PORT = 7070;
app.use(cors());
app.use(json());
app.use(todoRouter)
mongoose.set('strictQuery',true);
mongoose.connect('mongodb://localhost:27017/ToDoList',
    ()=>{
    console.log('database connected');
    })



app.listen(PORT, () => {
    console.log(`server is listening in http://localhost:${PORT}`)
})