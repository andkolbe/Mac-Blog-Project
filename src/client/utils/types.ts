export interface IAuthor { // start your front end interfaces with I
    id: number;
    name: string;
}

export interface ITag {
    id: number;
    name: string;
    created_at?: Date;
}

export interface IBlog { // single source of truth. If you need to update what's in an IBlog you can do it here instead of on every page
    id: number;
    title: string;
    content: string;
    authorid: number;
    created_at: Date;
}