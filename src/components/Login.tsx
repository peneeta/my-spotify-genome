import Bokeh from "./Bokeh"

export default function Login() {

    return (
        <>
            <Bokeh />

            <div className="content flex flex-col justify-center align-center items-center" style={{height:"100vh"}}>
                <h1 className="title py-4">My Spotify Genome</h1>
                <h2>Generate your musical DNA</h2>

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
        




        </>
    )
}
