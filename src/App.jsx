import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [number,setNumberAl] = useState(false)
  const [char,setCharAl]= useState(false)
  const [password,setPassword]= useState("")

  //useef hook
  const passwordRef = useRef(null)

  const passwordCopy = useCallback(()=> {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator = useCallback(()=>{
    let pass= ""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) str += "0123456789"
    if (char) str += "$#%&@{}_-+="

    for (let i = 1; i < length; i++){
      let c = Math.floor(Math.random() * str.length+1)

      pass += str.charAt(c)
    
    }
    setPassword(pass)

  },[length,number,char,setPassword])
  useEffect(() => {passwordGenerator()},[length, number, char, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto h-auto max-h-md shadow-md rounded-lg px-4 my-5 text-orange-500 bg-gray-700'>
        <h1 className='text-4xl text-center text-white my-3'> Password Generator </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef} />
          <button onClick={passwordCopy} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2s'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer' 
              onChange={(e)=> setLength(e.target.value)}/>
              <label> Length: {length}  </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={number}
            id='numberinput'
            onChange={()=> {
              setNumberAl((prev)=> !prev);
            }} />
            <label htmlFor="numberinput"> Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={char}
            id='charinput'
            onChange={()=> {
              setCharAl((prev)=> !prev);
            }} />
            <label htmlFor="charinput"> Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
