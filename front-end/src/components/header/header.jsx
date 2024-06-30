import style from "./header.module.css"
import profile_image from "../../images/profile_image.jpg"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios"
import { IP } from "../../App";
import { useContext } from "react"
import AuthContext from "../../AuthService"

import CircularProgress from '@mui/material/CircularProgress';


function Header(props) {

    const [open, setOpen] = React.useState(false);
    const [wait, set_wait] = React.useState(false);
    const handleOpen_share = () => setOpen(true);
    const handleClose_share = () => setOpen(false);
    const [file, setFile] = React.useState(null);

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };

    let { user, logout, authTokens } = useContext(AuthContext);

      const handleSubmit = async (event) => {
        event.preventDefault();
        const uploaded_file = new FormData();
        uploaded_file.append('file', file);

        const accessToken = authTokens.access;
        const headers = {
          "Authorization": `Bearer ${accessToken}`
        };

        set_wait(true)
        try {
            const response = await axios.post(`http://${IP}:8000/upload/`, uploaded_file, { headers });
            if (response.status === 200) {
                console.log(response.data)
                window.alert(response.data.M)
                set_wait(false)
                if(!wait){
                    window.location.replace("http://localhost:3000")
                }
            }
          }
          catch (e) {
            window.alert("there is a problem to uploading your file")}
            handleClose_share()

       };

       function handle_search() {
        var searched = document.getElementById("search_input").value
        props.handle_search_result(searched)
       }

    if(wait){
        return (
                <Modal
                  open={open}
                  onClose={handleClose_share}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <div id={style.main_wait_container}>
                    <CircularProgress size={120} />
                  </div>
                </Modal>
              
          );
    }
    else{

    return(

        <div>
            <nav class="navbar navbar-expand-lg" id={style.navbar_container}>
              <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                       <div className={`${style.main_container}`}>
                           <div className="col-lg-2 col-12 ps-2" id={style.main_logo_container}>
                               <div id={style.logo_container}>
                               </div>
                           </div>
                           <div className="col-xl-6 col-lg-5 col-12 ps-2" id={style.main_input_container}>
                               <div id={style.input_container}>
                                   <button type="submit" id={style.search_submit_button} onClick={handle_search}><i className="bi bi-search"></i></button>
                                   <input type="search" placeholder="search..." id="search_input"/>
                               </div>
                           </div>
                           <div className="col-xl-2 col-lg-2 col-12 ps-2" id={style.main_upload_container}>
                               <Button onClick={handleOpen_share} className="p-0">
                                    <button><i className="bi bi-cloud-arrow-up-fill"></i>Upload</button>
                                </Button>
                                <Modal
                                  open={open}
                                  onClose={handleClose_share}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <div id={style.main_modal_container}>
                                        <p>please select your file</p>
                                        <div>
                                            <input type="file" className="ms-5" onChange={handleFileChange}/>
                                            <button type="submit" className="mt-4 " id={style.up_btn} onClick={handleSubmit}>upload</button>
                                        </div>
                                  </div>
                                </Modal>
                           </div>
                           <div className="col-xl-2 col-lg-3 col-12 ps-2" id={style.main_profile_container}>
                               <div id={style.profile_container}>
                                   <div  id={style.profile_image}>
                                       <img src={profile_image} alt="profile image" />
                                   </div>
                                   <div  id={style.username}>
                                       <p>ali khorasani</p>
                                   </div>
                               </div>
                           </div>
                        </div>
                    </div>
              </div>
            </nav>
        </div>
    )
    }

}



export default Header

