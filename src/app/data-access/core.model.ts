export interface User {
  id: string;
  role: string;
}

export interface Navigation {
  id: string;
  title: string;
  path: string;
  role: string;
}

export interface FlightSchedule {
  airport: string;
  airport_code: string;
  terminal: number | string;
  gate_number: number | string;
}

export interface Passenger {
  id: string;
  full_name: string;
  passport_number: string;
  address: string;
  date_of_birth: string;
  seat_number: string;
  flight_number: string;
  is_checkedIn: boolean;
  requiring_wheel_chair: boolean;
  with_infants: boolean;
  requiring_special_meal: boolean;
  shopping_request: boolean;
  ancillary_services: string[];
  services?: string[];
}

export interface AncillaryService {
  id: string;
  name: string;
  price: string;
  type: string;
  flight_id: string;
}

export interface Flight {
  id: string;
  airline: string;
  flight_number: string;
  departing_data: FlightSchedule;
  arriving_data: FlightSchedule;
}

export interface InitialState {
  is_loader: boolean;
  auth: {
    is_loggedIn: boolean;
    user_role: string;
    user_data: User;
    navigation: Navigation[]
  },
  application_data: {
    flights: Flight[];
    passengers: Passenger[];
    ancillary_services: AncillaryService[];
  }
}

export interface SmartTableHeader {
  key: string;
  label: string;
}

export interface ModalFormData {
  flight_number: string,
  form_data?: Passenger,
  edit_access?: {
    full_name: boolean;
    passport_number: boolean;
    address: boolean;
    date_of_birth: boolean;
    seat_number: boolean;
    requiring_wheel_chair: boolean;
    with_infants: boolean;
    requiring_special_meal: boolean;
    ancillary_services: boolean;
    shopping_request: boolean;
  };
  services_data?: AncillaryService[]
}

export interface ServiceType {
  value: string;
  label: string;
}

export interface Legend {
  img: string;
  alt: string;
  label: string;
}

export interface EditEmitter {
  data: Passenger | AncillaryService;
  type: string;
}

export interface BottomFilter {
  title: string;
  meta: FilterField[];
}

export interface Option {
  value: string;
  label: string;
}

export interface FilterField {
  label: string;
  field: string;
  selected: string;
  options: Option[];
}

export interface SeatData {
  booked: string[];
  checkedIn: string[];
  with_infants: string[];
  yet_to_checkIn: string[];
  require_wheelchair: string[];
  require_specialMeals: string[];
  request_shoppingItems: string[];
}

export const serviceTypes: ServiceType[] = [
  {
    value: 'ANC_SER',
    label: 'Ancillary Services'
  },
  {
    value: 'SPC_MEAL',
    label: 'Special Meals'
  },
  {
    value: 'SHOP_ITEM',
    label: 'Shopping Items'
  }
];