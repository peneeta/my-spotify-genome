import { useEffect, useState } from "react";
import { getAccessToken, getRefreshToken } from "../scripts/authCodePkce";
import { fetchProfile, fetchTopTracks, populateUI } from "../scripts/apiQueryFuncs";
import config from '../config';
import Bokeh from "./Bokeh";

const Callback = () => {
    const [topSongsMonth, setTopSongsMonth] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // If user accesses for the first time
            if(!localStorage.getItem("access_token")) {
                const data = await getAccessToken(config.api.clientId);
                const accessToken = data.access_token;
                const personalData = await fetchProfile(accessToken)
                populateUI(personalData);
            } else {
                // If user refreshes page or already has authenticated
                const data = await getRefreshToken(config.api.clientId);
                if (data) {
                    const accessToken = data.access_token;
    
                    // Get user's topSongs of the month
                    const topSongsData = await fetchTopTracks(accessToken);
                    const personalData = await fetchProfile(accessToken);
                    populateUI(personalData);
    
                    
    
                    if (topSongsData) {
                        console.log("Top Songs", topSongsData);
                        setTopSongsMonth(topSongsData.items);
                    }
    
                } else {
                    console.log("An error occurred");
                }
    
            }
            
        };
        
        fetchData();
    }, []);

    return (
        <div>
            <Bokeh/>

            <div className="flex flex-col justify-center items-center align-center">
                <h1><span id="displayName"></span>'s Top Tracks</h1>
                <h2>Displaying the top 20 tracks of the month</h2>
            </div>

        </div>
    );
};


export default Callback;