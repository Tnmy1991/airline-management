import { OnChanges, AfterViewInit, OnDestroy, Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Passenger, SmartTableHeader, AncillaryService, EditEmitter} from '../../data-access';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.sass']
})
export class SmartTableComponent implements OnChanges, AfterViewInit, OnDestroy {

  public dataSource = new MatTableDataSource<Passenger | AncillaryService>([]);
  public displayedColumns: string[] = [];
  private currentPageIndex: number = 0;
  private unSubscribe = new Subject<void>();

  @Input() title: string = '';
  @Input() isFilterable: boolean = false;
  @Input() isCreatable: boolean = true;
  @Input() tableHeader: SmartTableHeader[] = [];
  @Input() tableSource: Passenger[] | AncillaryService[] = [];
  @Output() emittedAddRequest = new EventEmitter<string>();
  @Output() emittedFilterRequest = new EventEmitter<string>();
  @Output() emittedObject = new EventEmitter<EditEmitter>();
  
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  ngOnChanges(): void {
    this.prepareData();
    if(this.paginator) {
      this.paginator.pageIndex = this.currentPageIndex;
    }
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      takeUntil(this.unSubscribe)
    ).subscribe(res => {
      this.currentPageIndex = res.pageIndex;
    })
  }

  prepareData(): void {
    this.displayedColumns = [];
    if( this.tableHeader.length > 0 ) {
      this.tableHeader.forEach((element: SmartTableHeader) => {
        this.displayedColumns.push(element.key);
      });
      this.displayedColumns.push('actions');
      if( this.tableSource.length > 0 ) {
        this.dataSource = new MatTableDataSource<Passenger | AncillaryService>(this.tableSource);
        this.dataSource.paginator = this.paginator
      }
    }
  }

  trackIteration(index: number, item: Passenger | AncillaryService): string {
    return `${item.id}`;
  }

  performEdit(element: Passenger | AncillaryService): void {
    this.emittedObject.emit({data: element, type: this.title});
  }

  performAdd(element: string): void {
    this.emittedAddRequest.emit(element);
  }

  performFilter(): void {
    this.emittedFilterRequest.emit();
  }

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
  }

}
