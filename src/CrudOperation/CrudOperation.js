import React, { useState } from 'react'
import {collection,addDoc, doc, setDoc} from "firebase/firestore"
import {firestore} from "../firebase_setup/firebase"
import {v4 as uuidv4 } from "uuid"
import CrudTable from './CrudTable'
const CrudOperation = () => {
    const [detail,setdetail]=useState({id:uuidv4(),firstname:"",email:""})
    const [docId,setDocId]=useState("")
    const [isUpdate,setIsUpdate]=useState(false)
    const HandleChange=(name,value)=>{
        setdetail({...detail, [name]:value})
    }
    const HandleSubmit=(e)=>{
        e.preventDefault();
        console.log(detail,"details")
        if(Object.values(detail).some(x=>x==="")){
          alert("Please fill all the fields")
          return;
        }
        let ref;
        if(isUpdate){
        ref=doc(firestore,"crud-operation",docId)
        try{
          setDoc(ref,detail,{merge:true})
          setIsUpdate(false)
          setDocId("")
      }
      catch(err){
          console.log(err)
      }
        }else{
         ref=collection(firestore,"crud-operation")
         try{
          addDoc(ref,detail)
      }
      catch(err){
          console.log(err)
      }
        }
       

        setdetail({id:uuidv4(),firstname:"",email:""})
    }
    const HandleUpdate=(id,item)=>{
      console.log(id,item,"id-item")
      setdetail(item)
      setDocId(id)
      setIsUpdate(true)
    }
  return (
    <div className='h-[100vh] bg-blue-100'>
            <div className='flex  justify-center py-8  flex-col items-center gap-7 '>
        <h1 className=' font-bold text-3xl'>Firebase Crud Operation</h1>
       <form class="w-full max-w-sm" onSubmit={HandleSubmit}>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Full Name
      </label>
    </div>
    <div class="md:w-2/3">
      <input placeholder='Enter First Name' class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={detail.firstname} onChange={(e)=>HandleChange("firstname",e.target.value)}/>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
        Email
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="email" placeholder="Enter Email" value={detail.email} onChange={(e)=>HandleChange("email",e.target.value)}/>
    </div>
  </div>
  
  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="sumbit">
      {isUpdate?"Update":"Submit"} 
      </button>
    </div>
  </div>
</form>
    </div>
    <div className='flex  justify-center'>
        <CrudTable onUpdate={HandleUpdate}/>
    </div>
    </div>
  )
}

export default CrudOperation