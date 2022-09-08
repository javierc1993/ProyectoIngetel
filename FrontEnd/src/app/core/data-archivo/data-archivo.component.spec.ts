import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataArchivoComponent } from './data-archivo.component';

describe('DataArchivoComponent', () => {
  let component: DataArchivoComponent;
  let fixture: ComponentFixture<DataArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataArchivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
