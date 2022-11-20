import {Component} from 'react';
import raw from './text.txt'

export default class Text extends Component{
  constructor(props){
    super(props);
    this.state = {
      text: ""
    }
  }
  
  componentDidMount(){
    let index = 0;
    let is_back = false
    fetch(raw)
    .then((resp) => resp.text())
    .then(text =>{
      let letters = text.split("")
      const tick = setInterval(() => {
        
        const check = setInterval(() => {
          fetch(raw)
          .then((response) => response.text())
          .then(newText => {
            const newLetters = newText.split("");
            if (letters !== newLetters) {
              letters = newLetters;
            }
          })
      }, 1000)


        if (!is_back){
          this.setState({
              text: this.state.text + letters[index]
          })
          if (index + 1  === text.length){
            is_back = true
            index = 0
          } else{
            index++
          }
        } else{
          if (this.state.text.length > 0){
            this.setState({
                text: this.state.text.slice(0, -1)
            })
          } else{
            is_back = false
          }
        }

        return () => clearInterval(check)
      }, 100)

      
      return () => clearInterval(tick);
    })
  }

  render(){
    return (
      <div>
        {this.state.text}
      </div>
    )
  }
}