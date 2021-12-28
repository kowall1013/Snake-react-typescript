import { useRef, useState } from 'react';
import './App.css';

const canvasX = 1000;
const canvasY = 1000;
const initialSnake = [[4,10], [4,10]];
const initialApple = [14, 10];
const scale = 50;
const timeDelay = 100;


function App() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState([0, -1]);
  const [snake, setSnake] = useState(initialSnake);
  const [snake, setSnake] = useState(initialSnake);
  const [snake, setSnake] = useState(initialSnake);
  return (
    <div>
      Test
    </div>
  );
}

export default App;
