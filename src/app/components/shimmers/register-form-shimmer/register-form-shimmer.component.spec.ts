import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormShimmerComponent } from './register-form-shimmer.component';

describe('RegisterFormShimmerComponent', () => {
  let component: RegisterFormShimmerComponent;
  let fixture: ComponentFixture<RegisterFormShimmerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterFormShimmerComponent]
    });
    fixture = TestBed.createComponent(RegisterFormShimmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
