import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FeedbackForm = () => {
  const [form, setForm] = useState({ name: '', email: '', rating: '', comment: '' })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {}
    if (!form.name) newErrors.name = 'Name is required'
    if (!form.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email'
    if (!form.rating) newErrors.rating = 'Rating is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const feedback = JSON.parse(localStorage.getItem('feedbacks') || '[]')
    feedback.push({ id: Date.now().toString(), ...form })
    localStorage.setItem('feedbacks', JSON.stringify(feedback))
    navigate('/students')
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl mb-4">Give Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'email', 'rating', 'comment'].map((field) => (
          <div key={field}>
            <label className="block capitalize">{field}</label>
            <input
              type={field === 'rating' ? 'number' : 'text'}
              min={1} max={5}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  )
}

export default FeedbackForm
