import React from 'react'

function Alert(props) {
    const Capitalize=(word)=>{
        if(word==="danger"){
            word="error"
        }
       
        const l=word.toLowerCase();
        return l.charAt(0).toUpperCase()+l.slice(1);

    }
    return (
        <div style={{height:"50px"}}>{props.alert && <div>
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
       <strong>{Capitalize(props.alert.type)}</strong> {props.alert.msg}.
       <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>
   </div>}</div>
        
    )
}

export default Alert