# React Concepts 

## setState 
When this is called the first thing react will do is merge the object you passed into setState into the current state of the component. This will kick off a process called reconciliation with the goal of updating the UI to the new state in the most efficient way. To do this, react will construct a three of new react elements. Once it has this tree, to figure out how the UI should change in response to the new state, React will diff this new tree against the previous element tree. By doing this, React will then know the exact changes which occured, and by knowing exactly what changes occured, will be able to minimize its footprint on the UI by only making updates where necessary. 

## Difference between Element and Component 

React element describes what you want to see on the screen. it is an object representation of some UI. 

A react component is a function or a class which optionally accepts input and return a React element 

## When to use a Class component over a Functional Component 

if your component has a state or a lifecycle methods, use a Class component (or Hooks). Otherwise use a Functional component. 

## What are refs and why are they important 
Refs are an escape hatch which allow you to get direct access to a DOM element or an instance of a component. To use them you add a ref attribute to your component whose value is a callback function which will receive the underlying DOM element or the mounted instance of the component as its first argument. 
```
class UnControlledForm extends Component {
    input = React.createRef()
    handleSubmit = () => {
        console.log("Input Value: ", this.input.current.val)
    }
    render () {
        return (
            <form onSubmit={this.handleSubmit}>
            <input
                type='text'
                ref={this.input}
            />
            <button type='submit'>Submit</button>
        )
    }
}
```

## What are keys 
Keys are what help react keep track of what items have changed, been added or been removed from a list. 

```
function List ({todos}) {
    return (
        <ul>
            {todos.map(({task, id}) => <li key={id}>{task}</li>)}
        </ul>
    )
}
```

Each key has to be unique among siblings. Without keys, react can't know which local state corresponds to which item on move. Never neglect keys when mapping. 


## What would the component definition of Twitter below look like 
```
<Twitter username='tylermcginnis'>
    {(user) => user === null
        ? <Loading/>
        : <Badge info={user}/>}
</Twitter>
```

Solution

```
import React, {Component, PropType} from 'react'; 
import fetchUser from 'twitter'
// fetchUser take in a username returns a promise 
// which will resolve with that username's data. 

class Twitter extends Component {
    state = {
        user: null, 
    }

    static propTypes = {
        username: PropTypes.string.isRequired,
    }

    componentDidMount () {
        fetchUser(this.props.username)
            .then((user) => this.setState({user}))
    }

    render () {
        return this.props.children(this.state.user)
    }
}
```

## What's the difference between a controlled component and an uncontrolled component ? 

A controlled component is a component where React is in control and is the single source of truth for the component data. 

```
class ControlledForm extends Component {
    state = {
        username: ''
    }

    updateUsername = (e) => {
        this.setState({
            username: e.target.value, 
        })
    }
    
    handleSubmit = () => {}

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    value={this.updateUsername} />
                <button type='submit'>Submit</button>
            </form>
        )
    }
}
```

An uncontrolled component is where you form data is handled by the DOM instead of inside your react component 

You use refs to accomplish this. 


## In whic lifecyce method do you make AJAX request within a class components 

Ajax request should go in the componentDidMount lifecycle method. 

The reason for this is because you can't guarantee the AJAX request won't resolve before the component mounts. If it did, that would mean that you'd be trying to setState on an unmounted component, which not only won't work but react will yell at you for. ComponentDidMount will guarantee that there's a component to update. 

## what does shouldComponentUpdate do. 
It allows us to opt out of the reconciliation process for certain components and their child components. by returning false. 

## How do you tell react to build in Production mode and what will that do. 

You set process.env.NODE_ENV to production. When it's in production mode it strips out any development features like warnings. 

## why would you use React.Children.map(props.children, () => ) instead of props.children.map(() =>)

It's not guaranteed that props.children will be an array. React only makes props.children an array if there are more than one child elements, 

## Describe how events are handled in React 
