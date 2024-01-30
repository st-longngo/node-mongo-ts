import { config } from '../../configs';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API book store',
    version: '1.0.0',
    description: 'This is a node express mongoose boilerplate in typescript with book store',
    license: {
      name: 'MIT',
      url: 'https://github.com/st-longngo/node-mongo-ts',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api/v1`,
    },
  ],
};

export default swaggerDefinition;
