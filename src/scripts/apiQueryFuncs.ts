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
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks", {
        method: "GET", headers: { Authorization: `Bearer ${code}`}
    });

    return await result.json()
}

// function populateUI(profile: UserProfile) {
//     document.getElementById("displayName")!.innerText = profile.display_name;
//     document.getElementById("avatar")!.setAttribute("src", profile.images[0].url)
//     document.getElementById("id")!.innerText = profile.id;
//     document.getElementById("email")!.innerText = profile.email;
//     document.getElementById("uri")!.innerText = profile.uri;
//     document.getElementById("uri")!.setAttribute("href", profile.external_urls.spotify);
//     document.getElementById("url")!.innerText = profile.href;
//     document.getElementById("url")!.setAttribute("href", profile.href);
//     document.getElementById("imgUrl")!.innerText = profile.images[0].url;
// }