import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServicesService {

  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  setObject(key: string, value: any): void {
    if (!value) {
      return;
    }
    this.storage[key] = JSON.stringify(value);
  }

  getValue<T>(key: string): T {
    const obj = JSON.parse(this.storage[key] || null);
    return obj as T || null;
  }

}
