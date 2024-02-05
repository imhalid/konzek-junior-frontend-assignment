import { gql } from 'graphql-request';

export const endpoint = 'https://countries.trevorblades.com/graphql';
export const LIST_COUNTRY = gql`
   {
      countries {
         name
         native
         capital
         emoji
         currency
         languages {
            code
            name
         }
      }
   }
`;

