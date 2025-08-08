import React, {FC, JSX, useState} from "react";
import {CategoryEnum, CategoryFilter, ExtendedProductProps, PriceFilter, SortBy} from "@/types/product.type";

type Props = {
    products: ExtendedProductProps[];
    className?: string;
};

const priceOptions: PriceFilter[] = [
    { min: 0, max: 100 },
    { min: 100, max: 200 },
    { min: 200, max: 400 },
    { min: 400, max: null }
];


export const Filters: FC<Props> = ({ products, className }): JSX.Element => {
    const categories = Object.values(CategoryEnum) as string[];
    const [searchQuery, setSearchQuery] = useState('');
    const [chosenCategories, setChosenCategories] = useState<CategoryFilter[]>([]);
    const [priceFilter, setPriceFilter] = useState<PriceFilter | null>(null);
    const [sortBy, setSortBy] = useState<SortBy>('rating');

    const toggleCategory = (category: CategoryFilter) => {
        console.log(category)
    if (category === 'all') {
      setChosenCategories(['all']);
      return;
    }

    setChosenCategories((prev) => {
      const updated = new Set(prev);
      updated.delete('all');

      if (updated.has(category)) {
        updated.delete(category);
      } else {
        updated.add(category);
      }

      return Array.from(updated);
    });
  };

  const removePriceFilter = () => {
    setPriceFilter(null);
  };

  const resetFilters = () => {
    setChosenCategories([]);
    setPriceFilter(null);
    setSearchQuery('');
    setSortBy('rating');
  };

    return (
        <div className="p-4 border rounded-md w-full max-w-[300px] space-y-4">
            {/* Пошук */}
            <div>
                <label className="block mb-1 font-semibold">Пошук</label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                />
            </div>

            {/* Категорії */}
            <div>
                <label className="block mb-1 font-semibold">Категорії</label>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => toggleCategory(category)}
                            className={`px-3 py-1 rounded border ${
                                chosenCategories.includes(category)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Ціна */}
            <div>
                <label className="block mb-1 font-semibold">Ціна</label>
                <select
                    value={JSON.stringify(priceFilter)} // перетворюємо об'єкт у string для value
                    onChange={(e) => {
                        const val = e.target.value;
                        if (!val) {
                            removePriceFilter();
                            return;
                        }

                        try {
                            const parsed = JSON.parse(val) as PriceFilter;
                            setPriceFilter(parsed);
                        } catch {
                            removePriceFilter();
                        }
                    }}
                    className="w-full border px-2 py-1 rounded"
                >
                    <option value="">Усі</option>
                    {priceOptions.map((range, index) => {
                        const label = range.max
                            ? `${range.min} – ${range.max} ₴`
                            : `від ${range.min} ₴`;

                        return (
                            <option key={index} value={JSON.stringify(range)}>
                                {label}
                            </option>
                        );
                    })}
                </select>
            </div>

            {/* Сортування */}
            <div>
                <label className="block mb-1 font-semibold">Сортувати за</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
                    className="w-full border px-2 py-1 rounded"
                >
                    <option value="name">За назвою</option>
                    <option value="price">За ціною</option>
                    <option value="rating">За рейтнигом</option>
                </select>
            </div>

            {/* Скинути фільтри */}
            <button
                onClick={resetFilters}
                className="w-full bg-red-500 text-white py-2 rounded mt-4"
            >
                Скинути фільтри
            </button>
        </div>
    );
};
