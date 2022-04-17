import {Component, OnInit} from '@angular/core';
import {Book} from '../model/book';
import {BookService} from '../service/book.service';
import {Router} from '@angular/router';
import {NotificationService} from '../service/notification.service';
import {Observable, throwError} from 'rxjs';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  book: Book = new Book();
  books: Observable<Book[]>;
  submitted = false;

  constructor(private notifyService: NotificationService,
              private bookService: BookService,
              private router: Router) {
  }

  ngOnInit() {
  }

  reloadData() {
    this.books = this.bookService.getBookList();
  }

  save() {
    this.bookService.createBook(this.book).subscribe(
      () => {
        this.reloadData();
        this.gotoList();
      },
      error => {
        this.handleError(error);
        this.notifyService.showError('Book save unsuccessful', 'Yannitech BookStore');
      },
      () => {
        this.notifyService.showSuccess('Book save successful', 'Yannitech BookStore');
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  // routing
  gotoList() {
    this.router.navigate(['/books']);
    this.reloadData();
  }

  // routing
  list() {
    this.router.navigate(['books']);
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
