import { useEffect, useState } from "react";
import { getAccessToken, getRefreshToken } from "../scripts/authCodePkce";
import Bokeh from "./Bokeh";
import { fetchProfile, fetchTopTracks, populateUI } from "../scripts/apiQueryFuncs";


const clientId = 'e3dc42cfeb2b4fb0bb03369b39d757e5';


const Callback = () => {
    const [topSongsMonth, setTopSongsMonth] = useState([]);

    useEffect(() => {
        const fetchAccessToken = async () => {
            const data = await getAccessToken(clientId);
            if (!data) {
                const data = getRefreshToken(clientId);
            }
            if (data) {
                const accessToken = data.access_token;
                console.log("Access token data:", data);

                // Get user's topSongs of the month
                const topSongsData = await fetchTopTracks(accessToken);
                const personalData = await fetchProfile(accessToken);

                populateUI(personalData);

                if (topSongsData) {
                    console.log("Top Songs", topSongsData);
                    setTopSongsMonth(topSongsData.items);
                }

            } else {
                getRefreshToken(clientId);
                console.log("REFRESHED TOKEN");
            }

        };
        
        fetchAccessToken();
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