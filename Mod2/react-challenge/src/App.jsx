import { useState } from 'react';
import './App.css';
import Greetings from './components/Greetings';

function App() {

  let hi = "Hello World";

  const [greetings, setGreetings] = useState([])

  const greetingMixGenerator = (word) => {
    if (greetings.length > 38) {
      alert("The greetings reached its limit. The generated content will be removed for you be able to play again!");
      return setGreetings([]);
    }
    let splittedWord = word.split('');
    for (let i = 0; i < splittedWord.length; i++) {
      const randomIdx = Math.floor(Math.random() * splittedWord.length);
      const letterStorage = splittedWord[i];
      splittedWord[i] = splittedWord[randomIdx];
      splittedWord[randomIdx] = letterStorage;
    };

    const newWord = splittedWord.join('');

    setGreetings(prevGreetings => [...prevGreetings, newWord]);
  }

  return (
    <div className="App">
      <h4>{hi}!</h4>

      <h2>Did you know that is possible to say {hi} in many different ways?</h2>

      <h3>Just click the button below and discover new ways to do it. :)</h3>

      <button className='btn' onClick={() => greetingMixGenerator(hi)}>Generate new greeting</button>

      <Greetings greetings={greetings} />
    </div>
  )
}

export default App;