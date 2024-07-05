import { useEffect, useState } from "react";
import { getAccessToken, getRefreshToken } from "../scripts/authCodePkce";
import { fetchProfile, fetchTopArtists, fetchTopTracks, populateUI } from "../scripts/apiQueryFuncs";

import config from '../config';
import Bokeh from "./Bokeh";
import TopTracks from "./TopTracks";
import SelectorButton from "./SelectorButton";
import SpotifyDNA from "./SpotifyDNA/SpotifyDNA";
import Stats from "./Stats";

const Callback = () => {

    const timeFrame = ["short_term", "medium_term", "long_term"]

    const [topSongs, setTopSongs] = useState<TopTracksObject>({
        href: "",
        items: [],
        limit: 0,
        next: "",
        offset: 0,
        previous: "",
        total: 0,
    });
    const [topArtists, setTopArtists] = useState<TopArtistsObject>();
    const [loading, setLoading] = useState(true);

    const initialLoad = async () => {
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
            await fetchTop();
        }
    };

    const fetchTop = async () => {
        
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {

            const topSongsObject = await fetchTopTracks(accessToken, timeFrame[active]);
            const topArtistsObject = await fetchTopArtists(accessToken, timeFrame[active]);

            if (!topSongsObject) {
                console.log("An error occurred")
            }

            if (!topArtistsObject) {
                console.log("Error fetching top artists")
            }

            setTopSongs(topSongsObject)
            setTopArtists(topArtistsObject)
            setLoading(false);
            console.log(topArtistsObject)

        } else {
            console.log("access token was NULL");
        }
        
    };

    // Get user's top items on page load
    useEffect(() => {
        initialLoad();
    }, []);

    // Handle button click
    const [active, setActive] = useState(0);
    const handleButtonClick = async (buttonId: number) => {
        setActive(buttonId);
        setLoading(true); // Set loading to true when button is clicked
        await fetchTop();
    }

    return (
        <div className="mx-6">
            <Bokeh/>
            <div className="flex flex-col justify-center align-center items-center text-center gap-3 mt-14">
                <h1>Welcome, <span id="displayName"></span>.</h1>
                <h2>Here are your results.</h2>

                <div className="time-buttons flex flex-row justify-center items-center align-center gap-6">
                    <SelectorButton 
                        text={"This Week"} 
                        onHandleClick={() => handleButtonClick(0)}
                        isActive={active === 0}
                    />
                    <SelectorButton 
                        text={"This Month"} 
                        onHandleClick={() => handleButtonClick(1)}
                        isActive={active === 1}
                    />
                    <SelectorButton 
                        text={"This Year"} 
                        onHandleClick={() => handleButtonClick(2)}
                        isActive={active === 2}
                    />
                </div>

            </div>
            <SpotifyDNA data={topArtists}/>

            <div className="flex flex-col justify-center align-center items-center my-4">
                <p className="text-center"style={{maxWidth: "30rem"}}>Your DNA was generated based on your top 20 artists in the selected timeframe. The height of the base pairs represents the artist's popularity.</p>
            </div>


            
            {/* <TopTracks data={topSongs} /> */}

            {!loading && <Stats data={topArtists} />}
        </div>
    );
};


export default Callback;