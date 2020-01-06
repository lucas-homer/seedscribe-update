import React from "react"

import { useIdentityContext } from "react-netlify-identity-widget"

const Profile = () => {
  const { user } = useIdentityContext()
  const [todoInput, setTodoInput] = React.useState("")
  const [todos, setTodos] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!user) return
    async function fetchTodos() {
      // setLoading(true)
      const response = await fetch("/.netlify/functions/todos")
      console.log(response)
      const data = await response.json()
      // setTodos(data)
      // setLoading(false)
      console.log(data)
    }
    fetchTodos()
  }, [user])

  const handleChange = e => {
    e.preventDefault()
    setTodoInput(e.target.value)
  }

  const handleCreate = async e => {
    e.preventDefault()
    const todoInfo = {
      title: todoInput,
      completed: false,
    }
    // setLoading(true)
    const response = await fetch("/.netlify/functions/todo-create", {
      body: JSON.stringify({
        data: todoInfo,
        ts: new Date().getTime() * 10000,
      }),
      method: "POST",
    })
    const savedTodo = await response.json()
    setTodoInput("")
    // setLoading(false)
    console.log("created Todo", savedTodo)
  }

  // if ()
  return (
    <>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {user.user_metadata && user.user_metadata.full_name}</li>
        <li>E-mail: {user.email}</li>
      </ul>
      <form>
        <label>To Do </label>{" "}
        <input type="text" onChange={handleChange} value={todoInput} />{" "}
        <button onClick={handleCreate}>Add</button>
      </form>
    </>
  )
}

export default Profile
