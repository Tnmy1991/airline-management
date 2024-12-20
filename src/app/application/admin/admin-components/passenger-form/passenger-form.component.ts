import { Component, OnInit, Inject } from '@angular/core';
import {
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from '@angular/material/legacy-dialog';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { ModalFormData, AncillaryService } from '../../../../data-access';
import { v4 as uuidv4 } from 'uuid';
import { PassengerService } from '../../../../data-access';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-passenger-form',
  templateUrl: './passenger-form.component.html',
  styleUrls: ['./passenger-form.component.sass'],
})
export class PassengerFormComponent implements OnInit {
  public passengerForm: UntypedFormGroup;
  public title: string = 'Add New Passenger';
  public specialMeals: AncillaryService[] = [];
  public availableSeats$!: Observable<string[]>;
  public shoppingItems: AncillaryService[] = [];
  public ancillaryServices: AncillaryService[] = [];

  private availableSeats: string[] = [];

  constructor(
    private _passengerService: PassengerService,
    private dialogRef: MatDialogRef<PassengerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalFormData
  ) {
    this._passengerService
      .selectSeat(this.data?.flight_number)
      .subscribe((seats: string[]) => {
        this.availableSeats = seats;
      });
    this.passengerForm = new UntypedFormGroup({
      full_name: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      passport_number: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(/[a-zA-Z]{1}[0-9]{7}/),
      ]),
      address: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(15),
      ]),
      date_of_birth: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(
          /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
        ),
      ]),
      seat_number: new UntypedFormControl(''),
      flight_number: new UntypedFormControl('', Validators.required),
      is_checkedIn: new UntypedFormControl(false),
      requiring_wheel_chair: new UntypedFormControl(false),
      with_infants: new UntypedFormControl(false),
      requiring_special_meal: new UntypedFormControl(false),
      shopping_request: new UntypedFormControl(false),
      ancillary_services: new UntypedFormControl([]),
      id: new UntypedFormControl(''),
    });
  }

  ngOnInit(): void {
    this.availableSeats$ = this.passengerForm.controls[
      'seat_number'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    if (this.data?.flight_number)
      this.passengerForm
        .get('flight_number')
        ?.setValue(this.data?.flight_number);
    if (this.data?.form_data) {
      this.title = 'Edit Passenger';
      this.passengerForm.patchValue({ ...this.data?.form_data });
    } else {
      const random = Math.floor(Math.random() * this.availableSeats.length);
      this.passengerForm.patchValue({
        id: uuidv4(),
        seat_number: this.availableSeats[random],
      });
    }
    if (this.data?.services_data) {
      this.data?.services_data.forEach((service: AncillaryService) => {
        switch (service.type) {
          case 'ANC_SER':
            this.ancillaryServices.push(service);
            break;

          case 'SPC_MEAL':
            this.specialMeals.push(service);
            break;

          case 'SHOP_ITEM':
            this.shoppingItems.push(service);
            break;
        }
      });
    }
    if (!this.data.edit_access?.ancillary_services)
      this.passengerForm.controls['ancillary_services'].disable();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.availableSeats.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  submitForm(): void {
    this.passengerForm.markAllAsTouched();
    if (this.passengerForm.valid && this.passengerForm.dirty) {
      this.dialogRef.close(this.passengerForm.value);
    }
  }
}
