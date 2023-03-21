import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorManagerSkeletonComponent } from './author-manager-skeleton.component';

describe('AuthorManagerSkeletonComponent', () => {
  let component: AuthorManagerSkeletonComponent;
  let fixture: ComponentFixture<AuthorManagerSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorManagerSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorManagerSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
