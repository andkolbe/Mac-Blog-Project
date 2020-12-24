import { Query } from '../';
import type { TAuthors, CannedResponse } from '../models/';

const all = () => Query<TAuthors[]>('SELECT id, name FROM authors');

const insert = (newAuthor: any) => Query<CannedResponse>('INSERT INTO authors SET ?', newAuthor); // strong typing CannedResponse gives us autocomplete support
// const insert (name: string, email: string) => Query<CannedResponse>('INSERT INTO authors (name, email) VALUE (?, ?)', [name, email]);

const find = (column: string, value: string | number) => Query<TAuthors[]>('SELECT * FROM authors WHERE ?? = ?', [column, value]);
// ?? is the escape character for columns. they get parsed differently than ? for sql injection attacks
// ?? can be placeholders for columns that are passed in dynamically


export default {
    all,
    insert,
    find
}