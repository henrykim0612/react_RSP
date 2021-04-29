import React, {Component} from 'react';

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


class RSP extends Component {

  state = {
    result: '',
    imgCoord: '0',
    score: 0
  }

  interval;

  intervalHandle = () => {
    const {imgCoord} = this.state;
    if (imgCoord === rspCoords.rock) {
      this.setState({imgCoord: rspCoords.scissor});
    } else if (imgCoord === rspCoords.scissor) {
      this.setState({imgCoord: rspCoords.paper});
    } else {
      this.setState({imgCoord: rspCoords.rock});
    }
  }

  // 첫 렌더링 후, 여기서 비동기 요청을 많이 함
  componentDidMount() {
    this.interval = setInterval(this.intervalHandle, 100);
  }

  // 리렌더링 후
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //
  // }

  // 컴포넌트가 제거되기 전, 비동기 요청 정리를 많이 함
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onClickBtn = (choice) => (e) => {
    e.preventDefault();
    const {imgCoord} = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const comScore = scores[computerChoice(imgCoord)];
    const diff = myScore - comScore;
    if (diff === 0) {
      this.setState({result: '비겼습니다.'});
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다.',
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다.',
          score: prevState.score - 1,
        }
      });
    }
    setTimeout(()=> {
      this.interval = setInterval(this.intervalHandle, 100);
    }, 1000)
  }

  render() {
    const {result, imgCoord, score} = this.state;
    return (
      <>
        <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('scissor')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재: {score}점</div>
      </>
    )
  };
}

export default RSP;