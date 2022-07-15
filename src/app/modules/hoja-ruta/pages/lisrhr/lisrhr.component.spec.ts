import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LisrhrComponent } from './lisrhr.component';

describe('LisrhrComponent', () => {
  let component: LisrhrComponent;
  let fixture: ComponentFixture<LisrhrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LisrhrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LisrhrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
