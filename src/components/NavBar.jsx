import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const linkClass = (path) =>
    `hover:underline ${location.pathname === path ? 'text-blue-400' : ''}`

  return (
    <nav className="bg-gray-800 text-white px-6 py-3">
      <ul className="flex gap-4">
        <li><Link className={linkClass('/')} to="/">Home</Link></li>
        <li><Link className={linkClass('/feedback')} to="/feedback">Give Feedback</Link></li>
        <li><Link className={linkClass('/students')} to="/students">Students</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
