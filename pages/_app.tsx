import App, { Container } from "next/app"
import React from "react"
import { AppContextProvider } from "../components/ContextProvider"
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    )
  }
}

export default MyApp
