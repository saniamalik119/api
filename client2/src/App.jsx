
import axios from 'axios'
import { useRef, useState } from 'react'
import './App.css'

function App() {
  const inputRef = useRef()
  const [qna, setQna] = useState([
    {
      id: 1,
      from: "You",
      value: "How can i  help you"
    },
    {
      id:2,
      from: "AI",
      value:[ "from ai message", "Message2"]
    },

  ])
  const [btn, setBtn] = useState(true)
const updateOne = (id, value) =>{
  setQna( (qna) => [...qna,    {id, value  },])
}
    const valueHandler = ()=>{
    const question = inputRef.current.value
    updateOne(1, question)

    setBtn(false)
    axios.post("http://localhost:3000/chat", {question}).then( (response) =>{
      updateOne(2, response.data.answer)
    }).finally( ()=>{
      setBtn(true)
    })
  }
  const renderContent= (qna)=>{
    const value = qna.value
     if(Array.isArray(value)){
         return  <p className='h-p'>{value}</p>
     }
     return <p className='b-p'>{value}</p>
  }
  return (
  
    <div >
    <div>
      <h1 className='sa'>Sania Malik</h1>
    </div>
    {qna.map( (qna, id) =>{
        if(qna.from === "AI"){
        return(
          <div key={id}>
                  {renderContent(qna)}
                </div>
        )}
      return(
        <div key={id}>
        {renderContent(qna)}
                </div>
      )
    })}{
        !btn &&(
          <div >
          <p className='typing'>typing...</p>
                </div>
        )}
   <div >
      <form >
        <input
        ref={inputRef}
         type='text' 
         className='f-in'
          placeholder='Ask me something'/>
          <p className='send' 
          disabled={btn}
          onClick={valueHandler}>Send</p>
      </form>
    </div>
    </div>
  )
}

export default App
