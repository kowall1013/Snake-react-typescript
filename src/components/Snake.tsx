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

const CANVAS_WIDTH = 1000
const CANVAS_HEIGHT = 500
const SNAKE_COLOR = '#F47340'
const INITIAL_DELAY = 300
const SCALE = 25
const SNAKE_WIDTH = 1
const SNAKE_HEIGHT = 1
const INITIAL_SNAKE = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
]

function Snake(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState<number[][]>(INITIAL_SNAKE)
  const [snakeDirection, setSnakeDirection] = useState([1, 0])
  const [gameOver, setGameOver] = useState(false)
  const [delay, setDelay] = useState<number | null>(INITIAL_DELAY)

  useInterval(() => runGame(), delay)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (ctx) {
      ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)
      ctx.fillStyle = SNAKE_COLOR
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      snake.map(([x, y]) => ctx.fillRect(x, y, SNAKE_WIDTH, SNAKE_HEIGHT))
    }
  }, [snake, gameOver])

  function playGame() {}

  function runGame() {
    const newSnake = [...snake]
    const newSnakeHead = [
      newSnake[0][0] + snakeDirection[0],
      newSnake[0][1] + snakeDirection[1],
    ]
    newSnake.unshift(newSnakeHead)
    newSnake.pop()
    console.log(newSnake)
    if (!checkColision(newSnake)) {
      setGameOver(true)
      setDelay(null)
    }

    setSnake(newSnake)
  }

  function checkColision(snake: number[][]) {
    if (snake[1][0] >= 40 || snake[1][0] < 0) {
      return false
    }

    if (snake[1][1] >= 20 || snake[1][1] < 0) {
      return false
    }

    return true
  }

  // function checkCollision(head: number[]) {
  // 	for (let i = 0; i < head.length; i++) {
  // 		if (head[i] < 0 || head[i] * scale >= canvasX) return true
  // 	}
  // 	for (const s of snake) {
  // 		if (head[0] === s[0] && head[1] === s[1]) return true
  // 	}
  // 	return false
  // }

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
      <Canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
      <Play onClick={playGame}>Play</Play>
      {gameOver ? <GameOver>Game Over</GameOver> : null}
    </Wrapper>
  )
}

export default Snake
