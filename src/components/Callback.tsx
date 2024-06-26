import { useEffect } from "react";
import { getAccessToken } from "../scripts/authCodePkce";
import Bokeh from "./Bokeh";


const clientId = 'e3dc42cfeb2b4fb0bb03369b39d757e5';

const Callback = () => {
    useEffect(() => {
        const fetchAccessToken = async () => {
            const data = await getAccessToken(clientId);
            if (data) {
                console.log("Access token data:", data);
            }
        };
        fetchAccessToken();
    }, []);

    return (
        <div>
            <Bokeh/>
            
            <h1>Callback Handling</h1>
            <h2>Processing authentication</h2>

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

                <div className="section">
                    <h2>Top Songs This Month</h2>

                </div>
        </div>
    );
};


export default Callback;