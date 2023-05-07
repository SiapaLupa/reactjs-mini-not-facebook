import { useEffect } from "react";


export default function SignOut() {
  useEffect(() => {
    fetch("http://localhost:5000/auth/signout", {
      method: "POST",
      credentials: "include"
    })
      .then((response: Response) => { if (response.ok) return response.json() })
      .then((response: JSON) => {
        window.location.href = "/";
      })
  })
  return (<></>);
}