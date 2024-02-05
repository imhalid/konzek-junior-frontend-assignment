import { Country } from '../definitions/types';

export default function CountryTable({ countryData }: { countryData: Country }) {
   const { name, native, capital, emoji, currency, languages } = countryData;
   return (
      <tbody>
         <tr key={name}>
            <td>{name}</td>
            <td>{native}</td>
            <td>{capital}</td>
            <td>{emoji}</td>
            <td>{currency}</td>
            <td>
               <ul>
                  {languages.map((language) => (
                     <li key={language.code}>{language.name}</li>
                  ))}
               </ul>
            </td>
         </tr>
      </tbody>
   );
}
