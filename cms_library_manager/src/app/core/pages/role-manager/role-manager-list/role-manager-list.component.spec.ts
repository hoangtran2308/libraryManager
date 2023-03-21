import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagerListComponent } from './role-manager-list.component';

describe('RoleManagerListComponent', () => {
  let component: RoleManagerListComponent;
  let fixture: ComponentFixture<RoleManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleManagerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
