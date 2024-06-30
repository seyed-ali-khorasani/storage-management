import style from "./main_page.module.css"
import Header from "../../components/header/header"
import Main_content from "../../components/main_content/main_content"
import { useState, useContext } from "react"
import AuthContext from "../../AuthService"

function Main_page(props){

    let {authTokens} = useContext(AuthContext)
    const [search_result, set_search_result] = useState("")
    const [is_searched, set_is_searched] = useState(false)

    const handle_search_result = (searched) =>{
        set_search_result(searched)
        set_is_searched(true)
    }

    return(
        <div>
            <Header handle_search_result={handle_search_result}/>
            <Main_content searched = {search_result} 
                          is_searched = {is_searched}/>
        </div>
    )
}


export default Main_page