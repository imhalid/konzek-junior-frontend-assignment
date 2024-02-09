
export type Language = {
   code: string;
   name: string;
}
export type Country = {
   name: string;
   native: string;
   capital: string;
   emoji: string;
   currency: string;
   languages: Language[];
};

export type CountryData = {
   countries: Country[];
};