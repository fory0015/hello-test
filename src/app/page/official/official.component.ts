import { Component, OnInit } from '@angular/core';
import { levelData, mapDate } from 'src/app/service/data.';

@Component({
  selector: 'app-official',
  templateUrl: './official.component.html',
  styleUrls: ['./official.component.scss']
})
export class OfficialComponent implements OnInit {
  mapInfos: {}[];
  levelInfos: {}[];

  startLevel: number = 1;
  endLevel: number = 100;
  level: number[] = [1, 100];
  marks: {};
  map: {};
  isCaptain: boolean = false;
  isMvp: boolean = false;
  isVow: boolean = false;
  isHolyLiver: boolean = false;

  constructor() {
    this.mapInfos = mapDate;
    this.levelInfos = levelData;
  }

  ngOnInit() {
    this.marks = {
      1: '1',
      30: '30',
      70: '70',
      90: '90',
      100: '100'
    };
  }

  initMapInfo(map): void {
    this.map = map;
  }

  clearSelect(): void {
    // this.startLevel = 1;
    // this.endLevel = 100;
    // this.level = [1, 100];
    this.map = null;
    this.isCaptain = false;
    this.isMvp = false;
    this.isVow = false;
    this.isHolyLiver = false;
  }

  changeLevel(): void {
    // console.log('changeStart', this.startLevel, this.endLevel);
    if (this.startLevel > this.endLevel) {
      let middle = this.startLevel;
      this.startLevel = this.endLevel;
      this.endLevel = middle;
    } else if (this.startLevel === this.endLevel) {
      this.startLevel === 1 ? this.endLevel++ : this.startLevel--;
    }
    // console.log('changeEnd', this.startLevel, this.endLevel);
    this.level = [this.startLevel, this.endLevel];
  }

  levelSliderChange(): void {
    this.startLevel = this.level[0];
    this.endLevel = this.level[1];
    this.changeLevel();
  }

  sure(): void {

  }
}
