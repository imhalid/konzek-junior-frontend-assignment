import { request } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import CountryTable from './components/CountryTable';
import { Country, CountryData } from './definitions/types';
import { endpoint, LIST_COUNTRY } from './GQLConfig';

export default function App() {
   const { data, isLoading, error } = useQuery<Country[]>({
      queryKey: ['countries'],
      queryFn: async () => await request(endpoint, LIST_COUNTRY),
   });
   if (isLoading) return 'Loading...';
   if (error) return <pre>{error.message}</pre>;
   const { countries } = data as unknown as CountryData;
   return (
      <div>
         <h1>Country Information</h1>
         <table>
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Native Name</th>
                  <th>Capital</th>
                  <th>Flag</th>
                  <th>Currency</th>
                  <th>Languages</th>
               </tr>
            </thead>
            {countries.map((country) => (
               <CountryTable countryData={country} />
            ))}
         </table>
      </div>
   );
}
