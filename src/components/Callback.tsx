import { useEffect, useState } from "react";
import { getAccessToken, getRefreshToken } from "../scripts/authCodePkce";
import { fetchProfile, fetchTopArtists, fetchTopTracks, populateUI } from "../scripts/apiQueryFuncs";

import config from '../config';
import Bokeh from "./Bokeh";
import TopTracks from "./TopTracks";
import SpotifyDNA from "./SpotifyDNA/SpotifyDNA";
import Stats from "./Doughnut";
import Footer from "./Footer";
import TopArtists from "./TopArtists";

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
    const [topArtists, setTopArtists] = useState<TopArtistsObject>({
        href: "",
        items: [],
        limit: 0,
        offset: 0
    });
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

            const topSongsObject = await fetchTopTracks(accessToken, timeFrame[0]);
            const topArtistsObject = await fetchTopArtists(accessToken, timeFrame[0]);

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

    return (
        <div className="mx-6" style={{overflow:'hidden'}}>
            <Bokeh/>
            <div className="flex flex-col justify-center align-center items-center text-center gap-3 mt-14">
                <h1>Welcome, <span id="displayName"></span>.</h1>
                <h2>Here are your results from this month.</h2>
            </div>
            <SpotifyDNA data={topArtists}/>

            <div className="flex flex-col justify-center align-center items-center my-4">
                <p className="text-center"style={{maxWidth: "30rem"}}>Your DNA was generated based on your top 20 artists in the selected timeframe. The height of the base pairs represents the artist's popularity.</p>
            </div>

            {/* ChartJS */}
            {!loading && <Stats data={topArtists} />}

            <div className="flex flex-row flex-wrap items-start justify-center align-start gap-10">
                <TopTracks data={topSongs} />

                <TopArtists data={topArtists} />
            </div>



            <Footer/>
        </div>
    );
};


export default Callback;