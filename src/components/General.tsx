import { useState } from 'react';
import { Numbers, GeneralProps } from '../types';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const General = ({
  loading,
  tracker,
  score,
  handleRestart,
  decode,
  question,
  answers,
  correctAnswer,
  handleRightAnswer,
  handleWrongAnswer,
  answered,
  handleNext
}
  : GeneralProps) => {
  const [answerChoice, setAnswerChoice] = useState<string>("");

  const selectAnswerChoice = (e: React.MouseEvent<HTMLButtonElement>): void => {
    return setAnswerChoice(e.currentTarget.value);
  }
  
  return (
    <> 
      {loading ? 
        <Spinner style={{ marginTop: "100px" }} animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner> 
      :
        (tracker > Numbers.Ten ? 
          <div className="content">
            <h4>Quiz Complete!</h4>
            <h5>{`You got ${score} out of 10 questions correct.`}</h5>
            <Button className="restartButton" onClick={handleRestart} variant="danger" size="lg">Restart</Button>
          </div> 
          :
          <div className="content">
            <h3>{decode(question.question)}</h3>
            <Stack gap={2}>
              {
                answers.map((answer, idx) => {
                  const isCorrect = answer === correctAnswer;
                  return (
                    <Button
                      key={idx}
                      className="choiceButton"
                      onClick={(e) => {selectAnswerChoice(e); isCorrect ? handleRightAnswer() : handleWrongAnswer()}}
                      variant={answered && isCorrect ? "success" : (answered && !isCorrect && answer === answerChoice ? "danger" : "light")}
                      disabled={answered ? true : false}
                      size="lg"
                      value={answer}
                    >
                      {decode(answer)}
                    </Button>
                  )
                })
              }
            </Stack>
            <Button onClick={handleNext} className="nextButton" variant="secondary" disabled={answered ? false : true}>Next</Button>
            <p className="tracker">{`${tracker}/10`}</p>
          </div>
        )
      }
    </>
  );
};
 
export default General;