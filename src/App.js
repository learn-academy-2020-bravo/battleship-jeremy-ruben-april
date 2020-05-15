import React, { Component } from 'react'
import Square from './components/Square'
import Messages from './components/Messages'
import Battleship from './images/battleship.png'
import Torpedo from './images/torpedo.png'
import Water from './images/water.png'
import './App.css'

class App extends Component{
  constructor(props) {
    super(props)
      this.state = {
        squares: [],
        // Array holding all indexes that have been clicked
        torpIndexes: [],
        // Array holding all random generated ship indexes
        shipIndexes: [],
        // Torpedos left
        torpCounter: 25,
        // Ships left to destroy
        hitCounter: 15,
        // If true, message for sinking ship displays
        sunkShip: false,
        // If true, message for missing displays
        missed: false,
        // If true, prevents counter and squares from changing after win or lose
        done: false,
      }
  }

  componentDidMount() {
    let squares = []
    // Generate 10x10 squares array with all Water images
    for (let i=0; i<100; i++) squares.push(Water)
    let shipIndexes = []
    // Generate array from 0 to 99
    let gridArray = Array(100).fill().map((x,i)=>i)
    // Generate array holding each column and row
    let grid = [
      // Columns 0 to 9
      gridArray.filter(value=>value%10===0),
      gridArray.filter(value=>value%10===1),
      gridArray.filter(value=>value%10===2),
      gridArray.filter(value=>value%10===3),
      gridArray.filter(value=>value%10===4),
      gridArray.filter(value=>value%10===5),
      gridArray.filter(value=>value%10===6),
      gridArray.filter(value=>value%10===7),
      gridArray.filter(value=>value%10===8),
      gridArray.filter(value=>value%10===9),
      // Rows 0 to 9
      [...gridArray].splice(0,10),
      [...gridArray].splice(10,10),
      [...gridArray].splice(20,10),
      [...gridArray].splice(30,10),
      [...gridArray].splice(40,10),
      [...gridArray].splice(50,10),
      [...gridArray].splice(60,10),
      [...gridArray].splice(70,10),
      [...gridArray].splice(80,10),
      [...gridArray].splice(90,10)
    ]
    // Define these variables
    let fiveNums
    let fourNums
    let threeNums
    let twoNums
    let oneNum
    // Check to see if a ship is less than the length intended, if so then repeat random number generation
    const generateShips = () => {
      // Generate random index number for grid array
      let randomGridNum1 = Math.floor(Math.random() * 20)
      let randomGridNum2 = Math.floor(Math.random() * 20)
      let randomGridNum3 = Math.floor(Math.random() * 20)
      let randomGridNum4 = Math.floor(Math.random() * 20)
      // Generate random index number for column/row array
      let randomNum1 = Math.floor(Math.random() * 10)
      let randomNum2 = Math.floor(Math.random() * 10)
      let randomNum3 = Math.floor(Math.random() * 10)
      let randomNum4 = Math.floor(Math.random() * 10)
      // Generate array for each ship with varying lengths
      fiveNums = [...grid[randomGridNum4]].splice(randomNum4, 5)
      fourNums = [...grid[randomGridNum1]].splice(randomNum1, 4)
      threeNums = [...grid[randomGridNum2]].splice(randomNum2, 3)
      twoNums = [...grid[randomGridNum3]].splice(randomNum3, 2)
      oneNum = Math.floor(Math.random() * 100)
      // Check to see if a ship is less than the length intended, if so then repeat random number generation
      while(fiveNums.length < 5) {
        randomNum4 = Math.floor(Math.random() * 14)
        fiveNums = [...grid[randomGridNum4]].splice(randomNum4, 5)
      }
      while(fourNums.length < 4) {
        randomNum1 = Math.floor(Math.random() * 14)
        fourNums = [...grid[randomGridNum1]].splice(randomNum1, 4)
      }
      while(threeNums.length < 3) {
        randomNum2 = Math.floor(Math.random() * 14)
        threeNums = [...grid[randomGridNum2]].splice(randomNum2, 3)
      }
      while(twoNums.length < 2) {
        randomNum3 = Math.floor(Math.random() * 14)
        twoNums = [...grid[randomGridNum3]].splice(randomNum3, 2)
      }
      // Push all individual ship indexes into compiled ship index array
      fiveNums.map(index=> shipIndexes.push(index))
      fourNums.map(index=> shipIndexes.push(index))
      threeNums.map(index=> shipIndexes.push(index))
      twoNums.map(index=> shipIndexes.push(index))
      shipIndexes.push(oneNum)
    }
    // Check if there are any repeat indexes within ships indexes, if so repeat generateShips function
    while (shipIndexes.some((value,index)=>shipIndexes.indexOf(value) !== index)) {
      generateShips()
    }
    // **UNCOMMENT BELOW to display all ships at start**
    fiveNums.map(index=> squares[index] = Battleship)
    fourNums.map(index=> squares[index] = Battleship)
    threeNums.map(index=> squares[index] = Battleship)
    twoNums.map(index=> squares[index] = Battleship)
    squares[oneNum] = Battleship
    // Set state
    this.setState({ squares, shipIndexes })
  }

  handleClick = (index) => {
    let { squares, torpIndexes, torpCounter, hitCounter, shipIndexes, sunkShip, missed, done } = this.state
    // If the index is that of a ship, the index has not been clicked yet, AND the game is not done
    if (shipIndexes.includes(index) && !torpIndexes.includes(index) && !done) {
      squares[index] = Battleship
      torpIndexes.push(index)
      hitCounter--
      torpCounter--
      hitCounter > 0 ? sunkShip = true : sunkShip = false
      missed = false
    }
    // If the index has not been clicked yet and the game is not done
    else if (!torpIndexes.includes(index) && !done) {
      squares[index] = Torpedo
      torpIndexes.push(index)
      torpCounter--
      sunkShip = false
      missed = true
    }
    // Set state
    this.setState({ squares, torpIndexes, torpCounter, hitCounter, sunkShip, missed })
    // Change done state to true if win or lose
    if (hitCounter === 0) done = true
    else if (torpCounter === 0) {
      done = true
      // After a loss, show all locations of the ships
      shipIndexes.map(index => {
        return squares[index] = Battleship
      })
    }
    this.setState({ done, squares})
  }

  // Reset all state values back to original values, then call componentDidMount
  reset = () => {
    this.setState({
      squares: [],
      torpIndexes: [],
      shipIndexes: [],
      torpCounter: 25,
      hitCounter: 15,
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
          <h1>Battleship</h1>
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
          {/*Footer Area*/}
          <div>
            <p id="stats">Torpedoes left: <span className={this.state.torpCounter < 6 ? "warningFont" : "regularFont"}>{ this.state.torpCounter }</span><br/>Battleships to destroy: { this.state.hitCounter }</p>
            <button id="reset" onClick = { this.reset }>Restart</button>
            <p id="footer">Developed by Jeremy, Ruben + April</p>
          </div>
        </div>
      </>
    )
  }
}
export default App
