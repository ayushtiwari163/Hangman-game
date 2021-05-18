import React, { Component } from "react";
import { randomWord } from './words';

import "./Hangman.css";
import img0 from "./img/0.jpg";
import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img5 from "./img/5.jpg";
import img6 from "./img/6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.resett = this.resett.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }
   
  resett() {
    this.setState({
      guessed: new Set(),
      nWrong: 0,
      answer: randomWord()
    });
    
  }
  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
  /** render: render game */
  render() {
    const val=`${this.state.nWrong} out of 6`;
    let flag=true;
     for(let i=0;i<this.state.answer.length;i++)
     {
      flag=this.state.guessed.has(this.state.answer[i]) ? true : false;
     }
    console.log(flag);
    return (
      <div className='Hangman'>
        
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]}  alt={val} />
        
        <p>Wrong guessed : {this.state.nWrong}</p>
        {
        this.state.nWrong===6 ? 
        <div>
          <p className='Hangman-word'>{this.state.answer}</p>
          <h1>You Loose! </h1>
        </div> : 
        <div>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        {flag===true ? <h1>You WIN</h1>:<p className='Hangman-btns'>{this.generateButtons()}</p>} 
        </div>
        }
        <button id="reset" onClick={this.resett}>{flag===true?"Re-start":"Reset"}</button>
      </div>
    );
  }
}

export default Hangman;
