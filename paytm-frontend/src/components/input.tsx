export default function Input({Label, placeholder, onchange,className,disabled}: {Label: string, placeholder: string, onchange: any, className: string,disabled: boolean}){
    return(
        <div className="flex flex-col  justify-center w-full text-black text-start  ">
            <div className="flex flex-col  justify-start w-full text-black text-start">
                {Label}
                <input onChange={onchange} className={className} type="text"
                placeholder={placeholder}
                disabled={disabled}
                />
            </div>
        </div>
    )
}       