import { IP } from "../../App";
import axios from "axios"
import { useEffect } from "react";
import { useParams } from "react-router-dom";


function Active_email(props) {
    
    var param = useParams()
        send_token(param.token ,param.protocol)
    
    async function send_token(token, protocol)
    {

        try {
            const response = await axios.get(`http://${IP}:8000/activate/${protocol}/${token}`);
            if (response.status === 200) {
                window.location.replace("http://localhost:3000/login")
            }
          }
          catch (e) {
          console.log(e)}
      }


      return(<div>
      </div>)
}


export default Active_email
