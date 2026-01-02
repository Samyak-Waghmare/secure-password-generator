import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  //1) length ko track karne ke liye useState lagega
  const [length, setLength] = useState(8)

  //2) numbers lena padega aisa nhi hai UseState ke sath true or false(default value)
  const [numberAllowed, setNumberAllowed] = useState(false)

  //3) same as numbers
  const [charAllowed, setCharAllowed] = useState(false)

  //4) input field -> password
  const [password, setPassword] = useState("")

  const [copied, setCopied] = useState(false)

  //useRef hook
  const passwordRef = useRef(null)//default value nahi h//passowrd ref ke andar koi ref nhi hai

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      //array ki index value aayi hai random

      pass += str.charAt(char);//string me se character ko uthana padega
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

    const getStrength = () => {
  let score = 0;

  // length contribution
  if (length >= 6) score++;      // minimum
  if (length >= 10) score++;
  if (length >= 14) score++;
  if (length >= 18) score++;

  // complexity contribution
  if (numberAllowed) score++;
  if (charAllowed) score++;

  if (score <= 1) {
    return {
      label: "Very Weak",
      bar: "w-[20%]",
      color: "bg-red-600 text-red-400",
    };
  }
  if (score === 2) {
    return {
      label: "Weak",
      bar: "w-[40%]",
      color: "bg-orange-500 text-orange-400",
    };
  }
  if (score === 3) {
    return {
      label: "Good",
      bar: "w-[60%]",
      color: "bg-yellow-500 text-yellow-400",
    };
  }
  if (score === 4 || score === 5) {
    return {
      label: "Strong",
      bar: "w-[80%]",
      color: "bg-green-500 text-green-400",
    };
  }
  return {
    label: "Very Strong",
    bar: "w-full",
    color: "bg-emerald-500 text-emerald-400",
  };
};

const strength = getStrength();



  const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0, length)
  window.navigator.clipboard.writeText(password)

  setCopied(true)
  setTimeout(() => setCopied(false), 1500)
}, [password, length])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[520px] w-[520px] rounded-full bg-purple-500/15 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        
      />
        <div className="relative w-full max-w-2xl shadow-2xl rounded-2xl px-10 py-10 bg-gray-900/70 backdrop-blur-xl border border-white/10">
        <h1 className='text-white text-3xl font-semibold text-center mb-8 tracking-tight'>Password Generator</h1>
        <div className="flex items-center shadow-md rounded-lg overflow-hidden mb-8">
            <input
                type="text"
                value={password}
                className="outline-none w-full py-4 px-5 text-xl font-mono bg-gray-950/40 text-white placeholder-gray-400"
                placeholder="Password"
                readOnly
                ref={passwordRef}
            />
          <button
          onClick={copyPasswordToClipboard}
          className={`outline-none px-7 py-4 text-lg font-semibold transition shrink-0
            ${copied 
              ? 'bg-green-600 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        </div>
        /* Strength */
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/80 text-sm">Strength</p>
            <span className={`text-sm font-semibold ${strength.color.split(" ").pop()}`}>
              {strength.label}
            </span>
          </div>

          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full ${strength.bar} ${strength.color.split(" ")[0]} transition-all duration-300`}
            />
          </div>
        </div>
        <div className="flex flex-col text-base gap-y-6">
          <div className="flex items-center justify-between gap-x-6">
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer w-full accent-blue-500'
            onChange={(e) => {setLength(e.target.value)}}
              />
              <label className="text-white font-medium whitespace-nowrap">Length: {length}</label>
          </div>
          
          <div className="flex items-center gap-x-3 text-white">
          <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                  setNumberAllowed((prev) => !prev);
              }}
          />
          
          <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-3  text-white">
              <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="characterInput"
                  onChange={() => {
                      setCharAllowed((prev) => !prev )
                  }}
              />
              <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
