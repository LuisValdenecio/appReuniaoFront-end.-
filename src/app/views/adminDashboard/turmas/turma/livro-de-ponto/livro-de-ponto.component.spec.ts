import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroDePontoComponent } from './livro-de-ponto.component';

describe('LivroDePontoComponent', () => {
  let component: LivroDePontoComponent;
  let fixture: ComponentFixture<LivroDePontoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivroDePontoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivroDePontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
