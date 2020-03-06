import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isOpenForm = false;
  idUserEdit = null;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.fetchFromLocalStorage();
  }

  onOpenForm() {
    this.isOpenForm = true;
  }

  onCloseForm() {
    this.isOpenForm = false;
    this.idUserEdit = null;
  }

  onEditUser(id: number) {
    this.idUserEdit = id;
    this.isOpenForm = true;
  }

}
