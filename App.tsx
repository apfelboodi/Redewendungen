import React, { useState } from 'react';
import type { Idiom, Category } from './types';
import { allIdioms, categories } from './data/idioms';
import IdiomList from './components/IdiomList';
import IdiomDetail from './components/IdiomDetail';
import SearchResults from './components/SearchResults';
import SearchIcon from './components/icons/SearchIcon';
import XMarkIcon from './components/icons/XMarkIcon';

const getCategoryStyles = (color: string): string => {
  const baseStyles = 'bg-white border-2 rounded-lg shadow-lg cursor-pointer transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-28 flex items-center justify-center p-2 text-center';

  switch (color) {
    case 'slate':
      return `${baseStyles} text-slate-700 border-slate-700 hover:bg-slate-700 hover:text-white`;
    case 'red':
      return `${baseStyles} text-red-700 border-red-700 hover:bg-red-500 hover:text-white`;
    case 'sky':
      return `${baseStyles} text-sky-700 border-sky-700 hover:bg-sky-500 hover:text-white`;
    case 'emerald':
      return `${baseStyles} text-emerald-700 border-emerald-700 hover:bg-emerald-500 hover:text-white`;
    case 'amber':
      return `${baseStyles} text-amber-700 border-amber-700 hover:bg-amber-500 hover:text-white`;
    case 'indigo':
      return `${baseStyles} text-indigo-700 border-indigo-700 hover:bg-indigo-500 hover:text-white`;
    case 'orange':
      return `${baseStyles} text-orange-700 border-orange-700 hover:bg-orange-500 hover:text-white`;
    case 'teal':
      return `${baseStyles} text-teal-700 border-teal-700 hover:bg-teal-500 hover:text-white`;
    case 'fuchsia':
      return `${baseStyles} text-fuchsia-700 border-fuchsia-700 hover:bg-fuchsia-500 hover:text-white`;
    case 'lime':
      return `${baseStyles} text-lime-700 border-lime-700 hover:bg-lime-500 hover:text-white`;
    default:
      return `${baseStyles} text-slate-700 border-slate-700 hover:bg-slate-700 hover:text-white`;
  }
};


const CategoryList: React.FC<{
  categories: Category[];
  onSelect: (category: Category) => void;
}> = ({ categories, onSelect }) => {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6" dir="ltr">
        {categories.map((category) => {
          const start = (category.id - 1) * 100 + 1;
          const end = category.id * 100;
          return (
            <div
              key={category.id}
              onClick={() => onSelect(category)}
              className={getCategoryStyles(category.colorClass)}
            >
              <h2 className="text-2xl font-bold" dir="ltr">
                {start} - {end}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};


function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedIdiom, setSelectedIdiom] = useState<Idiom | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      setSelectedCategory(null);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  const filteredIdioms = searchQuery.trim() !== ''
    ? allIdioms.filter(idiom =>
        idiom.german.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    : [];

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    window.scrollTo(0, 0);
  };

  const handleSelectIdiom = (idiom: Idiom) => {
    setSelectedIdiom(idiom);
    window.scrollTo(0, 0);
  };
  
  const handleSelectIdiomFromSearch = (idiom: Idiom) => {
    const category = categories.find(c => c.idioms.some(i => i.id === idiom.id));
    if (category) {
      setSelectedCategory(category);
      setSelectedIdiom(idiom);
      window.scrollTo(0, 0);
    }
  };

  const handleGoBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleGoBackToIdioms = () => {
    setSelectedIdiom(null);
  };

  // Navigation Logic
  const handleNextIdiom = () => {
    if (selectedCategory && selectedIdiom) {
      const currentIndex = selectedCategory.idioms.findIndex(i => i.id === selectedIdiom.id);
      if (currentIndex < selectedCategory.idioms.length - 1) {
        setSelectedIdiom(selectedCategory.idioms[currentIndex + 1]);
        window.scrollTo(0, 0);
      }
    }
  };

  const handlePrevIdiom = () => {
    if (selectedCategory && selectedIdiom) {
      const currentIndex = selectedCategory.idioms.findIndex(i => i.id === selectedIdiom.id);
      if (currentIndex > 0) {
        setSelectedIdiom(selectedCategory.idioms[currentIndex - 1]);
        window.scrollTo(0, 0);
      }
    }
  };

  const renderContent = () => {
    if (selectedIdiom && selectedCategory) {
      const currentIndex = selectedCategory.idioms.findIndex(i => i.id === selectedIdiom.id);
      return (
        <IdiomDetail 
          idiom={selectedIdiom} 
          category={selectedCategory} 
          onBack={handleGoBackToIdioms}
          onNext={handleNextIdiom}
          onPrev={handlePrevIdiom}
          isFirst={currentIndex === 0}
          isLast={currentIndex === selectedCategory.idioms.length - 1}
        />
      );
    }
    if (searchQuery.trim() !== '') {
      return <SearchResults results={filteredIdioms} onSelect={handleSelectIdiomFromSearch} categories={categories} query={searchQuery} />;
    }
    if (selectedCategory) {
      return (
        <IdiomList
          category={selectedCategory}
          onSelect={handleSelectIdiom}
          onBack={handleGoBackToCategories}
        />
      );
    }
    return <CategoryList categories={categories} onSelect={handleSelectCategory} />;
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800">
      <main className="container mx-auto p-4 pt-12 md:p-8 md:pt-16">
        {!selectedIdiom && !(selectedCategory && searchQuery.trim() === '') && (
          <div className="mb-8 max-w-3xl mx-auto">
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="جستجو در اصطلاحات آلمانی///..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-10 py-3 border-2 border-slate-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors placeholder:text-right"
                dir="ltr"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 left-0 flex items-center pl-3"
                  aria-label="پاک کردن جستجو"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors" />
                </button>
              )}
            </div>
          </div>
        )}
        <div className="transition-all duration-500">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
