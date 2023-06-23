"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

const Login = (props : any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e : any) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      username: username,
      password: password,
      redirect: true,
      callbackUrl: "/"
    })
  }

  return (
    <form onSubmit={onSubmit}>
      username: <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} /><br />
      password <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} /><br /><br />

      <button>Bejelentkezés</button>

    </form>
  )
}

export default Login;