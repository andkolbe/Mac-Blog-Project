import { Query } from '../';
import type { CannedResponse, TAuthors, TBlogs } from '../models';

const all = () => Query<Array<(TBlogs & TAuthors)>>('SELECT blogs.*, authors.name FROM blogs JOIN authors ON authors.id = blogs.authorid ORDER BY blogs.created_at DESC');
const one = (id: number) => Query<TBlogs[]>('SELECT blogs.*, authors.name FROM blogs JOIN authors ON authors.id WHERE blogs.id = ?', [id])
const insert = (newBlog: any) => Query<CannedResponse>('INSERT INTO blogs SET ?', newBlog); // if you had a bunch of properties it would be annoying to write them all out. You can replace them with an object
const update = (id: number, editedBlog: any) => Query<CannedResponse>('UPDATE blogs SET ? WHERE id = ?', [editedBlog, id])
const destroy = (id: number) => Query<CannedResponse>('DELETE FROM blogs WHERE id = ?', [id]);

export default {
    all,
    one,
    insert,
    update,
    destroy
}

