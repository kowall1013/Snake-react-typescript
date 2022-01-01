import {useRef, useEffect, useState} from 'react'
import styled from 'styled-components'
import useInterval from '../hooks/useInterval'

const Canvas = styled.canvas`
  border: 1px solid black;
`

const Wrapper = styled.div``

const SNAKE_COLOR = '#F47340'
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 800
const INITIAL_SNAKE = [[0, 0]]
const INITIAL_DIRECTION = [1, 0]

function Snake(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [snake, setSnake] = useState<number[][]>(INITIAL_SNAKE)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)

  useInterval(() => runGame(), 1000)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    wrapper?.focus()
    const ctx = canvas?.getContext('2d')

    if (ctx) {
      ctx.fillStyle = SNAKE_COLOR
      ctx.setTransform(20, 0, 0, 20, 0, 0)
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      snake.map(([x, y]) => ctx.fillRect(x, y, 1, 1))
    }
  }, [snake])

  function runGame() {
    const newSnake = [...snake]
    const newHeadSnake = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ]

    newSnake.unshift(newHeadSnake)
    newSnake.pop()
    setSnake(newSnake)
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
      <Canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </Wrapper>
  )
}

export default Snake
