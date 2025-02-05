import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardShimmerComponent } from './user-card-shimmer.component';

describe('UserCardShimmerComponent', () => {
  let component: UserCardShimmerComponent;
  let fixture: ComponentFixture<UserCardShimmerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCardShimmerComponent]
    });
    fixture = TestBed.createComponent(UserCardShimmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
