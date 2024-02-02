import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcements from "../components/Announcements"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { Add, Remove } from "@material-ui/icons"
import { mobile } from "../responsive"
import { useLocation } from "react-router-dom"
import { useEffect , useState } from "react"
import { publicRequest } from "../requestMethods"
import { addProduct , removeProduct } from "../redux/cartRedux"

import { useDispatch } from "react-redux"
const Container = styled.div`
background-color: #d2d9d4;
`
const Wrapper = styled.div`
padding:50px;
display:flex;
${mobile({padding:"10px" , flexDirection:"column" })}
`
const ImageContainer = styled.div`
flex:1;
`
const Image = styled.img`
width:100%;
height:90vh;
object-fit:cover;
${mobile({height:"60vh" })}
`
const InfoContainer = styled.div`
flex:1;
padding:0px 50px;
${mobile({padding:"10px"})}
`
const Title = styled.h1`
    font-weight:200;
`
const Desc = styled.p`
    margin:20px 0px;
`
const Price = styled.span`
    font-weight:100;
    font-size:40px;
`
const FilterContainer = styled.div`
width:50%;
margin: 30px 0px;
display: flex;
justify-content: space-between;
${mobile({width:"100%"})}
`
const Filter = styled.div`
display:flex;
align-items: center;
`
const FilterTitle = styled.span`
font-size:20px;
font-weight:200;
`
const FilterColor = styled.div`
width:20px;
height:20px;
border-radius:50%;
background-color:${props => props.color};
margin:0px 5px;
cursor:pointer;

`
const FilterSize = styled.select`
margin-left : 10px;
padding:5px;
`
const FilterSizeOption = styled.option`
`
const AddContainer = styled.div`
width:50%;
display:flex;
align-items:center;
justify-content:space-between;
${mobile({width:"100%"})}
`
const AmountContainer = styled.div`
display:flex;
align-items:center;
font-weight:700;
`
const Amount = styled.span`
width:30px;
height:30px;
border-radius:10px;
border : 1px solid teal;
display:flex;
align-items:center;
justify-content:center;
margin:0px 5px;
background-color:white;
`
const Button = styled.button`
padding:15px;
border: 2px solid teal;
background-color:white;
cursor:pointer;
font-weight:500;
margin:10px;
&:hover {background-color:#d2d9d4;}
`

const Product = () => {
    const location = useLocation();
    const id = (location.pathname.split("/")[2]);

    const [product , setProduct] = useState({});

    const [quantity , setQuantity] = useState(1);

    const [color , setColor] = useState("");

    const [size , setSize] = useState("");

    const dispatch = useDispatch();

    useEffect(()=> {
        const getProduct = async () => {
            try{
                const res = await publicRequest.get("/products/find/" + id);
                setProduct(res.data);
            }catch(err)
            {

            }
        }
        getProduct();
    },[id]);

    const handleQuantity = (type) => {
        if(type ==="desc")
        {
            quantity >= 1 && setQuantity(quantity - 1);
        }
        else{
            setQuantity(quantity+1);
        }
    }

    const handleAdd = () => {
        // update cart 
        dispatch( addProduct({...product ,quantity,color , size}));
    };
    const handleRemove = () => {
        // update cart 
        dispatch( removeProduct({...product ,quantity,color , size}));
    };
  return (
    <Container>
      <Navbar/>
      <Announcements/>
        <Wrapper>
            <ImageContainer>
                <Image src={product.img}/>
            </ImageContainer>
            <InfoContainer>
                <Title>
                    {product.title}
                </Title>
                <Desc>{product.desc} </Desc>
                <Price>Ru {product.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        {
                            product.color?.map((c) => (
                                <FilterColor color ={c} key = {c} onClick={()=>setColor(c)} />
                            ))
                        }
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={(e) => setSize(e.target.value)}>
                            {product.size?.map(s=>(
                                <FilterSizeOption key={s}>{s}</FilterSizeOption>
                            ))}
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <Remove onClick={()=>handleQuantity("desc")}/>
                        <Amount>{quantity}</Amount>
                        <Add onClick={()=>handleQuantity("inc")}/>
                    </AmountContainer>
                    <Button onClick={handleAdd}>ADD TO CART</Button>
                    <Button onClick={handleRemove}>REMOVE FROM CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
      <Newsletter/>
      <Footer/>
    </Container>
  )
}

export default Product
