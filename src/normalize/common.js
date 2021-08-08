import { schema } from 'normalizr';

export const uriSchema = new schema.Entity(
  'uri',
  {},
  {
    idAttribute: () => 'uri-id',
    processStrategy: (value) => value['#cdata-section'],
  }
);
