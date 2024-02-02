import styled from 'styled-components'

const Container = styled.div`
    height:30px;
  color: white;
  background-color: teal;
  font-size: 14px;
  display:flex;
  
  align-items : center;
  justify-content: center;
  font-weight: 500;
`
const Announcements = () => {
  return <Container>
    Super Deal ! 30% OFF in Diwali Mania 
  </Container>
}

export default Announcements
