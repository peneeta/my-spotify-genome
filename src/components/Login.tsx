import { loginOnClick } from "../scripts/login";

import Bokeh from "./bokeh";

// HERE func TEST
loginOnClick();

export default function Login() {

    return (
        <>
            <Bokeh />

            <div className="content flex flex-col justify-center align-center items-center" style={{height:"100vh"}}>
                <h1 className="title py-4">My Spotify Genome</h1>

                <a id="login" className="text-white bg-spotify-green hover:bg-spotify-dark-green font-medium rounded-full text-base px-8 py-3 dark:bg-spotify-green my-3">Login with Spotify</a>

                <section id="profile">
                    <h2>Logged in as <span id="displayName"></span></h2>
                    <span id="avatar"></span>
                    <ul>
                        <li>User ID: <span id="id"></span></li>
                        <li>Email: <span id="email"></span></li>
                        <li>Spotify URI: <a id="uri" href="#"></a></li>
                        <li>Link: <a id="url" href="#"></a></li>
                        <li>Profile Image: <span id="imgUrl"></span></li>
                    </ul>
                </section>
            </div>
        




        </>
    )
}
