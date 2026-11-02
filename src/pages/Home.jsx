import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <header className="navbar">
        <div className="logo">
          <div className="logo-icon">C</div>

          <div>
            <h2>CampusWay</h2>
            <span>Smart Campus Navigation</span>
          </div>
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/map">Campus Map</Link>
          <Link to="/events">Events</Link>

          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </nav>
      </header>

      <main className="simple-page">
        <h1>Welcome to CampusWay</h1>

        <p>
          Smart campus navigation for students, faculty and visitors.
        </p>

        <Link to="/map">
          <button className="navigate-btn">
            Open Campus Navigation →
          </button>
        </Link>
      </main>
    </div>
  )
}

export default Home