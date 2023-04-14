import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {HttpService} from 'src/app/core/services/http/http.service';
import {Post, PostResponse} from 'src/app/core/types/blog/post.type';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts = new BehaviorSubject<Post[] | null>(null);
  posts$ = this.posts.asObservable();

  constructor(private httpService: HttpService) {
  }

  getAllPosts(): void {
    this.httpService.getAllPosts().subscribe((response: PostResponse) => {
      this.posts.next(response.posts);
    });
  }

  getAllPostsToComponent(): Observable<PostResponse> {
    return this.httpService.getAllPosts();
  }

  getSinglePostById(id: number): Post | null | undefined {
    if (this.posts.value !== null) {
      return this.posts.value.find((post) => post.id == id);
    } else {
      return this.posts.value;
    }
  }

  getSinglePost(id: number): Observable<Post> {
    return this.httpService.getSinglePost(id);
  }

}
