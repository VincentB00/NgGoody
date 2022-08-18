import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMyCartComponent } from './account-my-cart.component';

describe('AccountMyCartComponent', () => {
  let component: AccountMyCartComponent;
  let fixture: ComponentFixture<AccountMyCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMyCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountMyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
