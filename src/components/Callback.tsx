import { useEffect, useState } from "react";
import { getAccessToken, getRefreshToken } from "../scripts/authCodePkce";
import { fetchProfile, fetchTopTracks, populateUI } from "../scripts/apiQueryFuncs";

import config from '../config';
import Bokeh from "./Bokeh";
import TopTracks from "./TopTracks";
import SelectorButton from "./SelectorButton";
import SpotifyDNA from "./SpotifyDNA/SpotifyDNA";

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
            <div className="flex flex-col justify-center align-center items-center text-center gap-3 mt-14">
                <h1>Welcome, <span id="displayName"></span>.</h1>
                <h2>Here are your results.</h2>

                <div className="time-buttons flex flex-row justify-center items-center align-center gap-6">
                    <SelectorButton text={"This Month"} isActive={true}/>
                    <SelectorButton text={"This Week"} isActive={false}/>
                    <SelectorButton text={"This Year"} isActive={false}/>
                </div>

            </div>
            <SpotifyDNA/>
            <TopTracks dataObj={topSongsMonth} />
        </div>
    );
};


export default Callback;