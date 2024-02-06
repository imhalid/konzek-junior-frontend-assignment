import { useState } from "react";
import { CountryData, Country } from "../definitions/types";
import CountryRows from "./CountryRows";
export default function CountryTable(data: CountryData) {
   const [selectedIndex, setSelectedIndex] = useState<number>(9);
   const { countries } = data;
   return (
      <>
         {countries.map((country: Country, index: number) => (
            <CountryRows
               selected={index === selectedIndex}
               onSelect={() => setSelectedIndex(index)}
               countryData={country}
            />
         ))}
      </>
   );
}