import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
function Tasks(props){
    return(
        <div className='tasks'>
           <input type="checkbox" checked={props.status}  onChange={()=>{
            props.onToggle(props.id,props.status)}}/>
            
            <p  style={{ textDecoration: props.status ?"line-through":"none"  }}>{props.name}</p>
            <button onClick={()=>{
                props.deleteTask(props.id);
            }}><DeleteIcon/></button>
        </div>
    )
}
export default Tasks;