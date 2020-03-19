import React,{ useState,useEffect,createContext,useContext} from 'react';
import './App.css';

let CountContext = createContext();
function CountChild(){
  let count = useContext(CountContext)
return (<h2 >{count}</h2>)
}
function App() {
  useEffect(()=>{
  },[]);


  let [count ,setCount] = useState(1)
  return (
    <div className="App">
      <p>{count}</p>
      <button onClick={()=>{setCount(count+1)}}>click me</button>
      <CountContext.Provider value={count}></CountContext.Provider>
    </div>
  );
}


export default App;
