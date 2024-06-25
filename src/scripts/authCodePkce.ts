/*
redirectToAuthCodeFlow
Function to redirect to Spotify authorization
Input: clientId - the ID given upon creation of spotify app
Output: None
*/
export async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-top-read user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

/*
getAccessToken
Function that generates an access token based on the clientId (given by Spotify) and the generated code from URLSearchParams. Refreshes the token if an error persists

Input: ClientId, code :string
Output: AccessToken
*/
export async function getAccessToken(clientId: string, code: string) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier!);

    await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    }).then(async (response) => {
        if (response.ok) {
            const result = await response.json();
            console.log(result) // check
            localStorage.setItem('access_token', result.access_token);
            localStorage.setItem('refresh_token', result.refresh_token)
        }
    }).catch((error: any) => {
        console.log(error) // log error message
        getRefreshToken(clientId); // refresh token
    })

    return localStorage.getItem('access_token');
}

/*
generateCodeVerifier and generateCodeChallenge are used for PKCE authorization.
This type of authorization is client side (does not need the server-side secret key) Functions obtained from https://developer.spotify.com/documentation/web-api/howtos/web-app-profile 
*/
function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

/*
Function to generate a new refresh token if one expires
See https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens 
*/
export async function getRefreshToken(clientId: string) {

    // refresh token that has been previously stored
    const refreshToken = localStorage.getItem('refresh_token');
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: new URLSearchParams({
         grant_type: 'refresh_token',
         refresh_token: refreshToken ?? "",
         client_id: clientId
       }),
     }

     // make a new request to get a new access token, should work
     const body = await fetch(url, payload);
     const response = await body.json();
 
     localStorage.setItem('access_token', response.accessToken);
     localStorage.setItem('refresh_token', response.refreshToken);
   };