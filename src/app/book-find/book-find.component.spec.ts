import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFindComponent } from './book-find.component';

describe('BookFindComponent', () => {
  let component: BookFindComponent;
  let fixture: ComponentFixture<BookFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookFindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
