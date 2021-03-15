import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomerEntity } from 'src/app/app-state/entities/customer.entity';

import * as Actions from '../../app-state/actions';


@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  public customerForm: FormGroup;

  constructor(
    private readonly store: Store,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required]
    })
  }

  onSubmit() {

    if (this.customerForm.valid) {
      this.store.dispatch(Actions.createCustomer({customer: this.customerForm.value as CustomerEntity}));
      this.router.navigate(['/'])
    }
  }

}
