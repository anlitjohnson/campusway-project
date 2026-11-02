import { useState } from 'react'
import './App.css'

function App() {

  const locations = [
  {
    name: 'Library',
    type: 'Facility',
    building: 'Academic Block',
    floor: 'Ground Floor',
    description: 'Main campus library and study area.',
  },
  {
    name: 'MCA Department',
    type: 'Department',
    building: 'Academic Block A',
    floor: 'Second Floor',
    description: 'Department of Computer Applications.',
  },
  {
    name: 'Computer Lab',
    type: 'Laboratory',
    building: 'Academic Block A',
    floor: 'First Floor',
    description: 'Computer laboratory for practical sessions.',
  },
  {
    name: 'Cafeteria',
    type: 'Facility',
    building: 'Campus',
    floor: 'Ground Floor',
    description: 'Food and refreshment area.',
  },
  {
    name: 'Parking',
    type: 'Facility',
    building: 'Main Entrance',
    floor: 'Outdoor',
    description: 'Student and visitor parking area.',
  },
  {
    name: 'Medical Room',
    type: 'Emergency',
    building: 'Administration Block',
    floor: 'Ground Floor',
    description: 'Medical assistance and first-aid facility.',
  },
]

const campusGraph = {
  'Main Entrance': {
    'Parking': 2,
    'Block A': 4,
  },

  'Parking': {
    'Main Entrance': 2,
    'Cafeteria': 3,
  },

  'Block A': {
    'Main Entrance': 4,
    'Computer Lab': 2,
    'Library': 3,
  },

  'Computer Lab': {
    'Block A': 2,
    'MCA Department': 2,
  },

  'Library': {
    'Block A': 3,
    'MCA Department': 4,
    'Cafeteria': 3,
  },

  'Cafeteria': {
    'Parking': 3,
    'Library': 3,
  },

  'MCA Department': {
    'Computer Lab': 2,
    'Library': 4,
  },
}

const [searchTerm, setSearchTerm] = useState('')
const [searchResult, setSearchResult] = useState(null)
const [showNoResult, setShowNoResult] = useState(false)
const [startLocation, setStartLocation] = useState('Main Entrance')
const [destination, setDestination] = useState('')
const [routeStarted, setRouteStarted] = useState(false)
const [calculatedRoute, setCalculatedRoute] = useState([])

const [routeDistance, setRouteDistance] = useState(0)

const handleSearch = () => {
  const result = locations.find((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  )

  if (result && searchTerm.trim() !== '') {
    setSearchResult(result)
    setShowNoResult(false)
  } else {
    setSearchResult(null)
    setShowNoResult(true)
  }
}

const handleGetDirections = (location) => {
  setDestination(location.name)
  setRouteStarted(false)

  document.getElementById('map')?.scrollIntoView({
    behavior: 'smooth',
  })
}

const findShortestPath = (graph, start, end) => {
  const distances = {}
  const previous = {}
  const unvisited = new Set(Object.keys(graph))

  Object.keys(graph).forEach((node) => {
    distances[node] = Infinity
  })

  distances[start] = 0

  while (unvisited.size > 0) {
    let currentNode = null

    unvisited.forEach((node) => {
      if (
        currentNode === null ||
        distances[node] < distances[currentNode]
      ) {
        currentNode = node
      }
    })

    if (currentNode === end) {
      break
    }

    unvisited.delete(currentNode)

    const neighbours = graph[currentNode] || {}

    Object.entries(neighbours).forEach(([neighbour, distance]) => {
      const newDistance =
        distances[currentNode] + distance

      if (newDistance < distances[neighbour]) {
        distances[neighbour] = newDistance
        previous[neighbour] = currentNode
      }
    })
  }

  const path = []
  let current = end

  while (current) {
    path.unshift(current)
    current = previous[current]
  }

  if (path[0] !== start) {
    return []
  }

  return path
}

const calculateRouteDistance = (route) => {
  let total = 0

  for (let i = 0; i < route.length - 1; i++) {
    const current = route[i]
    const next = route[i + 1]

    total += campusGraph[current][next]
  }

  return total
}

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <div className="logo-icon">C</div>
          <div>
            <h2>CampusWay</h2>
            <span>Smart Campus Navigation</span>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#explore">Explore</a>
          <a href="#map">Campus Map</a>
          <a href="#events">Events</a>
          <button className="login-btn">Login</button>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-content">
            <p className="hero-badge">SMART CAMPUS NAVIGATION</p>

            <h1>
              Find your way around
              <span> campus with ease.</span>
            </h1>

            <p className="hero-description">
              Search classrooms, laboratories, departments, facilities and
              event venues from one simple platform.
            </p>

            <div className="search-box">
              <span className="search-icon">⌕</span>
              <input
  type="text"
  placeholder="Where do you want to go?"
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
  onKeyDown={(event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }}
/>
              <button onClick={handleSearch}>Search</button>
            </div>
            {searchResult && (
  <div className="search-result-card">
    <div className="result-top">
      <div>
        <span className="result-type">{searchResult.type}</span>
        <h3>{searchResult.name}</h3>
      </div>

      <span className="result-status">Available</span>
    </div>

    <div className="result-details">
      <p>
        <strong>Building:</strong> {searchResult.building}
      </p>

      <p>
        <strong>Floor:</strong> {searchResult.floor}
      </p>
    </div>

    <p className="result-description">
      {searchResult.description}
    </p>

    <div className="result-actions">
      <button className="details-btn">View Details</button>
      <button
  className="directions-btn"
  onClick={() => handleGetDirections(searchResult)}
>
  Get Directions →
</button>
    </div>
  </div>
)}

{showNoResult && (
  <div className="no-result">
    <strong>Location not found</strong>
    <p>Try searching for Library, MCA Department, Computer Lab or Cafeteria.</p>
  </div>
)}

            <div className="popular-searches">
              <span>Popular:</span>
              <button>Computer Lab</button>
              <button>Library</button>
              <button>Cafeteria</button>
              <button>MCA Department</button>
            </div>
          </div>

          <div className="hero-card">
            <div className="map-placeholder">
              <div className="map-grid"></div>

              <div className="location-point point-one">
                <span></span>
              </div>

              <div className="location-point point-two">
                <span></span>
              </div>

              <div className="location-point point-three">
                <span></span>
              </div>

              <div className="route-line"></div>

              <div className="map-label">
                <small>Destination</small>
                <strong>MCA Department</strong>
                <span>4 min walk</span>
              </div>
            </div>
          </div>
        </section>

        <section className="quick-section" id="explore">
          <div className="section-heading">
            <div>
              <p>EXPLORE CAMPUS</p>
              <h2>Find what you need</h2>
            </div>

            <button className="view-all-btn">View all locations →</button>
          </div>

          <div className="quick-grid">
            <div className="quick-card">
              <div className="quick-icon">🎓</div>
              <h3>Departments</h3>
              <p>Find academic departments and faculty offices.</p>
              <span>Explore →</span>
            </div>

            <div className="quick-card">
              <div className="quick-icon">🧪</div>
              <h3>Laboratories</h3>
              <p>Locate computer, science and research laboratories.</p>
              <span>Explore →</span>
            </div>

            <div className="quick-card">
              <div className="quick-icon">📚</div>
              <h3>Library</h3>
              <p>Navigate to the library and study areas.</p>
              <span>Explore →</span>
            </div>

            <div className="quick-card">
              <div className="quick-icon">☕</div>
              <h3>Cafeteria</h3>
              <p>Find food courts, cafés and refreshment areas.</p>
              <span>Explore →</span>
            </div>

            <div className="quick-card">
              <div className="quick-icon">🚗</div>
              <h3>Parking</h3>
              <p>View student, staff and visitor parking areas.</p>
              <span>Explore →</span>
            </div>

            <div className="quick-card">
              <div className="quick-icon">🏥</div>
              <h3>Emergency</h3>
              <p>Quickly locate medical rooms and campus security.</p>
              <span>Explore →</span>
            </div>
          </div>
        </section>

        <section className="navigation-section" id="map">
  <div className="navigation-info">
    <p className="section-tag">NAVIGATION</p>

    <h2>Your campus journey starts here.</h2>

    <p>
      Choose your current location and destination to find the shortest
      route across campus.
    </p>

    <div className="navigation-form">
      <div className="location-input">
        <div className="dot start-dot"></div>

        <div className="location-select-wrapper">
          <small>STARTING POINT</small>

          <select
            value={startLocation}
            onChange={(event) => {
              setStartLocation(event.target.value)
              setRouteStarted(false)
              setCalculatedRoute([])
            }}
          >
            <option value="Main Entrance">Main Entrance</option>
            <option value="Library">Library</option>
            <option value="MCA Department">MCA Department</option>
            <option value="Computer Lab">Computer Lab</option>
            <option value="Cafeteria">Cafeteria</option>
            <option value="Parking">Parking</option>
          </select>
        </div>
      </div>

      <div className="vertical-line"></div>

      <div className="location-input">
        <div className="dot destination-dot"></div>

        <div className="location-select-wrapper">
          <small>DESTINATION</small>

          <select
            value={destination}
            onChange={(event) => {
              setDestination(event.target.value)
              setRouteStarted(false)
              setCalculatedRoute([])
            }}
          >
            <option value="">Select destination</option>

            {locations.map((location) => (
              <option key={location.name} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="navigate-btn"
        onClick={() => {
          if (!destination) {
            return
          }

          if (startLocation === destination) {
            setCalculatedRoute([startLocation])
            setRouteStarted(true)
            return
          }

          const route = findShortestPath(
            campusGraph,
            startLocation,
            destination
          )

          setCalculatedRoute(route)
          setRouteDistance(calculateRouteDistance(route))
          setRouteStarted(true)
        }}
      >
        Start Navigation →
      </button>

      {routeStarted && calculatedRoute.length > 0 && (
        <div className="route-success">
          <span>✓</span>

          <div>
            <strong>Shortest route found</strong>
            <p>{calculatedRoute.join(' → ')}</p>
          </div>
        </div>
      )}

      {routeStarted && calculatedRoute.length > 0 && (
  <div className="route-summary">
    <div className="route-summary-item">
      <span>Distance</span>
      <strong>{routeDistance} units</strong>
    </div>

    <div className="route-summary-item">
      <span>Estimated time</span>
      <strong>{Math.max(1, Math.ceil(routeDistance * 0.8))} min</strong>
    </div>

    <div className="route-summary-item">
      <span>Stops</span>
      <strong>{calculatedRoute.length}</strong>
    </div>
  </div>
)}
    </div>
  </div>

  <div className="campus-preview">

    <svg className="route-svg" viewBox="0 0 100 100" preserveAspectRatio="none">

  {calculatedRoute.includes('Main Entrance') &&
    calculatedRoute.includes('Parking') && (
      <line
        x1="17"
        y1="82"
        x2="17"
        y2="57"
        className="active-route-line"
      />
    )}

  {calculatedRoute.includes('Parking') &&
    calculatedRoute.includes('Cafeteria') && (
      <line
        x1="17"
        y1="57"
        x2="49"
        y2="82"
        className="active-route-line"
      />
    )}

  {calculatedRoute.includes('Main Entrance') &&
    calculatedRoute.includes('Block A') && (
      <line
        x1="17"
        y1="82"
        x2="18"
        y2="24"
        className="active-route-line"
      />
    )}

  {calculatedRoute.includes('Block A') &&
    calculatedRoute.includes('Computer Lab') && (
      <line
        x1="18"
        y1="24"
        x2="50"
        y2="25"
        className="active-route-line"
      />
    )}

  {calculatedRoute.includes('Computer Lab') &&
    calculatedRoute.includes('MCA Department') && (
      <line
        x1="50"
        y1="25"
        x2="82"
        y2="24"
        className="active-route-line"
      />
    )}

  {calculatedRoute.includes('Block A') &&
    calculatedRoute.includes('Library') && (
      <line
        x1="18"
        y1="24"
        x2="82"
        y2="82"
        className="active-route-line"
      />
    )}

  {calculatedRoute.includes('Library') &&
    calculatedRoute.includes('MCA Department') && (
      <line
        x1="82"
        y1="82"
        x2="82"
        y2="24"
        className="active-route-line"
      />
    )}

  {calculatedRoute.includes('Library') &&
    calculatedRoute.includes('Cafeteria') && (
      <line
        x1="82"
        y1="82"
        x2="49"
        y2="82"
        className="active-route-line"
      />
    )}

</svg>


    <div
  className={`map-node parking-node ${
    calculatedRoute.includes('Parking') ? 'active-node' : ''
  }`}
>
  <div className="node-marker">7</div>
  <span>Parking</span>
</div>

    <div
      className={`map-node entrance-node ${
        calculatedRoute.includes('Main Entrance') ? 'active-node' : ''
      }`}
    >
      <div className="node-marker">1</div>
      <span>Main Entrance</span>
    </div>

    <div
      className={`map-node block-a-node ${
        calculatedRoute.includes('Block A') ? 'active-node' : ''
      }`}
    >
      <div className="node-marker">2</div>
      <span>Block A</span>
    </div>

    <div
      className={`map-node computer-lab-node ${
        calculatedRoute.includes('Computer Lab') ? 'active-node' : ''
      }`}
    >
      <div className="node-marker">3</div>
      <span>Computer Lab</span>
    </div>

    <div
      className={`map-node mca-node ${
        calculatedRoute.includes('MCA Department') ? 'active-node' : ''
      }`}
    >
      <div className="node-marker">4</div>
      <span>MCA Department</span>
    </div>

    <div
      className={`map-node library-node ${
        calculatedRoute.includes('Library') ? 'active-node' : ''
      }`}
    >
      <div className="node-marker">5</div>
      <span>Library</span>
    </div>

    <div
      className={`map-node cafeteria-node ${
        calculatedRoute.includes('Cafeteria') ? 'active-node' : ''
      }`}
    >
      <div className="node-marker">6</div>
      <span>Cafeteria</span>
    </div>

    {routeStarted && calculatedRoute.length > 1 && (
      <div className="route-indicator">
        <span>●</span>
        Route active
      </div>
    )}
  </div>
</section>
      </main>
    </div>
  )
}

export default App