import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { BottomFilter, Option, FilterField, DataInteractionService } from '../../data-access';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.sass']
})
export class FilterPanelComponent implements OnInit {

  public filterForm: FormGroup;
  public isReady: boolean =false;
  public optionsDataArray: Option[] = [];

  constructor(
    private dataInteraction: DataInteractionService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: BottomFilter
  ) {
    this.filterForm = new FormGroup({});
  }

  ngOnInit(): void {
    if(this.data.meta.length > 0) this.prepareForm(this.data.meta);
  }

  private prepareForm(fields: FilterField[]): void {
    fields.forEach((field: FilterField) => {
      const control = new FormControl(field.field);
      this.filterForm.addControl(field.field, control);
      this.optionsDataArray = [...field.options];
      if(field.selected) {
        this.filterForm.get(field.field)?.setValue(field.selected)
      }
    });
    setTimeout(() => {
      this.isReady = true;
    }, 250);
  }

  emitData(): void {
    this.dataInteraction.emitFilterData(this.filterForm.value);
  }

}
