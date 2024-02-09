import { Country } from '../definitions/types';

export default function CountryRows({
   countryData,
   selected,
   onSelect,
}: {
   countryData: Country;
   selected: boolean;
   onSelect: () => void;
}) {
   const { name, native, capital, emoji, currency, languages } = countryData;
   return (
      <tr key={emoji} className={`text-gray-700 ${selected ? 'bg-sky-50' : ''}`}>
         <td className="border px-2">
            <input
               type="radio"
               name="country"
               defaultChecked={selected}
               onClick={onSelect}
               className="cursor-pointer"
            />
         </td>
         <td className="px-2 py-2 whitespace-nowrap border min-w-60 text-balance">
            {name}
         </td>
         <td className="px-2 py-2 whitespace-nowrap border min-w-60 text-balance">
            {native}
         </td>
         <td className="px-2 py-2 whitespace-nowrap border">
            {capital || '------'}
         </td>
         <td align="center" className="px-2 py-2 whitespace-nowrap border">
            {emoji}
         </td>
         <td className="px-2 py-2 whitespace-nowrap border">
            <ul className="list-disc w-72 text-xs flex flex-wrap">
               {splitCurrencies(currency) || '------'}
            </ul>
         </td>
         <td className="px-2 py-2 whitespace-nowrap border">
            <ul className="list-disc w-72 text-xs flex flex-wrap">
               {languages.map((language) => (
                  <li
                     key={language.code}
                     className="text-gray-700 list-none inline-flex "
                  >
                     <span className="bg-neutral-200/50 py-1 px-2 rounded-md m-1">
                        {language.name}
                     </span>
                  </li>
               )) || '------'}
            </ul>
         </td>
      </tr>
   );
}

function splitCurrencies(currencies: string | null) {
   return currencies
      ? currencies.split(',').map((currency, index) => (
           <li key={index} className="text-gray-700 list-none inline-flex">
              <span className="bg-neutral-200/50 py-1 px-2 rounded-md m-1">
                 {currency}
              </span>
           </li>
        ))
      : null;
}
