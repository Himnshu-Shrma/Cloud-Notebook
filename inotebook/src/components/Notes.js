import React, { useContext, useEffect,useRef,useState } from 'react'
import NoteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const context = useContext(NoteContext);
    const navigate=useNavigate();
    const { notes, getNotes,editNote } = context; 
    

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }else{
            navigate('/login');
            
        }
        //eslint-disabled-next-line
    });
    const ref = useRef(null);
    const refClose= useRef(null);
    const [note,setNote]=useState({id:"",etitle:"", edescription:"", etag:""});
    const updatenote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    }


    const handleUpdateNote=(e)=>{
        e.preventDefault();
        ref.current.click();
        editNote(note.id,note.etitle,note.edescription,note.etag);
        props.showAlert("Note Updated Successfully","success");
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }

    return (
        <div>
            <Addnote showAlert={props.showAlert} />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                    {/* <div id="emailHelp" className="form-text"></div> */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 && note.edescription.length<5}  ref={refClose} type="button" className="btn btn-primary" onClick={handleUpdateNote}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className='container'>
                {notes.length===0 && "No Notes created by the User"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updatenote={updatenote} note={note} showAlert={props.showAlert}/>;
                })}
            </div>
        </div>
    )
}

export default Notes