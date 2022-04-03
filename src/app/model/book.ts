import {Author} from './author';

export class Book {
    id: number;
    category: string;
    title: string;
    year: string;
    price: number;
    authors: Author[];
}
