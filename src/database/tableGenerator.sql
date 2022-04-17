CREATE SCHEMA IF NOT EXISTS `page` DEFAULT CHARACTER SET utf8;
USE `page` ;

CREATE TABLE IF NOT EXISTS users(
  user_email VARCHAR(64) NOT NULL,
  user_name VARCHAR(20) NOT NULL,
  user_lastname VARCHAR(30) NOT NULL,
  user_password VARCHAR (200) NOT NULL,
  user_age INT NOT NULL,
  PRIMARY KEY(user_email)
);

CREATE TABLE IF NOT EXISTS creators(
  creator_name VARCHAR(45) NOT NULL,
  creator_desc VARCHAR(200) NOT NULL,
  creator_id INT NOT NULL AUTO_INCREMENT,
  creator_rate INT NOT NULL,
  PRIMARY KEY(creator_id)
);

CREATE TABLE IF NOT EXISTS games(
  game_id INT NOT NULL,
  game_name VARCHAR(45) NOT NULL,
  creator_id INT NOT NULL AUTO_INCREMENT,
  game_desc VARCHAR(200),
  game_price BIGINT(10),
  PRIMARY KEY(game_id),
  CONSTRAINT FK_creator_id_games_creators
  FOREIGN KEY (creator_id)
    REFERENCES creators(creator_id)
);

CREATE TABLE IF NOT EXISTS library(
  user_email VARCHAR(64) NOT NULL,
  game_id INT NOT NULL AUTO_INCREMENT,
  buy_date DATETIME NOT NULL,
  CONSTRAINT FK_game_id_library_games
  FOREIGN KEY(game_id)
    REFERENCES games(game_id),
  CONSTRAINT FK_game_id_library_users
  FOREIGN KEY(user_email)
    REFERENCES users(user_email)
);