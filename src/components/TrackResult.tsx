export default function TrackResult({ image, name, artist}:any) {
    return (
        <> 
            <div className="flex flex-row align-center justify-center gap-6 my-5 mr-4">
                <img src={image} alt="album-cover" style={{width: "6rem"}}/>
                <div className="flex flex-col align-center justify-center">
                    <h4>{name}</h4>
                    <p style={{fontSize: "0.9rem"}}>{artist}</p>
                </div> 
            </div>
        </>

    )
}