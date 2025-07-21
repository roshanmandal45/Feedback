import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const EditFeedback = () => {
  const { id } = useParams()
  const [form, setForm] = useState({ name: '', email: '', rating: '', comment: '' })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('feedbacks') || '[]')
    const fb = all.find(f => f.id === id)
    if (fb) setForm(fb)
    else navigate('/students')
  }, [id, navigate])

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

    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]')
    const updated = feedbacks.map(f => f.id === id ? form : f)
    localStorage.setItem('feedbacks', JSON.stringify(updated))
    navigate('/students')
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl mb-4">Edit Feedback</h2>
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  )
}

export default EditFeedback
