import { Component } from '@angular/core';
import { Tab } from './tab.directive';

@Component({
    selector: 'tabs',
    template: `
      <ul >
        <li class="li" *ngFor="let tab of tabs" (click)="selectTab(tab)">
          {{tab.tabTitle}}
        </li>
      </ul>
      <ng-content></ng-content>
    `,
    styleUrls: ['./tabs.directive.css']
  })
  export class Tabs {

    constructor (){};

    tabs: Tab[] = [];
  
    selectTab(tab: Tab) {
      this.tabs.forEach((tab) => {
        tab.active = false;  
      });
      tab.active = true; 
      
    }
  
    addTab(tab: Tab) {
      if (this.tabs.length === 0) {
        tab.active = true;
      }
      this.tabs.push(tab);
    }
  }
