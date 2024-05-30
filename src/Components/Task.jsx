import React, { useEffect } from "react";
import Euowi from "./Euowi";
import Pokemon from "./Pokemon";
import axios from "axios";
import {useState} from "react"
const Task=()=> {
    const [pokeData,setPokeData]=useState([]);
    const [searchPokeData, setSearchPokeData] = useState([]);
    const [input, setInput] = useState('');
    const [loading,setLoading]=useState(true);
    const [url, setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl,setNextUrl]=useState();
    const [prevUrl,setPrevUrl]=useState();
    const [pokeDex,stPokeDex]=useState(null);

    const pokeFun=async()=>{
        setLoading(true)
        const res=await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results);
        setLoading(false)
        }
        const getPokemon=async(res)=>{
            res.map(async(item)=>{
                const result=await axios.get(item.url)
                setSearchPokeData(state=>{
                    state=[ ...state,result.data]  
                    return state;
                })
                setPokeData(state=>{
                    state=[ ...state,result.data]  
                    return state;
                })
            })                     
        }
    useEffect(()=>{
        pokeFun();
    },[url]);

    useEffect(() => {
        if(input.trim().length === 0) {
            return setSearchPokeData(pokeData)
        }
        setSearchPokeData(prev => {
            return prev.filter((item) => item.name.toLowerCase().includes(input.trim().toLowerCase()))
        })
    }, [input]); 

    if(pokeDex !== null) {
        return <Pokemon data={pokeDex} closePage={() => stPokeDex(null)}/>
    }
    if(pokeDex !== null) {
        return <Pokemon data={pokeDex} closePage={() => stPokeDex(null)}/>
    }

    

    return(
        <> 
        <div className="container">
            <div className="App">
                <h2 style={{fontSize: 100, color: "#efefef"}}>Pokemon</h2>
                <div className="Api">
                    <input value={input} type="text" placeholder="Search Pokemon..." onChange={(e)=>setInput(e.target.value)}/>
                </div>
            </div>
            <div className="list">
                <Euowi pokemon={searchPokeData} loading={loading} infoPokemon={poke=>stPokeDex(poke)}/>
            </div>
            <div className="astro">
                { prevUrl && <button onClick={()=>{
                    setPokeData([])
                    setUrl(prevUrl)
                }}>Previous</button>}

                { nextUrl && <button onClick={()=>{
                    setPokeData([])
                    setUrl(nextUrl)
                }}>Next</button>}
            </div>
        </div>
        </>
    )
}
export default Task;