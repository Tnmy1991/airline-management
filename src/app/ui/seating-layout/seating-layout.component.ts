import { 
  Output, 
  OnChanges,
  Component,  
  ElementRef, 
  EventEmitter, 
  Input
} from '@angular/core';
import { Passenger, SeatData, Legend } from '../../data-access';

@Component({
  selector: 'app-seating-layout',
  templateUrl: './seating-layout.component.html',
  styleUrls: ['./seating-layout.component.sass']
})
export class SeatingLayoutComponent implements OnChanges {

  public rows: number[] = [];
  public seatData: SeatData = {
    booked: [],
    checkedIn: [],
    with_infants: [],
    yet_to_checkIn: [],
    require_wheelchair: [],
    require_specialMeals: [],
    request_shoppingItems: []
  }
  public legends: Legend[] = [
    { img: 'available-seat.png', alt: 'available-seat', label: 'Available' }, 
    { img: 'selected-seat.png', alt: 'selected-seat', label: 'Selected' }, 
    { img: 'booked-seat.png', alt: 'booked-seat', label: 'Booked' }, 
    { img: 'infant-seat.png', alt: 'infant-seat', label: 'With infant' }, 
    { img: 'wheelchair-seat.png', alt: 'wheelchair-seat', label: 'Req wheel chair' }, 
    { img: 'both-seat.png', alt: 'both-seat', label: 'Req wheel chair with infants' }
  ];

  @Input() passengers: Passenger[] = [];
  @Input() flightNumber: string = '';
  @Output() seatNumber: EventEmitter<string> = new EventEmitter();

  constructor(private _elementRef: ElementRef) { 
    for (var i = 1; i <= 30; i++) {
      this.rows.push(i);
    }
  }

  ngOnChanges(): void {
    this.prepareData();
  }

  prepareData(): void {
    this.seatData = {
      booked: [],
      checkedIn: [],
      with_infants: [],
      yet_to_checkIn: [],
      require_wheelchair: [],
      require_specialMeals: [],
      request_shoppingItems: []
    };
    this.passengers.forEach((passenger: Passenger) => {
      this.seatData.booked.push(passenger.seat_number)

      if(passenger.shopping_request) 
        this.seatData.request_shoppingItems.push(passenger.seat_number)
      
      if(passenger.requiring_special_meal) 
        this.seatData.require_specialMeals.push(passenger.seat_number)

      if(passenger.requiring_wheel_chair) 
        this.seatData.require_wheelchair.push(passenger.seat_number)

      if(passenger.with_infants) 
        this.seatData.with_infants.push(passenger.seat_number)

      if(passenger.is_checkedIn) 
        this.seatData.checkedIn.push(passenger.seat_number)
      else
        this.seatData.yet_to_checkIn.push(passenger.seat_number)
    });
  }

  selectSeats(id: string): void {
    const element = this._elementRef.nativeElement.querySelector(`#seat-${id}`);
    element.classList.add('selected');
    this.seatNumber.emit(id);
  }

  handleCloseTrigger(seat: string): void {
    const element = this._elementRef.nativeElement.querySelector(
      `#seat-${seat}`
    );
    element.classList.remove('selected');
  }

  prepareSeatRow(row: number): string[] {
    return [`${row}A`, `${row}B`, `${row}C`, `*`, `${row}D`, `${row}E`, `${row}F`];
  }

  trackSeat(index: number, seat: string): string {
    return `${seat}`;
  }

}
