import React, { Component } from 'react'
import '../App.css'

class Square extends Component{
  handleClickToApp = () => {
    this.props.handleClick(this.props.index)
  }

  render(){
    return(
      <>
        <div
        id="square"
        onClick = { this.handleClickToApp}
        >
          <img src = { this.props.value } alt = "photos" className = "photos"/>
        </div>
      </>
    )
  }
}
export default Square
