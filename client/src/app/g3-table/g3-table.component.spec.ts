import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { G3TableComponent } from './g3-table.component';

describe('G3TableComponent', () => {
  let component: G3TableComponent;
  let fixture: ComponentFixture<G3TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ G3TableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(G3TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
