
interface Balance{
    balance: number;
}
export default function Balance({balance}: Balance) {
    return(
        <div className="flex flex-col justify-center items-center  px-4 rounded-md">
            <div className="text-xl  font-medium  text-left 
            text-left  
            items-start">
            Balance in (Rs) {balance.toFixed(2)}
            </div>
        </div>
    )
}   
