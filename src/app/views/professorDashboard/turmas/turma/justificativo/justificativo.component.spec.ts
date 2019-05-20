import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificativoComponent } from './justificativo.component';

describe('JustificativoComponent', () => {
  let component: JustificativoComponent;
  let fixture: ComponentFixture<JustificativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustificativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
