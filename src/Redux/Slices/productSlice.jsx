import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    products:[],
    selectedProduct:{},
    loading:false
}
const baseURL = "https://fakestoreapi.com"
export const getAllProducts = createAsyncThunk("getAllProducts" , async()=> {
const response = await axios.get(`${baseURL}/products`);
return response.data
})


export const productSlice = createSlice({
    name:"productSlice",
    initialState,
    reducers:{
        setSelectedProduct:(state,action) => {
            state.selectedProduct = action.payload
        }
    },
    extraReducers(builder){
        builder.addCase(getAllProducts.pending,(state) => {
            state.loading = true;
        }),
        builder.addCase(getAllProducts.fulfilled ,(state,action) => {
            state.loading = false;
            state.products = action.payload
        })
        
    
    }
})



export const { setSelectedProduct} = productSlice.actions

export default productSlice.reducer