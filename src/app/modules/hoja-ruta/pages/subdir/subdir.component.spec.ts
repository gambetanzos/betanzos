import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdirComponent } from './subdir.component';

describe('SubdirComponent', () => {
  let component: SubdirComponent;
  let fixture: ComponentFixture<SubdirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubdirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
