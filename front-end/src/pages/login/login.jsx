import style from "./login.module.css"
import logo from "../../images/sign_logo.png"
import left_image from "../../images/sign_left_image.png"
import send_email_image from "../../images/send_email.png"
import { useState, useContext } from "react"
import AuthContext from "../../AuthService"
import { Navigate } from "react-router-dom"



function Login(props) {

    function handle_login(e){
        e.preventDefault()
        var username=  document.getElementById("username_input").value
        var password= document.getElementById("password_input").value
        send_login(username,password)
    }
    let {login} = useContext(AuthContext)
    async function send_login(username, password)
    {
        var login_detail = {
            "username": username,
            "password":password
        }

        login(login_detail)
      .then((resualt) => {
        if (resualt === "success") {
            window.location.replace("http://localhost:3000")
          return;
        }
         else if (resualt === "password") {
            window.alert("Username or Password is incorrect")
          return;}
         else if (resualt === "active") {
            window.alert("please active your account first")
          return;
        }
      })
      .catch((error) => {
        
      });

        // try {
        //     const response = await axios.post(`http://${IP}:8000/user/login`, login_detail);
        //     if (response.status === 200) {
        //         console.log(response.data)
        //     }
        //     else if (response.status === 400) {
        //         console.log("sas")
        //     }
        //   }
        //   catch (e) {
        //   console.log(e)}
      }

    return(
        <div id={style.main_container}>
            <div className="col-lg-4 col-md-6 d-md-block d-none" id={style.left_main_container}>
                <div id={style.logo_container}>
                    <img src={logo} alt="logo" />
                </div>
                <div>
                    <p id={style.left_title}>Manage your files the best way</p>
                    <p id={style.left_description}>Awesome, we've created the perfect place for you to store all your documents.</p>
                </div>
                <div id={style.image_container}>
                    <img src={left_image} alt="image" />
                </div>
            </div>
                <div className="col-lg-8 col-md-6 col-12" id={style.right_main_container}>
                    <div>
                        <p id={style.right_title}>Login</p>
                        <div className={style.inputs_container}>
                            <p>Username | Email</p>
                            <input type="text" placeholder="Enter Your Username or Email" id="username_input"/>
                        </div>
                        <div className={style.inputs_container}>
                            <p>Password</p>
                            <input type="password" placeholder="Enter Password" id="password_input"/>
                        </div>
                        <button id={style.submit_button} onClick={handle_login}>login</button>
                        <div id={style.another_account}>
                            <p>don't have an account? <a href="/sign_up">create account</a></p>
                        </div>
                    </div>
                </div>            
        </div>
    )
}

export default Login