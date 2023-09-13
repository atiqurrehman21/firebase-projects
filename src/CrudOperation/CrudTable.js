import React, { useEffect, useState } from "react";
import { query, collection, onSnapshot,doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
const CrudTable = ({onUpdate}) => {
  const [tablelist, setTableList] = useState([]);
  const [loading,setloading]=useState(true)
  const [ids, setIds] = useState([]);

  const getData = async () => {
    const data = await query(collection(firestore, "crud-operation"));

    onSnapshot(data, (snapshot) => {
      const databaseInfo = [];
      const dataId = [];
      snapshot.forEach((doc) => {
        databaseInfo.push(doc.data());
        dataId.push(doc.id);
      });
      
      setTableList(databaseInfo);
      setIds(dataId);
      setloading(false);
    })
  };
  useEffect(() => {
    
    getData();
  }, []);

  

  const handledelete = async (e) => {
    const docRef = doc(firestore, 'crud-operation', e);
    console.log(docRef,"docref")
    await deleteDoc(docRef)
        .then((value) => {
          console.log(`${e} has been deleted successfully. `)
        })
        .catch(error => {
          console.log(error);
        })
}
  console.log(tablelist,ids);
  return (
    <div className="border-red-300 border-solid p-[2px] bg-[#F0FFFF]   border-[2px] rounded-lg">
        {loading ? <div>Loading...</div>:
      <table class="table-auto bg-[#F0FFFF]    rounded-lg">
        <thead>
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Eamil</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tablelist.map((it, index) => (
            <tr class={`${index % 2 !== 0 ? "bg-gray-100" : ""}`}>
              <td class="border px-4 py-2">{it.firstname}</td>
              <td class="border px-4 py-2">{it.email}</td>
              <td class="border px-4 py-2">
                <div className="flex gap-3">
                  <button className="px-5 py-2 bg-blue-600  w-[100px] text-white rounded-lg" onClick={()=>onUpdate(ids[index],it)}>Edit</button>
                  <button className="px-5 py-2 bg-red-600 text-white  w-[100px] rounded-lg" onClick={()=>handledelete(ids[index])}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
}
    </div>
  );
};

export default CrudTable;
