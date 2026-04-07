create database todo;
use todo;

create table todos(id int primary key auto_increment,
task varchar(255),status varchar(100),time timestamp default 
current_timestamp);



select * from todos;