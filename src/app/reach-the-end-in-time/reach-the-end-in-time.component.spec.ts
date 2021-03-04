import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReachTheEndInTimeComponent } from './reach-the-end-in-time.component';

describe('ReachTheEndInTimeComponent', () => {
  let component: ReachTheEndInTimeComponent;
  let fixture: ComponentFixture<ReachTheEndInTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReachTheEndInTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReachTheEndInTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
