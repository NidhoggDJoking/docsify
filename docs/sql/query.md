# SQL

<hr>

### SQL SELECT DISTINCT 语句

?> 在表中，一个列可能会包含多个重复值，有时您也许希望仅仅列出不同(distinct)的值。`DISTINCT` 关键词用于返回唯一不同的值。

#### `SQL SELECT DISTINCT 语法`

```sql
SELECT DISTINCT column_name,column_name FROM table_name;
```

### SQL WHERE 子句

?> WHERE 子句用于提取那些满足指定条件的记录。

#### `SQL WHERE 语法`

```
SELECT column_name,column_name FROM table_name WHERE column_name operator value;
```

### SQL UPDATE 语句

?> UPDATE 语句用于更新表中已存在的记录。

!> 如果不存在 `column_name` 报 `Unknown column 'column_name' in 'field list'` 错误

#### `SQL UPDATE 语法`

```sql
UPDATE table_name SET column1=value1,column2=value2,... WHERE some_column=some_value;
```

### SQL LEFT JOIN 关键字

?> LEFT JOIN 关键字从左表（table1）返回所有的行，即使右表（table2）中没有匹配。如果右表中没有匹配，则结果为 NULL.

```sql
SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name=table2.column_name;
```

###  SQL LIKE 操作符

?> LIKE 操作符用于在 WHERE 子句中搜索列中的指定模式。

```sql
//  SQL 语句选取 name 以字母 "K" 开始的所有客户：
SELECT * FROM table WHERE name LIKE 'K%';
```

<br>

#### 其实以上全为无用内容SQL详情点击下面链接

<br>

#### [SQL传送门](https://www.runoob.com/sql/sql-tutorial.html)

<hr>

### 正片开始 `SQL for LeetCode`

<br>

#### 多表查询

```sql
// 查询 表 table_name1 id 等于 表 table_name1 id 的全部数据

SELECT * FROM table_name1 a, table_name2 b WHERE a.id = b.id
```

#### 查询表是否存在

```sql
// 查询 user 表 是否存在
SELECT table_name FROM information_schema.TABLES WHERE table_name ='user'
```

<style>
@import url('static/css/code2.css');
</style>