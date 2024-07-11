export default function ArtistResult({image, name, genres}: any) {
    return (
        <>
        <div className="flex flex-row align-center justify-center gap-6 my-4">
            <img src={image} className="artist-profile rounded-full" style={{width: "6rem", height: '6rem'}} />
            <div className="flex flex-col align-center justify-center">
                <h4>{name}</h4>
                <p style={{maxWidth: "15rem"}}>{genres.map(String).join(', ')}</p>
            </div>

        </div>   
        </>
    )
}