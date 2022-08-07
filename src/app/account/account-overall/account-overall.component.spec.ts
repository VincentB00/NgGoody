import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOverallComponent } from './account-overall.component';

describe('AccountOverallComponent', () => {
  let component: AccountOverallComponent;
  let fixture: ComponentFixture<AccountOverallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOverallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
