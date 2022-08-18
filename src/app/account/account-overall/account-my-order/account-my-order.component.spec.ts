import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMyOrderComponent } from './account-my-order.component';

describe('AccountMyOrderComponent', () => {
  let component: AccountMyOrderComponent;
  let fixture: ComponentFixture<AccountMyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMyOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountMyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
