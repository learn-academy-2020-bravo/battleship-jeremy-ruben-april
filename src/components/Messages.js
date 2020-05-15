import React, { Component } from 'react'
import '../App.css'

class Messages extends Component {
  render() {
    let message
    if (this.props.hitCounter === 0) {
      message = <h3>You've destroyed all battleships!</h3>
    } else if (this.props.torpCounter === 0 && this.props.hitCounter !== 0) {
      message = <h3>No more torpedoes! You lose!</h3>
    } else if (this.props.sunkShip) {
      message = <h3>You hit a battleship!</h3>
    } else if (this.props.missed) {
      message = <h3>You missed!</h3>
    }
    return(
      <>
      { message }
      </>
    )
  }
}
export default Messages
