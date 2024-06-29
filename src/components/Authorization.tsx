import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { redirectToAuthCodeFlow} from "../scripts/authCodePkce";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faSpotify } from "@fortawesome/free-brands-svg-icons";

import Bokeh from "./Bokeh"
import config from '../config';

export default function Authorization() {
    // True or False whether user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // False response -> button onClick
    const handleAuthClick = () => {
        redirectToAuthCodeFlow(config.api.clientId);
    };

    // True response -> button onClick
    const navigate = useNavigate();
    const handleCallbackClick = () => {
        navigate("/callback")
    }

    useEffect(() => {
        const authenticate = async () => {
            const refreshToken = localStorage.getItem('refresh_token');

            // You only need to check whether a refresh token exists
            // Actually refreshing the token happens in Callback
            if (refreshToken) {
                setIsAuthenticated(true);
            }
        };

        authenticate();
    }, []);

    // Check whether authenticated value was set to True
    useEffect(() => {
        console.log("Authenticated?", isAuthenticated);
    }, [isAuthenticated]);

    return (
        <div>
            <Bokeh />
            <div className="content flex flex-col justify-center align-center items-center" style={{height:"90vh"}}>
                <h1 className="title py-4" style={{letterSpacing:"3px"}}>My Spotify Genome</h1>
                <h2>Generate your musical DNA</h2>

                {/* Navigate to authorization page if not authenticated */}
                {!isAuthenticated && (
                    <a onClick={handleAuthClick} id="login" className="button text-white bg-spotify-green hover:bg-spotify-dark-green font-medium rounded-full text-base px-8 py-3 dark:bg-spotify-green my-5">
                        <FontAwesomeIcon className="mr-3" icon={faSpotify} size="lg" style={{color: "#fff"}}/>
                        Login with Spotify
                    </a>
                )}
                
                {/* Navigate to callback page if authenticated */}
                {isAuthenticated && (
                    <a onClick={handleCallbackClick} id="login" className="text-white bg-spotify-green hover:bg-spotify-dark-green font-medium rounded-full text-base px-8 py-3 dark:bg-spotify-green my-5">
                        <FontAwesomeIcon className="mr-3" icon={faSpotify} size="lg" style={{color: "#fff"}}/>
                        View Your Genome</a>
                )}

            </div>

            <div className="div text-center">
                <p>Created by Peneeta</p>

                <div className="github-link link flex flex-row gap-6 justify-center items-center align-center my-3">
                    <FontAwesomeIcon icon={faGithub} size="lg" style={{color: "#fff"}}/>

                    <a href="https://github.com/peneeta/my-spotify-genome" target="_blank">https://github.com/peneeta/my-spotify-genome</a>
                </div>
                
            </div>


        </div>
    );
};