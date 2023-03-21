import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSkeletonComponent } from './role-skeleton.component';

describe('RoleSkeletonComponent', () => {
  let component: RoleSkeletonComponent;
  let fixture: ComponentFixture<RoleSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
