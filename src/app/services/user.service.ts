import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '@interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  private cache$ = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.cache$.asObservable();

  getUser() {
    return this.http.get<User>('/assets/data/user.json');
  }

  loadUser() {
    if (this.cache$.getValue()) {
      return;
    }

    this.getUser().subscribe((user) => this.cache$.next(user));
  }

  loadCachedUser() {
    return this.cache$.getValue();
  }

  updateUser(user: User) {
    this.cache$.next(user);
  }
}
