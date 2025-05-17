export default function Balance({balance}: {balance: number}){
    return(
        <div className="flex flex-col justify-center items-center mt-20 px-4 rounded-md ">
            <div className="text-xl text-white font-medium  text-left  px-2
            text-left  
            items-start">
            Balance in (Rs) {balance}
            </div>
        </div>
    )
}   