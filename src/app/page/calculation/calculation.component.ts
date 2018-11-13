import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
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
  private searchTerms = new Subject();
  level: number;
  isShow: boolean = true;

  constructor(
    private levelService: LevelService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.match(/\/official/) === null) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      }
    });
  }

  ngOnInit() {
    this.levels$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: number) => {
        if (!term) return of([]);
        return this.levelService.searchLevels(term);
      })
    );
  }

  showValue(term: number): void {
    this.searchTerms.next(term);
  }

  inputValue(level: number): void {
    this.level = level;
    this.searchTerms.next();
  }

}
