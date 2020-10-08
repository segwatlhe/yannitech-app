import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8080/yannitech/api/books';
  private findBookUrl = 'http://localhost:8080/yannitech/api/findbook?title=';


  constructor(private http: HttpClient) {
  }

  getBook(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createBook(book: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, book);
  }

  updateBook(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

  // an Observable is a stream of events or data.
  // They are often returned from Angular methods, such as the http.get
  getBookList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  findBook(value: any): Observable<any> {
    return this.http.get(`${this.findBookUrl}${value}`);
  }
}
