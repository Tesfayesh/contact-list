import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';

const App = () => {

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(0)
  const [contactList, setContactList] = useState([])
  const [newContact, setNewContact] = useState(0)
  
  const addNewContact = () => {
    Axios.post('http://localhost:5000/add-contact',{name,phoneNumber})
  }
 
  useEffect(() => {
    Axios.get('http://localhost:5000/get-contact').then(res => {
      setContactList(res.data.data.phoneNumbers)
    })
  },[])

  const updateContact = (id) =>{
    Axios.put('http://localhost:8080/update-contact',{id, newContact})
  }

  const deleteContact = (id) => {
    Axios.delete(`http://localhost:8080/delete-contact/${id}`)
  }
  
  return (
    <div className="container">

        <label htmlFor="name">Name: </label>
        <input type="text" onChange={(e) => {setName(e.target.value)}}/><br/><br/>
        <label htmlFor="">Phone Number: </label>
        <input type="number" onChange={(e) => {setPhoneNumber(e.target.value)}}/><br/><br/>

        <button onClick={addNewContact}>Add New Contact</button>

        <h1>Contact List</h1>
      {
        contactList.map((contact,key) => {
          return <div key={key} >
            <h1>{contact.name}</h1>
            <h1>{contact.phoneNumber}</h1>
          </div>
        })
      }
       <div>
        {
        contactList.map((contact,key) => {
          return (<div key={key} >
            <h1>{contact.name}</h1>
            <h1>{contact.phoneNumber}</h1>
            <input 
                type="number" 
                placeholder='update contact...' 
                onChange={(e) => {setNewContact(e.target.value)
            }}/>
            <button onClick={() => {updateContact(contact._id)}}>Update</button>
            <button onClick={() =>{deleteContact(contact._id)}}>Delete</button>
          </div>)
        })
    }


       </div>
      
    </div> 

  );



}

export default App;