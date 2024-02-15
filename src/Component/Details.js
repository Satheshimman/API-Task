import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const Details=()=>{
    const [arr,setArr]=useState([])
    const [array,setarray]=useState([])
    const [index,setindex]=useState(0)
    const [param]=useSearchParams()
   
const parame=()=>{
  var a=parseInt(param.get("id"))
    
  setindex(parseInt(a))
}
useEffect(parame,[])


 const api=()=>{
axios.get('https://api.spacexdata.com/v3/launches')
.then(function (response) {

 setArr(response.data);
 }) 
  }
useEffect(api,[])


    


const fil=()=>{
 
  let v=arr.filter((a,b)=>{
   console.log(index)
    return (parseInt(index))=== parseInt(a.flight_number) 
  })
 
  setarray(v)
}
useEffect(fil,[])


    console.log(array)
    return(
        <div>
           {array.map((a,b)=>{
              return (
                <div>
                   <h1>{a.mission_name}</h1>
                </div>           
              )
           })}
        </div>
    )
}