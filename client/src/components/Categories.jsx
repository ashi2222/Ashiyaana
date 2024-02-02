import { categories } from '../data';
import styled from 'styled-components'
import CategoryItem from './CategoryItem';
import { mobile } from '../responsive';

const Container = styled.div`
display:flex;
padding:20px;
text-align:center;
justify-content:space-between;
background-color:#afbab2;
${mobile({padding : "0px" , flexDirection : "column" })}
`;

const Categories = () => {
  return (
    <Container>
        {
            categories.map(item=>(
                <CategoryItem item={item} key={item.id}/>
            ))
        }
      
    </Container>
  )
}

export default Categories
