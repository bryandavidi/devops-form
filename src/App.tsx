import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Select, Input, Radio, Checkbox } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

function App() {
  const [inputType, setInputType] = useState<string>('');
  const [formInputsList, setForm] = useState<{ type: string; title: string; options: string[] }[]>([]);
  const [title, setTitle] = useState<string>('');
  const [optionInput, setOptionInput] = useState<string>(''); // State for options input
  const [options, setOptions] = useState<string[]>([]);
  const [userResponses, setUserResponses] = useState<{ [key: string]: string }>({});

  const inputList = [
    {value: 'text', label: 'Texto'},
    {value: 'checkbox', label: 'Varias Opciones'},
    {value: 'radio', label: 'Casillas'},
    {value: 'select', label: 'Desplegable'}
  ]


  const handleSelectInputType =(value : string) =>{
    setInputType(value)
  }

  const handleButtonAdd= () =>{
    if(inputType){
      const newInput = {type: inputType, title: title, options: options}  
      setForm([...formInputsList, newInput])
      setTitle('')
      setOptions([])
    }
  }

  const handleOptionInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setOptionInput(e.target.value)
  }

  const handleAddOption = () =>{
    if(optionInput){
      setOptions([...options, optionInput])
      setOptionInput('')
    }
  }

  const handleInputChange = (inputTitle: string, value: string) => {
    setUserResponses((prevResponses) => ({
      ...prevResponses,
      [inputTitle]: value,
    }));
  };

  const handleSave = () => {
    // You can access the user's responses from the userResponses state
    console.log('User Responses:', userResponses);
    // Perform further actions to save the responses, e.g., send them to a server or store in local storage
  };

  return (
    <>
      <div className='container'>
        <div className='options'>
          <div className='main-options'>
            <Select
              defaultValue={inputList[0].label}
              onChange={handleSelectInputType}
              options={inputList}
            />
            <Input placeholder='Titulo' onChange={(e) => setTitle(e.target.value)} value={title}/>
          </div>
          {inputType === 'checkbox' || inputType === 'radio' || inputType === 'select' ? (
            <div className='input-options'>
              <Input
                placeholder='Agregar opción'
                value={optionInput}
                onChange={handleOptionInputChange}
              />
              <Button onClick={handleAddOption} disabled={!optionInput.trim()}>Añadir Opción</Button>
            </div>
          ) : null}
          <Button onClick={handleButtonAdd} disabled={!title.trim()}>
            Añadir Campo
          </Button>
        </div>
        <div className='form'>
          <form>
            {
              formInputsList.map((input, index) => {
                return (
                  <div key={index} className='form-input'>
                    <label>{input.title}</label>
                    {
                      input.type === 'text' ? (
                        <Input placeholder='Texto'
                        onChange={(e) => handleInputChange(input.title, e.target.value)}
                        value={userResponses[input.title] || ''}
                        />
                      ) : input.type === 'checkbox' ? (
                        <Checkbox.Group
                          onChange={(values) =>
                            handleInputChange(input.title, values.join(', '))
                          }
                          value={userResponses[input.title]?.split(', ') || []}
                        >
                          {input.options.map((option, optionIndex) => {
                            return (
                              <Checkbox key={optionIndex} value={option}>
                                {option}
                              </Checkbox>
                            );
                          })}
                        </Checkbox.Group>
                      ) : input.type === 'radio' ? (
                        <Radio.Group
                          onChange={(e) =>
                            handleInputChange(input.title, e.target.value)
                          }
                          value={userResponses[input.title]}
                        >
                          {input.options.map((option, optionIndex) => {
                            return (
                              <Radio key={optionIndex} value={option}>
                                {option}
                              </Radio>
                            );
                          })}
                        </Radio.Group>
                      ) : input.type === 'select' ? (
                        <Select
                          onChange={(value) => handleInputChange(input.title, value)}
                          value={userResponses[input.title]}
                          style={{ width: 120 }}
                        >
                          {input.options.map((option, optionIndex) => {
                            return (
                              <Select.Option key={optionIndex} value={option}>
                                {option}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      ) : null
                    }
                  </div>
                )
              })
            }
          </form>
        </div>
        <div className='save'>
          <Button onClick={handleSave} disabled={formInputsList.length === 0}>Guardar Respuestas</Button>
        </div>
      </div>
      
    </>
  )
}

export default App
