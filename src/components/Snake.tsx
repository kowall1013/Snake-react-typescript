import {useRef, useEffect, useState} from 'react'
import styled from 'styled-components'
import useInterval from '../hooks/useInterval'

const Canvas = styled.canvas`
  border: 1px solid black;
`

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 8px;

  &:focus {
    outline: none;
  }
`

const Play = styled.button`
  background-color: #8843f2;
  border: 1px solid transparent;
  padding: 8px 48px;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #8843f299;
  }
`
const GameOver = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  padding: 16px 60px;
  border: 1px solid black;
  background-color: #ff5959;
`
const Apple = styled.img`
  display: none;
`

const CANVAS_WIDTH = 1000
const CANVAS_HEIGHT = 500
const SNAKE_COLOR = '#F47340'
const INITIAL_DELAY = 300
const SCALE = 25
const SNAKE_WIDTH = 1
const SNAKE_HEIGHT = 1
const INITIAL_SNAKE = [
  [4, 10],
  [4, 10],
]
const INITIAL_APPLE = [4, 4]

function Snake(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [apple, setApple] = useState(INITIAL_APPLE)
  const [snakeDirection, setSnakeDirection] = useState([1, 0])
  const [gameOver, setGameOver] = useState(false)
  const [delay, setDelay] = useState<number | null>(INITIAL_DELAY)

  useInterval(() => runGame(), delay)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const fruit = document.getElementById('apple') as HTMLCanvasElement

    if (ctx) {
      ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)
      ctx.fillStyle = SNAKE_COLOR
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      snake.map(([x, y]) => ctx.fillRect(x, y, SNAKE_WIDTH, SNAKE_HEIGHT))
      ctx.drawImage(fruit, apple[0], apple[1], 1, 1)
    }
  }, [snake, gameOver, apple])

  function playGame() {
    setSnakeDirection([1, 0])
    setGameOver(false)
    setSnake(INITIAL_SNAKE)
    setApple(INITIAL_APPLE)
    setDelay(INITIAL_DELAY)
  }

  function runGame() {
    const newSnake = [...snake]
    const newSnakeHead = [
      newSnake[0][0] + snakeDirection[0],
      newSnake[0][1] + snakeDirection[1],
    ]
    newSnake.unshift(newSnakeHead)

    if (checkColision(newSnakeHead)) {
      setGameOver(true)
      setDelay(null)
    }

    if (!appleAte(newSnake)) {
      newSnake.pop()
    }

    setSnake(newSnake)
  }

  function checkColision(head: number[]) {
    console.log(head)
    if (head[0] >= CANVAS_WIDTH / SCALE || head[0] <= -1) {
      return true
    }
    if (head[1] >= CANVAS_HEIGHT / SCALE || head[1] <= -1) {
      return true
    }

    for (const s of snake) {
      if (head[0] === s[0] && head[1] === s[1]) return true
    }

    return false
  }

  function appleAte(snake: number[][]) {
    const widthCordNumber = Math.floor((Math.random() * CANVAS_WIDTH) / SCALE)
    const heightCordNumber = Math.floor((Math.random() * CANVAS_HEIGHT) / SCALE)
    if (snake[0][0] === apple[0] && snake[0][1] === apple[1]) {
      let newApple = [widthCordNumber, heightCordNumber]
      setApple(newApple)
      return true
    }
    return false
  }

  function handleDirection(e: React.KeyboardEvent<HTMLDivElement>) {
    const key = e.key
    switch (key) {
      case 'ArrowUp':
        setSnakeDirection([0, -1])
        break
      case 'ArrowDown':
        setSnakeDirection([0, 1])
        break
      case 'ArrowLeft':
        setSnakeDirection([-1, 0])
        break
      case 'ArrowRight':
        setSnakeDirection([1, 0])
        break
      default:
        break
    }
  }

  return (
    <Wrapper tabIndex={0} onKeyDown={e => handleDirection(e)}>
      <Apple src="./images/applePixels.png" alt="fruit" width={30} id="apple" />
      <Canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
      <Play onClick={playGame}>Play</Play>
      {gameOver ? <GameOver>Game Over</GameOver> : null}
    </Wrapper>
  )
}

export default Snake
