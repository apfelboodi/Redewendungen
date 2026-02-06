import React, { useState } from 'react';
import type { Idiom, Category } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface IdiomDetailProps {
  idiom: Idiom;
  category: Category;
  onBack: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const IdiomDetail: React.FC<IdiomDetailProps> = ({ 
  idiom, 
  category, 
  onBack, 
  onNext, 
  onPrev,
  isFirst,
  isLast
}) => {
  const [copiedGerman, setCopiedGerman] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedGerman(true);
      setTimeout(() => setCopiedGerman(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const colorClass = category.colorClass;

  // کامپوننت مشترک برای کنترل‌های ناوبری (شماره و فلش‌ها)
  const NavigationControls = () => (
    <div className="flex items-center gap-3">
      <div className="flex bg-slate-100 rounded-full p-1 border border-slate-200">
        {/* دکمه سمت راست برای "بعدی" طبق درخواست کاربر */}
        <button
          onClick={onNext}
          disabled={isLast}
          className={`p-2 rounded-full transition-all ${isLast ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
          title="بعدی"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
        {/* دکمه سمت چپ برای "قبلی" طبق درخواست کاربر */}
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`p-2 rounded-full transition-all ${isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
          title="قبلی"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      </div>

      <div className={`w-16 h-16 flex items-center justify-center bg-${colorClass}-100 text-${colorClass}-700 rounded-full font-bold text-2xl shadow-inner`}>
        {idiom.id}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 animate-fade-in">
      {/* هدر صفحه */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <NavigationControls />

        <button
          onClick={onBack}
          aria-label="بازگشت به لیست"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors"
        >
          <ArrowLeftIcon className="w-7 h-7" />
        </button>
      </div>

      {/* محتوای اصطلاح */}
      <div className="mb-6">
        <div className="flex items-center gap-3" dir="ltr">
          <h2 className="text-3xl font-bold text-gray-800 text-left">
            {idiom.german}
          </h2>
          <button
            onClick={() => handleCopy(idiom.german)}
            aria-label="کپی کردن اصطلاح آلمانی"
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors flex-shrink-0"
            title="کپی"
          >
            {copiedGerman ? <CheckIcon className="w-5 h-5 text-green-500" /> : <ClipboardIcon className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex items-center gap-3 mt-2 justify-end" dir="rtl">
          <p className="text-xl text-gray-500">{idiom.persian}</p>
        </div>
      </div>

      <div className="space-y-6">
        {idiom.explanation && (
          <div className="p-4 bg-yellow-100 rounded-lg border-r-4 border-amber-500">
            <h3 className="text-xl font-bold mb-2 text-amber-900">توضیحات</h3>
            <p className="text-amber-800 leading-relaxed">{idiom.explanation}</p>
          </div>
        )}

        {idiom.origin && (
          <div className="p-4 bg-teal-50 rounded-lg border-r-4 border-teal-500">
            <h3 className="text-xl font-bold mb-2 text-teal-800">ریشه اصطلاح</h3>
            <p className="text-gray-700 leading-relaxed">{idiom.origin}</p>
          </div>
        )}

        <div className="p-4 bg-indigo-50 rounded-lg border-r-4 border-indigo-500">
          <h3 className="text-xl font-bold mb-2 text-indigo-800">مثال‌ها</h3>
          <ul className="space-y-4">
            {idiom.examples.map((example, index) => (
              <li key={index} className="border-b border-indigo-200 pb-4 last:border-b-0">
                <p className="text-left text-gray-800" dir="ltr">"{example.german}"</p>
                <p className="text-right text-gray-600 mt-1" dir="rtl">«{example.persian}»</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ناوبری انتهای صفحه - دقیقاً مشابه بالا و در سمت راست */}
      <div className="mt-12 pt-6 border-t flex justify-start">
        <NavigationControls />
      </div>
    </div>
  );
};

export default IdiomDetail;