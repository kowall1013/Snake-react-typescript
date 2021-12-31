import styled from 'styled-components'
import GlobalStyles from './GlobalStyle'
import Snake from './components/Snake'

const Wrapper = styled.div`
  display: grid;
  min-height: 100vh;
  place-content: center;
`

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <Snake />
    </Wrapper>
  )
}

export default App
