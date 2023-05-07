import { FormEvent, useCallback } from "react";

const url = "http://localhost:5000/auth/signup";

type MyElement = HTMLCollection & {
  name: HTMLInputElement, 
  age: HTMLInputElement, 
  email: HTMLInputElement, 
  password: HTMLInputElement
};

export default function SignUp() {
  const submit = useCallback((e: FormEvent) => {
    e.preventDefault();
    let target = e.currentTarget as HTMLFormElement
    const { name, age, email, password } = target.children as HTMLCollection & MyElement;
    fetch(target.action, {
      method: "POST",
      credentials: "include",
      body: new URLSearchParams({
        name: name.value,
        age: age.value,
        password: password.value,
        email: email.value,
      }),
    }).then((response: Response) => {
      if (response.ok) window.location.href = "/post";
    });
  }, []);

  return (
    <>
      <form action={url} method="post" onSubmit={submit}>
        <h1>Sign Up</h1>
        <input type="text" name="name" id="" placeholder="Name" />
        <input type="number" name="age" id="" placeholder="Age" />
        <input type="email" name="email" id="" placeholder="Email" />
        <input type="password" name="password" id="" placeholder="Password" />
        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
}
