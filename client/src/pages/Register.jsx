import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
width:100vw;
height:100vh;
background : linear-gradient(
    rgba(255,255,255,0.5),
    rgba(255,255,255,0.5)),
    url("https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=600") center;

display:flex;
align-items: center;
justify-content: center;
background-size:cover;
`


const Wrapper = styled.div`
width:40%;
padding:20px;
background-color:white;
${mobile({width:"75%"})}
`
const Form = styled.form`
display:flex;
flex-wrap: wrap;
`
const Title = styled.h1`
font-size:24px;
font-weight:300;
`
const Input = styled.input`
flex:1;
min-width:40$;
margin:20px 10px 0px 0px;
padding:10px;
`
const Agreement = styled.span`
font-size:12px;
margin: 20px 0px;
`
const Button = styled.button`
    width:40%;
    border:none;
    padding:15px 20px;
    background-color:teal;
    color:white;
`


const Register = () => {
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
                <Input placeholder="First Name"/>
                <Input placeholder="Last Name"/>
                <Input placeholder="User ID"/>
                <Input placeholder="Email"/>
                <Input placeholder="Password"/>
                <Input placeholder="Confirm Password"/>
                <Agreement>By Creating an ccount , I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></Agreement>
                <Button>CREATE</Button>
            </Form>

        </Wrapper>
      
    </Container>
  )
}

export default Register
