import { useState, useEffect } from 'react';
import CountryTable from './CountryTable';
import { Country } from '../definitions/types';
export default function Countries({ countries }: { countries: Country[] }) {
   const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
   const filter = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const filtered = countries.filter((country) => {
         return (
            country.name?.toLowerCase().includes(value.toLowerCase()) ||
            country.native?.toLowerCase().includes(value.toLowerCase()) ||
            country.capital?.toLowerCase().includes(value.toLowerCase())
         );
      });
      setFilteredCountries(filtered);
   };

   useEffect(() => {
      setFilteredCountries(countries);
   }, [countries]);
   return (
      <>
         <div className="bg-red-200 w-full h-10 flex items-center px-2">
            <input type="text" onChange={filter} />
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
                     filteredCountries?.length > 10 ? 9 : filteredCountries?.length -1 
                  }
               />
            </tbody>
         </table>
      </>
   );
}
