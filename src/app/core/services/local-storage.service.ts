import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() {}

  set(key, item) {
    localStorage.removeItem(key);
    localStorage.setItem(key, typeof item === 'string' ? item : JSON.stringify(item));
  }

  get(key) {
    return localStorage.getItem(key);
  }

  getParsedByKey(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  remove(key) {
    return localStorage.removeItem(key);
  }
}
