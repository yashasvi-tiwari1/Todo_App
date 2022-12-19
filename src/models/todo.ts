import mongoose from "mongoose";


 interface itodo {
     description:String
 }
// interface todoDoc extends mongoose.Document{
//     title:String,
//     description:String
// }
//  interface todoModelInterface extends mongoose.Model<todoDoc>{
//     build(attr:itodo):any
//  }



const todoschema = new mongoose.Schema({
    description:{
        type:String,
        required: true
    }
})

// const Todo = mongoose.model<todoDoc, todoModelInterface>('Todo',todoschema);

const Todo = mongoose.model<itodo>('Todo',todoschema);


 // todoschema.statics.build = (attr:itodo) => {
 //     return new Todo(attr)
 // }


export {Todo};
