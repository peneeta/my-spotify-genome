import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

export default function LoginButton({text, clickFunction}:any) {
    

    return(
        <a onClick={clickFunction} id="login" className="button transition ease-in-out text-white bg-transparent hover:bg-spotify-dark-green font-medium rounded-full text-base px-8 py-2 my-5 outline-double outline-3 outline-offset-2 outline-white">
        <FontAwesomeIcon className="mr-3" icon={faSpotify} size="lg" style={{color: "#fff"}}/>
        {text}
    </a>
    )

}