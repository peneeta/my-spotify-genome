/*
Function to get user's profile
*/
export async function fetchProfile(code: string): Promise<UserProfile> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${code}` }
    })

    return await result.json();
}

/*
Function to fetch user's top songs
Code: Access token
time: either short_term, medium_term, or long_term
*/
export async function fetchTopTracks(code: string, time: string) {

    const params = new URLSearchParams();
    params.append("time_range", time);
    params.append("limit", "20");
    params.append("offset", "5");

    try {
        const result = await fetch(`https://api.spotify.com/v1/me/top/tracks?${params.toString()}`, {
            method: "GET", 
            headers: { Authorization: `Bearer ${code}`}
        });

        if (result.ok) {
            console.log("Songs retrieved")
            return await result.json()
        }
    } catch (error) {
        console.error("Error fetching top songs:", error);
        return null
    }  
}

/* 
Function to fetch user's top artists
Code: access token
time: either short_term, medium_term, or long_term
*/
export async function fetchTopArtists(code: string, time: string) {

    const params = new URLSearchParams();
    params.append("time_range", time);
    params.append("limit", "20");

    try {
        const result = await fetch(`https://api.spotify.com/v1/me/top/artists?${params.toString()}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${code}`}
        });

        if (result.ok) {
            console.log("Artists retrieved")
            return await result.json()
        }
    } catch (error) {
        console.error("Error fetching top artists")
    }
}


// Function to populate user's name
export async function populateUI(profile: UserProfile) {
    document.getElementById("displayName")!.innerText = profile.display_name;
}

/*
Generates a frequency table of genres in TopArtistsObject to be passed into the ChartJS component
*/
export function countGenres(data: TopArtistsObject) {
    console.log(data)
    // Flatten the array of genre arrays into a single array of genre strings
    const totalGenres = data.items.map((item: { genres: any}) => item.genres).flat();

    // Define multi-word genres that should not be split
    const multiWordGenres = ["hip hop", "electronic dance", "rhythm and blues", "modern rock", "alternative rock", "escape room"];

    // Process the genres
    const splitGenres = totalGenres.flatMap((genre: string) => {
        // Check if the genre contains any of the multi-word genres
        for (const multiWordGenre of multiWordGenres) {
            if (genre.includes(multiWordGenre)) {
                // Split the genre by the multi-word genre and filter out empty strings
                const parts = genre.split(multiWordGenre).map(part => part.trim()).filter(part => part.length > 0);
                return [...parts, multiWordGenre];
            }
        }
        // Split the genre by spaces if it doesn't contain any multi-word genres
        return genre.split(' ').filter(g => g.trim().length > 0);
    });

    const genreCount = splitGenres.reduce((acc: { [key: string]: number }, genre: string) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
    }, {});
    
    return genreCount;
}





