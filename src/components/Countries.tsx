import { useState, useEffect } from 'react';
import CountryTable from './CountryTable';
import { Country } from '../definitions/types';
import Select from 'react-select';
import { extractList, listDuplicates } from '../utils/lister.js'

export default function Countries({ countries }: { countries: Country[] }) {
   const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
   const [searchText, setSearchText] = useState<string>('');
   const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
   
   const [filteredCountries, setFilteredCountries] =
      useState<Country[]>(countries);

   const currencyList = extractList(countries, 'currency');
   console.log(currencyList);
   const languageList = extractList(countries, 'languages');
   console.log(languageList);
   const duplicatesLanguage = listDuplicates(languageList);
   console.log(duplicatesLanguage);
   const duplicatesCurrency = listDuplicates(currencyList);

   useEffect(() => {
      let filtredCountries = [...countries]
         if (searchText) {
            filtredCountries = filtredCountries.filter((country) => {
               return (
                  country.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                  country.native?.toLowerCase().includes(searchText.toLowerCase()) ||
                  country.capital?.toLowerCase().includes(searchText.toLowerCase())
               );
            });
         }

         if (selectedCurrencies.length > 0) {
            filtredCountries = filtredCountries.filter((country) => {
               return selectedCurrencies.includes(country.currency);
            });
         }

         if (selectedLanguages.length > 0) {
            filtredCountries = filtredCountries.filter((country) => {
               return country.languages.some((language) =>
                  selectedLanguages.includes(language.name)
               );
            });
         }
         
         
      setFilteredCountries(filtredCountries);
   }, [countries, searchText, selectedCurrencies, selectedLanguages]);

   return (
      <>
         <div className="bg-blue-300 px-2 rounded-tl-md rounded-tr-md w-full py-5 md:py-14 gap-5 flex md:items-center flex-col">
            <input
               type="text"
               placeholder="Name, Native Name or Capital"
               onChange={(e) => setSearchText(e.target.value)}
               className="bg-white h-9 min-w-[220px] rounded-sm px-2 focus:outline-blue-500"
            />
            <div className="flex gap-5 flex-wrap text-xs">
               <Select
                  closeMenuOnSelect={false}
                  options={duplicatesLanguage.map((language) => ({
                     value: language,
                     label: language,
                  }))}
                  isMulti
                  className="md:w-64 w-full"
                  onChange={(selected) => {
                     setSelectedLanguages(
                        selected.map((language) => language.value)
                     );
                  }}
               />
               <Select
                  closeMenuOnSelect={false}
                  options={duplicatesCurrency.map((currency) => ({
                     value: currency,
                     label: currency,
                  }))}
                  isMulti
                  className="md:w-64 w-full"
                  onChange={(selected) => {
                     setSelectedCurrencies(
                        selected.map((currency) => currency.value)
                     );
                  }}
               />
            </div>
         </div>
         <div className="overflow-scroll">
            <table className="table-auto" key="countryTable">
               <thead>
                  <tr className="bg-[#F9FAFB] h-10 text-left">
                     <th className=" border min-w-[30px]" />
                     <th className="px-2 text-slate-700 font-semibold border min-w-[240px]">
                        Name
                     </th>
                     <th className="px-2 text-slate-700 font-semibold border min-w-[240px]">
                        Native Name
                     </th>
                     <th className="px-2 text-slate-700 font-semibold border min-w-[170px]">
                        Capital
                     </th>
                     <th className="px-2 text-slate-700 font-semibold border min-w-[50px]">
                        Flag
                     </th>
                     <th className="px-2 text-slate-700 font-semibold border min-w-[305px]">
                        Currency
                     </th>
                     <th className="px-2 text-slate-700 font-semibold border min-w-[305px]">
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
         </div>
      </>
   );
}
