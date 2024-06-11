import React, { useState, useEffect } from 'react';
import CheckAnswersButton from '/components/CheckAnswersButton.jsx';
import PlayAgainButton from '/components/PlayAgainButton.jsx';
import he from 'he';

export default function Questions(props) {
  const [quizData, setQuizData] = useState([]);
  const [checkedAnswers, setCheckedAnswers] = useState(false);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((res) => res.json())
      .then((data) => {
        const decodedQuestions = data.results.map((question) => ({
          question: he.decode(question.question),
        }));
        const decodedCorrectAnswer = data.results.map((answer) => ({
          correctAnswer: he.decode(answer.correct_answer),
        }));
        const combinedAnswers = data.results.map((answer) => {
          const decodedCorrectAnswer = he.decode(answer.correct_answer);
          const decodedIncorrectAnswers = answer.incorrect_answers.map((ans) =>
            he.decode(ans)
          );
          return { answers: [decodedCorrectAnswer, ...decodedIncorrectAnswers] };
        });

        const combinedData = [
          ...decodedQuestions,
          ...combinedAnswers,
          ...decodedCorrectAnswer,
        ];

        const questions = combinedData.filter((item) => item.question);
        const answers = combinedData.filter((item) => item.answers);
        const correctAnswer = combinedData.filter((item) => item.correctAnswer);

        const organizedData = questions.map((question, index) => {
          const shuffledAnswers = shuffleArray(answers[index].answers);

          return {
            id: index,
            question: question.question,
            answers: shuffledAnswers,
            correctAnswer: correctAnswer[index].correctAnswer,
            userAnswer: '',
            answeredCorrectly: null,
          };
        });

        setQuizData(organizedData);
      });
  }, []);

  function answerUpdater(e) {
    const answerId = Number(e.target.id);
    const answerValue = e.target.value;

    setQuizData((prevState) =>
      prevState.map((question) =>
        question.id === answerId
          ? { ...question, userAnswer: answerValue }
          : question
      )
    );
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const checkAnswers = (e) => {

    e.preventDefault();

    setQuizData((prevState) =>
      prevState.map((item) =>
        item.userAnswer === item.correctAnswer
          ? { ...item, answeredCorrectly: true }
          : { ...item, answeredCorrectly: false }
      )
    );
    
    setCheckedAnswers(true);
    
  };

  const quizElement = quizData.map((item, index) => (
    <div key={item.id}>
      <h3 className="mt-2 karla text-base text-[#293264] font-medium mb-3">
        {item.question}
      </h3>
      <div className="flex gap-2 justify-start mb-3">
        {item.answers.map((answer, answerIndex) => (
          <label key={`${item.id}-${answerIndex}`} className={checkedAnswers ? "pointer-events-none" : null}>
            <input
              onClick={answerUpdater}
              type="radio"
              value={answer}
              className="sr-only peer"
              id={item.id}
            />
          <div
            className={`text-[#293264] text-[10px] font-medium inter rounded-lg px-3 py-1 border border-[#4D5B9E] cursor-pointer peer-checked:bg-[#D6DBF5] peer-checked:border-none ${
              checkedAnswers
                ? item.answeredCorrectly
                  ? answer === item.correctAnswer
                    ? 'peer-checked:bg-[#94D7A2] border-none' 
                    : 'opacity-50'
                  : answer === item.correctAnswer
                    ? 'text-[#293264] bg-[#94D7A2] border-none'
                    : 'peer-checked:bg-[#F8BCBC] opacity-50'
                : ''
            }`}
          >
            {answer}
          </div>
          </label>
        ))}
      </div>
      <hr className="w-auto h-px border-t-0 bg-[#DBDEF0]" />
    </div>
  ));

  const correctAnswers = quizData.filter(
    (item) => item.answeredCorrectly === true
  );



  return (
    <div>
      <form className="flex flex-col">
        {quizElement}

        {!checkedAnswers ? (
          <div className="flex items-center justify-center mt-6">
            <CheckAnswersButton checkAnswers={checkAnswers} />
          </div>
        ) : null}

        {checkedAnswers ? (
          <div className="flex flex-row-reverse items-center justify-center gap-6 mt-6">
            <PlayAgainButton onClick={props.gameLauncher} />
            <p>
              You scored {correctAnswers.length}/{quizData.length} correct
              answers
            </p>
          </div>
        ) : null}
      </form>
    </div>
  );
}
