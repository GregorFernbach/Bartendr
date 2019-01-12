import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Location} from '../api/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  create(location: Location) {
    return this.http.post('api/dto/locations/', location);
  }

  update(location: Location) {
    return this.http.put('api/dto/locations/' + location.id, location);
  }

  delete(id: number) {
    return this.http.delete('api/locations/' + id);
  }

  getById(id: string) {
    return this.http.get('api/dto/locations/' + id);
  }

  getAll() {
    return this.http.get('/api/locations').pipe(
      map((response: any) => {
        return response._embedded.locations;
      })
    );
  }
}
