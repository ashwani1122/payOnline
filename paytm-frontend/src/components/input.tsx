export default function Input({Label, placeholder, onchange}: {Label: string, placeholder: string, onchange: any}){
    return(
        <div className="flex flex-col  justify-center w-full text-black text-start  ">
            <div className="  py-5 px-4"> 
                {Label}
                <input onChange={onchange} className="w-full text-black px-4 py-2 border  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 "
                placeholder={placeholder}
                />
            </div>
        </div>
    )
}       