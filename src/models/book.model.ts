import { Schema, model } from 'mongoose';

import { IBookDoc } from '../interfaces';

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'Author', // add relationship
      required: [true, 'author is required'],
    },
    publicationYear: {
      type: Date,
      required: true,
    },
  },
  {
    collection: 'books',
    timestamps: true,
  }
);

BookSchema.set('toJSON', {
  transform: (document, returnedObject: Record<string, any>) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.author = returnedObject.authorId;

    delete returnedObject.authorId;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
  },
});

const Book = model<IBookDoc>('Book', BookSchema);

export default Book;
