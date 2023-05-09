import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsDataService {
  constructor(private http: HttpClient) {}

  public getPosts(): void {
    this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  public getUsers(): void {
    this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  public getComments(): void {
    this.http.get('https://jsonplaceholder.typicode.com/comments');
  }
}
