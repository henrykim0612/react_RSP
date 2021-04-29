import React, {useState, useRef, useEffect, memo} from 'react';

const rspCoords = {
  rock: '0',
  scissor: '-142px',
  paper: '-284px',
};
const scores = {
  scissor: 1,
  rock: 0,
  paper: -1,
}
const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

const RSP = memo(() => { // memo로 불필요한 리렌더링 방지

  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState('0');
  const [score, setScore] = useState(0);

  useEffect( () => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아니고 하나로 합쳐놓은 느낌)
    interval.current = setInterval(intervalHandle, 100);
    return () => { // componentWillUnmount 역할
      clearInterval(interval.current);
    }
  }, [imgCoord]); // 두번째 인수는 다시 실행시킬 값(변하는 값)
  // 두번째 인수값은 클로저 문제등을 해결할 수 있음 [] 처럼 아예 넣지 않으면 useEffect는 한번만 실행됨.(componentDidMount 같은 효과)
  // 이 소스에서는 Interval 내부의 imgCoord 변수가 계속 바뀌면서 useEffect 를 계속 실행하는 구조 (componentDidUpdate 같은 효과)
  // State 마다 여러번 실행을 원하는 경우에는 userEffect 를 여러번 쓰는것도 가능함.
  // useEffect( () => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아니고 하나로 합쳐놓은 느낌)
  //   interval.current = setInterval(intervalHandle, 100);
  //   return () => { // componentWillUnmount 역할
  //     clearInterval(interval.current);
  //   }
  // }, [result]);

  let interval = useRef();
  const intervalHandle = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissor);
    } else if (imgCoord === rspCoords.scissor) {
      setImgCoord(rspCoords.paper);
    } else {
      setImgCoord(rspCoords.rock)
    }
  }
  const onClickBtn = (choice) => (e) => {
    e.preventDefault();
    clearInterval(interval.current);
    const myScore = scores[choice];
    const comScore = scores[computerChoice(imgCoord)];
    const diff = myScore - comScore;
    if (diff === 0) {
      setResult('비겼습니다.');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다');
      setScore((prevScore) => prevScore + 1);
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다.',
          score: prevState.score - 1,
        }
      });
      setResult('졌습니다.');
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(()=> {
      interval.current= setInterval(intervalHandle, 100);
    }, 1000)
  }

  return (
    <>
      <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('scissor')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재: {score}점</div>
    </>
  );
});

export default RSP;