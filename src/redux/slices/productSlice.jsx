import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products : [],
    selectedProduct : {},
    loading : false,
    searchedProducts : []
}

const BASE_URL ="https://fakestoreapi.com";


export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    const response = await axios.get(`${BASE_URL}/products`)
    return response.data;
})

export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setSelectedProduct : (state , action) => {
            state.selectedProduct = action.payload;
        },
        findSearchedProducts: (state, action) => {
            state.searchedProducts = [];
        
            state.products.forEach((product) => {
                if (product.title.toLowerCase().includes(action.payload.toLowerCase())) {
                    state.searchedProducts.push(product);
                }
            });

        }

    },
    extraReducers : (builder)=>{
        builder.addCase(getAllProducts.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(getAllProducts.fulfilled , (state,action) => {
            state.loading = false;
            state.products = action.payload;
        })
    }

})


export const { setSelectedProduct , findSearchedProducts } = productSlice.actions

export default productSlice.reducer