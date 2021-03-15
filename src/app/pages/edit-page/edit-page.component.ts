import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CustomerEntity } from 'src/app/app-state/entities/customer.entity';
import { getCustomer } from 'src/app/app-state/selectors';

import * as Actions from '../../app-state/actions';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  private destroyed$ = new Subject();
  public customerForm: FormGroup;
  private customerId: number;
  
  constructor(
    private route: ActivatedRoute,
    private readonly store: Store,
    private fb: FormBuilder,
    private router: Router
  ) { }
  

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroyed$),
      switchMap(param => {
        return this.store.select(state => {
          this.customerId = param.id;
          return getCustomer(state, { id: param.id})
      });
    })).subscribe(customer => {
      this.buildForm(customer);
    });
  }

  buildForm(customer: CustomerEntity) {
    if (customer) {
      this.customerForm = this.fb.group({
        firstName: [customer.firstName, Validators.required],
        lastName: [customer.lastName, Validators.required],
        age: [customer.age, Validators.required],
        address: [customer.address, Validators.required]
      })
    }
  }

  onSubmit() {
    console.log(this.customerForm.value);
    if (this.customerForm.valid) {
      this.store.dispatch(Actions.editCustomer({customer: {
        id: this.customerId,
        ...this.customerForm.value
       } as CustomerEntity}));
      this.router.navigate(['/'])
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
