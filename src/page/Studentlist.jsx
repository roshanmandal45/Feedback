import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const StudentsList = () => {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('feedbacks') || '[]')
    setFeedbacks(data)
  }, [])

  const deleteFeedback = (id) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return
    const updated = feedbacks.filter(f => f.id !== id)
    setFeedbacks(updated)
    localStorage.setItem('feedbacks', JSON.stringify(updated))
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Student Feedbacks</h2>
      <div className="grid gap-4">
        {feedbacks.map(fb => (
          <div key={fb.id} className="p-4 border rounded shadow">
            <h3 className="font-bold">{fb.name} ({fb.rating}★)</h3>
            <p>{fb.comment}</p>
            <div className="flex gap-4 text-sm mt-2">
              <Link className="text-blue-600" to={`/feedback/${fb.id}`}>View</Link>
              <Link className="text-yellow-600" to={`/feedback/${fb.id}/edit`}>Edit</Link>
              <button onClick={() => deleteFeedback(fb.id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentsList

