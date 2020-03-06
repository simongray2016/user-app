import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  @Output() editUser: EventEmitter<number> = new EventEmitter<number>();

  users$: Observable<User[]>;
  isCheckedAll$: Observable<boolean>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users$ = this.userService.users$;
    this.isCheckedAll$ = this.userService.users$.pipe(map(users => users.every(u => u.isChecked)));
  }

  editUserEmit(id: number) {
    this.editUser.emit(id);
  }

  checkUser(id: number) {
    this.userService.checkUser(id);
  }

  toggleAll() {
    this.userService.toggleAll();
  }

  deleteSelected() {
    this.userService.deleteSelected();
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id);
  }
}
