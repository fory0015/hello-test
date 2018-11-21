import { Component, OnInit } from '@angular/core';
import { levelData, mapDate } from 'src/app/service/data.';

@Component({
  selector: 'app-official',
  templateUrl: './official.component.html',
  styleUrls: ['./official.component.scss']
})
export class OfficialComponent implements OnInit {
  // 地图及等级所需经验信息
  mapInfos: {}[];
  levelInfos: any[];

  /**
   * 等级滑动选择条刻度标记
   */
  marks: {};

  // 计算所需参数
  startLevel: number = 1;
  endLevel: number = 100;
  level: number[] = [1, 100];
  selectMap: {};
  isCaptain: boolean = false;
  isMvp: boolean = false;
  isVow: boolean = false;
  isHolyLiver: boolean = false;

  /**
   * 是否计算完成
   */
  isSure: boolean = false;

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

  /**
   *
   * @param selectMap 选择地图
   */
  initMapInfo(selectMap): void {
    this.selectMap = selectMap;
  }

  /**
   * 清空所选信息
   */
  clearSelect(): void {
    // this.startLevel = 1;
    // this.endLevel = 100;
    // this.level = [1, 100];
    this.selectMap = null;
    this.isCaptain = false;
    this.isMvp = false;
    this.isVow = false;
    this.isHolyLiver = false;
    this.isSure = false;
    this.sumtest = null;
  }

  /**
   * 保持改变后等级排序
   */
  changeLevel(): void {
    // console.log('changeStart', this.startLevel, this.endLevel);
    this.sumtest = null;
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

  /**
   * 等级滑动条数据改变后
   */
  levelSliderChange(): void {
    this.startLevel = this.level[0];
    this.endLevel = this.level[1];
    this.changeLevel();
  }

  sumtest: number;
  /**
   * 计算
   */
  sure(): void {
    this.sumtest = 0;
    for (let i = this.startLevel; i < this.endLevel; i++) {
      this.sumtest += this.levelInfos[i - 1];
    }
    this.isSure = true;
  }
}
