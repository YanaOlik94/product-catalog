import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http';
import { Product } from '@/app/types/product.type';

interface ProductState {
  product: Product;
  productLoadingStatus: boolean;
  error: string | null;
}

const initialState: ProductState = {
  product: {
    id: 0,
    title: '',
    price: 0,
    description: '',
    rating: {
      rate: 0,
      count: 0,
    },
    category: '',
    image: ''
  },
  productLoadingStatus: false,
  error: null,
};

export const fetchProductById = createAsyncThunk<Product, number>(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const { request } = useHttp();
      return await request<Product>(`https://fakestoreapi.com/products/${id}`);
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.productLoadingStatus = true;
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.product = action.payload;
          state.productLoadingStatus = false;
        }
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productLoadingStatus = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
