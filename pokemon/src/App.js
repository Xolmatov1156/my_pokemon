import React from 'react';
import Task from './Components/Task';
import './Components/style.css'
import {useEffect, useState} from "react"
import './App.css';
import axios from "axios"



function App() {
const [nameList, setNameList] = useState([])
const [search, setSearch] = useState("")



useEffect(()=> {
  axios.get("https://pokeapi.co/api/v2/pokemon?limit=500")
  .then((response)=>{setNameList(response.data.results)})
},[])

  return (
    <>
    <Task/>
    </>
  )
}

export default App;
