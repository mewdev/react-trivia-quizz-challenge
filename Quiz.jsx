import React from 'react'
import { useState } from 'react'
import GameButton from '/components/GameButton.jsx'
import Questions from '/components/Questions.jsx'

export default function Quiz(){

const [hasStarted, setHasStarted] = useState(false)


function gameLauncher(){
    setHasStarted(prevState => !prevState)
}



    return(
        <div className="p-5 bg-[#F5F7FB] h-screen flex flex-col items-center justify-center">
            <div className={hasStarted ? "hidden" : "block"}>
                <div className="">
                    <h1 className="flex flex-col justify-center items-center karla text-[31.25px] font-semibold text-[#293264]">Quizzical</h1>
                    <p className="mb-2 text-center inter text-base font-normal text-[#293264]">Test your knowledge</p>
                    <GameButton
                    gameLauncher={gameLauncher}
                    />
                </div>
            </div>

            <div className={hasStarted ? "block" : "hidden"}>
                <div className="flex flex-col items-center justify-center">
                    <Questions 
                    gameLauncher={gameLauncher}/>                    
                </div>
            </div>
        </div>
    )
}

