
export type Country = {
   name: string;
   native: string;
   capital: string;
   emoji: string;
   currency: string;
   languages: Array<{ code: string, name: string }>;
};

export type CountryData = {
   countries: Country[];
};