import React from 'react'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
        <h2>add a new</h2>
        <div>name
          <input 
            value={props.nameValue} onChange={props.nameHandler}
          />
        </div>
        <div>number
          <input
            value={props.numberValue} onChange={props.numberHandler}
          />
        </div>
        <div><button type="submit">add</button></div>        
      </form>
    )

}

export default PersonForm