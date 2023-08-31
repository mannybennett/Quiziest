import { Question, Numbers } from '../types';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

interface GeneralProps {
  loading: boolean;
  tracker: Numbers; 
  score: Numbers;
  handleRestart: () => void;
  decode: (encodedText: string) => string;
  question: Question;
  answers: string[];
  correctAnswer: string;
  handleRightAnswer: () => void;
  handleWrongAnswer: () => void; 
  answered: boolean;
  handleNext: () => void;
}

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

  return (
    <> 
      {loading ? <div>Loading...</div> :
        (tracker > Numbers.Ten ? 
          <div className="content">
            <h4>Quiz Complete!</h4>
            <h5>{`You got ${score} out of 10 questions correct.`}</h5>
            <Button className="restartButton" onClick={handleRestart} variant="danger" size="lg">Restart</Button>
          </div> 
          :
          <div className="content">
            <h3>{decode(question.question)}</h3>
            <Stack gap={3}>
              {
                answers.map((answer, idx) => {
                  const isCorrect = answer === correctAnswer;
                  return (
                    <Button
                      key={idx}
                      className="choiceButton"
                      onClick={isCorrect ? handleRightAnswer : handleWrongAnswer}
                      variant={answered && isCorrect ? "success" : (answered ? "danger" : "light")}
                      disabled={answered ? true : false}
                      size="lg"
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