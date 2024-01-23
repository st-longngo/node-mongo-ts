import mongoose, { Document } from 'mongoose';

export interface IBook {
  title: string;
  authorId: mongoose.Schema.Types.ObjectId;
  publicationYear: Date;
}

export interface IBookDoc extends IBook, Document {}
