import React, {Component} from 'react';
import shuffle from 'shuffle-array';
import swal from 'sweetalert2';
import Navbar from './Navbar';
import Card from './Card';

const NUM_CARDS = 16;

class MemoryGame extends Component {
  constructor(props){
    super(props);
    const cards = this.handleGame();
    this.state = {
      cards,
      clickedCards: []
    };
    this.handleGame  = this.handleGame.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getRandomNumber(){
    return Math.floor(Math.random()*255);
  }

  getRandomColor(){
    const [r, g, b] = Array(3).fill(this.getRandomNumber);
    return `rgb(${r()}, ${g()}, ${b()})`;
  }

  getCardDetails(){
    return {
      id: null,
      isHidden: true,
      isMatched: false,
    }
  }

  getPair(){

    const firstPart  = { color: this.getRandomColor(), ...this.getCardDetails() };
    const secondPart = Object.assign({}, firstPart);
    return [firstPart, secondPart];
  }

  handleGame(){

    let arr = [];
    Array.from({length:NUM_CARDS/2}, (x, i) => x = this.getPair())
         .forEach(card => arr.push(...card));
    let cards = shuffle(arr.map((card, i) => { card.id=i; return card }));
    return cards;
  }

  handleReset(){
    const cards = this.handleGame();
    this.setState({
      cards,
      clickedCards: []
    })
  }

  handleClick(color, id){
    const {clickedCards, cards} = this.state;
    if(clickedCards.length >= 2) return;
    const isFirst = !clickedCards.length ? true : false;

    if(isFirst){
      const clickedCard = [{color, id}];
      const flippedCards = cards.map(card => {
        if(card.id !== id) return card;
        card.isHidden=false;
        return card;
      })

      this.setState({
        cards:flippedCards,
        clickedCards: clickedCard
      });
    }

    if(!isFirst){
      const isaMatch = clickedCards.some(card=>card.color === color)
      if(!isaMatch) {
        const clickedCard = [...clickedCards, {color, id}]
        const flipCards = cards.map(card => {
          if(card.id !== id) return card;
          card.isHidden=false;
          return card;
        })
        this.setState({
          cards:flipCards,
          clickedCards: clickedCard
        }, () => {
          setTimeout(()=>{
            const resetPair = cards.map(card => {
              if(card.isHidden) return card;
              card.isHidden=true;
              return card;
            })
            this.setState({
              cards: resetPair,
              clickedCards: []
            })
          }, 1300)
        });
        return;
      }

      const matchedPair = cards.map(card => {
        if(card.color !== color) return card;
        card.isMatched = true;
        return card;
      })
      this.setState({
        cards: matchedPair,
        clickedCards: []
      })

      if(cards.every(card=>card.isMatched)) return swal({
        title: "<h3 style='color:#fff; margin:0'>Congratulations!</h3>",
        width: 600,
        padding: '30px',
        showCancelButton: true,
        cancelButtonColor: '#C40000',
        cancelButtonText: 'No, thanks.',
        confirmButtonText: 'Play Again?',
        focusConfirm: false,
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://media.giphy.com/media/7lsw8RenVcjCM/giphy.gif")
          top left
          no-repeat
        `
      }).then(data => data.value ? this.handleReset() : '')
    }
  }

  render() {
    const style = {display: 'flex', flexWrap: 'wrap', justifyContent: 'center', minHeight: 'calc(100vh - 90px)'}

    const cards = this.state.cards.map((card, i) => {
      return (
        <Card
          key={i}
          color={card.color}
          isHidden={card.isHidden}
          isMatched={card.isMatched}
          id={card.id}
          index={i}
          // if card is showing disable onClick event
          onClick={card.isHidden ? this.handleClick : ()=>{}}
        />
      )
    });

    return (
      <div>
        <Navbar reset={this.handleReset} />
        <div style={style}>
          {cards}
        </div>
      </div>
    )
  }
}

export default MemoryGame;
