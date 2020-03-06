import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {

  @Output() openForm = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openFormEmit() {
    this.openForm.emit();
  }

}
