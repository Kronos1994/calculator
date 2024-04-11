import React, { useState, useEffect } from 'react';
import './App.css';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState('');
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      if (/\d/.test(key)) {
        handleNumericKeyPress(key);
      } else if (['+', '-', '*', '/', '.', '='].includes(key)) {
        handleButtonClick(key);
      } else if (key === 'Enter') {
        handleButtonClick('=');
      } else if (key === 'Backspace') {
        handleButtonClick('←');
      } else if (key === 'Delete') {
        handleButtonClick('C');
      }
      setIsKeyboardActive(true);
    };

    const handleKeyUp = () => {
      setIsKeyboardActive(false);
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [display]);

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        const calculationResult = eval(display).toString();
        setResult(calculationResult);
        setHistory(`${display} = ${calculationResult}\n${history}`);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setDisplay('');
      setResult('');
    } else if (value === '←') {
      setDisplay(display.slice(0, -1));
    } else if (value === '+/-') {
      if (display.charAt(0) === '-') {
        setDisplay(display.slice(1));
      } else {
        setDisplay('-' + display);
      }
    } else {
      setDisplay(display + value);
    }
  };

  const handleNumericKeyPress = (key) => {
    setDisplay(display + key);
  };

  return (
    <div className="calculator">
      <input type="text" value={display} readOnly />
      <input type="text" value={result} readOnly />
      <textarea className="history" value={history} readOnly />
      <div className={`buttons ${isKeyboardActive ? 'keyboard-active' : ''}`}>
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button onClick={() => handleButtonClick('+')}>+</button>
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button onClick={() => handleButtonClick('-')}>-</button>
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button onClick={() => handleButtonClick('*')}>*</button>
        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button onClick={() => handleButtonClick('/')}>/</button>
        <button onClick={() => handleButtonClick('=')}>=</button>
        <button onClick={() => handleButtonClick('C')}>C</button>
        <button onClick={() => handleButtonClick('←')}>←</button>
        <button onClick={() => handleButtonClick('+/-')}>+/-</button>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>React Calculator</h2>
        <Calculator />
      </header>
    </div>
  );
}

export default App;