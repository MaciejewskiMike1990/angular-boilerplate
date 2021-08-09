import { Injectable } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScrollPositionService {
  currentScrollPosition: [number, number] = [0, 0];

  constructor(private viewPortScroller: ViewportScroller) {}

  public saveCurrentScrollPosition() {
    this.currentScrollPosition = this.viewPortScroller.getScrollPosition();
  }

  public restoreScrollPosition() {
    this.viewPortScroller.scrollToPosition(this.currentScrollPosition);
  }

  public scrollToPosition(elementId: string, options: { elementPrefix?: string, offset?: number } = {}) {
    const { elementPrefix, offset } = Object.assign({ elementPrefix: 's', offset: 0 }, options);
    if (elementId === undefined) {
      return;
    }
    const scrollPosition = this.calculateElementPosition(elementPrefix + elementId);
    this.viewPortScroller.scrollToPosition([0, scrollPosition - offset]);
  }

  public reset() {
    this.currentScrollPosition = [0, 0];
  }

  calculateElementPosition(elementId: string) {
    const height = 40;
    let top: number;
    const elm = document.getElementById(elementId);
    if (!elm) {
      return 0;
    }
    let box = elm.getBoundingClientRect();
    let body = document.body;
    let docElem = document.documentElement;
    let scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    top = box.top + scrollTop - 140 - (window.innerHeight - box.top < height ? height : 0);
    return top;
  }
}
