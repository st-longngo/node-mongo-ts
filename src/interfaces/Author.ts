import { Document } from 'mongoose';

export interface IAuthor {
  name: string;
  birth: Date;
  death?: Date;
}

export interface IAuthorDoc extends IAuthor, Document {}
