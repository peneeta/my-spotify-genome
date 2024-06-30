import SelectorButton from "./SelectorButton";
import TrackResult from "./TrackResult";

interface TopTracksProp {
    dataObj: TopTracksObject;
}

export default function TopTracks({ dataObj }:TopTracksProp){

    return (
        <>
        <div className="flex flex-col align-center items-center justify-center">
            <div className="flex flex-col justify-center items-start align-center my-5" style={{maxWidth: "40rem"}}>
                <h3 className="mb-5">Top Tracks</h3>
            
                <div className="time-buttons flex flex-row justify-center items-center align-center gap-6">
                    <SelectorButton text={"This Month"}/>
                    <SelectorButton text={"This Week"}/>
                    <SelectorButton text={"This Year"}/>
                </div>
            </div>

            <div className="flex flex-col justify-center items-start align-center">
                {dataObj.items.map(track => (
                    <TrackResult
                        image={track.album.images[2].url}
                        name={track.name}
                        artist={track.artists[0].name}
                    />
                ))}
            </div>

        </div>

    </>
    )
    
}