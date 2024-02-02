import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcements from '../components/Announcements'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { mobile } from '../responsive'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Badge } from '@material-ui/core'
const Container = styled.div`

`
const Title = styled.h1`
margin:20px;
`
const FilterContainer = styled.div`
display:flex;
justify-content:space-between;

`
const Filter = styled.div`
display:flex;
margin:20px;
${mobile({margin:"5px 20px" , display:"flex" , flexDirection:"column"})}
`
const FilterText = styled.div`
    font-size:20px;
    font-weight:600;
    margin-right:20px;
    ${mobile({marginRight:"0px"})}

`
const Select = styled.select`
padding:10px;
margin-right:20px;
${mobile({margin:"10px 0px"})}
`
const Option = styled.option``

const ProductList = () => {

    const location = useLocation();
    const cat = (location.pathname.split("/")[2]);
    const [filters , setFilters] = useState({});
    const [sort , setSort] = useState("newest");
    const handleFilters = (e) => {
        const value = e.target.value;
        
        setFilters({
            ...filters,
            [e.target.name]  : value,
        });

    };
  return (
    <Container>
        
        <Navbar/>
        <Announcements/>
        <Title>{cat}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products : </FilterText>
                <Select name="color" onChange={handleFilters}>
                    <Option disabled >
                        Color
                    </Option>
                    <Option>White</Option>
                    <Option>Black</Option>
                    <Option>Red</Option>
                    <Option>Blue</Option>
                    <Option>Yellow</Option>
                    <Option>Green</Option>
                </Select>
                <Select name="size" onChange={handleFilters}>
                    <Option disabled >
                        Size
                    </Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                    <Option>Long</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products : </FilterText>
                <Select onChange = {e=>setSort(e.target.value)}>
                    <Option value="newest"> Newest </Option>
                    <Option value="asc">Price (Asc)</Option>
                    <Option value="desc">Price (Desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort}/>
        <Newsletter/>
        <Footer/>
        
    </Container>
  )
}

export default ProductList
