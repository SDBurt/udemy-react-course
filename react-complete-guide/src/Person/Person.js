
import React from 'react'
import './Person.css'
const Person = (props) => {
    return (
        <div className='Person'>
            <p onClick={props.click}>I am {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
}


// render() {

//     let { name, age } = this.props;

//     return (
//         <div>
//             <p>I am {name} and I am {age} years old</p>
//         </div>
//     )
// }
// }

export default Person
