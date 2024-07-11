import { useState } from "react";
import ArtistResult from "./ArtistResult";

interface TopArtistsProp {
    data: TopArtistsObject;
}

export default function TopArtists({ data }: TopArtistsProp) {
    // const [showMore, setShowMore] = useState(false)

    // const firstThreeItems = data.items.slice(0, 3);
    // const remainingItems = data.items.slice(3);

    // const handleToggle = () => {
    //     setShowMore(!showMore);
    // };

    return(
        <>
        <div className="my-5 px-4">
        <h3 className="mb-3">Top Artists</h3>
                    <div className="flex flex-col justify-start items-start align-start overflow-y-scroll mt-4" style={{ height: "33rem"}}>
                        {data.items.map(artist => (
                            <ArtistResult 
                                image={artist.images[2].url}
                                name={artist.name}
                                genres={artist.genres}
                            />
                        ))}
                    </div>

                    {/* {showMore && (
                        <div className="flex flex-col justify-center items-start align-center">
                        {remainingItems.map(artist => (
                            <ArtistResult 
                                image={artist.images[2].url}
                                name={artist.name}
                            />
                        ))}
                    </div>
                    )} */}

            {/* <button onClick={handleToggle} className="mt-4 text-blue-500 focus:outline-none">
                    {showMore ? "Show Less" : "Show All 20 Artists"}
            </button> */}
        </div>
        
        </>
    )
}