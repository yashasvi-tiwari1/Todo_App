import './index.css';
import {useCallback, useEffect, useState} from "react";
function App() {
    let  url = 'http://localhost:4000';
    const [todos ,setTodos] = useState([]);
    const [input, setInput]= useState("");
    const fetchTodos = useCallback(() =>{
        fetch(url)
        .then((response => response.json()))
        .then(data =>{ setTodos(data)})
        .catch(error => console.error(error))
    },[url]);
    useEffect(()=>{
         fetchTodos();
    },[fetchTodos])

    const handleChange=(e)=>{
        setInput(e.target.value);
    }
    function addItem(){

        let info = {description:input}
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(info)
        })
            .then(response=>{fetchTodos()})
            .catch(error => console.error(error));
    }
    const [val,setVal] = useState('');
    function clearAll(){
        fetch(url,{
            method:'DELETE'
        })
            .then(response =>{fetchTodos()})
            .catch(error => console.error(error));
    }
    function deleteItem(id){
        fetch(`${url}/${id}`,{
            method:'DELETE'
        })
            .then(response =>{fetchTodos()})
            .catch(error => console.error(error));
    }
    function handleFunction(value, id){
        // console.log(value, id);
        setVal(value);
        let new_array = todos.map(element => element.id === id ? {...element, description: value} : element);
        setTodos(new_array)

        // setTodos((prev)=>{
        //     return {...prev, ...{id: id, description: value }}
        // })
    }
    function updateItem(idd){
        const todo = todos.find(todo=> todo.id === idd)
        fetch(`${url}/${idd}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(todo)
        })
            .then(response => {fetchTodos()})
            .catch(error=>console.error(error));
    }
    console.log(val);

    return (
        <>

            <div className="whole">
                <h1>
                    Todos App
                </h1>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Add Your New ToDO"
                        id="todotext"
                        className="text"
                        onChange={handleChange}
                        // value={input}
                    />
                    <button className="adding" onClick={addItem}>+</button>
                </div>
                <div className="description" id="main">
                    {todos.map((todo,index)=>{

                        return (
                            <div key={todo.id} className="todo-item">
                                <input type="text" onChange={(e)=>
                                    handleFunction(e.target.value, todo.id)
                                } className="input_text" value={todo.description}/>
                                {console.log(val)}
                                {val === todo.description &&
                                <button className ="button1"  onClick={()=>updateItem(todo.id)}> Update </button>
                                }
                                <button className ="button2" onClick={()=>deleteItem(todo.id)}> Delete </button>
                            </div>

                        )
                    })
                    }

                </div>
                <button className="clear" onClick={clearAll}>ClearAll</button>
            </div>

        </>
    );
}
export default App;
