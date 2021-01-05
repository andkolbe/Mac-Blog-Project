import { Query } from '../';

const oneBlogTag = (blogid: number) => Query('CALL spBlogTags(?)', [blogid])
const insert = (blogid: number, tagid: number) => Query('INSERT INTO blogtags (blogid, tagid) VALUES (?, ?)', [blogid, tagid]);
const update = (newTagid: number, oldTagid: number, blogid: number) => Query('UPDATE blogtags SET tagid = ? WHERE blogid = ? AND tagid = ?', [newTagid, blogid, oldTagid])
const destroy = (blogid: number) => Query('DELETE FROM blogtags WHERE blogid = ?', [blogid])

export default {
    oneBlogTag,
    insert,
    update,
    destroy
}