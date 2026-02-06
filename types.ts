
export interface Idiom {
  id: number;
  german: string;
  persian: string;
  // explanation is optional to handle data entries where it is missing
  explanation?: string;
  // origin is optional to handle data entries where it is missing
  origin?: string;
  examples: {
    german: string;
    persian: string;
  }[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  idioms: Idiom[];
  colorClass: string;
}
