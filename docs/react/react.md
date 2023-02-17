# React

!> 如果有被抓去写React的项目，先瞅一眼应该够用

### 跳转

```js
import { Link } from 'react-router-dom';

<Link
    to={{
      pathname: '/AAA/BBB/add?&data=' + JSON.stringify(data),
      state: {
        id: id,
        name: name,
        tid: text.tid,
      },
    }}
  >
  <a>跳转</a>
 </Link>
```

### 页面变量

> useState 里的是默认值

```js
 const [Name, setName] = useState<string>("joking");
 const [Switch, setSwitch] = useState<boolean>(false);
 const [Count, setCount] = useState<number>(0);
 const [Array, setArray] = useState([]);
```

### 生命周期

> useEffect 先理解为vue mount吧

```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### 页面渲染

- ### 循环

```js
<Select style={{ width: 300 }}>
  {dataArray?.map((item: any) => {
    return (
      <Select.Option key={item.id} value={item.id}>
        {item.name}
      </Select.Option>
    );
  })}
</Select>
```

- ### v-if

```js
{AAA > 0 ? <div/> : null}
```

- ### v-if , v-else

```js
{AAA > 0 ? <div/> : <span/>}
```

### 样式资源

```js
import styles from './index.less';
```

```html
<div className={styles.poster}>
  <div className={styles.poster_title}>AAAA</div>
</div>
```

```less
.poster {
  padding: 0 24px 24px 24px;
  .poster_title {
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }
}
```

### React.FC

>  React.FC<>的在typescript使用的一个泛型，FC就是FunctionComponent的缩写，是函数组件

```js
const ComponentName: React.FC = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};

export default ComponentName;
```


## Good luck

<style>
@import url('static/css/VueCode.css');
</style>