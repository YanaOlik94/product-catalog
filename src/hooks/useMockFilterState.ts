import { useState } from 'react';
import { PriceFilter, ExtendedCategoryFilter } from '@/types/filter.type';

type SortBy = 'name' | 'price' | 'rating';

export const useMockFilterState = () => {
  const [categories, setCategories] = useState<ExtendedCategoryFilter[]>([]);
  const [choosenCategories, setChoosenCategories] = useState<
    ExtendedCategoryFilter[]
  >([]);
  const [priceFilter, setPriceFilter] = useState<PriceFilter | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(13);

  const toggleCategory = (category: ExtendedCategoryFilter) => {
    if (category === 'all') {
      setChoosenCategories(['all']);
      return;
    }

    setChoosenCategories((prev) => {
      const updated = new Set(prev);
      updated.delete('all');

      if (updated.has(category)) {
        updated.delete(category);
      } else {
        updated.add(category);
      }

      return Array.from(updated);
    });

    setCurrentPage(1);
  };

  const removePriceFilter = () => {
    setPriceFilter(null);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setChoosenCategories([]);
    setPriceFilter(null);
    setSearchQuery('');
    setSortBy('rating');
  };

  return {
    categories,
    setCategories,
    choosenCategories,
    toggleCategory,
    priceFilter,
    setPriceFilter,
    removePriceFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    resetFilters,
  };
};
