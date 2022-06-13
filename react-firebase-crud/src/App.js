import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './firbase-config';

function App() {
  const [users,setUsers]=useState([]);
  const userCollections=collection(db,'users');
  useEffect(()=>{
    const getUsers=async ()=>{
      const data=await getDocs(userCollections);
      setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      console.log(users)
    };
    getUsers()
  },[])
  return (
    
  <div>app</div>
  );
}

export default App;
