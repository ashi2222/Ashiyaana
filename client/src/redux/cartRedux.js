import { createSlice} from "@reduxjs/toolkit" ;

const cartSlice = createSlice({
    name: "cart",
    initialState : {
        products:[],
        quantity : 0,
        total : 0,
    },
    reducers:{
        addProduct : (state , action) => {
            state.quantity +=1;
            state.products.push(action.payload);
            state.total += action.payload.price *action.payload.quantity;
        },
        removeProduct : (state, action) => {
            let index = state.products.indexOf(action.payload);

      // Ensure quantity is not less than zero
      
        state.quantity -= action.payload.quantity;
        
        if(state.quantity < 0 )
        {
            state.quantity = 0;
        }

        state.total -= action.payload.price * action.payload.quantity;
        if(state.total < 0)
        {
            state.total = 0;
        }
      
      state.products.splice(index, 1);
      state.products = [...state.products];
        }
    }
});

export const {addProduct , removeProduct} = cartSlice.actions
export default cartSlice.reducer;