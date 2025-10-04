export interface RouteStep {
  type: 'walk' | 'bus' | 'tram' | 'train' | 'metro'
  line?: string
  from: string
  to: string
  departure: string
  arrival: string
  duration: number // в минутах
  stops?: number
  delay?: number // задержка в минутах
}

export interface RouteOption {
  id: number
  totalDuration: number // общее время в минутах
  transfers: number // количество пересадок
  departure: string
  arrival: string
  steps: RouteStep[]
  recommended?: boolean
}

export const mockRouteResults: RouteOption[] = [
  {
    id: 1,
    totalDuration: 32,
    transfers: 1,
    departure: '14:25',
    arrival: '14:57',
    recommended: true,
    steps: [
      {
        type: 'walk',
        from: 'Dworzec Centralny',
        to: 'Przystanek Metro Centrum',
        departure: '14:25',
        arrival: '14:28',
        duration: 3
      },
      {
        type: 'metro',
        line: 'M1',
        from: 'Metro Centrum',
        to: 'Metro Wilanowska',
        departure: '14:30',
        arrival: '14:45',
        duration: 15,
        stops: 8,
        delay: 0
      },
      {
        type: 'bus',
        line: '180',
        from: 'Metro Wilanowska',
        to: 'Lotnisko Chopina',
        departure: '14:48',
        arrival: '14:57',
        duration: 9,
        stops: 5,
        delay: 2
      }
    ]
  },
  {
    id: 2,
    totalDuration: 38,
    transfers: 0,
    departure: '14:20',
    arrival: '14:58',
    steps: [
      {
        type: 'bus',
        line: '175',
        from: 'Dworzec Centralny',
        to: 'Lotnisko Chopina',
        departure: '14:20',
        arrival: '14:58',
        duration: 38,
        stops: 22,
        delay: 0
      }
    ]
  },
  {
    id: 3,
    totalDuration: 35,
    transfers: 2,
    departure: '14:30',
    arrival: '15:05',
    steps: [
      {
        type: 'tram',
        line: '22',
        from: 'Dworzec Centralny',
        to: 'Rondo ONZ',
        departure: '14:30',
        arrival: '14:38',
        duration: 8,
        stops: 4,
        delay: 0
      },
      {
        type: 'walk',
        from: 'Rondo ONZ',
        to: 'Metro Świętokrzyska',
        departure: '14:38',
        arrival: '14:42',
        duration: 4
      },
      {
        type: 'metro',
        line: 'M1',
        from: 'Metro Świętokrzyska',
        to: 'Metro Wilanowska',
        departure: '14:45',
        arrival: '14:58',
        duration: 13,
        stops: 7,
        delay: 0
      },
      {
        type: 'bus',
        line: '148',
        from: 'Metro Wilanowska',
        to: 'Lotnisko Chopina',
        departure: '15:00',
        arrival: '15:05',
        duration: 5,
        stops: 3,
        delay: 0
      }
    ]
  }
]

export interface Stop {
  id: number
  name: string
  lines: string[]
  position: { lat: number; lng: number }
  type: 'bus' | 'tram' | 'metro' | 'train'
}

// Остановки Кракова (из MPK Kraków)
export const mockStops: Stop[] = [
  // Центр Кракова
  { id: 1, name: 'Dworzec Główny', lines: ['1', '2', '3', '4', '5', '14', '24', '50', '52'], position: { lat: 50.0675, lng: 19.9463 }, type: 'tram' },
  { id: 2, name: 'Rynek Główny', lines: ['1', '6', '8', '13', '18'], position: { lat: 50.0619, lng: 19.9368 }, type: 'tram' },
  { id: 3, name: 'Teatr Bagatela', lines: ['2', '4', '14', '18', '20', '44'], position: { lat: 50.0641, lng: 19.9282 }, type: 'tram' },
  { id: 4, name: 'Plac Inwalidów', lines: ['1', '2', '6', '18'], position: { lat: 50.0595, lng: 19.9435 }, type: 'tram' },
  { id: 5, name: 'Politechnika', lines: ['4', '8', '13', '14', '24', '52'], position: { lat: 50.0688, lng: 19.9051 }, type: 'tram' },
  
  // Nowa Huta
  { id: 6, name: 'Nowy Bieżanów P+R', lines: ['174', '174A', '304'], position: { lat: 50.0071, lng: 20.0175 }, type: 'bus' },
  { id: 7, name: 'Os. Szklane Domy', lines: ['4', '5', '9', '10', '15'], position: { lat: 50.0715, lng: 20.0328 }, type: 'tram' },
  { id: 8, name: 'Plac Centralny', lines: ['4', '5', '15', '22'], position: { lat: 50.0714, lng: 20.0394 }, type: 'tram' },
  
  // Краковский аэропорт
  { id: 9, name: 'Kraków Airport', lines: ['208', '209', '252', '902'], position: { lat: 50.0777, lng: 19.7848 }, type: 'bus' },
  { id: 10, name: 'Balice', lines: ['208', '252'], position: { lat: 50.0855, lng: 19.8012 }, type: 'bus' },
  
  // Казимеж
  { id: 11, name: 'Miodowa', lines: ['3', '19', '24'], position: { lat: 50.0519, lng: 19.9474 }, type: 'tram' },
  { id: 12, name: 'Stradom', lines: ['3', '6', '18', '19', '24'], position: { lat: 50.0532, lng: 19.9411 }, type: 'tram' },
  
  // Подгуже
  { id: 13, name: 'Muzeum Narodowe', lines: ['8', '19', '22', '23'], position: { lat: 50.0523, lng: 19.9628 }, type: 'tram' },
  { id: 14, name: 'Plac Bohaterów Getta', lines: ['3', '19', '24'], position: { lat: 50.0493, lng: 19.9568 }, type: 'tram' },
  
  // Krowodrza
  { id: 15, name: 'AGH', lines: ['2', '15', '18', '44', '52'], position: { lat: 50.0663, lng: 19.9147 }, type: 'tram' },
  { id: 16, name: 'Kampus UJ', lines: ['15', '18', '44'], position: { lat: 50.0682, lng: 19.9052 }, type: 'tram' },
  
  // Бронович
  { id: 17, name: 'Bronowice', lines: ['1', '2', '4', '14'], position: { lat: 50.0875, lng: 19.8892 }, type: 'tram' },
  { id: 18, name: 'Bronowice Małe', lines: ['1', '14'], position: { lat: 50.0923, lng: 19.8834 }, type: 'tram' },
  
  // Lagiewniki
  { id: 19, name: 'Sanktuarium Bożego Miłosierdzia', lines: ['8', '22', '23'], position: { lat: 50.0241, lng: 19.9533 }, type: 'tram' },
  { id: 20, name: 'Borek Fałęcki', lines: ['8', '22', '23'], position: { lat: 50.0196, lng: 19.9442 }, type: 'tram' },
  
  // Другие важные остановки
  { id: 21, name: 'Galeria Krakowska', lines: ['2', '4', '5', '14', '20', '44', '50', '52', '194'], position: { lat: 50.0681, lng: 19.9476 }, type: 'bus' },
  { id: 22, name: 'Wawel', lines: ['128', '194', '502'], position: { lat: 50.0544, lng: 19.9353 }, type: 'bus' },
  { id: 23, name: 'Kazimierz', lines: ['184', '194'], position: { lat: 50.0516, lng: 19.9458 }, type: 'bus' },
  { id: 24, name: 'Mogilskie', lines: ['4', '9', '10', '14', '44', '52'], position: { lat: 50.0583, lng: 19.9671 }, type: 'tram' },
  { id: 25, name: 'Cmentarz Rakowicki', lines: ['1', '2', '6'], position: { lat: 50.0774, lng: 19.9569 }, type: 'tram' },
]

