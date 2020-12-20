import { Query } from '../';

const all = () => Query('SELECT * FROM blogtags');
const oneBlogTag = (blogid: number) => Query('CALL spBlogTags(?)', [blogid])
const insert = (blogid: number, tagid: number) => Query('INSERT INTO blogtags (blogid, tagid) VALUE (?, ?)', [blogid, tagid]);


export default {
    all,
    oneBlogTag,
    insert
}