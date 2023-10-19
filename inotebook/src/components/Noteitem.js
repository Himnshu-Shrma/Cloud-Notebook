import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
const Noteitem = (props) => {
    const context=useContext(noteContext);
    const {deleteNote}=context;
    
    const { note,updatenote } = props;
    return (
        <div className='col-md-3'>

            <div className="card text-center my-3 i">
                <div className="card-header">
                    {note.tag}*
                </div>
                <div className="card-body">
                    <div className='d-flex justify-content-center align-items-center'>
                    <h5 className="card-title mx-2">{note.title}</h5>
                    <i className="fa-solid fa-trash mx-2" style={{color: "#025af2",}} onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted Successfully","success")}} ></i>
                    <i className="fa-solid fa-pencil mx-2" style={{color: "#025af2",}} onClick={()=>{updatenote(note)}} ></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    
                </div>
                <div className="card-footer text-body-secondary">
                    {note.date}
                </div>
            </div>
        </div>
    )
}

export default Noteitem