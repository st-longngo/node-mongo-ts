import { Schema, model } from 'mongoose';

import { IAuthorDoc } from '../interfaces';
import { toJSON } from '../utils';

const AuthorSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birth: {
      type: Date,
      required: true,
    },
    death: {
      type: Date,
    },
  },
  { collection: 'authors', timestamps: true }
);

// add plugin that converts mongoose to json
AuthorSchema.plugin(toJSON);

const Author = model<IAuthorDoc>('Author', AuthorSchema);

export default Author;
