import { useState } from "react";
import TrackResult from "./TrackResult";

interface TopTracksProp {
    data: TopTracksObject;
}

export default function TopTracks({ data }:TopTracksProp){

    const [showMore, setShowMore] = useState(false)

    const firstThreeItems = data.items.slice(0, 3);
    const remainingItems = data.items.slice(3);

    const handleToggle = () => {
        setShowMore(!showMore);
      };
    
    return (
        <>
        <div className="flex flex-col align-center items-center justify-center">
            <div className="flex flex-col justify-center items-start align-center my-5" style={{maxWidth: "30rem"}}>
                
            <div>
                <h3 className="mb-3 self-start">Top Tracks</h3>
                <p className="leading-relaxed">
                    <div className="flex flex-col justify-center items-start align-center">
                        {firstThreeItems.map(track => (
                            <TrackResult
                                image={track.album.images[2].url}
                                name={track.name}
                                artist={track.artists[0].name}
                            />
                        ))}
                    </div>

                    {showMore && (
                        <div className="flex flex-col justify-center items-start align-center">
                            {remainingItems.map(track => (
                                <TrackResult
                                    image={track.album.images[2].url}
                                    name={track.name}
                                    artist={track.artists[0].name}
                                />
                            ))}
                        </div>
                    )}
                    
                </p>
                <button onClick={handleToggle} className="mt-4 text-blue-500 focus:outline-none">
                    {showMore ? "Show Less" : "Show All 20 Songs"}
                </button>
            </div>
            </div>

        </div>

    </>
    )
   
}