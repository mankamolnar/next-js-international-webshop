"use client";

import { useState, useEffect } from "react";

export default function Page(props : any) {

  const [data, setData] = useState("first");

  useEffect(() => {
    setData("second");
  }, [])

  return <div>{data}</div>
}
