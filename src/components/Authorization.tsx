import { useEffect, useState } from "react";
import { redirectToAuthCodeFlow, getAccessToken, getRefreshToken } from "../scripts/authCodePkce";
import Bokeh from "./Bokeh"

const clientId = 'e3dc42cfeb2b4fb0bb03369b39d757e5';

export default function Authorization() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleAuthClick = () => {
        redirectToAuthCodeFlow(clientId);
    };

    useEffect(() => {
        const authenticate = async () => {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                getRefreshToken(clientId);
            } else {
                let accessToken = localStorage.getItem('access_token');

                if (!accessToken) {
                    const data = await getAccessToken(clientId);
                    if (data) {
                        accessToken = data.access_token;
                        setIsAuthenticated(true);
                    }
                } else {
                    setIsAuthenticated(true)
                }
    
                if (accessToken) {
                    // check if access token is expired
                    const tokenExpiry = localStorage.getItem('token_expiry');
    
                    if (tokenExpiry && Date.now() >= parseInt(tokenExpiry)) {
                        console.log("Token expired. Refreshing...")
                        const refreshedData = await getRefreshToken(clientId);
    
                        if (refreshedData) {
                            accessToken = refreshedData.access_token;
                        }
    
                    }
                }
            }    
        };

        authenticate();
    }, []);

    return (
        <div>
            <Bokeh />
            <div className="content flex flex-col justify-center align-center items-center" style={{height:"100vh"}}>
                <h1 className="title py-4">My Spotify Genome</h1>
                <h2>Generate your musical DNA</h2>

                <a onClick={handleAuthClick} id="login" className="text-white bg-spotify-green hover:bg-spotify-dark-green font-medium rounded-full text-base px-8 py-3 dark:bg-spotify-green my-3">Login with Spotify</a>

            </div>


        </div>
    );
};