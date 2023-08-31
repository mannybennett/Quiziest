import { useState, useEffect, useMemo } from 'react'
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

interface Question {
  category: string;
  type: 'multiple' | 'boolean';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string; 
  incorrect_answers: string[];
}

enum Numbers {
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8, 
  Nine = 9,
  Ten = 10
}

const generalUrl: string = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple&encode=url3986"
// const filmUrl: string = "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple&encode=url3986"
// const musicUrl: string = "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple&encode=url3986"
// const videoGamesUrl: string = "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple&encode=url3986"

function App() {
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [counter, setCounter] = useState<Numbers>(Numbers.Zero);
  const [score, setScore] = useState<Numbers>(Numbers.Zero);
  const [tracker, setTracker] = useState<Numbers>(Numbers.One);
  const [answered, setAnswered] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    await axios.get(generalUrl)
      .then(results => {
        setQuizData(results.data.results);
        setloading(false)
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const question: Question = quizData[counter] ?? null;

  const splicePosition = (): Numbers => {
    const num: number = Math.random();
    if (num <= 0.25) {
      return Numbers.Zero
    } else if (num > 0.25 && num <= 0.5) {
      return Numbers.One
    } else if (num > 0.5 && num <= 0.75) {
      return Numbers.Two
    } else {
      return Numbers.Three
    };
  };

  const answers: string[] = useMemo(() => {
    if (!question) {
      return []; 
    } else {
      const answersCopy: string[] = [...question.incorrect_answers];
      answersCopy.splice(splicePosition(), Numbers.Zero, correctAnswer);
      setCorrectAnswer(question.correct_answer);
      return answersCopy;
    };    
  }, [question, correctAnswer]);

  const handleRightAnswer = (): void => {
    setAnswered(true);
    setScore(score + 1);
  };

  const handleWrongAnswer = (): void => {
    setAnswered(true);
  };

  const handleNext = (): void => {
    setCounter(counter + 1);
    setTracker(tracker + 1);
    setAnswered(false);
  };

  const handleRestart = (): void => {
    setCounter(Numbers.Zero);
    setTracker(Numbers.One);
    setScore(Numbers.Zero);
  };

  const decode = (text: string): string => {
    return decodeURIComponent(text)
  };

  return (
    <main>
      <h1>Quiziest</h1>
      <Tabs
        defaultActiveKey="general"
        className="tabs"
        variant="underline"
        fill
      >
        <Tab tabClassName="tab" eventKey="general" title="General">
          {loading ? <div>Loading...</div> :
            (tracker > Numbers.Ten ? 
              <div className="content">
                <h3>Quiz Complete!</h3>
                <h4>{`You got ${score} out of 10 questions correct.`}</h4>
                <Button className="restartButton" onClick={handleRestart} variant="danger">Restart</Button>
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
        </Tab>
        <Tab tabClassName="tab" eventKey="film" title="Film">

        </Tab>
        <Tab tabClassName="tab" eventKey="music" title="Music">

        </Tab>
        <Tab tabClassName="tab" eventKey="videogames" title="Video Games">

        </Tab>
      </Tabs>
    </main>
  )
};

export default App;