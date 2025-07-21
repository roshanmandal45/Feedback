import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const FeedbackDetail = () => {
  const { id } = useParams()
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('feedbacks') || '[]')
    const fb = all.find(f => f.id === id)
    setFeedback(fb)
  }, [id])

  if (!feedback) return <div className="p-6">Feedback not found</div>

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{feedback.name}</h2>
      <p><strong>Email:</strong> {feedback.email}</p>
      <p><strong>Rating:</strong> {feedback.rating} / 5</p>
      <p><strong>Comment:</strong> {feedback.comment}</p>
      <Link className="text-blue-500 underline mt-4 block" to="/students">← Back to list</Link>
    </div>
  )
}

export default FeedbackDetail

