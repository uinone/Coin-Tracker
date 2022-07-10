# Coin tracker with React.js

[coinpaprika](https://coinpaprika.com/ko/)와 [nomadcoder](https://nomadcoders.co/)의 api를 사용해서 상위 100개 코인에 대한 정보를 볼 수 있는 앱을 만들어봤어요.

nomadcoder의 강의를 보면서 만들어보았습니다.

## 알아낸 것들

1. styled-component를 통해 css를 적용한 컴포넌트를 쉽게 생성 가능하다.
2. 특정 상태를 하위 컴포넌트에 전달하기 위해 차례대로 인자에 넣어서 전달하는 방법이 있으나 이는 굉장히 비효율적이다. 이를 위해 상태 관리를 할 수 있는 Recoil과 같은 도구가 생겼다.

## 겪었던 문제들

1. react-router-dom v6에서의 nested router 사용법
2. 타입 스크립트의 IntrinsicAttributes 오류

### react-router-dom v6에서의 nested router 사용법

nested router에 대한 개념은 알았지만 이를 어떻게 사용할지 몰랐습니다.

그래서 강의 댓글에 달려있는 여러 해결법들을 찾아보면서 나름대로 [블로그에 정리해봤어요.](https://ideadummy.tistory.com/65)

### 타입 스크립트의 IntrinsicAttributes 오류

타입체크와 관련된 IntrinsicAttributes 오류입니다.

컴포넌트에 객체 내부의 프로퍼티가 아닌

객체 자체를 넘기려는 상황인데, 다음과 같은 오류가 발생했습니다.

> Type '{ data: Data; }' is not assignable to type 'IntrinsicAttributes & Data'.
> Property 'data' does not exist on type 'IntrinsicAttributes & Data'.ts(2322)

문제가 된 코드입니다.

```ts
interface Data {
  id: string;
  name: string;
  symbol: string;
}

function Component(data: Data) {
return <h1>{data.name}</h1>;
}

function App() {
const [data, setData] = useState<Data>({});
return <Component data={data}>;
}
```

위와 같이 작성해도 함수의 인자로 Data 인터페이스를 갖는 객체가 전달될 것이라 명시할 수 있다고 생각했습니다.

하지만 타입 명시를 제대로 못해줘서 일어난 오류 같았습니다.

#### 구글링을 통해 찾은 방법

```ts
function Component({ data }: { data: Data }) {
  return <h1>{data.name}</h1>;
}
```

위와 같이 object destructuring을 통해 객체를 통으로 전달 가능했습니다.

#### 의문점

하지만 왜 굳이 object destructuring을 통해 객체를 전달해야하는지는 이해하지 못했습니다😥

방법을 찾게되면 다시 업데이트 할 생각이에요.
