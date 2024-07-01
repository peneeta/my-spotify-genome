import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { redirectToAuthCodeFlow} from "../scripts/authCodePkce";

import Bokeh from "./Bokeh"
import config from '../config';
import SpinningDNA from "./LottieSpinningDNA";
import LoginButton from "./LoginButton";
import Footer from "./Footer";

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
            <div className="content flex flex-col justify-center align-center items-center text-center px-5" style={{height:"90vh"}}>
                <h1 className="title py-2" style={{letterSpacing:"3px"}}>My Spotify Genome</h1>
                <h2 className="mb-4" style={{maxWidth: "30rem"}}>Generate musical DNA based on your listening history</h2>
                <SpinningDNA/>
                

                {/* Navigate to authorization page if not authenticated */}
                {!isAuthenticated && (
                    <LoginButton text="Login with Spotify" clickFunction={handleAuthClick}/>
                )}
                
                {/* Navigate to callback page if authenticated */}
                {isAuthenticated && (
                    <LoginButton text="View Your Genome" clickFunction={handleCallbackClick}/>
                )}

            </div>
            <Footer />

            
        </div>
    );
};