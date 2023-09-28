"use client";

import { signIn, signOut } from "next-auth/react";

const LoginButton = ({ session } : any) => {

  // console.log(session);

  return session ? (
    <button onClick={() => signOut()}>
      Kijelentkezés
    </button>
  ) : (
    <button onClick={() => signIn()}>
      Bejelentkezés
    </button>
  )
}

export default LoginButton;