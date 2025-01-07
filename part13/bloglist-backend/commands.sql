CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

insert into blogs (author, url, title) values (
  'Dan Abramov',
  'https://abramov.com',
  'Writing Resilient Components'
);

insert into blogs (author, url, title) values (
  'Martin Fowler',
  'https://fowler.com',
  'Is High Quality Software Worth the Cost?'
);

insert into blogs (author, url, title) values (
  'Robert C. Martin',
  'https://martin.com',
  'FP vs. OO List Processing'
);
