// const url = "http://localhost:5000"

import { FormEvent, useCallback, useState } from "react";
import SignUp from "./templates/SignUp";
import SignIn from "./templates/SignIn";

export default function Landing() {
  const [auth, setAuth] = useState<boolean>(true);
  return (
    <div className="background">
      <div>
        <h1>Mini Not FaceBook</h1>
      </div>
      <div>
        {auth ? <SignIn /> : <SignUp />}
        <button onClick={() => setAuth(!auth)}>{auth ? "Sign Up": "Sign In"}</button>
      </div>
    </div>
  );
}
