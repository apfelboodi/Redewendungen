import type { Category, Idiom } from '../types';
import { category1_100 } from './categories/category-1-100';
import { category101_200 } from './categories/category-101-200';
import { category201_300 } from './categories/category-201-300';
import { category301_400 } from './categories/category-301-400';
import { category401_500 } from './categories/category-401-500';
import { category501_600 } from './categories/category-501-600';
import { category601_700 } from './categories/category-601-700';
import { category701_800 } from './categories/category-701-800';
import { category801_900 } from './categories/category-801-900';
import { category901_1000 } from './categories/category-901-1000';


// برای اضافه کردن دسته جدید:
// ۱. یک فایل جدید در پوشه `data/categories` بسازید (مثلا `category-1001-1100.ts`).
// ۲. محتویات یکی از فایل‌های موجود را در آن کپی کرده و اطلاعات را تغییر دهید.
// ۳. فایل جدید را در اینجا وارد (import) کنید.
// ۴. متغیر وارد شده را به آرایه `categories` زیر اضافه کنید.

export const categories: Category[] = [
  category1_100,
  category101_200,
  category201_300,
  category301_400,
  category401_500,
  category501_600,
  category601_700,
  category701_800,
  category801_900,
  category901_1000,
];

// این بخش به صورت خودکار تمام اصطلاحات را از دسته‌های بالا جمع‌آوری می‌کند.
export const allIdioms: Idiom[] = categories.flatMap(category => category.idioms);