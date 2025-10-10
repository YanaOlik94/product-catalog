import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PriceFilter, CategoryFilter, SortBy } from '@/types/product.type';


interface FiltersState {
  searchQuery: string;
  chosenCategories: CategoryFilter[];
  priceFilter: PriceFilter | null;
  sortBy: SortBy;
}

const initialState: FiltersState = {
  searchQuery: '',
  chosenCategories: [],
  priceFilter: null,
  sortBy: 'rating',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setChosenCategories: (state, action: PayloadAction<CategoryFilter[]>) => {
      state.chosenCategories = action.payload;
    },
    setPriceFilter: (state, action: PayloadAction<PriceFilter | null>) => {
      state.priceFilter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.chosenCategories = [];
      state.priceFilter = null;
      state.sortBy = 'rating';
    },
  },
});

export const {
  setSearchQuery,
  setChosenCategories,
  setPriceFilter,
  setSortBy,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
