import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import "./Form.css"

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    message: ''
    })

    const handleChange = (e) =>{
      const { name, value } = e.target
      setFormData({
        ...formData,
        [name]: value.trimStart()
      })
    }

    const handleSubmit = async(e) => {
      e.preventDefault()

      try{
        const result = await axios.post('http://localhost:3005/receive',formData)
        console.log(result)
        toast.success(result.data.message)
      }catch(err){
        console.log(err)
      }
    }

  return (
    <>
    <form onSubmit={handleSubmit} className="form-container">
    <label htmlFor="name" className="form-label">Name:</label>
    <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} required className="form-input"/><br />

    <label htmlFor="email" className="form-label">Email:</label>
    <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} required className="form-input"/><br />

    <label htmlFor="phone" className="form-label">Phone:</label>
    <input type="tel" id="phone" name="phone" onChange={handleChange} value={formData.phone}required className="form-input"/><br />

    <label htmlFor="skills" className="form-label">Skills:</label>
    <textarea id="skills" name="skills" onChange={handleChange} value={formData.skills} required className="form-input"></textarea><br />

    <label htmlFor="message" className="form-label">Why should we hire you?</label>
    <textarea id="message" name="message" onChange={handleChange} value={formData.message} required className="form-input"></textarea><br />

    <button type="submit" className="form-button">Submit</button>
  </form>
    </>
  )
}

export default Form