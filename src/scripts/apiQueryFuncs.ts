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
Function to fetch user's top artists/songs
*/
export async function fetchTopTracks(code: string) {
    try {
        const result = await fetch("https://api.spotify.com/v1/me/top/tracks?medium_term", {
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

export async function populateUI(profile: UserProfile) {
    document.getElementById("displayName")!.innerText = profile.display_name;
}