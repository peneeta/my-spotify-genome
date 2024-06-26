import { useEffect } from "react";
import { redirectToAuthCodeFlow, getAccessToken } from "../scripts/authCodePkce";
import Bokeh from "./Bokeh"

const clientId = 'e3dc42cfeb2b4fb0bb03369b39d757e5';

export default function Authorization() {
    const handleAuthClick = () => {
        redirectToAuthCodeFlow(clientId);
    };

    useEffect(() => {
        const fetchAccessToken = async () => {
            const data = await getAccessToken(clientId);

            if (data) {
                console.log("Access Token data:", data);
            }
        };

        fetchAccessToken();
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