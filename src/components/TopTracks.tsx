import TrackResult from "./TrackResult";

interface TopTracksProp {
    dataObj: TopTracksObject;
}

export default function TopTracks({ dataObj }:TopTracksProp){

    return (
        <>
                <div className="flex flex-col justify-center items-center align-center my-5">
                <h1><span id="displayName"></span>'s Top Tracks</h1>
                <h2>Displaying the top 20 tracks of the month</h2>
            </div>

            <div className="time-buttons flex flex-row justify-center items-center align-center gap-6">
                <a className="text-white bg-spotify-green hover:bg-spotify-dark-green font-medium rounded-full text-base px-8 py-1 dark:bg-spotify-green my-3">Monthly</a>
                <a className="text-white bg-spotify-green hover:bg-spotify-dark-green font-medium rounded-full text-base px-8 py-1 dark:bg-spotify-green my-3">Weekly</a>
                <a className="text-white bg-spotify-green hover:bg-spotify-dark-green font-medium rounded-full text-base px-8 py-1 dark:bg-spotify-green my-3">Yearly</a>
            </div>

            <div className="flex flex-col justify-center align-center mx-10">
                {dataObj.items.map(track => (
                    <TrackResult
                        image={track.album.images[2].url}
                        name={track.name}
                        artist={track.artists[0].name}
                        popularity={track.popularity}
                    />
                ))}
            </div>
    </>
    )
    
}