CREATE DATABASE form_db;
use form_db;

create table info(
id int AUTO_INCREMENT,
nome varchar(100),
email varchar(100),
mensagem varchar(500),
primary key(id)
);

SELECT * FROM info;