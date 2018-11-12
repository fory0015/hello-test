import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Level } from '../model/level';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  searchLevels(term: number): Observable<Level[]> {
    if (!term) {
      return of([]);
    }
    return this.http.get<Level[]>(`api/levels/?level=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Level[]>('searchLevels', []))
    );
  }
}
