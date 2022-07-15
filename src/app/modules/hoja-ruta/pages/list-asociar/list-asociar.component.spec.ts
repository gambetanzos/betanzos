import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAsociarComponent } from './list-asociar.component';

describe('ListAsociarComponent', () => {
  let component: ListAsociarComponent;
  let fixture: ComponentFixture<ListAsociarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAsociarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAsociarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
