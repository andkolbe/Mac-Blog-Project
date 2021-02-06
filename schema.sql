CREATE SCHEMA IF NOT EXISTS blogs;

USE  blogs;

SELECT * FROM blogs;
SELECT * FROM authors;
SELECT * FROM tags;
SELECT * FROM blogtags;
SELECT * FROM comments;


SELECT * FROM comments WHERE blogid = 75;
CALL spBlogTags(1);

CREATE TABLE blogs (
	id int not null auto_increment,
    title varchar(75) not null,
    content varchar(1000) not null,
    authorid int not null,
    created_at timestamp default now(),
    primary key (id),
    foreign key (authorid) references authors(id)
);

CREATE TABLE authors (
	id int not null auto_increment,
    name varchar(25) not null,
    email varchar(60) not null unique,
    created_at timestamp default now(),
    primary key (id)
);

SELECT blogs.*, authors.name
FROM blogs
JOIN authors
ON authors.id = blogs.authorid;

CREATE TABLE tags (
	id int not null auto_increment,
    name varchar(25) not null,
    created_at timestamp default now(),
    primary key(id)
);

CREATE TABLE blogtags (
	blogid int not null,
    tagid int not null,
    primary key (blogid, tagid),
    foreign key (blogid) references blogs(id),
    foreign key (tagid) references tags(id)
);

CREATE TABLE comments (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    comment VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    blogid INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (blogid) REFERENCES blogs(id)
);
DELETE FROM comments WHERE id = 2;

ALTER TABLE authors
ADD COLUMN password VARCHAR(60) NOT NULL;

ALTER TABLE authors
ADD COLUMN banned CHAR(1) DEFAULT 'n' AFTER password;

ALTER TABLE blogs 
ADD COLUMN image_url varchar(255) null;

UPDATE authors
SET password = 'password123'
WHERE id = 1;

INSERT INTO authors (name, email) VALUE
('Andrew', 'andrew@andrew.com');

INSERT INTO blogs (title, content, authorid) VALUES
('Hello World', 'I hope this works', 1),
('PLZ HALP', 'HALP ME', 1);

INSERT INTO tags (name) VALUES 
('salad'),
('chicken'),
('pork'),
('beef'),
('fish'),
('shellfish'),
('vegetarian'),
('dessert');

INSERT INTO blogtags (blogid, tagid) VALUES
(3, 2),
(3, 3),
(3, 4);
