import React, { useState } from 'react';
import { Country } from '../definitions/types';
import CountryRows from './CountryRows';

type CountryTableProps = {
   countries: Country[];
   defaultSelected: number;
};

const CountryTable: React.FC<CountryTableProps> = ({
   countries,
   defaultSelected,
}) => {
   
   const [selectedIndex, setSelectedIndex] = useState<number>(defaultSelected);
   return (
      <React.Fragment key={'countryTable'}>
         {countries.map((country: Country, index: number) => (
            <CountryRows
               selected={index === selectedIndex}
               onSelect={() => setSelectedIndex(index)}
               countryData={country}
            />
         ))}
      </React.Fragment>
   );
};

export default CountryTable;
