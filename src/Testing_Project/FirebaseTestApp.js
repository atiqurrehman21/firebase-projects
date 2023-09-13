import React from 'react'
import handleSubmit from './handles/HandleSendData'
import { useRef } from 'react'
const FirebaseTestApp = () => {
    const dataRef=useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        handleSubmit(dataRef.current.value);
        dataRef.current.value='';
    }
  return (
    <div>
        <form onSubmit={submitHandler}>
            <label>Username</label>
            <input type='text'  ref={dataRef}/>
            <button type='submit'>Save</button>
        </form>
    </div>
  )
}

export default FirebaseTestApp