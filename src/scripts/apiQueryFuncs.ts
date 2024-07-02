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
    params.append("offset", "5");

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
