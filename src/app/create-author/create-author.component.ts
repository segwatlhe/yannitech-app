import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { NotificationService } from '../service/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { AuthorService } from '../service/author.service';
import { Author } from '../model/author';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class CreateAuthorComponent implements OnInit {

  public submitted: boolean = false;

  id: number;
  book: Book;
  author: Author = new Author();

  books: Observable<Book[]>;
  
  constructor(private notifyService : NotificationService, 
              private route: ActivatedRoute,
              private router: Router,
              private bookService: BookService,
              private authorService: AuthorService) { }

  ngOnInit() {
    this.book = new Book();

    this.id = this.route.snapshot.params['id'];
    
    this.bookService.getBook(this.id)
      .subscribe(data => {
        console.log(data)
        this.book = data;
      }, error => console.log(error));

      this.books = this.authorService.getAuthorList(this.id);
  }

  // reloadData() {
  //   this.books = this.authorService.getAuthorList(this.id);
  // }
  
  newAuthor(): void {
    this.submitted = false;
    this.author = new Author();
  }

  // addAuthor(value: any) {
  //   this.authorService.createAuthor(this.id, this.author)
  //     .subscribe(data => console.log(data), error => console.log(error));
  //   this.book = new Book();
    
  //   this.gotoList();
  //   this.notifyService.showSuccess("Author added successfully.", "Yannitech BookStore")
  // }


  // addAuthor() {
  //   this.authorService.createAuthor(this.id, this.book)
  //     .subscribe(data => console.log(data), error => console.log(error));
  //   this.book = new Book();
  //   this.author = new Author
  //   this.gotoList();
  //   this.notifyService.showSuccess("Author added successfully.", "Yannitech BookStore")
  // }

  addAuthor() {
    this.authorService.createAuthor(this.book)
      .subscribe(data => console.log(data), error => console.log(error));
    this.book = new Book();
    this.author = new Author
   // this.gotoList();
    this.notifyService.showSuccess("Author added successfully.", "Yannitech BookStore")
  }

  onSubmit(data) {
    console.log(data)
  //  this.addAuthor(data); 
    this.addAuthor();    
  }

  gotoList() {
    this.router.navigate(['/addAuthor']);
  }

  list(){
    this.router.navigate(['books']);
  }

  reloadData() {
   // this.books = this.bookService.getBookList();
   this.books = this.authorService.getAuthorList(this.id);
  }

  deleteAuthor(id: number) {
   // this.bookService.deleteBook(id)
    this.authorService.deleteAuthor(id)
      .subscribe(
        data => {
          console.log(data);
          //this.reloadData();
        },
        error => console.log(error));
        this.notifyService.showSuccess("Book delete successful.", "Yannitech BookStore")
  }

  updateAuthor(id: number) {
    console.log('test ' + id)
    // this.bookService.updateBook(this.id, this.book)
    //   .subscribe(data => console.log(data), error => console.log(error));
    // this.book = new Book();
    // this.gotoList();
    // this.notifyService.showSuccess("Book update successful.", "Yannitech BookStore")
  }

}
