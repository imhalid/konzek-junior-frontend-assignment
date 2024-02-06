import { useState, useEffect, useCallback } from 'react';
import CountryTable from './CountryTable';
import { Country } from '../definitions/types';

export default function Countries({ countries }: { countries: Country[] }) {
   const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
   const [currencyFilter, setCurrencyFilter] = useState<string>('');

   const filter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const filtered = countries.filter((country) => {
         const matchesText =
            country.name?.toLowerCase().includes(value.toLowerCase()) ||
            country.native?.toLowerCase().includes(value.toLowerCase()) ||
            country.capital?.toLowerCase().includes(value.toLowerCase());
         const matchesCurrency =
            !currencyFilter || country.currency === currencyFilter;
            console.log(matchesCurrency);
         return matchesText && matchesCurrency;
      });
      setFilteredCountries(filtered);
   }, [countries, currencyFilter]);

   const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrencyFilter(e.target.value);
   };

   useEffect(() => {
      setFilteredCountries(countries);
   }, [countries]);

   useEffect(() => {
      filter({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
   }, [currencyFilter, filter]);
   return (
      <>
         <div className="bg-red-200 w-full h-10 flex items-center px-2">
            <input type="text" onChange={filter} />
            <select onChange={handleCurrencyChange}>
               <option value="">All Currencies</option>
               <option value="usd">USD</option>
               <option value="eur">EUR</option>
            </select>
         </div>
         <table className="table-auto" key="countryTable">
            <thead>
               <tr className="bg-[#F9FAFB] h-10 text-left">
                  <th className=" border" />
                  <th className="px-2 text-slate-700 font-semibold border">
                     Name
                  </th>
                  <th className="px-2 text-slate-700 font-semibold border">
                     Native Name
                  </th>
                  <th className="px-2 text-slate-700 font-semibold border">
                     Capital
                  </th>
                  <th className="px-2 text-slate-700 font-semibold border">
                     Flag
                  </th>
                  <th className="px-2 text-slate-700 font-semibold border">
                     Currency
                  </th>
                  <th className="px-2 text-slate-700 font-semibold border">
                     Languages
                  </th>
               </tr>
            </thead>
            <tbody>
               <CountryTable
                  countries={filteredCountries}
                  defaultSelected={
                     countries.length > 10 ? 9 : countries.length - 1
                  }
               />
            </tbody>
         </table>
      </>
   );
}
