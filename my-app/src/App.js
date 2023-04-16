import { useState } from 'react';

function App() {
  /* 함수 사용 및 Fragment */ 
  // import {Fragment} from 'react';

  // const number = 1;

  // const double = (number) => {
  //   return number * 2;
  // };
  // double();
  // return (
  //   <> or <Fragment>
  //     <div>{number}</div>
  //   </> or </Fragment>
  // );

  /* Click 이벤트 */
  // const printHello = () => {
  //   console.log('hello')
  // };

  // printHello();

  // return (
  //   <>
  //     <button onClick={printHello}>Submit</button>
  //   </> 
  // );

  /* useState */
  // 컴퍼넌트가 렌더링이 되려면 state가 업데이트가 되면 화면도 업데이트가 됨
  // import { useState } from 'react';

  // doubledNumber를 통해 업데이트 후 사용할 수 있어서 콘솔로 2가 찍힘

  // console.log('render');
  // const [number, setNumber] = useState(1);    // 상태, 함수이름
  // const [number1, setNumber1] = useState(1);
  // const double = () => {
  //   const doubledNumber = number * 2;
  //   setNumber(doubledNumber);
  //   setNumber1(number1 * 2);
  //   console.log(doubledNumber);
  // };

  // return (
  //   <>
  //     <div>{number}</div>
  //     <div>{number1}</div>
  //     <button onClick={double}>
  //       Submit
  //     </button>
  //   </> 
  // ); 
  
  /* useState(prevState) */
  // import { useState } from 'react';

  // console.log('render');
  // const [number, setNumber] = useState(1);    // 상태, 함수이름
  // const double = () => {
  //   // const doubledNumber = number * 2;
  //   setNumber((prevState) => prevState * 2);  // 한 줄이면 return 없이 사용 가능
  //   setNumber((prevState) => {
  //     return prevState * 2
  //   });
  // };

  // return (
  //   <>
  //     <div>{number}</div>
  //     <button onClick={double}>
  //       Submit
  //     </button>
  //   </> 
  // );

  /* Bootstrap 스타일 추가 */
  // import { useState } from 'react';
  
  console.log('render');
  const [number, setNumber] = useState(1);    // 상태, 함수이름
  const double = () => {
    // const doubledNumber = number * 2;
    setNumber((prevState) => prevState * 2);  // 한 줄이면 return 없이 사용 가능
    setNumber((prevState) => {
      return prevState * 2
    });
  };
  
  return (
    <>
      <div>{number}</div>
      <button className = "btn btn-primary" onClick={double}>
        Submit
      </button>
    </> 
  );
  
}

export default App;