import { request } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { Country, CountryData } from './definitions/types';
import { endpoint, LIST_COUNTRY } from './GQLConfig';
import Countries from './components/Countries';

export default function App() {
   const { data, isLoading, error } = useQuery<Country[]>({
      queryKey: ['countries'],
      queryFn: async () => await request(endpoint, LIST_COUNTRY),
   });
   
   if (isLoading) {
      return (
         <div className="flex justify-center items-center h-screen">
            <p>Loading data...</p>
         </div>
      );
   }
   if (error) return <pre>{error.message}</pre>;

   const { countries } = data as unknown as CountryData;
   return (
      <div className="mx-auto flex justify-center flex-col mt-10 max-w-min">
         <Countries countries={countries} />
      </div>
   );
}
