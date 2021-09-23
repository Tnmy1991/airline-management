import { 
  Input, 
  Output,
  Directive, 
  OnChanges, 
  ElementRef,
  HostBinding,  
  HostListener, 
  ComponentRef,
  EventEmitter 
} from '@angular/core';
import { 
  Overlay, 
  OverlayRef,
  OverlayPositionBuilder 
} from '@angular/cdk/overlay';
import { SeatData } from '../../data-access';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipLayoutComponent } from '../tooltip-layout/tooltip-layout.component';

@Directive({
  selector: '[appSeatMarking]'
})
export class SeatMarkingDirective implements OnChanges {

  private overlayRef!: OverlayRef;

  @Input() seatNumber: string = '';
  @Input() flightNumber: string = '';
  @Input() seatsData: SeatData = {
    booked: [],
    checkedIn: [],
    with_infants: [],
    yet_to_checkIn: [],
    require_wheelchair: [],
    require_specialMeals: [],
    request_shoppingItems: []
  };
  @Output() closeTrigger: EventEmitter<string> = new EventEmitter();

  @HostBinding('class') additionalClass: string = '';

  @HostListener('click')
  show() {
    const tooltipRef: ComponentRef<TooltipLayoutComponent>
      = this.overlayRef.attach(new ComponentPortal(TooltipLayoutComponent));
    tooltipRef.instance.seat_number = this.seatNumber;
    tooltipRef.instance.flight_number = this.flightNumber;
    tooltipRef.instance.triggerClose.subscribe(response => {
      if(response) {
        this.overlayRef.detach();
        this.closeTrigger.emit(this.seatNumber);
      }
    })
  }

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef,
    private overlayPositionBuilder: OverlayPositionBuilder
  ) { }

  ngOnChanges(): void {
    let additionalClasses: string[] = [];
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -8,
      }]);

    this.overlayRef = this.overlay.create({ positionStrategy });

    if(this.seatsData.booked.indexOf(this.seatNumber) > -1)
      additionalClasses.push('booked');
    
    if(this.seatsData.checkedIn.indexOf(this.seatNumber) > -1) 
      additionalClasses.push('checked-in');

    if(this.seatsData.yet_to_checkIn.indexOf(this.seatNumber) > -1) 
      additionalClasses.push('not-check-in');

    if(this.seatsData.with_infants.indexOf(this.seatNumber) > -1) 
      additionalClasses.push('infant');

    if(this.seatsData.require_wheelchair.indexOf(this.seatNumber) > -1) 
      additionalClasses.push('wheelchair');

    if(this.seatsData.require_specialMeals.indexOf(this.seatNumber) > -1) 
      additionalClasses.push('special-meal');

    if(this.seatsData.request_shoppingItems.indexOf(this.seatNumber) > -1) 
      additionalClasses.push('shopping-request');

    this.additionalClass = additionalClasses.join(" ");
  }

}
