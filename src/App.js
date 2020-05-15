import React, { Component } from 'react'
import Square from './components/Square'
import Messages from './components/Messages'
import './App.css'

class App extends Component{
  constructor(props) {
    super(props)
      this.state = {
        squares: [],
        torpIndexes: [],
        shipIndexes: [],
        torpCounter: 25,
        hitCounter: 5,
        sunkShip: false,
        done: false,
        missed: false
      }
  }

  componentDidMount() {
    let squares = []
    for (let i=0; i<100; i++) squares.push("🌊")
    let shipIndexes = []
    while(shipIndexes.length < 5){
      let r = Math.floor(Math.random() * 100)
      if(shipIndexes.indexOf(r) === -1) shipIndexes.push(r)
    }
    // shipIndexes.map(index => {
    //   return squares[index] = "🚢"
    // })
    this.setState({
      squares: squares,
      shipIndexes: shipIndexes
    })
    console.log(shipIndexes)
  }

  handleClick = (value, index) => {
    let { squares } = this.state
    let { torpIndexes } = this.state
    let { torpCounter } = this.state
    let { hitCounter } = this.state
    let { shipIndexes } = this.state
    let { sunkShip } = this.state
    let { missed } = this.state
    let { done } = this.state
    if (shipIndexes.includes(index) && !torpIndexes.includes(index) && !done) {
      squares[index] = "☠️"
      torpIndexes.push(index)
      hitCounter--
      torpCounter--
      hitCounter > 0 ? sunkShip = true : sunkShip = false
      missed = false
    }
    else if (!torpIndexes.includes(index) && !done) {
      squares[index] = "💨"
      torpIndexes.push(index)
      torpCounter--
      sunkShip = false
      missed = true
    }
    this.setState({ squares, torpIndexes, torpCounter, hitCounter, sunkShip, missed })
    if (hitCounter === 0) done = true
    else if (torpCounter === 0) {
      done = true
      shipIndexes.map(index => {
        return squares[index] = "🚢"
      })
    }
    this.setState({ done, squares})
  }

  reset = () => {
    this.setState({
      squares: [],
      torpIndexes: [],
      shipIndexes: [],
      torpCounter: 25,
      hitCounter: 5,
      sunkShip: false,
      done: false,
      missed: false
    })
    this.componentDidMount()
  }

  render(){
    let squares = this.state.squares.map((value, index) => {
      return(
        <Square
          value = { value }
          index = { index }
          key = { index }
          squares = { this.state.squares }
          handleClick = { this.handleClick }
        />
      )
    })
    return(
      <>
        <div id="body">
          <h1>Battleship App</h1>
          <div id="message">
            <Messages
              hitCounter = { this.state.hitCounter}
              torpCounter = { this.state.torpCounter }
              sunkShip = { this.state.sunkShip}
              missed = { this.state.missed }
            />
          </div>
          <div id="board">
            { squares }
          </div>
          <div> Torpedoes left: { this.state.torpCounter } <br/> Battleships to destroy: { this.state.hitCounter }</div>
          <button id="reset" onClick = { this.reset }>Reset</button>
        </div>
      </>
    )
  }
}
export default App
