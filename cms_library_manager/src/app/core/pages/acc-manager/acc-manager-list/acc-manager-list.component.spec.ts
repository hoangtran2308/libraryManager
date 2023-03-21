import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccManagerListComponent } from './acc-manager-list.component';

describe('AccManagerListComponent', () => {
  let component: AccManagerListComponent;
  let fixture: ComponentFixture<AccManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccManagerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
