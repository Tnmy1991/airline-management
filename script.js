const fs = require('fs');
const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

const seatMap = [];
const passportGenerator = () => {
  const character = 'ABCDEFGHIJKLMNOPQRST';
  const random = Math.floor(Math.random() * 26);
  const number = Math.floor(100000 + Math.random() * 9999999);
  return`${character.charAt(random)}${number}`;
};

const dobGenerator = () => {
  //set a range of years
  const min = 1900;
  const max = 2004;
  
  // Math.ceil prevents the value from being 0;
  let month = Math.ceil(Math.random() * 12);
  let day = Math.ceil(Math.random() * 28);
  const year = Math.floor(Math.random() * (max - min) + min);

  if(month < 10) month = "0" + month;
  if(day < 10) day = "0" + day;

  return `${year}-${month}-${day}`;
};

const generateAddress = () => {
  const cities = [
    'Birbhum',
    'Bankura',
    'Bardhaman',
    'Darjeeling',
    'Dakshin Dinajpur',
    'Hooghly',
    'Howrah',
    'Jalpaiguri',
    'Cooch Behar',
    'Kolkata',
    'Maldah',
    'Paschim Medinipur',
    'Purba Medinipur',
    'Murshidabad',
    'Nadia',
    'North 24 Parganas',
    'South 24 Parganas',
    'Purulia',
    'Uttar Dinajpur',
    'Ahmednagar',
    'Akola',
    'Amravati',
    'Aurangabad',
    'Bhandara',
    'Beed',
    'Buldhana',
    'Chandrapur',
    'Dhule',
    'Gadchiroli',
    'Gondia',
    'Hingoli',
    'Jalgaon',
    'Jalna',
    'Kolhapur',
    'Latur',
    'Mumbai City',
    'Mumbai suburban',
    'Nandurbar',
    'Nanded',
    'Nagpur',
    'Nashik',
    'Osmanabad',
    'Parbhani',
    'Pune',
    'Raigad',
    'Ratnagiri',
    'Sindhudurg',
    'Sangli',
    'Solapur',
    'Satara',
    'Thane',
    'Wardha',
    'Washim',
    'Yavatmal',
    'Bagalkot',
    'Bangalore Rural',
    'Bangalore Urban',
    'Belgaum',
    'Bellary',
    'Bidar',
    'Bijapur',
    'Chamarajnagar',
    'Chikkamagaluru',
    'Chikkaballapur',
    'Chitradurga',
    'Davanagere',
    'Dharwad',
    'Dakshina Kannada',
    'Gadag',
    'Gulbarga',
    'Hassan',
    'Haveri district',
    'Kodagu',
    'Kolar',
    'Koppal',
    'Mandya',
    'Mysore',
    'Raichur',
    'Shimoga',
    'Tumkur',
    'Udupi',
    'Uttara Kannada',
    'Ramanagara',
    'Yadgir',
    'Central Delhi',
    'East Delhi',
    'New Delhi',
    'North Delhi',
    'North East Delhi',
    'North West Delhi',
    'South Delhi',
    'South West Delhi',
    'West Delhi',
    'Ahmedabad',
    'Amreli district',
    'Anand',
    'Banaskantha',
    'Bharuch',
    'Bhavnagar',
    'Dahod',
    'The Dangs',
    'Gandhinagar',
    'Jamnagar',
    'Junagadh',
    'Alappuzha',
    'Ernakulam',
    'Idukki',
    'Kannur',
    'Kasaragod',
    'Kollam',
    'Kottayam',
    'Kozhikode',
    'Malappuram',
    'Palakkad',
    'Pathanamthitta',
    'Thrissur',
    'Thiruvananthapuram',
    'Wayanad'
  ];
  const random = Math.floor(Math.random() * cities.length);
  const pincode = Math.floor(100000 + Math.random() * 999999);

  return `${cities[random]} ${pincode} India`;
};

const selectSeat = () => {
  let rows = [];
  for (var i = 1; i <= 30; i++) {
    rows.push(...[`${i}A`, `${i}B`, `${i}C`, `${i}D`, `${i}E`, `${i}F`]);
  }
  const random = Math.floor(Math.random() * rows.length);
  const seat = rows[random];
  if(seatMap.indexOf(seat) === -1) {
    seatMap.push(seat);
    return seat;
  } else {
    selectSeat();
  }
}

for( let i = 1;i <= 164; i++ ) {
  const passenger = {
    id: uuidv4(),
    full_name: faker.name.findName(),
    passport_number: passportGenerator(),
    address: generateAddress(),
    date_of_birth: dobGenerator(),
    seat_number: selectSeat(),
    flight_number: '',
    requiring_wheel_chair: false,
    with_infants: false,
    requiring_special_meal: false,
    is_checkedIn: false,
    shopping_request: false,
    ancillary_services: []
  };

  fs.appendFile('passengers.json', JSON.stringify(passenger)+',', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}
