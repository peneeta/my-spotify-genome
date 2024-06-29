export default function TrackResult({ image, name, artist, popularity}:any) {
    return (
        <div className="flex flex-row align-center justify-start gap-4 my-5">
            <img src={image} alt="album-cover" />
            <div className="flex flex-col align-center justify-center">
                <h2>{name}</h2>
                <h3>{artist}</h3>
            </div> 

            <div className="self-center popularity-score">
                <h2>Popularity Index</h2>
                <p className="text-center">{popularity}</p> 
            </div>

             
        </div>
    )
}