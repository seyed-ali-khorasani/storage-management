import style from "./share_file.module.css"
import profile_image from "../../images/profile_image.jpg"

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import { IP } from "../../App";
import axios from "axios"
import { useEffect } from "react";


function Share_file(props) {

    useEffect(()=>{
        get_access(props.file_id)
    },[]) 

  const [open, setOpen] = React.useState(false);
  const handleOpen_share = () => setOpen(true);
  const handleClose_share = () => setOpen(false);

  const [user_list, set_user_list] = React.useState(users);
  const [temp, set_temp] = React.useState(false);

  function change_access(event, user_id){
    var temp_user = user_list
    for (let i = 0; i < temp_user.length; i++) {
        if(temp_user[i].id == user_id){
            if(temp_user[i].have_access)  temp_user[i].have_access = false
            else temp_user[i].have_access =true
        }        
    }
    set_user_list(temp_user)
    set_temp(!temp)
  };


  async function get_access(file_id)
    {
        try {
            const response = await axios.get(`http://${IP}:8000/user_file_access/${file_id}`);
            if (response.status === 200) {
                set_user_list(response.data.data)
                console.log(response.data.data)
            }
          }
          catch (e) {
          console.log(e)}
      }


      async function send_access()
      {
        var now_access = user_list
        var new_access = []
        for (let i = 0; i < now_access.length; i++) {
            if(now_access[i].have_access) new_access.push(now_access[i])
        }

        var post = {
            "file_id": props.file_id,
            "access_list": new_access
        }
          try {
              const response = await axios.post(`http://${IP}:8000/update_access/`, post);
              if (response.status === 200) {
                window.alert("new accesses already sumbited")
                handleClose_share(false)
              }
            }
            catch (e) {
            console.log(e)}
        }


        async function search_user()
        {
            var user_searched = document.getElementById("user_search_input").value
            try {
                const response = await axios.get(`http://${IP}:8000/search/?username=${user_searched}&id=${props.file_id}`);
                if (response.status === 200) {
                    set_user_list(response.data.data)
                }
              }
              catch (e) {
              console.log(e)}
          }

  return (
    <div>
      <Button onClick={handleOpen_share} className="p-0">
        <div id={style.menu_list_container}>
            <div id={style.share_logo_main_container}>
                <div id={style.share_logo_container} style={{color: "#F9AB72", backgroundColor: "#f9aa722f"}}>
                        <i className="bi bi-share"></i>
                </div>
            </div>
            <div id={style.share_text}>share</div>
        </div>
      </Button>
      <Modal
        open={open}
        onClose={handleClose_share}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div id={style.main_modal_container}>
            <div id={style.title_container}>
                <div>
                    <div id={style.back_button_cont} onClick={handleClose_share}>
                        <i className="bi bi-arrow-left-short"></i>
                    </div>
                </div>
                <div id={style.head_text_cont}>
                    <div>Add Peopel</div>
                </div>
            </div>
            <div id={style.input_container}>
                <button onClick={search_user} id={style.search_submit_button}><i className="bi bi-search"></i></button>
                <input type="search" placeholder="search people" id="user_search_input"/>
            </div>
            <div id={style.user_main_container}>
                {
                    user_list.map((user)=>(
                        <div id={style.user_container} >
                            <div id={style.checkbox_container} onClick={(e) => change_access(e, user.id)} className={user.id}>
                                <Checkbox checked={user.have_access} />
                            </div>
                            <div id={style.image_container}>
                                <img src={user.profile_image} alt="profile image" />
                            </div>
                            <div>
                                <div id={style.name}>{user.username}</div>
                                <div id={style.email}>{user.email}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div id={style.continue_container}>
                <div id={style.images_container} className="col-8">
                    {
                        user_list.map((user)=>(
                            user.have_access ? 
                            <img src={user.profile_image} alt="profile image" className={style.accessed_users} /> : null 
                        ))
                    }
                </div>
                <div id={style.continue__but_container} className="col-4">
                    <button onClick={send_access}>Continue</button>
                </div>
            </div>
        </div>
      </Modal>
    </div>
  );
    
}

export default Share_file

const users = [
    {
        id: 1,
        username: "ali khorasani",
        email: "alikhorasani2002@gmail.com",
        profile_image: profile_image,
        have_access: true
    },
    {
        id: 2,
        username: "mahdi tavassoli",
        email: "mahdi.tavassoli@gmail.com",
        profile_image: profile_image,
        have_access: true
    },
    {
        id: 3,
        username: "ehsan akbari",
        email: "ejsanjjjjjj_akbari@gmail.com",
        profile_image: profile_image,
        have_access: false
    },
    {
        id: 4,
        username: "erfan naaman",
        email: "erphcr7real@gmail.com",
        profile_image: profile_image,
        have_access: false
    },
    {
        id: 5,
        username: "ali mashayekh",
        email: "alimasha@gmail.com",
        profile_image: profile_image,
        have_access: true
    },
    {
        id: 6,
        username: "hossein borimnejad",
        email: "hoseinborimnejad1380@gmail.com",
        profile_image: profile_image,
        have_access: true
    },
    {
        id: 7,
        username: "alireza mohamadi",
        email: "alirza@gmail.com",
        profile_image: profile_image,
        have_access: true
    }
]
