export default function Button({onClick, label ,className}: {onClick: any, label: string, className: string}){
    return(
        
        <div className="flex flex-col justify-center items-center  py-2 px-4 rounded-md ">
        <button  onClick={onClick} type="button" className={className}>{label}</button>
        </div>
    )
}