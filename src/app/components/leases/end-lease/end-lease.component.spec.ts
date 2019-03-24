import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndLeaseComponent } from './end-lease.component';

describe('EndLeaseComponent', () => {
  let component: EndLeaseComponent;
  let fixture: ComponentFixture<EndLeaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndLeaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
