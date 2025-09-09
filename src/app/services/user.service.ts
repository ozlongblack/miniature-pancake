import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';

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

    return this.user$;
  }
}
