import { useState, useEffect } from 'react'
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Stack from 'react-bootstrap/Stack';
import { Button } from 'react-bootstrap';

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
  Two = 2
}

const generalUrl: string = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple&encode=url3986"
// const filmUrl: string = "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple&encode=url3986"
// const musicUrl: string = "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple&encode=url3986"
// const videogamesUrl: string = "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple&encode=url3986"

function App() {
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [counter, setCounter] = useState<Numbers>(Numbers.Zero);
  const [loading, setloading] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    await axios.get(generalUrl)
      .then(results => {
        setQuizData(results.data.results);
        setloading(false)
        console.log(quizData);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const decode = (text: string): string => {
    return decodeURIComponent(text)
  }

  const question: Question = quizData[0]

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
          <div className="content">
            <h3>{decode(question.question)}</h3>
            <Stack gap={3}>
              <Button size="lg" variant="light" className="choiceButton">
                {decode(question.correct_answer)}
              </Button>
              <Button size="lg" variant="light" className="choiceButton">
                {decode(question.incorrect_answers[0])}
              </Button>
              <Button size="lg" variant="light" className="choiceButton">
                {decode(question.incorrect_answers[1])}
              </Button>
              <Button size="lg" variant="light" className="choiceButton">
                {decode(question.incorrect_answers[2])}
              </Button>
            </Stack>
            <Button className="nextButton" variant="secondary">Next</Button>
          </div>
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