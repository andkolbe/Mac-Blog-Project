import { Query } from '../';

const oneBlogTag = (id: number) => Query('CALL spBlogTags(?)', [id])
const insert = (id: number, tagid: number) => Query('INSERT INTO blogtags (id, tagid) VALUES (?, ?)', [id, tagid]);
const update = (newTagid: number, oldTagid: number, id: number) => Query('UPDATE blogtags SET tagid = ? WHERE id = ? AND tagid = ?', [newTagid, id, oldTagid])
const destroy = (id: number) => Query('DELETE FROM blogtags WHERE id = ?', [id])

export default {
    oneBlogTag,
    insert,
    update,
    destroy
}