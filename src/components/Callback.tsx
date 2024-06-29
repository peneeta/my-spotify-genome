import { useEffect, useState } from "react";
import { getAccessToken, getRefreshToken } from "../scripts/authCodePkce";
import { fetchProfile, fetchTopTracks, populateUI } from "../scripts/apiQueryFuncs";

import config from '../config';
import Bokeh from "./Bokeh";
import TopTracks from "./TopTracks";

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
            <TopTracks dataObj={topSongsMonth} />
        </div>
    );
};


export default Callback;