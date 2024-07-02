export default function SelectorButton({text,onHandleClick, isActive}:any) {
    return (
        <>

            <button 
                className={`transition ease-in-out text-white bg-transparent hover:bg-light-blue active:bg-light-blue outline-double outline-offset-2 outline-light-blue current:bg-light-blue rounded-full text-base px-5 my-3 ${isActive ? 'active' : ''}`}
                onClick={onHandleClick}>{text}</button>

        </>

        
    )
}