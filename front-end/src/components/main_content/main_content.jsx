import style from "./main_content.module.css"
import Card from "../cards/card"
import figma_icon from "../../images/Figma_icon.png"
import file_link from "../../files_link/card.module.css"
import { useState, useContext } from "react"
import AuthContext from "../../AuthService"
import { IP } from "../../App";
import axios from "axios"

import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect } from "react"

function Main_content(props) {


    const [objects_list, set_objects_list] = useState([])
    const [temp, set_temp] = useState(false)
    const [page, set_page] = useState(1)
    const [total, set_total] = useState(0)
    const [totla_page, set_totla_page] = useState(1)
    const handleChange_page = (event, value) => {
        set_page(value);
        get_data(value)
      };

    async function delete_file(event, file_id) {
        console.log(file_id)
        try {
            const response = await axios.get(`http://${IP}:8000/remove/${file_id}`);
            if (response.status === 200) {
                //console.log(response.data)
                get_data(page)
                window.alert("your file removed successfuly")
            }
          }
          catch (e) {
          console.log(e)}

    
    }

    let { user, logout, authTokens } = useContext(AuthContext);
    useEffect(()=>{
        if(!props.is_searched){
            get_data(page)
        }
        if(props.is_searched){
            get_searched_data(props.searched)
        }
    },[props.searched]) 
    async function get_data(page)
    {
        const accessToken = authTokens.access;
        const headers = {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        };


        try {
            const response = await axios.get(`http://${IP}:8000/user_files/?page=${page}`, {
                headers,
              });
            if (response.status === 200) {
                set_objects_list(response.data.data)
                set_total(response.data.total)
                set_totla_page(response.data.total_pages)
                set_page(response.data.current_page)
            }
          }
          catch (e) {
          console.log(e)}
      }

      async function get_searched_data(searched)
    {
        const accessToken = authTokens.access;
        const headers = {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        };

        console.log(searched)
        try {
            const response = await axios.get(`http://${IP}:8000/test/?search=${searched}&page=${page}`, {
                headers,
              });
            if (response.status === 200) {
                set_objects_list(response.data.data)
                set_total(response.data.total)
                set_totla_page(response.data.total_pages)
            }
          }
          catch (e) {
          console.log(e)}
      }


    return(
        <div id={style.main_container}>
            <div id={style.second_container}>
                <p id={style.object_title}>Objects</p>
                <p id={style.total_title}>Total:<span> {total}</span></p>
                <div id={style.cards_container}>
                    {objects_list.map((object)=>(
                        <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-3"><Card detail={object} delete_file={delete_file}/></div>
                    ))}
                </div>
                <div id={style.pagination_container}>
                    <Stack spacing={2}>
                      <Pagination count={totla_page} color="primary" page={page} onChange={handleChange_page}/>
                    </Stack>
                </div>
            </div>
        </div>
    )
    
}

export default Main_content


const objects=[
    {
        id:1,
        image: figma_icon,
        name: "App School.fig",
        space: "10 GB",
        time: "10:19",
        day_time: "pm",
        date: "10",
        month: "oct",
        owner_access: true,
        download_link: file_link
    },
    {
        id:2,
        image: figma_icon,
        name: "Fire App.fig",
        space: "5 GB",
        time: "12:02",
        day_time: "am",
        date: "23",
        month: "jun",
        owner_access: true,
        download_link: file_link
    },
    {
        id:3,
        image: figma_icon,
        name: "Fig Fig.fig",
        space: "12 MB",
        time: "23:01",
        day_time: "pm",
        date: "03",
        month: "may",
        owner_access: true,
        download_link: file_link
    },
    {
        id:4,
        image: figma_icon,
        name: "Graphic My.fig",
        space: "50 GB",
        time: "07:33",
        day_time: "am",
        date: "29",
        month: "oct",
        owner_access: false,
        download_link: file_link
    },
    {
        id:5,
        image: figma_icon,
        name: "App University.png",
        space: "22 KB",
        time: "12:43",
        day_time: "am",
        date: "14",
        month: "feb",
        owner_access: true,
        download_link: file_link
    },
    {
        id:6,
        image: figma_icon,
        name: "App Mes Rafsanjan.fig",
        space: "14 GB",
        time: "11:11",
        day_time: "am",
        date: "22",
        month: "aug",
        owner_access: true,
        download_link: file_link
    },
    {
        id:7,
        image: figma_icon,
        name: "App Sepahan.fig",
        space: "873 MB",
        time: "16:34",
        day_time: "am",
        date: "25",
        month: "jul",
        owner_access: false,
        download_link: file_link
    },
    {
        id:8,
        image: figma_icon,
        name: "App Perspolis.fig",
        space: "21 GB",
        time: "09:09",
        day_time: "pm",
        date: "18",
        month: "sep",
        owner_access: false,
        download_link: file_link
    },
    {
        id:9,
        image: figma_icon,
        name: "App Esteghlal.fig",
        space: "28 GB",
        time: "07:56",
        day_time: "am",
        date: "03",
        month: "nov",
        owner_access: false,
        download_link: file_link
    }
]