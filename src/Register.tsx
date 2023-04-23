import { FormEvent, useCallback } from "react"

const url = "http://localhost:5000/auth/signup"

type MyFormEvent = FormEvent & {
  currentTarget: Record<string, any>
}

type MyElement = Element & {
  value: string
}

function Register() {

  const submit = useCallback((e: MyFormEvent) => {
    e.preventDefault()
    const [name, age, email, password] = e.currentTarget.children
    fetch(e.currentTarget.action, {
      method: "POST",
      credentials: "include",
      body: new URLSearchParams({
        name: (name as MyElement).value,
        age: (age as MyElement).value,
        password: (password as MyElement).value,
        email: (email as MyElement).value,
      })
    })
      .then((response: Response) => {
        if (response.ok) return response.json()
      })
      .then((response: JSON) => {
        window.location.href = '/post'
      })
  }, [])

  return (
    <>
      <form action={url} method="post" onSubmit={submit}>
        <input type="text" name="name" id="" placeholder="Name" />
        <input type="number" name="age" id="" placeholder="Age" />
        <input type="email" name="email" id="" placeholder="Email" />
        <input type="password" name="password" id="" placeholder="Password" />
        <input type="submit" value="Register" />
      </form>
    </>
  )
}

export default Register
