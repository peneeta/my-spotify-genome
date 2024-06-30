export default function SelectorButton({text}:any) {
    return (
        <button className="transition ease-in-out text-white bg-transparent hover:bg-light-blue active:bg-light-blue outline outline-offset-2 outline-1 outline-light-blue rounded-full text-base px-5 my-3">{text}</button>
    )
}