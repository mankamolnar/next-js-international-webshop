"use client"

import { Providers } from "../redux/provier";
import { ThemeProvider } from 'next-themes'

export default function Container(props : any) {
  return <html lang={props.lang}>
    <body>
      <ThemeProvider attribute="class">
        <Providers>
          {props.children}
        </Providers>
      </ThemeProvider>
    </body>
  </html>

}