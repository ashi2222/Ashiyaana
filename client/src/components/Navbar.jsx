import React, { useState } from 'react'
import styled from 'styled-components'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import { Badge } from '@material-ui/core'
import { mobile } from '../responsive'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Select = styled.select`
padding:10px;
margin-right:20px;
${mobile({margin:"10px 0px"})}
`
const Option = styled.option``

const Container = styled.div`
  height: 110px;
  background-color: lightblue;
  ${mobile({height:"60px"})}
  padding:25px;
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({padding: "10px 0px" , transform: "translateY(-13%)"})}
`
const Left = styled.div`
  flex: 1;
  display:flex;
  align-items: center;
  margin-right:10px;
  
`
const Center = styled.div`
  flex: 1;
  text-align: center;
`
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right : 10px;
  ${mobile({flex:1 , justifyContent: "center"})}
`
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  align-items: center;
  ${mobile({display: "none"})}
`
const SearchContainer = styled.div`
  border: 0.5px solid black;
  display:flex;
  align-items: center;
  margin-left : 35px;
  padding:5px;
`

const Input = styled.input`
  border:none;
  ${mobile({width : "50px"})}
`

const Logo = styled.h1`
font-weight : bold;
${mobile({fontSize : "24px"})}
`
const MenuItem = styled.div`
font-size:14px;
cursor : pointer;
margin-left : 35px;
${mobile({fontSize : "12px" , marginLeft : "10px"})}
`
const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity);

  const [language , setlanguage] = useState("English");

  const handleLanguage = (e) => {
    const value = e.target.value;
    setlanguage({
      ...language ,
      [e.target.name] : value});
  }
  // console.log(quantity);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>
            <Select name="language" onChange={handleLanguage}>
              <Option value = "English">English</Option>
              <Option value = "Hindi" >Hindi</Option>
            </Select>
          </Language>
          <SearchContainer>
            <Input placeholder="Search"/>
            <Search style={{color:"gray", fontsize:16 , padding:5}}/>
          </SearchContainer>
          
        </Left>
        <Center><Logo>#ASHI</Logo></Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <Link to ="/cart">
          <MenuItem>
          <Badge badgeContent={quantity} color="primary" overlap="rectangular">
  <ShoppingCartOutlined color="action" />
</Badge>

          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
