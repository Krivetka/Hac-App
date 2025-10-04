export interface Disruption {
  id: number
  type: 'train' | 'bus' | 'system'
  line: string
  description: string
  status: 'active' | 'prediction'
  severity: 'high' | 'medium' | 'low'
  location: { lat: number; lng: number } | null
  reportedBy: 'user' | 'system'
  verified: boolean
  startTime: string
}

export interface UserProfile {
  name: string
  points: number
  reports: Array<{
    id: number
    line: string
    description: string
    status: 'verified' | 'pending' | 'rejected'
    points: number
  }>
}

export const mockDisruptions: Disruption[] = [
  { 
    id: 1, 
    type: 'train', 
    line: 'SKM S1', 
    description: 'Awaria taboru na stacji Warszawa Śródmieście.', 
    status: 'active', 
    severity: 'high', 
    location: { lat: 52.229, lng: 21.011 }, 
    reportedBy: 'user', 
    verified: true, 
    startTime: '11:45' 
  },
  { 
    id: 2, 
    type: 'bus', 
    line: '523', 
    description: 'Duże natężenie ruchu w Al. Jerozolimskich.', 
    status: 'active', 
    severity: 'medium', 
    location: { lat: 52.225, lng: 20.995 }, 
    reportedBy: 'system', 
    verified: true, 
    startTime: '12:01' 
  },
  { 
    id: 3, 
    type: 'train', 
    line: 'KM R8', 
    description: 'Utrudnienia w ruchu pociągów z powodu wypadku na przejeździe.', 
    status: 'active', 
    severity: 'high', 
    location: { lat: 52.165, lng: 21.050 }, 
    reportedBy: 'user', 
    verified: true, 
    startTime: '11:30' 
  },
  { 
    id: 4, 
    type: 'bus', 
    line: '175', 
    description: 'Autobus opóźniony o 15 minut z powodu awarii.', 
    status: 'active', 
    severity: 'medium', 
    location: { lat: 52.231, lng: 20.981 }, 
    reportedBy: 'user', 
    verified: false, 
    startTime: '12:10' 
  },
  { 
    id: 5, 
    type: 'system', 
    line: 'Cała sieć', 
    description: 'Prognozowane burze i silny wiatr po 15:00. Możliwe utrudnienia.', 
    status: 'prediction', 
    severity: 'low', 
    location: null, 
    reportedBy: 'system', 
    verified: true, 
    startTime: '15:00' 
  }
]

export const mockUserProfile: UserProfile = {
  name: 'Jan Kowalski',
  points: 1250,
  reports: [
    { id: 1, line: 'SKM S1', description: 'Awaria taboru...', status: 'verified', points: 50 },
    { id: 4, line: '175', description: 'Autobus opóźniony...', status: 'pending', points: 0 },
    { id: 6, line: 'M1', description: 'Tłok w metrze', status: 'rejected', points: 0 },
  ]
}

