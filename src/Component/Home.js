import axios from "axios"
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import "./Style.scss"

export const Home=()=>{
    const m=useNavigate()
    const [arr,setarr]=useState([])
    const [count,setcount]=useState(10)
    const [offset,setoffset]=useState(0) 
    const [ofset,setofset]=useState(0)

const api=()=>{
    axios.get(`https://api.spacexdata.com/v3/launches?offset=${offset}&limit=${count}`)
  .then(function (response) {
    // handle success
    setarr(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

}

useEffect(api)

const details=(a,b)=>{
  m(`/details?id=${a.flight_number}`)
  console.log (a.flight_number)
}

const handle=(e)=>{
    console.log(e.target.value)
    setcount(e.target.value)
    setoffset((ofset*count)-count)

}
// const update=()=>{
   
// }


const page=(v,i)=>{
     console.log(i)
    setoffset(i)

     setoffset((i*count)-count)
}

   
    return(
      <div>
           <section>

              <div className="container">
                 <div className="row">
                    <div className="col-4">
                    <FormControl fullWidth>
                          <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          select cards
                          </InputLabel>
                          <NativeSelect
                            defaultValue={10}
                            onChange={handle}
                            inputProps={{
                              name: 'select cards',
                              id: 'uncontrolled-native',
                            }}
                          >
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                            <option value={40}>forty</option>
                          </NativeSelect>
                      </FormControl>         
                    <Stack spacing={5}>
                        <Pagination onChange={page}  count={(Math.round(110/count))} />
                     </Stack>
                    </div>
                 </div>
              </div>
          </section>

          <section>
          <div className="container">
          <div className="row">
             {arr.map((a,b)=>{
                return (
                    <>
                     <Card sx={{ maxWidth: 400 }}>
                <CardMedia
                  sx={{ height: 150 }}
                  image={a.links.flickr_images[0] || "https://upload.wikimedia.org/wikipedia/commons/9/9a/Soyuz_TMA-9_launch.jpg"}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {a.mission_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {a.flight_number}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={()=>details(a,b)}>view details</Button>
                  <button size="small"> <a href={a.links.wikipedia}  target="_blank">wikkipedia</a></button>
                </CardActions>
              </Card>
                    </>
                )
                
             })}
          </div>
       </div>
          </section>

          
      </div>
      


    )
}