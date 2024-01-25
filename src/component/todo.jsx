import React, {useState, useEffect} from 'react'
import "./App.js"

 const getLocalItems = () =>{
   let list = localStorage.getItem('lists');
   console.log(list);

   if(list){
     return JSON.parse(localStorage.getItem('lists'));
} else {
    return [];
}
}



const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());

    const addItem = ()=>{
        if(!inputData){

        } else {
            setItems([ ...items, inputData]);
            setInputData('')
        }
    }

    const deleteItem = (id) =>{
        console.log(id);
        const updateditems = items.filter((elem, ind)=>{
            
        });
        setItems(updateditems);
    }

    const removeAll = () =>{
        setItems([]);
    }

    useEffect(()=>{
        localStorage.setItem("lists", JSON.stringify(items))
    },[items]);
 
  return (
    <div>
     <div className="main-dv">
        <div className="child-div">
            
            <div className="addItems">
            <input type="text" placeholder='Add Item...'
              value={inputData}
              onChange={(e)=> setInputData(e.target.value)}
            />
            <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>
            </div>
           
            <div className='showItems'>
                
                 <input type="text"  name="name" placeholder='enter name'/>
                 <input type="text" name="roll_no" placeholder='enter roll_no' />
                 <input type="text" name="address" placeholder='enter address' />
                 <input type="text" name="email" placeholder='enter email' />
                
            </div>
    
            
            
        </div>
     </div>
    </div>
  )
}

export default Todo;
