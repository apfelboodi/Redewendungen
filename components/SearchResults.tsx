import React from 'react';
import type { Idiom, Category } from '../types';

interface SearchResultsProps {
  query: string;
  results: Idiom[];
  onSelect: (idiom: Idiom) => void;
  categories: Category[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results, onSelect, categories }) => {
  // A helper to ensure Tailwind's JIT compiler includes all necessary classes.
  const safelist = 'border-slate-700 border-red-700 border-sky-700 border-emerald-700 border-amber-700 border-indigo-700 border-orange-700 border-teal-700 border-fuchsia-700 border-lime-700 text-slate-700 text-red-700 text-sky-700 text-emerald-700 text-amber-700 text-indigo-700 text-orange-700 text-teal-700 text-fuchsia-700 text-lime-700';

  const findCategoryColor = (idiomId: number): string => {
    const category = categories.find(c => c.idioms.some(i => i.id === idiomId));
    return category ? category.colorClass : 'slate';
  };

  if (results.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10 animate-fade-in">
        <p className="text-lg">هیچ اصطلاحی برای "{query}" یافت نشد.</p>
        <p className="text-sm mt-2">لطفاً عبارت دیگری را امتحان کنید.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center" dir="rtl">
        نتایج جستجو برای: <span className="text-sky-600">"{query}"</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" dir="ltr">
        {results.map((idiom) => {
          const colorClass = findCategoryColor(idiom.id);
          return (
            <div
              key={idiom.id}
              onClick={() => onSelect(idiom)}
              className={`bg-white rounded-lg shadow-lg p-6 pt-8 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative border-2 border-${colorClass}-700`}
            >
              <div className={`absolute -top-5 right-5 w-10 h-10 flex items-center justify-center bg-white rounded-full font-bold text-${colorClass}-700 text-lg shadow-md border-2 border-${colorClass}-700`}>
                {idiom.id}
              </div>
              <p className="text-xl font-semibold text-gray-800 text-left" dir="ltr">{idiom.german}</p>
              <p className="text-md text-gray-600 mt-2" dir="rtl">{idiom.persian}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;