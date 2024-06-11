// import React from 'react'
// import CheckAnswersButton from '/components/CheckAnswersButton.jsx'
// import PlayAgainButton from '/components/PlayAgainButton.jsx'
// import { useState, useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuid';

// import he from 'he';

// export default function Questions(props){
    
// const [quizData, setQuizData] = useState([])
// const [checkedAnswers, setCheckedAnswers] = useState(false)


// // Data handling 
// useEffect( () => {
//     // Data fetch
//     fetch('https://opentdb.com/api.php?amount=5&type=multiple')
//     .then(res => res.json())
//     .then(data => {
        
//         // Decodind data (question)
//         const decodedQuestions = data.results.map(question => {
//             return {question: he.decode(question.question)}
//             })
//         // Decodind data (correct answer)
//         const decodedCorrectAnswer = data.results.map(answer => {
//             return {correctAnswer: he.decode(answer.correct_answer)}
//         })
        
//         // Decode + Combine answers
//         const combinedAnswers = data.results.map(answer => {
//             const decodedCorrectAnswer = he.decode(answer.correct_answer)
            
//             const decodedIncorrectAnswers = answer.incorrect_answers.map(answer => he.decode(answer));
            
            
//             // Todo leftover: shuffle array!
//            const combinedAnswers = {answers: [decodedCorrectAnswer, ...decodedIncorrectAnswers]} 
//         //    console.log(combinedAnswers.answers)
//         //    console.log(shuffleArray(combinedAnswers.answers))
//            return combinedAnswers
            
//         })
        
//         // Combined data
//         const combinedData = [...decodedQuestions, ...combinedAnswers, ...decodedCorrectAnswer]
        
//         const questions = combinedData.filter(item => item.question);
//         const answers = combinedData.filter(item => item.answers);
//         const correctAnswer = combinedData.filter(item => item.correctAnswer);

//         const organizedData = questions.map((question, index) => {
//             const shuffledAnswers = shuffleArray(answers[index].answers)
            
//             return {
//             id: index,
//             question: question.question,
//             answers: shuffledAnswers,
//             correctAnswer: correctAnswer[index].correctAnswer,
//             userAnswer: "",
//             answeredCorrectly: null,
//             }
//         });

//         setQuizData(organizedData)
        
//         })
// }, [])

// console.log(quizData)

// // Update answer to state
// function answerUpdater(e) {    
//     const answerId = Number(e.target.id); // Ensure answerId is a number
//     const answerValue = e.target.value;

//     setQuizData(prevState => {
//         return prevState.map(question => {
//             if (question.id === answerId) {
//                 return { ...question, userAnswer: answerValue };
//             } else {
//                 return question;
//             }
//         });
//     });

// }

// // answer shuffler
// const shuffleArray = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

// // Answer checker
//     const checkAnswers = (e) => {
        
//         setCheckedAnswers(true)
        
//         e.preventDefault();

        
//         setQuizData(prevState => {
//             return prevState.map(item => {
//                 if (item.userAnswer === item.correctAnswer) {
//                     return {...item, answeredCorrectly: true}
//                 } else if (item.userAnswer !== item.correctAnswer) {
//                     return {...item, answeredCorrectly: false}
//                 } else {
//                     return item
//                 }
                
//             })
//         })
//     };






// // GUI

// const quizElement = quizData.map((item, index) => {
//   return (
//     <>
//       <h3 className="mt-2 karla text-base text-[#293264] font-medium mb-3">{item.question}</h3>
//       <div key={item.question + index} className="flex gap-2 justify-start mb-3">
//         {item.answers.map((answer, answerIndex) => (
//           <label key={`${item.id}-${answerIndex}`} className={checkedAnswers ? "pointer-events-none" : null}>
//             <input onClick={answerUpdater} type="radio" value={answer} className="sr-only peer" id={item.id} />
//             <div
//               className={`text-[#293264] text-[10px] font-medium inter rounded-lg px-3 py-1 border border-[#4D5B9E] rounded cursor-pointer peer-checked:text-[#293264] peer-checked:bg-[#D6DBF5] peer-checked:border-none ${
//                 item.answeredCorrectly === true
//                   ? "peer-checked:bg-[#94D7A2]"
//                   : item.answeredCorrectly === true && answer !== item.correctAnswer
//                   ? "opacity-50"
//                   : item.answeredCorrectly === false && answer === item.correctAnswer
//                   ? "text-[#293264] bg-[#94D7A2] border-none"
//                   : item.answeredCorrectly === false
//                   ? "peer-checked:bg-[#F8BCBC] opacity-50"
//                   : ""
//               }`}
//             >
//               {answer}
//             </div>
//           </label>
//         ))}
//       </div>
//       <hr className="w-auto h-px border-t-0 bg-[#DBDEF0]" />
//     </>
//   );
// });

// const correctAnswers = quizData.filter(item => item.answeredCorrectly === true)


//     return(

//         <div>
//             <form className="flex flex-col">
//                 {quizElement}
                
//                 {!checkedAnswers ? <div className="flex items-center justify-center mt-6"><CheckAnswersButton checkAnswers={checkAnswers}/></div> : null}
                
//                 {checkedAnswers ? <div className="flex flex-row-reverse items-center justify-center gap-6 mt-6"><PlayAgainButton onClick={props.gameLauncher}/> <p>You scored {correctAnswers.length}/{quizData.length} correct answers</p></div>  : null }
                

//             </form>
//         </div>
//     )
// }
