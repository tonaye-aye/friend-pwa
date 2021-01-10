//import react
import React, { useState, useEffect } from 'react'

// import Material UI
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

// import components
import Nav from './components/Nav'
import Form from './components/Form'
import Todo from './components/Todo'

export default function App() {
  // state stuff
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])
  const [value, setValue] = React.useState(0)
  // run once
  useEffect(() => {
    // get local todos
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'))
      setTodos(todoLocal)
    }

    // Code to handle install prompt on desktop
    let deferredPrompt
    const addBtn = document.querySelector('.install')

    addBtn.style.display = 'none'

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt = e
      // Update UI to notify the user they can add to home screen
      addBtn.style.display = 'block'

      addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none'
        // Show the prompt
        deferredPrompt.prompt()
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt')
          } else {
            console.log('User dismissed the A2HS prompt')
          }
          deferredPrompt = null
        })
      })
    })
  }, [])
  // useEffect - run every time 'todos' or 'status' states are changed
  useEffect(() => {
    // filter handler
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true))
        break
      case 'incomplete':
        setFilteredTodos(todos.filter((todo) => todo.completed === false))
        break
      default:
        setFilteredTodos(todos)
        break
    }
    // save todos to local storage
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos, status])

  return (
    <React.Fragment>
      <CssBaseline />
      <Nav value={value} setStatus={setStatus} setValue={setValue} />
      <Container maxWidth="md">
        <Button
          variant="contained"
          color="secondary"
          diasbleElevation
          className="install"
        >
          Install app
        </Button>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Remind me!
        </Typography>
        <Form
          inputText={inputText}
          setInputText={setInputText}
          todos={todos}
          setTodos={setTodos}
          setStatus={setStatus}
        />
        <section>
          {filteredTodos.map((todo) => (
            <Todo
              setTodos={setTodos}
              todo={todo}
              todos={todos}
              text={todo.text}
              key={todo.id}
            />
          ))}
        </section>
      </Container>
    </React.Fragment>
  )
}
