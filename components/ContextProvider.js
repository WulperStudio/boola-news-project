import React, { useEffect, useReducer, useContext, createContext } from "react"

const initialState = {
  token: "",
  dataSession: {},
  domain: "",
  dataBlog: {},
  temp:{}
}

export const AppContext = createContext(null)
const { Provider } = AppContext;

const reducer = (state, action) => ({ ...state, ...action })

export const AppContextProvider = ({ children }) => {
  const [state, setState] = useReducer(reducer, initialState)

  useEffect(() => {}, [])
  const values = React.useMemo(() => [state, setState], [state])

  return <Provider value={values}>{children}</Provider>
}

function useAppContext() {
  return useContext(AppContext)
}

export default useAppContext
