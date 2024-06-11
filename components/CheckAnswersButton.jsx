export default function CheckAnswersButton(props) {
    return(
        <>
            <button onClick={props.checkAnswers} className="py-3 px-7  bg-[#4D5B9E] rounded-2xl text-white font-normal text-base text-[10px] inter text-[#F5F7FB]" type="submit">Check Answers</button>
        </>
    )
}