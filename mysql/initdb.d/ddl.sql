CREATE TABLE account
(
    user_id   INT(40) NOT NULL AUTO_INCREMENT,
    username      VARCHAR(40) NOT NULL,
    mail   VARCHAR(256) NOT NULL,
    password  TEXT NOT NULL,
    created DATETIME NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
) ENGINE = InnoDB; 


CREATE TABLE todo
(
    todo_id   BIGINT      NOT NULL AUTO_INCREMENT,
    title      VARCHAR(40) NOT NULL, 
    content   MEDIUMTEXT  ,
    completed BOOLEAN     ,
    user_id   INT(40) NOT NULL,
    uuid      VARCHAR(40) NOT NULL,
    created DATETIME NOT NULL default CURRENT_TIMESTAMP,
    modified DATETIME NOT NULL default CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (todo_id),
    FULLTEXT KEY(title,content) WITH PARSER NGRAM
   
)  ENGINE = InnoDB; 