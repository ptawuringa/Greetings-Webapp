create table greet(
	id serial not null primary key,
	name text not null,
    count int not null
);

-- create table products (
-- 	id serial not null primary key,
--     description text not null,
-- 	price decimal(10,2),
-- 	category_id int,
-- 	foreign key (category_id) references categories(id)
-- );module.exports = function CategoryService(pool){
