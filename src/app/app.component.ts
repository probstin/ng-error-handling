import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private readonly refreshToken$ = new BehaviorSubject(undefined);

  readonly projects$: Observable<any> =
    combineLatest([this.refreshToken$])
      .pipe(switchMap(() => this.getProjects()));

  constructor(private readonly http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get('http://localhost:3000/projects');
  }

  refresh(): void {
    this.refreshToken$.next(undefined);
  }

}
