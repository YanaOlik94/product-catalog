import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { useHttp } from '../../utills/http';
import {Product} from "@/types/product.type";

interface ProductsState {
    products: Product[];
    productsLoadingStatus: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    productsLoadingStatus: false,
    error: null
};

export const fetchProducts = createAsyncThunk<Product[]>(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const { request } = useHttp();
            return await request<Product[]>('https://fakestoreapi.com/products');
        } catch (err) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue('Unknown error');
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.productsLoadingStatus = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.productsLoadingStatus = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.productsLoadingStatus = false;
                state.error = action.payload as string;
            });
    }
});

export default productsSlice.reducer;
