import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewesComponent } from './newes.component';

describe('NewesComponent', () => {
  let component: NewesComponent;
  let fixture: ComponentFixture<NewesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
