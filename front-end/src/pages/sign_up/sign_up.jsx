import style from "./sign_up.module.css"
import logo from "../../images/sign_logo.png"
import left_image from "../../images/sign_left_image.png"
import send_email_image from "../../images/send_email.png"

import { useState } from "react"
import { IP } from "../../App";
import axios from "axios"


function Sign_up(props) {
    
    const [email_sent, set_email_sent] = useState(false)
    const [email_sent_address, set_email_sent_address] = useState(" ")
    

    function handle_signup(e){
        e.preventDefault()
        var username=  document.getElementById("username_input").value
        username = username.toLowerCase()
        var email= document.getElementById("email_input").value
        var password= document.getElementById("password_input").value
        var confirm_password= document.getElementById("confirm_password_input").value
        if (password != confirm_password) window.alert("your password and confrim password are not equal")
        else(send_signup_info(username,email,password))
    }

    async function send_signup_info(username,email,password)
    {
        var post_detail ={
            "username": username,
            "email": email,
            "password": password
        }
        console.log(post_detail)
        set_email_sent(true)
        set_email_sent_address(email)

        try {
            const response = await axios.post(`http://${IP}:8000/user/signup`,post_detail);
            if (response.status === 200) {
              console.log(response.data)
            }
          }
          catch (e) {
          console.log(e)}
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
            {
                !email_sent? 
                (<div className="col-lg-8 col-md-6 col-12" id={style.right_main_container}>
                <div>
                    <p id={style.right_title}>Create Account</p>
                    <form onSubmit={handle_signup} className="needs-validation was-validated" novalidate>
                        <div className={style.inputs_container}>
                            <p>Username</p>
                            <input id="username_input" type="text" placeholder="Enter Your Username" pattern="[A-Z,a-z].{4,}" class="form-control" required/>
                            <div class="invalid-feedback">
                              Your username must have at least 4 characters
                            </div>
                        </div>
                        <div className={style.inputs_container}>
                            <p>Email</p>
                            <input id="email_input" type="email" placeholder="Enter Your Email" class="form-control" required/>
                            <div class="invalid-feedback">
                              Your email must have @ character
                            </div>
                        </div>
                        <div className={style.inputs_container}>
                            <p>Password</p>
                            <input id="password_input" type="password" placeholder="Enter Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&]).{6,}" class="form-control" required/>
                            <div class="invalid-feedback">
                              Your password must have at least 6 characters and uppercase and lowercase and number and special characters
                            </div>
                        </div>
                        <div className={style.inputs_container}>
                            <p>Confirm Password</p>
                            <input id="confirm_password_input" type="password" placeholder="Confirm Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&]).{6,}" class="form-control" required/>
                        </div>
                        <button type="submit" id={style.submit_button}>Create Account</button>
                        <div id={style.another_account}>
                            <p>Already have an account? <a href="/login">login</a></p>
                        </div>
                    </form>
                </div>
                </div>)
                :
                (<div className="col-lg-8 col-md-6 col-12" id ={style.set_email_container}>
                <p id={style.send_email_title}>Check your email</p>
                <img src={send_email_image} alt="email sent" />
                <div id={style.send_text}>
                    <p>We've sent an email to <span>{email_sent_address}</span> to verify your account.</p>
                </div>
                <a href="/login"><button id={style.submit_button} >login</button></a>
                </div>)
            }
            
        </div>
    )
}

export default Sign_up