import { FormEvent, useCallback } from "react";

const url = "http://localhost:5000/auth/signin";

type MyElement = HTMLCollection & {
  email: HTMLInputElement;
  password: HTMLInputElement;
};

export default function SignIn() {
  const submit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLFormElement;
    const { email, password } = target.children as HTMLCollection & MyElement;
    fetch(target.action, {
      method: "POST",
      credentials: "include",
      body: new URLSearchParams({
        password: password.value,
        email: email.value,
      }),
    })
      .then((response: Response) => {
        if (response.ok) return response.json();
      })
      .then((response: JSON) => {
        window.location.href = "/post";
      });
  }, []);

  return (
    <>
      <form action={url} method="post" onSubmit={submit}>
        <h1>Sign In</h1>
        <input type="email" name="email" id="" placeholder="Email" />
        <input type="password" name="password" id="" placeholder="Password" />
        <input type="submit" value="Sign In" />
      </form>
    </>
  );
}
