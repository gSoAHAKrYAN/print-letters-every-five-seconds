import { Component } from 'react';
import raw from './text.txt'

export default class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }
  }

  componentDidMount() {
    let index = 0;
    let isBack = false;
    let letters = "";

    setInterval(() => {
      fetch("http://tv.memories.am/output")
        .then((resp) => {
          return resp.text();
        })
        .then(text => {
          const newText = JSON.parse(text).text;
          if (newText != letters) {
            isBack = true
          }

          letters = newText;
        })
    }, 10000);


    setInterval(() => {
      if (this.state.text.length === 0) {
        isBack = false;
      }

      if (!isBack && letters.length && this.state.text.length < letters.length) {
        this.setState({
          text: this.state.text + letters[index]
        });
        return index++;
      }

      if (isBack) {
        this.setState({
          text: this.state.text.slice(0, -1)
        });

        return index--;
      }

    }, Math.random() * 200);
  }

  render() {
    return (
      <div>
        {this.state.text}
      </div>
    )
  }
}