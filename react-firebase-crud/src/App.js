import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Adddata from './Components/Adddata';
import UpdateData from './Components/UpdateData';
import ViewData from './Components/ViewData';
import { db } from './firbase-config';

function App() {
  const [users,setUsers]=useState([]);
   const [newName, setNewName]=useState();
  const [newAge,setNewAge]=useState(0);
  const [newUser,setNewUser]=useState([]);
  const [id,setId]=useState('');
  const userCollections=collection(db,'users');
  const handleClick=(name,age)=>{
    const user={
      Name:name,Age:age}
      const createUser=async()=> await addDoc(userCollections,user);
      createUser();
    
}
  
const deteleMethod=async(id)=>{
  const delet=doc(db,'users',id);
  await deleteDoc(delet);
  getUsers()


}

const handleEdit=(user)=>{
setId(user.id)
setNewName(user.Name)
setNewAge(user.Age)
console.log(user,'user')

}
// console.log(id,newName,newAge,'baki gula')
const upDatedData= async ({name,age,id})=>{
  console.log(name,age,id,'updated')
  // name,age,id
  const userd = doc(db, "users", id);
  const newField={Name:name,Age:age,id};
  console.log(newField,'newField')
  await updateDoc(userd, newField);
  setNewName(name)
  setNewAge(age)
  getUsers()


}

const getUsers=async ()=>{
  const data=await getDocs(userCollections);
  setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
  
};
  useEffect(()=>{

    getUsers()
  },[])
  
  return (
    <>  
        <Routes>
          <Route path='/' element={<ViewData users={users} deteleMethod={deteleMethod} handleEdit={handleEdit}/>}/>
          <Route path='/adddata' element={<Adddata handleClick={handleClick}/>} />
          <Route path='/updatedata' element={<UpdateData  upDatedData={upDatedData} update={{id,newName,newAge}}/>} />
        </Routes>
      
    </>
  );
}

export default App;
