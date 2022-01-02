import {useRef, useEffect, useState} from 'react'
import styled from 'styled-components'
import useInterval from '../hooks/useInterval'

const Canvas = styled.canvas`
  border: 1px solid black;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
  &:focus {
    outline: none;
  }
`
const Fruit = styled.img`
  display: none;
`
const GameOver = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  border: 1px solid transparent;
  border-radius: 4px;
  transform: translate(-50%, -50%) skew(20deg);
  background-color: #8267be;
  color: white;
  padding: 8px 40px;
`

const Score = styled.div`
  color: #f14a16;
  font-size: 2rem;

  span {
    color: #370665;
    font-weight: 700;
  }
`

const Play = styled.button`
  background-color: #35589a;
  border: 1px solid transparent;
  padding: 8px 48px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
`

const SNAKE_COLOR = '#F47340'
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 800
const INITIAL_SNAKE = [[2, 2]]
const INITIAL_FRUIT = [5, 5]
const INITIAL_DIRECTION = [1, 0]
const SCALE = 20
const DELAY = 100

function Snake(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [snake, setSnake] = useState<number[][]>(INITIAL_SNAKE)
  const [fruit, setFruit] = useState(INITIAL_FRUIT)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)
  const [delay, setDelay] = useState<number | null>(DELAY)
  const [score, setScore] = useState(0)

  useInterval(() => runGame(), delay)

  useEffect(() => {
    const apple = document.getElementById('apple') as HTMLCanvasElement
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    wrapper?.focus()
    const ctx = canvas?.getContext('2d')

    if (ctx) {
      ctx.fillStyle = SNAKE_COLOR
      ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1))
      ctx.drawImage(apple, fruit[0], fruit[1], 1, 1)
    }
  }, [snake, fruit])

  function runGame() {
    const newSnake = [...snake]
    const newHeadSnake = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ]

    newSnake.unshift(newHeadSnake)
    if (!checkCollision(newHeadSnake)) {
      setGameOver(true)
      setDelay(null)
    }

    if (!ateFruit(newSnake)) {
      newSnake.pop()
    }

    setSnake(newSnake)
  }

  function checkCollision(head: number[]) {
    for (let i = 0; i <= head.length; i++) {
      if (head[i] >= CANVAS_WIDTH / SCALE || head[i] < 0) return false
    }

    for (const s of snake) {
      if (s[0] === head[0] && s[1] === head[1]) return false
    }

    return true
  }

  function ateFruit(newSnake: number[][]) {
    const coord = fruit.map(() =>
      Math.floor((Math.random() * CANVAS_WIDTH) / SCALE),
    )

    if (newSnake[0][0] === fruit[0] && newSnake[0][1] === fruit[1]) {
      setFruit(coord)
      setScore(score + 1)
      return true
    }

    return false
  }

  function handlePlayGame() {
    setSnake(INITIAL_SNAKE)
    setFruit(INITIAL_FRUIT)
    setGameOver(false)
    setScore(0)
    setDirection(INITIAL_DIRECTION)
    setDelay(DELAY)
  }

  function handleDirection(e: React.KeyboardEvent<HTMLDivElement>) {
    const key = e.key
    switch (key) {
      case 'ArrowUp':
        setDirection([0, -1])
        break
      case 'ArrowDown':
        setDirection([0, 1])
        break
      case 'ArrowRight':
        setDirection([1, 0])
        break
      case 'ArrowLeft':
        setDirection([-1, 0])
        break
      default:
        break
    }
  }

  return (
    <Wrapper ref={wrapperRef} tabIndex={0} onKeyDown={e => handleDirection(e)}>
      <Score>
        Your Score is: <span>{score}</span>
      </Score>
      <Canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
      <Fruit src="./images/applePixels.png" alt="fruit" width={30} id="apple" />
      {gameOver ? <GameOver>GameOver</GameOver> : null}
      <Play onClick={handlePlayGame}>Play</Play>
    </Wrapper>
  )
}

export default Snake
