import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutAuthenticationComponent } from './main-layout-authentication.component';

describe('MainLayoutAuthenticationComponent', () => {
  let component: MainLayoutAuthenticationComponent;
  let fixture: ComponentFixture<MainLayoutAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLayoutAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
