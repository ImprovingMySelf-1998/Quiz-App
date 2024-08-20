import React, { useRef } from "react";

function Answer(props) {
  const shuffledAnswer = useRef();
  if (!shuffledAnswer.current) {
    shuffledAnswer.current = [...props.answers];
    shuffledAnswer.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffledAnswer.current.map((answer) => {
        const isSelected = props.selectedAnswer === answer;
        let cssClasses = "";
        if (props.answerState === "answered" && isSelected) {
          cssClasses = "selected";
        }
        if (
          (props.answerState === "correct" || props.answerState === "wrong") &&
          isSelected
        ) {
          cssClasses = props.answerState;
        }
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => props.onSelect(answer)}
              className={cssClasses}
              disabled={props.answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Answer;
