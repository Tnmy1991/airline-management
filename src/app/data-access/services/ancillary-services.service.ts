import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../states.models';
import { AncillaryService } from '../core.model';
import { HttpClient } from '@angular/common/http';
import * as AncillaryServiceActions from '../actions/ancillary-service.actions';
import { getAncillaryServices } from '../selectors/ancillary-service.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AncillaryServicesService {

  constructor(private store: Store<AppState>, private _httpClient: HttpClient) {}

  fetchAncillaryServices(): Observable<AncillaryService[]> {
    return this._httpClient.get<AncillaryService[]>('http://localhost:3000/ancillaryServices');
  }

  getAllAncillaryServices(flight: string): Observable<AncillaryService[]> {
    return this.store.select(
      getAncillaryServices
    ).pipe(
      map((services: AncillaryService[]) => {
        const data = services.filter(service => {
          return service.flight_id === flight || service.flight_id === '';
        });

        return data;
      })
    );
  }

  updateAllAncillaryService(services: AncillaryService[]): void {
    this.store.dispatch(
      AncillaryServiceActions.updateAncillaryServiceData({ancillary_service: services})
    );
  }

}
