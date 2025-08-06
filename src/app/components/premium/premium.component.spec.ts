import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumComponent } from './premium.component';

describe('PremiumComponent', () => {
  let component: PremiumComponent;
  let fixture: ComponentFixture<PremiumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PremiumComponent]
    });
    fixture = TestBed.createComponent(PremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
