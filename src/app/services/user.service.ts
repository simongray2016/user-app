import { Injectable } from '@angular/core';
import { LocalStorageServicesService } from './local-storage-services.service';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import dataUsers from '../models/dataUsers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static readonly UserStorageKey = 'users';

  private users: User[];
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor(private localStorage: LocalStorageServicesService) { }

  fetchFromLocalStorage() {
    this.users = this.localStorage.getValue<User[]>(UserService.UserStorageKey) || dataUsers;
    this.updateUsersData();
  }

  updateToLocalStorage() {
    this.localStorage.setObject(UserService.UserStorageKey, this.users);
  }

  addUser(user: { userName: string, name: string, email: string, phone: number }) {
    const { userName, name, email, phone } = user;
    const id = new Date(Date.now()).getTime();
    const newUser = new User(id, userName, name, email, phone);
    this.users.unshift(newUser);
    this.updateToLocalStorage();
    this.updateUsersData();
  }

  findUser(id: number) {
    return this.users.find(user => user.id === id);
  }

  editUser(idEdit: number, user: { userName: string, name: string, email: string, phone: number }) {
    const { userName, name, email, phone } = user;
    const index = this.users.findIndex(u => u.id === idEdit);
    const editUser = new User(idEdit, userName, name, email, phone);
    this.users.splice(index, 1, editUser);
    this.updateToLocalStorage();
    this.updateUsersData();
  }

  checkUser(id: number) {
    this.users = this.users.map(u => u.id === id ? {...u, isChecked: !u.isChecked} : u);
    this.updateToLocalStorage();
    this.updateUsersData();
  }

  toggleAll() {
    this.users = this.users.map(user => {
      return {
        ...user,
        isChecked: !this.users.every(u => u.isChecked)
      };
    });
    this.updateToLocalStorage();
    this.updateUsersData();
  }

  deleteSelected() {
    this.users = this.users.filter(user => !user.isChecked);
    this.updateToLocalStorage();
    this.updateUsersData();
  }

  deleteUser(id: number) {
    const index = this.users.findIndex(user => user.id === id);
    this.users.splice(index, 1);
  }

  private updateUsersData() {
    this.usersSubject.next(this.users);
  }
}
