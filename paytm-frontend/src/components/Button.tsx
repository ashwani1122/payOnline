export default function Button({onClick, label }: {onClick: any, label: string}){
    return(
        
        <div className="flex flex-col justify-center items-center  py-2 px-4 rounded-md ">
        <button  onClick={onClick} type="button" className="  text-black border-2 hover:bg-blue-900 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2  text-center dark:border-blue-600  text-black dark:hover:bg-blue-600 dark:focus:ring-blue-800 px-12 w-full text-2xl ">{label}</button>
        </div>
    )
}