import { Query } from '../';
import type { TComments, CannedResponse } from '../models';


const all = () => Query<TComments[]>('SELECT * FROM comments ORDER BY created_at DESC');
const one = (id: number) => Query<TComments[]>('SELECT * FROM comments WHERE id = ?', [id]);
const allForBlog = (blogid: number) => Query('SELECT * FROM comments WHERE blogid = ?', [blogid])
const insert = (newComment: any) => Query<CannedResponse>('INSERT INTO comments SET ?', newComment);
const update = (id: number, editedComment: any) => Query<CannedResponse>('UPDATE comments SET ? WHERE id = ?', [editedComment, id]);
const destroy = (id: number) => Query<CannedResponse>('DELETE FROM comments WHERE id = ?', [id]);


export default {
    all,
    one,
    allForBlog,
    insert,
    update,
    destroy
}