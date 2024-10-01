import { useState } from "react"

function Input(props){
    const [field,setField]=useState('');
    function handleChange(e){
        const val=e.target.value;
        setField(val);
    }
    return(
        <div>
        <form onSubmit={(e)=>{
                    props.add(field);
                    e.preventDefault();
                    setField('')
                    
                }}>
        <div className="input-container">
              <input type="text"  onChange={handleChange} value={field}/>
                <input type="submit" />
               
                </div>
                </form>
                </div>
    )
}
export default Input;