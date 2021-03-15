import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  @Input() customerForm: FormGroup;
  @Output() onSubmit = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmitForm() {
    this.onSubmit.emit();
  }

}
