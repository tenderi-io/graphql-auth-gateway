import gql from 'graphql-tag';
import { readFileSync } from 'fs';

const adminSchema = readFileSync(__dirname.concat('/admin.graphql'), 
  { encoding: 'utf8' },
);

const productSchema = readFileSync(__dirname.concat('/products.graphql'),
  { encoding: 'utf8' },
);

export {
  adminSchema,
  productSchema,
}
