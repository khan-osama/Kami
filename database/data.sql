insert into "users" ("fullName", "email", "username", "hashedPassword")
values ('Jeff Jefferson', 'jeffjefferson@thisemail.com', 'jeffjefferson', '$argon2i$v=19$m=4096,t=3,p=1$sRb5hJd3ChtQszxO7kmQvQ$VIX7KkCYNBYvsMd5TlTVSmlmTrLxv64fU3+iptc4QsM');

insert into "saved" ("malId", "userId", "animeTitle", "imageURL")
values (50265, 1, 'Spy x Family', 'https://cdn.myanimelist.net/images/anime/1441/122795.jpg');

insert into "reviews" ("malId", "userId", "reviewText")
values (50265, 1, 'From the comedic moments to the heart warming ones, SPY x FAMILY intertwines the elements that make up this show into one complete package that is perfectly balanced, as all things should be. This show truly does not disappoint.'),
       (50265, 1, 'This is also a test review!');
