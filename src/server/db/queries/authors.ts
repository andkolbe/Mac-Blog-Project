import { Query } from '../';
import type { TAuthors, CannedResponse } from '../models/';

const all = () => Query<TAuthors[]>('SELECT id, name FROM authors');

const one = (id: number) => Query<TAuthors[]>('SELECT * FROM authors WHERE id = ?', [id])

const insert = (newAuthor: any) => Query<CannedResponse>('INSERT INTO authors SET ?', newAuthor); // strong typing CannedResponse gives us autocomplete support
// const insert (name: string, email: string) => Query<CannedResponse>('INSERT INTO authors (name, email) VALUE (?, ?)', [name, email]);

const find = (column: string, value: string | number) => Query<TAuthors[]>('SELECT * FROM authors WHERE ?? = ?', [column, value]);
// this lets you find and check any column in the database. Helpful for looking up an email column to authenticate and match with a user logging in
// ?? is the escape character for columns. ? is the escape character for values. they get parsed differently for sql injection attacks
// ?? can be placeholders for columns that are passed in dynamically
// find can replace all of your one queries


export default {
    all,
    one,
    insert,
    find
}