export default function Footer() {
    return (
        <div className="text-center py-7 px-5 mt-4" style={{width: "100vw"}}>
            <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent opacity-25 dark:via-white" style={{width: '50%', margin: '0 auto'}}/>
            
            <div className="pt-8 github-link link flex flex-col gap-2 justify-center items-center align-center">
                <p>Created by Peneeta</p>
                <a href="https://github.com/peneeta/my-spotify-genome" target="_blank">https://github.com/peneeta/my-spotify-genome</a>
            </div>
    </div>
    )
}