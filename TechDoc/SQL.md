# SQL 简单语句

##### 基本语法
```
-- 通过 * 查询表中所有数据
-- SELECT * FROM my_db_01.users

-- 从user 表中把username和password对应的数据查询出来alter
-- SELECT username, password from my_db_01.users

-- 向表中插入Tony和密码：098123
-- INSERT INTO my_db_01.users (username,password) values('Tony','098123')
-- insert into my_db_01.users (id,username,password) values(1,'zs','123')

-- UPDATA 语句
-- UPDATE my_db_01.users SET password = '123456' WHERE id = 4
-- 同时更新多个列
-- UPDATE my_db_01.users SET password = 'admin123', status = 1 where id = 2

-- DELETE 语句 DELETE FROM 
-- delete from my_db_01.users where id = 1
```

##### ORDER BY 子句
```
SELECT * FROM users ORDER BY status
SELECT * FROM users ORDER BY status ASC

降序排序
SELECT * FROM users ORDER BY status DESC
```

##### ORDER BY 子句 - 多重排序
```
对 user 表中的数据，先按照 status 进行降序排序，再按照 username 字母的顺序，进行升序的排序
SELECT * FROM users ORDER BY status DESC, username ASC
```
