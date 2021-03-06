set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."users" (
  "userId"          serial,
  "fullName"       text            not null,
  "email"        text            not null,
  "username"        text            not null,
  "hashedPassword"  text            not null,
  "createdAt"       timestamptz(6)  not null default now(),
  primary key ("userId"),
  unique ("username")
);

create table "saved" (
  "savedId" serial,
  "malId" integer     not null,
  "userId" integer    not null,
  "animeTitle" text   not null,
  "imageURL" text     not null,

  primary key("savedId"),
  foreign key ("userId")
    references "users" ("userId")

);

create table "reviews" (
  "reviewId" serial,
  "malId" integer     not null,
  "userId" integer    not null,
  "reviewText" text   not null,

  primary key("reviewId"),
  foreign key ("userId")
    references "users" ("userId")

);
