import {Component, OnInit} from '@angular/core';
import {Book} from '../model/book';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../book.service';
import {NotificationService} from '../service/notification.service';
import {Observable, throwError} from 'rxjs';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {

  public submitted = false;

  books: Observable<Book[]>;
  id: number;
  book: Book;

  constructor(private notifyService: NotificationService,
              private route: ActivatedRoute,
              private router: Router,
              private bookService: BookService) {
  }

  ngOnInit() {
    this.book = new Book();

    this.id = this.route.snapshot.params.id;

    this.bookService.getBook(this.id).subscribe(
      data => {
        console.log('Observer got a next value: ' + data), this.book = data;
      },
      error => {
        console.error('Observer got an error: ' + error), this.notifyService.showError('Book list retrieval unsuccessful', 'Yannitech BookStore');
      },
      () => {
        console.log('Observer got a complete notification');
      }
    );
  }

  reloadData() {
    this.books = this.bookService.getBookList();
  }

  updateBook() {
    this.bookService.updateBook(this.id, this.book).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => {
        console.error('Observer got an error: ' + error);
        this.notifyService.showError('Book update unsuccessful', 'Yannitech BookStore');
      },
      () => {
        console.log('Observer got a complete notification');
        this.notifyService.showWarning('Book update successful.', 'Yannitech BookStore');
      }
    );
  }

  onSubmit() {
    this.updateBook();
  }

  // routing
  gotoList() {
    this.router.navigate(['/books']);
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
