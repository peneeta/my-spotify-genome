import { useEffect, useState } from "react";
import { getAccessToken, getRefreshToken } from "../scripts/authCodePkce";
import { fetchProfile, fetchTopTracks, populateUI } from "../scripts/apiQueryFuncs";

import config from '../config';
import Bokeh from "./Bokeh";
import TrackResult from "./TrackResult";

const Callback = () => {
    const [topSongsMonth, setTopSongsMonth] = useState<TopTracksObject>({
        href: "",
        items: [],
        limit: 0,
        next: "",
        offset: 0,
        previous: "",
        total: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            
            if(!localStorage.getItem("access_token")) {
                // If user accesses for the first time
                await getAccessToken(config.api.clientId);
            } else {
                // If user refreshes page or already has authenticated
                await getRefreshToken(config.api.clientId);
            }
            
            const accessToken = localStorage.getItem("access_token");

            if (accessToken) {
                const personalData = await fetchProfile(accessToken);
                populateUI(personalData);

                const topSongsObject = await fetchTopTracks(accessToken, "medium_term");

                setTopSongsMonth(topSongsObject)

            } else {
                console.log("access token was NULL");
            }
            
        };
        
        fetchData();
    }, []);

    return (
        <div>
            <Bokeh/>

            <div className="flex flex-col justify-center items-center align-center my-5">
                <h1><span id="displayName"></span>'s Top Tracks</h1>
                <h2>Displaying the top 20 tracks of the month</h2>
            </div>

            <div className="time-buttons flex flex-row justify-center items-center align-center gap-6">
                <a className="text-white bg-spotify-green hover:bg-spotify-dark-green font-medium rounded-full text-base px-8 py-3 dark:bg-spotify-green my-3">Monthly</a>
                <a className="text-white bg-spotify-green hover:bg-spotify-dark-green font-medium rounded-full text-base px-8 py-3 dark:bg-spotify-green my-3">Weekly</a>
                <a className="text-white bg-spotify-green hover:bg-spotify-dark-green font-medium rounded-full text-base px-8 py-3 dark:bg-spotify-green my-3">Yearly</a>
            </div>

            <div className="flex flex-col justify-center align-center mx-10">
                {topSongsMonth.items.map(track => (
                    <TrackResult
                        image={track.album.images[2].url}
                        name={track.name}
                        artist={track.artists[0].name}
                        popularity={track.popularity}
                    />
                ))}
            </div>

        </div>
    );
};


export default Callback;