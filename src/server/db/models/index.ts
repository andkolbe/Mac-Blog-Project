export interface TAuthors { // start your backend interfaces with T
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    banned?: string;
    created_at?: Date;
}

export interface TBlogs {
    id?: number;
    title?: string;
    content?: string;
    authorid?: number;
    created_at?: Date;
    image_url?: string;
}

export interface TTags {
    id?: number;
    name?: string;
    created_at?: Date;
}

export interface TBlogTags {
    blogid?: number;
    tagid?: number;
}

export interface TComments {
    id?: number;
    name?: string;
    comment?: string;
    blogid?: number;
    created_at?: Date;
}

export interface CannedResponse {
    insertId?: number;
    affectedRows?: number;
    changedRows?: number;
}

// acts as psuedo documentation. Write the tables in the code so you don't have to jump back to database to remember table and column names
// we can add these to our queries for typescript support
// the properties are optional because we don't usually select all of them
// you can interface or type to describe them. interfaces can meld or union with other interfaces