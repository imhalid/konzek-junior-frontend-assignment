import { Language } from "../definitions/types";

export function extractList(arr: Array<{ [key: string]: any }>, key: string): { [key: string]: number } {
   const extract = arr
      .flatMap((item) => {
         if (!item[key]) {
            return [];
         } else if (Array.isArray(item[key])) {
            return item[key].map((i: Language) => i.name);
         } else {
            return item[key].split(',');
         }
      })
      .filter(Boolean);

   return extract.reduce((acc: { [key: string]: number }, value: string) => {
      if (!acc[value]) {
         acc[value] = 0;
      }
      acc[value]++;
      return acc;
   }, {});
}

export function listDuplicates(list: Record<string, number>) {
   return Object.keys(list).filter((a) => list[a] > 1);
}