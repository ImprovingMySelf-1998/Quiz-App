import React, { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answer from "./Answer";
import QUESTIONS from "../question";

function Question(props) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 10000;
  }
  if (answer.isCorrect !== null) {
    timer = 20000;
  }
  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[props.index].answers[0] === answer,
      });
      setTimeout(() => {
        props.onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? props.onSkipAnswer : null}
        mode={answerState}
        key={timer}
      />
      <h2>{QUESTIONS[props.index].text}</h2>
      <Answer
        answers={QUESTIONS[props.index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}

export default Question;
