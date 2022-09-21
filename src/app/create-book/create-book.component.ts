import {Component, OnInit} from '@angular/core';
import {BookService} from '../service/book.service';
import {Router} from '@angular/router';
import {NotificationService} from '../service/notification.service';
import {throwError} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  bookForm: FormGroup;

  constructor(private notifyService: NotificationService,
              private bookService: BookService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.buildRegistrationFrom();
  }

  buildRegistrationFrom() {
    this.bookForm = this.fb.group({
      category: new FormControl('', Validators.required),
      title: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.maxLength(4)]),
      price: new FormControl('', [Validators.required])
      }
    );
  }

  save() {
    if (this.bookForm.valid) {
      this.bookService.createBook(this.bookForm.value).subscribe(
        () => {
          this.gotoList();
          this.notifyService.showSuccess('Book save successful', 'Yannitech BookStore');
        },
        error => {
          this.handleError(error);
          this.notifyService.showError('Book save unsuccessful', 'Yannitech BookStore');
        }
      );
    }else {
      this.notifyService.showError('Form not valid', 'Yannitech BookStore');
    }
  }

  // routing
  gotoList() {
    this.router.navigate(['/books']);
  }

  // error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
      console.log('client-side error ' + errorMessage);
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log('server-side error ' + errorMessage);
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
