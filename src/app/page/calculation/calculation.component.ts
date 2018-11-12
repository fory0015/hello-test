import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { LevelService } from 'src/app/service/level.service';
import { Level } from 'src/app/model/level';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit {
  levels$: Observable<Level[]>;
  private searchTerms = new Subject<number>();
  // number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  level: number = 1;

  constructor(private levelService: LevelService) { }

  ngOnInit() {
    this.levels$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: number) => this.levelService.searchLevels(term)),
    );
  }

  showValue(term: number): void {
    this.searchTerms.next(term);
    this.level = term;
  }

  inputValue(level: number): void {
    this.level = level;
  }

}
