import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8080/api/book';

  constructor(private http: HttpClient) {
  }

  getBook(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createBook(book: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save`, book);
  }

  updateBook(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit/${id}`, value);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, {responseType: 'text'});
  }

  // an Observable is a stream of events or data.
  getBookList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`);
  }

  search(title: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/search?title=${title}`);
  }

}
