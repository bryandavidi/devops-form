import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Select } from 'antd'

function App() {
  const [count, setCount] = useState(0)
  const [inputType, setInputType] = useState<string>('')

  const inputList = [
    {value: 'text', label: 'Texto'},
    {value: 'checkbox', label: 'Varias Opciones'},
    {value: 'select', label: 'Casillas'},
    {value: 'dropdown', label: 'Desplegable'}
  ]

  const formIputsList = [{}]

  const handleSelectInputType =(value : string) =>{
    setInputType(value)
  }

  const handleButtonAdd= () =>{
    formIputsList.push(inputType)
  }

  return (
    <>
      <div className='container'>
        <div className='options'>
          <Button onClick={handleButtonAdd}>Add</Button>
          <Select
            defaultValue={inputList[0].label}
            style={{width:120}}
            onChange={handleSelectInputType}
            options={inputList}
          />
        </div>
        <div className='form'>
          <form>
            {formIputsList.map((form) => (
              
            ))}
          </form>
        </div>
      </div>
      
    </>
  )
}

export default App
