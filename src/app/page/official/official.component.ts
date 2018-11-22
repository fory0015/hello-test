import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { levelData, mapDate } from 'src/app/service/data';
import { Map } from 'src/app/model/map';


@Component({
  selector: 'app-official',
  templateUrl: './official.component.html',
  styleUrls: ['./official.component.scss']
})
export class OfficialComponent implements OnInit {
  // 地图及等级所需经验信息
  mapInfos: Map[];
  levelInfos: any[];

  /**
   * 等级滑动选择条刻度标记
   */
  marks: {};

  // 计算所需提供参数
  startLevel: number = 1;
  endLevel: number = 100;
  level: number[] = [1, 100];
  selectMap: Map;
  isCaptain: boolean = false;
  isMvp: boolean = false;
  isVow: boolean = false;
  isHolyLiver: boolean = false;

  // 结果数据
  sumCount: number;
  sumExp: number;
  resultMsg: string;

  /**
   * 是否计算完成
   */
  isSure: boolean = false;

  constructor(private message: NzMessageService) {
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
    this.sumCount = null;
    this.sumExp = null;
    this.resultMsg = null;
  }

  /**
   * 保持改变后等级排序
   */
  changeLevel(): void {
    this.sumExp = null;
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

  /**
   * 等级滑动条数据改变后
   */
  levelSliderChange(): void {
    this.startLevel = this.level[0];
    this.endLevel = this.level[1];
    this.changeLevel();
  }

  /**
   * 计算队伍加成
   */
  calcTeamAddition(nowLevel: number): number {
    if (nowLevel < 10) {
      return 1;
    } else if (nowLevel < 30) {
      return 1.5;
    } else if (nowLevel < 70) {
      return 2;
    } else if (nowLevel < 90) {
      return 2.5
    } else {
      return 3
    }
  }

  /**
   * 计算等级衰减
   */
  calcDownlevelAttenuation(nowLevel: number, downlevel: number): number {
    if (nowLevel < downlevel) {
      return 1;
    } else if (nowLevel < downlevel + 10) {
      return 0.8;
    } else if (nowLevel < downlevel + 20) {
      return 0.6;
    } else if (nowLevel < downlevel + 30) {
      return 0.4;
    } else if (nowLevel < downlevel + 40) {
      return 0.2;
    } else if (nowLevel < downlevel + 50) {
      return 0;
    } else {
      return -1;
    }
  }

  /**
   * 计算
   */
  sure(): void {
    if (!this.selectMap) {
      this.message.remove();
      this.message.error('未选择地图');
      return null;
    }

    // 初始化
    this.sumCount = 0;
    this.sumExp = 0;

    /**
     * 当前溢出的经验值
     */
    let nowExp = 0;
    // 计算次数
    for (let i = this.startLevel; i < this.endLevel; i++) {
      this.sumExp += this.levelInfos[i - 1];
      // 上级经验是否溢出
      let needExp = this.levelInfos[i - 1] - nowExp;
      if (needExp < 0) {
        nowExp -= this.levelInfos[i - 1];
        continue;
      }

      let teamAddition = this.calcTeamAddition(i);
      let dlAttenuation = this.calcDownlevelAttenuation(i, this.selectMap.downlevel);
      let exp = this.selectMap.exp;

      // 经验加成及衰减
      dlAttenuation === 0 ? exp = 5 : exp *= dlAttenuation;
      dlAttenuation === -1 ? exp = 3 : null;
      this.isCaptain ? exp *= 1.2 : null;
      this.isMvp ? exp *= 1.3 : null;
      this.isHolyLiver ? exp *= 1.5 : null;
      exp = Math.ceil(exp * teamAddition);

      let needCount = Math.ceil(needExp / (exp));
      nowExp = needCount * exp - needExp;
      this.sumCount += needCount;
    }
    this.resultMsg = `
      ${this.startLevel} -> ${this.endLevel} , ${this.selectMap.name} ,
      ${this.isCaptain ? '队长' : ''}${this.isMvp ? ' mvp' : ''}${this.isHolyLiver ? ' 圣肝' : ''} ,
      ${this.sumCount} 次
    `;
    this.isSure = true;
  }
}
