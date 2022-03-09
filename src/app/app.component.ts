import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  projects$: Observable<any>;
  
  constructor(private http: HttpClient) {
    this.projects$ = this.http.get('http://localhost:3000/projects');
  }
  
 }
