import {addDoc,collection} from "@firebase/firestore"
import {firestore} from "../../firebase_setup/firebase"
const handleSubmit=(currentvalue)=>{
    const ref=collection(firestore,"test_data");
    let data={
        testdata:currentvalue
    }
    try{
        addDoc(ref,data)
    }
    catch(err){
        console.log(err)
    }
}
export default handleSubmit;