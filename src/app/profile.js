import React from "react"

import { useIdentityContext } from "react-netlify-identity-widget"

const Profile = () => {
  const { user } = useIdentityContext()

  React.useEffect(() => {
    if (!user) return
    async function fetchTodos() {
      const response = await fetch("/.netlify/functions/todos")
      const data = await response.json()

      console.log(data)
    }
    fetchTodos()
  }, [user])
  return (
    <>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {user.user_metadata && user.user_metadata.full_name}</li>
        <li>E-mail: {user.email}</li>
      </ul>
    </>
  )
}

export default Profile
