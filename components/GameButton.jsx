import React from 'react'

export default function GameButton(props){
    return(
        <>
            <button onClick={props.gameLauncher} className="w-[193px] h-[52px] bg-[#4D5B9E] rounded-2xl text-white font-normal text-base inter text-[#F5F7FB]">Start quiz</button>
        </>
    )
}