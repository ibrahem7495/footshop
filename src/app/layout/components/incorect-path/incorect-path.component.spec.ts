import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorectPathComponent } from './incorect-path.component';

describe('IncorectPathComponent', () => {
  let component: IncorectPathComponent;
  let fixture: ComponentFixture<IncorectPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncorectPathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorectPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
