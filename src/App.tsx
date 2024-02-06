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
      <div>
         <div className="mx-auto flex justify-center flex-col mt-10 max-w-min">
            <div className="bg-red-200 w-full h-10 flex items-center px-2">
               <input type="text" />
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
                  <CountryTable countries={countries} />
               </tbody>
            </table>
         </div>
      </div>
   );
}
