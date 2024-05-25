import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ModalFormData, ServiceType, serviceTypes } from '../../../../data-access';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-ancillary-service-form',
  templateUrl: './ancillary-service-form.component.html',
  styleUrls: ['./ancillary-service-form.component.sass']
})
export class AncillaryServiceFormComponent implements OnInit {

  public serviceForm: UntypedFormGroup;
  public title: string = 'Add New Service';
  public serviceTypes: ServiceType[] = serviceTypes;

  constructor(
    public dialogRef: MatDialogRef<AncillaryServiceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalFormData
  ) {
    this.serviceForm = new UntypedFormGroup({
      id: new UntypedFormControl(''),
      name: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      type: new UntypedFormControl('', Validators.required),
      price: new UntypedFormControl('', Validators.required),
      flight_id: new UntypedFormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if(this.data?.flight_number) this.serviceForm.get('flight_id')?.setValue(this.data?.flight_number);
    if(this.data?.services_data) {
      this.title = 'Edit Service';
      this.serviceForm.patchValue({...this.data?.services_data});
    } else {
      this.serviceForm.patchValue({
        id: uuidv4()
      });
    }
  }

  submitForm(): void {
    this.serviceForm.markAllAsTouched();
    if(this.serviceForm.valid && this.serviceForm.dirty) {
      this.dialogRef.close(this.serviceForm.value);
    }
  }

}
