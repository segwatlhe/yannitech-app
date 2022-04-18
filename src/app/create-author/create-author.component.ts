import {Component, OnInit} from '@angular/core';
import {Book} from '../model/book';
import {NotificationService} from '../service/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../service/book.service';
import {AuthorService} from '../service/author.service';
import {throwError} from 'rxjs';
import {Author} from '../model/author';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class CreateAuthorComponent implements OnInit {

  id: number;
  author: Author;
  authors: Author[];
  books: Book[];
  authorForm: FormGroup;

  constructor(private notifyService: NotificationService,
              private route: ActivatedRoute,
              private router: Router,
              private bookService: BookService,
              private authorService: AuthorService,
              private fb: FormBuilder) {
  }

  ngOnInit() {

    this.id = this.route.snapshot.params.id;
    this.bookService.getBook(this.id).subscribe();
    this.authorList(this.id);

    this.buildRegistrationFrom();
  }

  buildRegistrationFrom() {
    this.authorForm = this.fb.group({
      authorName: new FormControl('', Validators.required)
      }
    );
  }

  addAuthor() {

    this.author = new Author();
    this.author.authorName = this.authorForm.get('authorName').value;

    this.authorService.addAuthor(this.id, this.author).subscribe(
      data => {
        this.authorList(this.id);
        this.notifyService.showSuccess('Author added successfully.', 'Yannitech BookStore');
      },
      error => {
        this.handleError(error);
        this.notifyService.showError('Author not added.', 'Yannitech BookStore');
      }
    );
  }

  bookList() {
    this.router.navigate(['books']);
  }

  deleteAuthor(id: number) {
    this.authorService.deleteAuthor(id).subscribe(
      data => {
        this.authorList(this.id);
        this.notifyService.showSuccess('Author delete successful.', 'Yannitech BookStore');
      },
      error => {
        this.handleError(error);
        this.notifyService.showError('Author delete unsuccessful.', 'Yannitech BookStore');
      }
    );
  }

  authorList(id: number){
    this.authorService.getAuthorList(id).subscribe(
      data => {
        this.authors = data;
      }
    );
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
