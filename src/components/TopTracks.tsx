import TrackResult from "./TrackResult";

interface TopTracksProp {
    data: TopTracksObject;
}

export default function TopTracks({ data }:TopTracksProp){

    return (
        <>
        <div className="flex flex-col align-center items-center justify-center">
            <div className="flex flex-col justify-center items-start align-center my-5" style={{maxWidth: "40rem"}}>
                <h3 className="mb-3 self-start">Top Tracks</h3>
            

            <div className="flex flex-col justify-center items-start align-center">
                {data.items.map(track => (
                    <TrackResult
                        image={track.album.images[2].url}
                        name={track.name}
                        artist={track.artists[0].name}
                    />
                ))}
            </div>
            </div>

        </div>

    </>
    )
   
}