import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {User} from '../api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get('/api/dto/users/');
  }

  create(user: User) {
    return this.http.post('/api/dto/users/', user);
  }

  getById(id: String) {
    return this.http.get('/api/dto/users/' + id);
  }

  update(user: User) {
    return this.http.put('/api/dto/users/' + user.id, user);
  }

}
