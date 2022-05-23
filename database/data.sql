insert into "users" ("fullName", "email", "username", "hashedPassword")
values ('Jeff Jefferson', 'jeffjefferson@thisemail.com', 'jeffjefferson', '$argon2i$v=19$m=4096,t=3,p=1$sRb5hJd3ChtQszxO7kmQvQ$VIX7KkCYNBYvsMd5TlTVSmlmTrLxv64fU3+iptc4QsM');

insert into "saved" ("malId", "userId", "animeTitle", "imageURL")
values (50265, 1, 'Spy x Family', 'https://cdn.myanimelist.net/images/anime/1441/122795.jpg')
