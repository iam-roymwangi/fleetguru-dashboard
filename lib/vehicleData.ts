export interface MileageRecord {
  id: string
  date: string
  mileage: number
  estimatedMonthlyAverage?: number
}

export interface EngineHoursRecord {
  id: string
  date: string
  engineHours: number
  estimatedMonthlyAverage?: number
  engineHealth: 'excellent' | 'good' | 'fair' | 'warning'
}

export interface Tire {
  id: string
  type: 'summer' | 'winter' | 'all-terrain' | 'studded' | 'non-studded'
  size: string
  manufacturer: string
  model: string
  status: 'mounted' | 'stored'
  treadDepth: number | null
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'unknown'
  position?: 'front-left' | 'front-right' | 'rear-left' | 'rear-right'
  storageLocation?: string
  lastInspection?: string
}

export interface Vehicle {
  vin: string
  licensePlate: string
  make: string
  model: string
  displayName: string
  vehicleType: string
  vehicleGroup: string
  vehicleStatus: string
  assignedPerson?: string
  responsiblePerson?: string
  vehicleManager?: string
  bodyType: string
  transmissionType: string
  fuelType: string
  spareTire: string
  possession: string
  tires?: Tire[]
  currentMileage?: number
  mileageRecords?: MileageRecord[]
  currentEngineHours?: number
  engineHoursRecords?: EngineHoursRecord[]
}

export const vehicles: Vehicle[] = [
  {
    vin: '1GNDT13S922184641',
    licensePlate: '777TFR',
    make: 'CHEVROLET',
    model: 'TRAILBLAZER',
    displayName: 'Chevrolet Trailblazer',
    vehicleType: 'Passenger car',
    vehicleGroup: '',
    vehicleStatus: 'Active',
    bodyType: 'other',
    transmissionType: 'automatic',
    fuelType: 'Gasoline',
    spareTire: 'full size',
    possession: 'owned',
    currentMileage: 48562,
    mileageRecords: [
      { id: 'mil-1-1', date: '2024-01-15', mileage: 45230, estimatedMonthlyAverage: 2100 },
      { id: 'mil-1-2', date: '2024-02-15', mileage: 47330, estimatedMonthlyAverage: 2100 },
      { id: 'mil-1-3', date: '2024-03-15', mileage: 48562, estimatedMonthlyAverage: 1232 },
    ],
    currentEngineHours: 1842,
    engineHoursRecords: [
      { id: 'eng-1-1', date: '2024-01-15', engineHours: 1680, estimatedMonthlyAverage: 92, engineHealth: 'excellent' },
      { id: 'eng-1-2', date: '2024-02-15', engineHours: 1772, estimatedMonthlyAverage: 92, engineHealth: 'excellent' },
      { id: 'eng-1-3', date: '2024-03-15', engineHours: 1842, estimatedMonthlyAverage: 70, engineHealth: 'good' },
    ],
    tires: [
      {
        id: 'tire-fl-1',
        type: 'summer',
        size: '245/70 R16',
        manufacturer: 'Goodyear',
        model: 'Assurance WeatherReady',
        status: 'mounted',
        treadDepth: 7.5,
        condition: 'good',
        position: 'front-left',
        lastInspection: '2024-02-15',
      },
      {
        id: 'tire-fr-1',
        type: 'summer',
        size: '245/70 R16',
        manufacturer: 'Goodyear',
        model: 'Assurance WeatherReady',
        status: 'mounted',
        treadDepth: 7.8,
        condition: 'good',
        position: 'front-right',
        lastInspection: '2024-02-15',
      },
      {
        id: 'tire-rl-1',
        type: 'summer',
        size: '245/70 R16',
        manufacturer: 'Goodyear',
        model: 'Assurance WeatherReady',
        status: 'mounted',
        treadDepth: 6.9,
        condition: 'fair',
        position: 'rear-left',
        lastInspection: '2024-02-15',
      },
      {
        id: 'tire-rr-1',
        type: 'summer',
        size: '245/70 R16',
        manufacturer: 'Goodyear',
        model: 'Assurance WeatherReady',
        status: 'mounted',
        treadDepth: 7.1,
        condition: 'fair',
        position: 'rear-right',
        lastInspection: '2024-02-15',
      },
    ],
  },
  {
    vin: 'WBANM71010CP17150',
    licensePlate: '080BHB',
    make: 'BMW',
    model: '530XD',
    displayName: 'BMW 530XD',
    vehicleType: 'Passenger car',
    vehicleGroup: '',
    vehicleStatus: 'Active',
    bodyType: 'other',
    transmissionType: 'automatic',
    fuelType: 'Diesel',
    spareTire: 'unknown',
    possession: 'operational leasing',
    currentMileage: 35874,
    mileageRecords: [
      { id: 'mil-3-1', date: '2024-01-05', mileage: 33200, estimatedMonthlyAverage: 1800 },
      { id: 'mil-3-2', date: '2024-02-05', mileage: 35000, estimatedMonthlyAverage: 1800 },
      { id: 'mil-3-3', date: '2024-03-05', mileage: 35874, estimatedMonthlyAverage: 874 },
    ],
    currentEngineHours: 1540,
    engineHoursRecords: [
      { id: 'eng-3-1', date: '2024-01-05', engineHours: 1395, estimatedMonthlyAverage: 82, engineHealth: 'excellent' },
      { id: 'eng-3-2', date: '2024-02-05', engineHours: 1477, estimatedMonthlyAverage: 82, engineHealth: 'excellent' },
      { id: 'eng-3-3', date: '2024-03-05', engineHours: 1540, estimatedMonthlyAverage: 63, engineHealth: 'excellent' },
    ],
    tires: [
      {
        id: 'tire-fl-3',
        type: 'summer',
        size: '245/45 R18 100Y',
        manufacturer: 'Continental',
        model: 'PremiumContact 6',
        status: 'mounted',
        treadDepth: 6.5,
        condition: 'fair',
        position: 'front-left',
        lastInspection: '2024-02-10',
      },
      {
        id: 'tire-fr-3',
        type: 'summer',
        size: '245/45 R18 100Y',
        manufacturer: 'Continental',
        model: 'PremiumContact 6',
        status: 'mounted',
        treadDepth: 6.2,
        condition: 'fair',
        position: 'front-right',
        lastInspection: '2024-02-10',
      },
      {
        id: 'tire-rl-3',
        type: 'summer',
        size: '245/45 R18 100Y',
        manufacturer: 'Continental',
        model: 'PremiumContact 6',
        status: 'mounted',
        treadDepth: 5.9,
        condition: 'fair',
        position: 'rear-left',
        lastInspection: '2024-02-10',
      },
      {
        id: 'tire-rr-3',
        type: 'summer',
        size: '245/45 R18 100Y',
        manufacturer: 'Continental',
        model: 'PremiumContact 6',
        status: 'mounted',
        treadDepth: 6.0,
        condition: 'fair',
        position: 'rear-right',
        lastInspection: '2024-02-10',
      },
    ],
  },
  {
    vin: 'SHSRE6890FU521279',
    licensePlate: '197MPN',
    make: 'HONDA',
    model: 'CR-V',
    displayName: "Sven's CRV",
    vehicleType: 'Passenger car',
    vehicleGroup: '',
    vehicleStatus: 'Active',
    assignedPerson: 'Sven Aulik',
    vehicleManager: 'Aado Mägisoo',
    bodyType: 'multipurpose M1 vehicle',
    transmissionType: 'automatic',
    fuelType: 'Diesel',
    spareTire: 'full size',
    possession: 'owned',
    currentMileage: 62148,
    mileageRecords: [
      { id: 'mil-2-1', date: '2024-01-10', mileage: 58900, estimatedMonthlyAverage: 2750 },
      { id: 'mil-2-2', date: '2024-02-10', mileage: 61650, estimatedMonthlyAverage: 2750 },
      { id: 'mil-2-3', date: '2024-03-10', mileage: 62148, estimatedMonthlyAverage: 498 },
    ],
    currentEngineHours: 2156,
    engineHoursRecords: [
      { id: 'eng-2-1', date: '2024-01-10', engineHours: 1945, estimatedMonthlyAverage: 118, engineHealth: 'good' },
      { id: 'eng-2-2', date: '2024-02-10', engineHours: 2063, estimatedMonthlyAverage: 118, engineHealth: 'good' },
      { id: 'eng-2-3', date: '2024-03-10', engineHours: 2156, estimatedMonthlyAverage: 93, engineHealth: 'good' },
    ],
    tires: [
      {
        id: 'tire-fl-2',
        type: 'non-studded',
        size: '225/60 R18 1000',
        manufacturer: 'Dunlop',
        model: 'Winter Sport 5',
        status: 'mounted',
        treadDepth: 5.0,
        condition: 'good',
        position: 'front-left',
        lastInspection: '2024-02-20',
      },
      {
        id: 'tire-fr-2',
        type: 'non-studded',
        size: '225/60 R18 1000',
        manufacturer: 'Dunlop',
        model: 'Winter Sport 5',
        status: 'mounted',
        treadDepth: 5.1,
        condition: 'good',
        position: 'front-right',
        lastInspection: '2024-02-20',
      },
      {
        id: 'tire-rl-2',
        type: 'non-studded',
        size: '225/60 R18 1000',
        manufacturer: 'Dunlop',
        model: 'Winter Sport 5',
        status: 'mounted',
        treadDepth: 4.8,
        condition: 'fair',
        position: 'rear-left',
        lastInspection: '2024-02-20',
      },
      {
        id: 'tire-rr-2',
        type: 'non-studded',
        size: '225/60 R18 1000',
        manufacturer: 'Dunlop',
        model: 'Winter Sport 5',
        status: 'mounted',
        treadDepth: 5.2,
        condition: 'good',
        position: 'rear-right',
        lastInspection: '2024-02-20',
      },
      {
        id: 'tire-s1-2',
        type: 'summer',
        size: '225/60 R18 1000',
        manufacturer: 'Goodyear',
        model: 'Assurance',
        status: 'stored',
        treadDepth: 5.0,
        condition: 'good',
        storageLocation: 'Own Garage',
        lastInspection: '2024-02-20',
      },
    ],
  },
  {
    vin: '61779Y280',
    licensePlate: '',
    make: 'Super73',
    model: 'S1',
    displayName: 'Electric Scooter',
    vehicleType: 'Electric scooter',
    vehicleGroup: '',
    vehicleStatus: 'Active',
    assignedPerson: 'Aado Mägisoo',
    bodyType: 'direct',
    transmissionType: 'Electric',
    fuelType: 'Electric',
    spareTire: 'none',
    possession: 'owned',
  },
  {
    vin: 'VF3MRHNSUKS465124',
    licensePlate: 'MN8775',
    make: 'PEUGEOT',
    model: '3008',
    displayName: 'Võtmevaba sisenemine',
    vehicleType: 'Passenger car',
    vehicleGroup: '',
    vehicleStatus: 'Active',
    bodyType: 'other',
    transmissionType: 'automatic',
    fuelType: 'Gasoline',
    spareTire: 'unknown',
    possession: 'owned',
  },
  {
    vin: 'TMBCJ9NP1K7061906',
    licensePlate: '133FXP',
    make: 'SKODA',
    model: 'SUPERB',
    displayName: 'Skoda Superb',
    vehicleType: 'Passenger car',
    vehicleGroup: '',
    vehicleStatus: 'Active',
    bodyType: 'saloon',
    transmissionType: 'automatic',
    fuelType: 'Diesel',
    spareTire: 'unknown',
    possession: 'owned',
  },
  {
    vin: 'VF3M45GFULS315652',
    licensePlate: '848HRF',
    make: 'PEUGEOT',
    model: '5008',
    displayName: 'Peugeot 5008',
    vehicleType: 'Passenger car',
    vehicleGroup: 'Sõiduauto',
    vehicleStatus: 'Active',
    responsiblePerson: 'Aado Mägisoo',
    vehicleManager: 'Aado Mägisoo',
    bodyType: 'multipurpose M1 vehicle',
    transmissionType: 'automatic',
    fuelType: 'Gasoline',
    spareTire: 'compressor + tire fix kit',
    possession: 'operational leasing',
  },
  {
    vin: 'VF3MCYHZULS322001',
    licensePlate: '081LKV',
    make: 'PEUGEOT',
    model: '3008',
    displayName: 'Peugeot 3008',
    vehicleType: 'Passenger car',
    vehicleGroup: '',
    vehicleStatus: 'Active',
    bodyType: 'multipurpose M1 vehicle',
    transmissionType: 'automatic',
    fuelType: 'Diesel',
    spareTire: 'unknown',
    possession: 'financial leasing',
  },
  {
    vin: 'VF1EM0U0A31194040',
    licensePlate: '001TFR',
    make: 'RENAULT',
    model: 'MEGANE',
    displayName: 'Renault Megane',
    vehicleType: 'Passenger car',
    vehicleGroup: '',
    vehicleStatus: 'Active',
    assignedPerson: 'Indrek Siitan',
    bodyType: 'convertible',
    transmissionType: 'automatic',
    fuelType: 'Gasoline',
    spareTire: 'unknown',
    possession: 'owned',
  },
  {
    vin: 'WDB9066331S750858',
    licensePlate: 'KN5647',
    make: 'MERCEDES BENZ',
    model: 'SPRINTER',
    displayName: 'Mercedes Sprinter',
    vehicleType: 'Light commercial vehicle / van',
    vehicleGroup: '',
    vehicleStatus: 'Active',
    bodyType: 'other',
    transmissionType: 'automatic',
    fuelType: 'Diesel',
    spareTire: 'unknown',
    possession: 'owned',
  },
  {
    vin: 'WBA5L5102HG098005',
    licensePlate: 'EUB-520',
    make: 'BMW',
    model: '520D XDRIVE',
    displayName: 'BMW 520D',
    vehicleType: 'Passenger car',
    vehicleGroup: '',
    vehicleStatus: 'Active',
    assignedPerson: 'Sven Aulik',
    bodyType: 'station wagon',
    transmissionType: 'automatic',
    fuelType: 'Diesel',
    spareTire: 'unknown',
    possession: 'owned',
  },
]
