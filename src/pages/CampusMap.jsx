import { useState } from 'react'
function CampusMap() {

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
const [startLocation, setStartLocation] = useState('Main Entrance')
const [destination, setDestination] = useState('')
const [routeStarted, setRouteStarted] = useState(false)
const [calculatedRoute, setCalculatedRoute] = useState([])

const [routeDistance, setRouteDistance] = useState(0)
  return (
    <div>
      <h1>Campus Navigation</h1>
      
    </div>
  )
}

export default CampusMap