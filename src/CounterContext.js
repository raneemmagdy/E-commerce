import { createContext, useState } from "react";

export const CounterContext=createContext(0)
export function CounterContextProvider(){
    let [counter,setCounter]=useState(0)
    return<CounterContext.Provider value={{counter,setCounter}}></CounterContext.Provider>
}