import { useNavigate } from "react-router-dom";

function Card({ children, fontColor="text-white", borderColor="border-error", dividerColor="bg-gray-100", background="bg-primary", titleText = "", status = 50, quantity = "" }) {
    
    const navigator = useNavigate()
    const statusPercent = status*100;

    function onCardClick() {
        navigator(`/dashboard?status=${titleText}`)
    }
    return (
            <div onClick={onCardClick} className={`border-b-8 ${borderColor} w-64 h-44 ${background} rounded-md flex flex-col justify-center items-center py-2 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out`}>

            <div className='text-primary-content text-2xl mb-2'>
                {children} <span>{titleText}</span>
            </div>

            <div className={`divider ${dividerColor} h-0.5 mx-4 rounded-sm`}></div> 

            <div className='flex justify-around gap-4 items-center mt-2'>
                <div className={`text-7xl ${fontColor}`}>
                    {quantity}
                </div>
                <div className={`radial-progress ${fontColor}`} style={{"--value": status*100}}>{statusPercent.toString().substring(0, 4)}%</div>
            </div>

            </div>
    );
}

export default Card;