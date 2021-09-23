import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Passenger } from '../core.model';

@Injectable({
  providedIn: 'root'
})
export class DataInteractionService {

  private filterInteraction: ReplaySubject<any> = new ReplaySubject();

  constructor() { }

  public emitFilterData(data: any): void {
    this.filterInteraction.next(data);
  }

  public getEmittedFilterData(): Observable<any> {
    return this.filterInteraction;
  }
}
