Notes: 
1. JSON response link, results (empty array issue)
2. Maps within maps (getting lost in the syntax!)
3. Overseeing stupid mistakes
4. Maps in states (missing returns, getting lost in syntax)
5. Conditional styling (targetting proper label  answer = correctAnswer)
6. Number() // do not forget string - number!!!
7. Application of shuffleArray in map!!! (correct placement)
8. Nested ternary operators
9. Jen v tom useEffectu při fetch bych použil try / catch, místo .then

Ulehčí ti to práci, bude to čitelnější a budeš tam mít možnost lehce podchytit právě ten error handling


*



Conditional styling:


        const organizedData = questions.map((question, index) => ({
            id: index,
            question: question.question,
            answers: answers[index].answers,
            correctAnswer: correctAnswer[index].correctAnswer,
            isAnswered: false,
            userAnswer: "",
            answeredCorrectly: null,
            highlightCorrectAnswer: false,
        }));



1) default styling (data have highlightCorrectAnswer:false):

"px-4 py-2 bg-white border rounded cursor-pointer peer-checked:text-white peer-checked:bg-blue-500"


2) After "Check answer" is clicked, function updates highlightCorrectAnswer to "true" on questions, which have been answered incorecctly.

For this cases I need to:

    a) highlight corerect answer with "text-green-700"
    




<div
    className={
        
        if (highlightCorrectAnswer === true) {
            
            
        } else {
            `px-4 py-2 bg-white border rounded cursor-pointer peer-checked:text-white peer-checked:bg-blue-500`
        }
}
>




// original one

                        <div
                            className={`px-4 py-2 bg-white border rounded cursor-pointer peer-checked:text-white peer-checked:bg-blue-500 ${
                            item.highlightCorrectAnswer  === true
                                ? "peer-checked:bg-red-500 text-green-700" 
                                : item.answeredCorrectly === true ?
                                "peer-checked:bg-green-500"
                                :""
                            }`}
                        >
