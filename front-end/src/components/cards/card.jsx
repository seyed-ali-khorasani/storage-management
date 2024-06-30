import style from "./card.module.css"
import figma_icon from "../../images/Figma_icon.png"
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Share_file from "../share_file/share_file";
import file_link from "../../files_link/card.module.css"
import { IP } from "../../App";
import axios from "axios"
import { useEffect } from "react";

function Card(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        event.preventDefault()
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    async function download_file()
    {
        try {
            const response = await axios.get(`http://${IP}:8000/download/${props.detail.id}`);
            if (response.status === 200) {
                console.log(response.data)
                window.location.replace(response.data.file_url)
                //temp
            }
          }
          catch (e) {
          console.log(e)}
      }

      function del_file(e,f_id) {
        props.delete_file(e,f_id)
        handleClose(false)
      }

    return(
        <div className={`ps-2 pe-3 ${style.radius}`} >
            <div id={style.main_container} onContextMenu={handleClick}>
                <div className="col-3" id={style.image_container}>
                    <div>
                        <img src={props.detail.image} alt="object image" />
                    </div>
                </div>
                <div className="col-7 pt-1">
                    <p id={style.object_name}>{props.detail.name}</p>
                    <p id={style.object_detail}><span>{props.detail.space}</span> - <span>{props.detail.time}</span>
                                                <span>{props.detail.day_time}</span>, <span>{props.detail.date}</span><span> {props.detail.month}</span></p>
                </div>
                <div className="col-2" id={style.menu_container}>
                    <div id={style.muen_button_container}>
                      <Button
                        id={`basic-button ${style.menu_botton}`}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        
                      >
                        {<i className={`bi bi-three-dots-vertical p-0`}></i>}
                      </Button>
                      <Menu
                        id={`basic-menu ${style.base_menu}`}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <div id={style.opened_menu_container}>
                            <MenuItem onClick={handleClose}>
                                <p id={style.opened_menu_title}>{props.detail.name}</p>
                            </MenuItem>
                            {
                                props.detail.owner_access ? (
                                <MenuItem >
                                    <div id={style.menu_list_container}>
                                        <Share_file file_id = {props.detail.id}/>
                                    </div>   
                                </MenuItem>) : null
                            }
                            <a href="#" onClick={download_file}  id={style.download_link}>
                                <MenuItem >
                                    <div id={style.menu_list_container}>
                                        <div id={style.share_logo_main_container}>
                                            <div id={style.share_logo_container} style={{color: "#7288FA", backgroundColor: "#7289fa3a"}}>
                                                <i className="bi bi-cloud-download"></i>
                                            </div>
                                        </div>
                                        <div>download</div>
                                    </div>
                                </MenuItem>
                            </a>
                            {
                                props.detail.owner_access ? (
                                <MenuItem onClick={(e) => del_file(e,props.detail.id)} >
                                <div id={style.menu_list_container}>
                                    <div id={style.share_logo_main_container}>
                                        <div id={style.share_logo_container} style={{color: "#FF7474", backgroundColor: "#ff74743f"}}>
                                            <i className="bi bi-trash"></i>
                                        </div>
                                    </div>
                                    <div>delete</div>
                                </div>
                                </MenuItem>):  null
                            }
                        </div>
                      </Menu>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Card