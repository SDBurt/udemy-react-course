import React, { Component } from 'react';
import './App.css';

import Person from './Person/Person.js'

class App extends Component {

  state = {
    persons: [
      { id: 'aefsa', name: 'Max', age: 28 },
      { id: 'eaf23', name: 'Manu', age: 29 },
      { id: 'eaf2a', name: 'Stephanie', age: 26 }
    ],
    showPersons: false
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState({
      persons: persons
    })
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }


  render() {

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}
            />
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>I am a react app</h1>
        <button style={style} onClick={this.togglePersonsHandler}>Toggle</button>
        {persons}
      </div>

    );
  }
}

export default App;
