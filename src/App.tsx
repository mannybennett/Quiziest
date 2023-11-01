import { useState, useEffect, useMemo } from 'react'
import axios from 'axios';
import { Numbers, Question } from './types';
import General from './components/General';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

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
    setloading(true);
    setCounter(Numbers.Zero);
    setTracker(Numbers.One);
    setScore(Numbers.Zero);
    fetchData();
  };

  const decode = (text: string): string => {
    return decodeURIComponent(text)
  };

  return (
    <main>
      <h1><span>Q</span>uiziest</h1>
      <Tabs
        defaultActiveKey="general"
        className="tabs"
        variant="underline"
        fill
      >
        <Tab tabClassName="tab" eventKey="general" title="General">
          <General
            loading={loading}
            tracker={tracker}
            score={score}
            handleRestart={handleRestart}
            decode={decode}
            question={question}
            answers={answers}
            correctAnswer={correctAnswer}
            handleRightAnswer={handleRightAnswer}
            handleWrongAnswer={handleWrongAnswer}
            answered={answered}
            handleNext={handleNext} 
          />
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