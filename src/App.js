import react, { Component } from 'react'
import './App.css';
import Person from './Person/Person'

class App extends Component
{
  state = {
    persons: [
      {id: 'ajhf', name: 'Maximilian', age: "28"},
      {id: 'hfdl', name: 'Manu', age: "29"},
      {id: 'lkhd', name: 'Stephanie', age: "27"}
    ],
    showPersons: false
  }

  /*switchNameHandler = (newName) =>{
    this.setState({
      persons: [
        {id: '', name: newName, age: "28"},
        {name: 'Manu', age: "29"},
        {name: 'Stephanie', age: "26"}
      ],
    })
  }*/

  nameChangedHandler = (event, id)=>{

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value;

    const persons = [...this.state.persons];//this is done to change the state in a copy of the state
    persons[personIndex] = person;


    this.setState({persons: persons});
  }

  tooglePersonHandler = () =>{
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  delPersonHandler = (index) =>{
    const persons = this.state.persons.slice();//Need to create copy of the state with slice() or use SPREAD operator
    persons.splice(index, 1);
    this.setState({persons: persons});
  }

  render() {

    const style = {
        backgroundColor: 'green',
        marginTop: '10px',
        font: 'inherit',
        border: '1px solid blue',
        padding: '8px',
        cursor: 'pointer'
    }

    let persons = null;

    if (this.state.showPersons)
    {
      persons = (
        this.state.persons.map((person, index) => {
          return <Person
            click={() => this.delPersonHandler(index)}
            name={person.name}
            age={person.age}
            key={person.id}
            changed={(event)=> this.nameChangedHandler(event, person.id)}
           />
        })
      );
      style.backgroundColor = 'blue';
      style.color = 'white';
    }
    const classes = [];
    if (this.state.persons.length <= 2)
      classes.push('red');
    if (this.state.persons.length <= 1)
      classes.push('bold');

    return (
      <div className="App">
        <h2> Hi I'm a react app</h2>
        <p className={classes.join(' ')}>It's really working</p>
        <button style={style} onClick={this.tooglePersonHandler}>Toogle Person</button>
        {persons}
      </div>
    )
  }
}

export default App;
