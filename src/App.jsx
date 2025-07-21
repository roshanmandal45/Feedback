import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import FeedbackForm from './page/FeedbackForm'
import StudentsList from './page/Studentlist'
import FeedbackDetail from './page/FeedbackDetails'
import EditFeedback from './page/EditFeedback'
import Navbar from './components/NavBar'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/students" element={<StudentsList />} />
        <Route path="/feedback/:id" element={<FeedbackDetail />} />
        <Route path="/feedback/:id/edit" element={<EditFeedback />} />
      </Routes>
    </Router>
  )
}

export default App
