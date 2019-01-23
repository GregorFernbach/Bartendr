import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Location} from '../api/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  create(location: Location) {
    return this.http.post('api/dto/locations/', location);
  }

  update(location: Location) {
    return this.http.put('api/dto/locations/' + location.id, location);
  }

  delete(location: Location) {
    return this.http.delete('api/dto/locations/' + location.id);
  }

  getById(id: string) {
    return this.http.get('api/dto/locations/' + id);
  }

  getAll() {
    return this.http.get('/api/dto/locations');
  }

  makeCodeRequest(param: string) {
    return this.http.get(
      'https://plus.codes/api?ekey=B5Ssb0e4WP0KVL9mDeGRPfCtC6EDoGhQUjmPh2CIFQb2HA5L%2Fo%2B4VFJR8pgd8DLfo9WSAjk%2FFFGQvNJCzFNN43APfTc%3D' +
      '&address='
      + encodeURIComponent(param));
  }

  makeRatingRequest(param: string) {
    return this.http.get(
      '/google/maps/api/place/findplacefromtext/json?key=AIzaSyB8d4_zfbw1kp0hYV18zvi60JSmqXw25Qw&inputtype=textquery' +
      '&fields=plus_code,rating,formatted_address,name&input='
      + encodeURIComponent(param));
  }
}
