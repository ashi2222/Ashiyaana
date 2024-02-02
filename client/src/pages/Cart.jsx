import styled from 'styled-components'
import Announcements from '../components/Announcements'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Add, Remove } from '@material-ui/icons'
import { mobile } from '../responsive'
import StripeCheckout from 'react-stripe-checkout'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {userRequest} from "../requestMethods"
import { useNavigate } from 'react-router-dom'

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
  background-color: #fafbfc;
`
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
`
const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`
const Info = styled.div`
  flex: 3;
`
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`
const SummaryTitle = styled.h1`
  font-weight: 200;
`
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;

  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '30px'};
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: black;
//   color: white;
//   font-weight: 600;
//   border-radius: 10px;
// `

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`
const Image = styled.img`
  width: 400px;
  ${mobile({ width: '300px', height: '200px' })}
  height:250px;
`
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ProductName = styled.span``
const ProductID = styled.span``
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`

const ProductSize = styled.span``
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0px;
`

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: '10px 15px' })}
`
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`

const Hr = styled.hr`
  background-color: #d1d1cf;
  border: none;
  height: 2px;
  margin: 5px;
`
const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [stripeToken , setStripeToken] = useState(null)

  const history = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };
  
  //console.log(stripeToken);
  useEffect(()=>{
    const makeRequest = async () => {
        try{
            const res = await userRequest.post("/checkout/payment" , {
                tokenId : stripeToken.id,
                amount : cart.total * 100,
            });
            //console.log(res.data);
            history("/success", {
              state: { stripeData: res.data, products: cart },
            });
        }catch{
          console.log("There is an error ")
        }
    };
    stripeToken && makeRequest();
  },[stripeToken , cart.total , history])
  console.log(stripeToken);
  return (
    <Container>
      <Navbar />
      <Announcements />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag ({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product : </b> {product.title}
                    </ProductName>
                    <ProductID>
                      <b>ID : </b> {product._id}
                    </ProductID>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size : </b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 4.5</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -4.5</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="#Ashi Shop"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6up3tF8dy_XdVLYcB6dWwjaxV0bu4YO7WOqmN9LY&s"
              billingAddress
              shippingAddress
              description={` Your total is $ ${cart.total} `}
              amount={cart.total * 100} // for converting sants into dollars
              token={onToken}
              stripeKey={KEY}
            ></StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart
