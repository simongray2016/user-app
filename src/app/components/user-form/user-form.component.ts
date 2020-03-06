import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {

  userForm: FormGroup;

  @Input() idUserEdit: number;
  @Output() closeForm = new EventEmitter();

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      userName: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  submitForm(user: { userName: string, name: string, email: string, phone: number }) {
    if (this.idUserEdit) {
      this.userService.editUser(this.idUserEdit, user);
    } else {
      this.userService.addUser(user);
    }
    this.closeForm.emit(false);
  }

  closeFormEmit() {
    this.closeForm.emit();
  }

  ngOnChanges(inputs: SimpleChanges) {
    const idUserEdit = inputs.idUserEdit.currentValue;
    if (idUserEdit) {
      const {userName, name, email, phone} = this.userService.findUser(idUserEdit);
      this.userForm.setValue({
        userName: (`${userName}`),
        name: (`${name}`),
        email: (`${email}`),
        phone: (`${phone}`),
      });
    }
  }

}
