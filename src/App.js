import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import History from './Components/History/History';
import Keypad from './Components/Keypad/Keypad';
import Result from './Components/Result/Result';
import { HiOutlineLightBulb, HiLightBulb } from 'react-icons/hi'
import { RiHistoryLine } from 'react-icons/ri'
import { useState } from 'react';

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function App() {
  const [isDrakMode, setIsDarkMode] = useState(false);
  const [historyShow, setHistoryShow] = useState(false);
  const [history, setHistory] = useState([])
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  
  const handleKeyPress = (keyCode, key) => {
    if(!keyCode) return;
    if(!usedKeyCodes.includes(keyCode)) return;

    if(numbers.includes(key)){
      
      if(key === "0"){
      if(expression.length === 0) return;
    }
    calculatorResult(expression +  key)
      setExpression(expression + key);

    }else if(operators.includes(key)){

      if(!expression) return;
      const lastChr = expression.slice(-1);
      if(operators.includes(lastChr)){
        const temexp = expression.slice(-1);
        setExpression(temexp + key);
        }
      if(lastChr === ".") return;

      setExpression(expression + key);
      if(result){
        setExpression(result + key)
      }

    }else if(keyCode === 8){
      if(!expression) return;
      calculatorResult(expression.slice(0, -1));
      setExpression(expression.slice(0, -1))
    }else if(key === "."){
      if(!expression || expression.includes(".")) return;
      const lastChr = expression.slice(-1);
      if(!numbers.includes(lastChr)) return;
      setExpression(expression + key)
    }else if(keyCode === 13){

      if(!expression) return;
      calculatorResult(expression)
      const tempHistory = [...history];
      if(tempHistory.indexOf(expression + "") !== -1){
        if(tempHistory.at(-1) === (expression + "")) return;
      }
      tempHistory.push(expression);
      setHistory(tempHistory)
    }

  }
  
  const calculatorResult = (exp) => {
    if(!exp) {
      setResult("");  
      return
    };
    const lastChr = exp.slice(-1);
    if(!numbers.includes(lastChr)) exp = exp.slice(0, -1);
    const answer = eval(exp).toFixed(0) + "";
    setResult(answer);
  }

  const historryClean = () => {
    if(history.length === 0){
      toast.error("There's no History yet !", {
        autoClose: 2000
      });
    }else{
      setHistory([]);
      toast.success("History Clear Successfully (:", {
        autoClose: 2000
      });
    }
  }

  const cleanExpression = () => {
    if(history.length === 0 && expression.length === 0) return;
      setExpression("");
      setResult("");
      toast.success("Clear Successfully", {
        autoClose: 2000
      });
    
  }

  return (
    <div data-theme={!isDrakMode ? "" : "dark"} className="app" tabIndex={0} onKeyDown={(event) => handleKeyPress(event.keyCode, event.key)}>
      <div className="calculator_body">
        
      <div className='header'>
      <div className='header_container'>
      <div onClick={() => setIsDarkMode(!isDrakMode)}><p>{!isDrakMode ? <HiOutlineLightBulb size={23} className="icons"/> : <HiLightBulb size={23} className="icons"/>}</p></div>

      <div className='logo_text'><p>Calculator</p></div>

      <div onClick={() => setHistoryShow(!historyShow)}><p>{<RiHistoryLine size={20} className="icons"/>}</p></div>

      </div>
      </div>
        <Result result={result} expression={expression}/>
        <button  className='cleanExpression' onClick={() => cleanExpression()}>C</button>
      <div className='keypad_History'>
        <Keypad handleKeyPress={handleKeyPress}/>
        <History historryClean={historryClean} history={history} historyShow={historyShow}/>
      </div>
        
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
