import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingCompanyListComponent } from './publishing-company-list.component';

describe('PublishingCompanyListComponent', () => {
  let component: PublishingCompanyListComponent;
  let fixture: ComponentFixture<PublishingCompanyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishingCompanyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishingCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
