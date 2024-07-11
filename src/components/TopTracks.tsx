import TrackResult from "./TrackResult";

interface TopTracksProp {
    data: TopTracksObject;
}

export default function TopTracks({ data }:TopTracksProp){

    return (
        <>
        <div className="flex flex-col align-center items-center justify-center">
            <div className="flex flex-col justify-center items-start align-center my-5 px-4" style={{maxWidth: "25rem"}}>
                
                <div>
                    <h3 className="mb-3">Top Tracks</h3>
                    <div className="flex flex-col justify-start items-start align-start overflow-y-scroll mt-4" style={{ height: "33rem"}}>
                        {data.items.map(track => (
                            <TrackResult
                                key={track.id}
                                image={track.album.images[1].url}
                                name={track.name}
                                artist={track.artists[0].name}
                            />
                        ))}
                    </div>
            </div>
            </div>

        </div>

    </>
    )
}