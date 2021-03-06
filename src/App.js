import React, { Component } from 'react';
import Person from './Person/Person';
import Redium, { StyleRoot } from 'radium';
import './App.css';


class App extends Component {
  state = {
    persons: [
      {id: 1,name: 'Pooja', age: 25},
      {id: 2,name: 'Brinju', age: 23},
      {id: 3,name: 'Ashish', age: 18}
    ],
    otherState: "some valuee......",
    showPerson: false
  }

  switchNameHandler = (newName) => {
    // this.state.persons[0].name = "Pooji";  react will not recognize this 
    this.setState({
      persons: [
        {id: 1,name: newName, age: 25},
        {id: 2,name: 'Brinju', age: 23},
        {id: 3,name: 'Ashish', age: 19}
      ]
    })
  }

  // nameChangedHandler = (event) => {
  //   this.setState({
  //     persons: [
  //       {id: 1,name: 'Pooja', age: 25},
  //       {id: 2,name: event.target.value, age: 23},
  //       {id: 3,name: 'Ashish', age: 19}
  //     ]
  //   })
  // }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    });
    const person = {
      ...this.state.persons[personIndex]
    }
    // const person = Object.assign({}, this.state.persons[personIndex])
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons: persons});
  }

  deleteUserHandler = (personIndex) => {
    // const persons = this.state.persons; it's not a good approch to use state object 
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({showPerson: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black',
      }
    }

    let persons = null;
    if (this.state.showPerson) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
              return <Person 
                name={person.name} 
                age={person.age}
                key={person.id}
                click={() => this.deleteUserHandler(index)}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              />
            })
          }
          {/* <Person 
            name={this.state.persons[0].name} 
            age={this.state.persons[0].age} />
          <Person 
            name={this.state.persons[1].name} 
            age={this.state.persons[1].age} 
            click={this.switchNameHandler.bind(this, 'Poojuuu')} 
            changed={this.nameChangedHandler} />
          <Person 
            name={this.state.persons[2].name} 
            age={this.state.persons[2].age} />  */}
        </div>
      );
      // change background color on click of button...
      style.backgroundColor = 'red'
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    // let classes = ['red', 'bold'].join(' '); ORR
    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red');
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App..!!!</h1>
          <p className={classes.join(' ')}>This is really working...</p>
          {/* <button onClick={this.switchNameHandler}>Switch Name</button> */}
          {/* <button style={style} onClick={() => this.switchNameHandler('Poojiii')}>Switch Name</button> */}
          <button style={style} onClick={this.togglePersonHandler}>Toggle Person</button>
          {/* <Person name="Pooja" age="24"/> */}
          {/* <Person name="Brinju" age="25" > TRETSTES</Person>
          <Person name="Ashish" age="27"/> */}
          {/* -----OR------ */}
          {/* <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
          <Person 
            name={this.state.persons[1].name} 
            age={this.state.persons[1].age} 
            click={this.switchNameHandler.bind(this, 'Poojuuu')} 
            changed={this.nameChangedHandler} />
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age} /> */}
          
          
          {/* {
            this.state.showPerson ? 
              <div>
                <Person 
                  name={this.state.persons[0].name} 
                  age={this.state.persons[0].age} />
                <Person 
                  name={this.state.persons[1].name} 
                  age={this.state.persons[1].age} 
                  click={this.switchNameHandler.bind(this, 'Poojuuu')} 
                  changed={this.nameChangedHandler} />
                <Person 
                  name={this.state.persons[2].name} 
                  age={this.state.persons[2].age} /> 
              </div> : null
          } */}
          {/* -----OR------ */}
          {persons}
        </div>
      </StyleRoot>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a react app'));
  }
}

export default Redium(App);
