import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMyPostComponent } from './account-my-post.component';

describe('AccountMyPostComponent', () => {
  let component: AccountMyPostComponent;
  let fixture: ComponentFixture<AccountMyPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMyPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountMyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
