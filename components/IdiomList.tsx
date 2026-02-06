import React from 'react';
import type { Idiom, Category } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface IdiomListProps {
  category: Category;
  onSelect: (idiom: Idiom) => void;
  onBack: () => void;
}

const IdiomList: React.FC<IdiomListProps> = ({ category, onSelect, onBack }) => {
  // A helper to ensure Tailwind's JIT compiler includes all necessary classes.
  // The current color palette is: 'slate', 'red', 'sky', 'emerald', 'amber', 'indigo', 'orange', 'teal', 'fuchsia', 'lime'
  const safelist = 'border-slate-700 border-red-700 border-sky-700 border-emerald-700 border-amber-700 border-indigo-700 border-orange-700 border-teal-700 border-fuchsia-700 border-lime-700 text-slate-700 text-red-700 text-sky-700 text-emerald-700 text-amber-700 text-indigo-700 text-orange-700 text-teal-700 text-fuchsia-700 text-lime-700';

  return (
    <div className="animate-fade-in">
      <div className="flex justify-end mb-6">
         <button
          onClick={onBack}
          aria-label="بازگشت به دسته‌بندی‌ها"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors shadow"
        >
          <ArrowLeftIcon className="w-7 h-7" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" dir="ltr">
        {category.idioms.map((idiom) => (
          <div
            key={idiom.id}
            onClick={() => onSelect(idiom)}
            className={`bg-white rounded-lg shadow-lg p-6 pt-8 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative border-2 border-${category.colorClass}-700`}
          >
            <div className={`absolute -top-5 right-5 w-10 h-10 flex items-center justify-center bg-white rounded-full font-bold text-${category.colorClass}-700 text-lg shadow-md border-2 border-${category.colorClass}-700`}>
              {idiom.id}
            </div>
            <p className="text-xl font-semibold text-gray-800 text-left" dir="ltr">{idiom.german}</p>
            <p className="text-md text-gray-600 mt-2" dir="rtl">{idiom.persian}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdiomList;