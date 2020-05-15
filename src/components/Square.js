import React, { Component } from 'react'
import '../App.css'

class Square extends Component{
  handleClickToApp = () => {
    this.props.handleClick(this.props.value, this.props.index)
  }

  render(){
    return(
      <>
        <div
        id="square"
        onClick = { this.handleClickToApp}
        >
          { this.props.value }
        </div>
      </>
    )
  }
}
export default Square
