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
    params.append("scope", "user-read-private user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);
    params.append("redirect_uri", "http://localhost:5173/callback");

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

/*
getAccessToken
Function that generates an access token based on the clientId (given by Spotify) and the generated code from URLSearchParams. Refreshes the token if an error persists

Input: ClientId, code :string
Output: AccessToken
*/
export async function getAccessToken(clientId: string) {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    if (!authCode) {
        //redirectToAuthCodeFlow(clientId);
        console.log("auth code not found");
        return null
    } else {
      const verifier = localStorage.getItem("verifier");

      if (!verifier) {
        console.error("Verifier not found in local storage.");
        return null;
      }

      console.log("Verifier found", verifier);
      console.log("Code is", authCode); // this works

      // check if AuthCode has been used
      const authCodeUsed = localStorage.getItem("auth_code_used");
      if (authCodeUsed == authCode) {
        console.warn("Auth code has already been used");
        return;
      }

      const body = new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: 'http://localhost:5173/callback',
        code_verifier: String(verifier),
      });

        try {
          const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
          });

          if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`Error: ${response.status} - ${errorDetails.error} - ${errorDetails.error_description}`)
          }

          const data = await response.json();
          console.log("Access token response data:", data)
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('token_expiry', String(Date.now() + data.expires_in * 1000));
          localStorage.setItem('refresh_token', data.refresh_token);

          // mark the auth code as used
          localStorage.setItem("auth_code_used", authCode);

          // clear the code from the URL
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete('code');
          window.history.replaceState({}, document.title, newUrl.toString());

          return data

        } catch (error) {
          console.error('Failed to fetch access token:', error);
        }

        }}

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

    if (!refreshToken) {
        console.error('Refresh token not found.');
        return null;
    }
    const url = "https://accounts.spotify.com/api/token";

    console.log("refresh token", refreshToken);

    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: String(refreshToken),
        client_id: clientId
    });

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body.toString(),
            });


            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`Error: ${response.status} - ${errorDetails.error} - ${errorDetails.error_description}`)
            }
            
            const data = await response.json();
            console.log("Refreshed access token response data:", data);
            localStorage.setItem('access_token', data.accessToken);

            if (data.refresh_token) {
                localStorage.setItem('refresh_token', data.refreshToken);
            }
            

            return data;
        } catch (error) {
            console.error("Failed to refresh token:", error);
        }

        // make a new request to get a new access token

   };
