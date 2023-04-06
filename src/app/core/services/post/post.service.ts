import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Post, PostResponse } from '../../types/post/post.type';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httService: HttpService) { }

  private posts = new BehaviorSubject<Post[] | null>(null);
  posts$ = this.posts.asObservable();

  getAllPosts(): void {
    this.httService.getAllPosts().subscribe((response: PostResponse)=>{
        this.posts.next(response.posts);
    });
  }

  getSinglePostById(id:number):Post | null | undefined{
    const allPost: Post[] | null = this.posts.value;
    if( allPost !== null){
      return allPost.find((post)=>{
        return post.id === id
      })
    }else{
      return allPost;
    }
  }

  getSinglePost(id:number):Observable<Post>{
    return this.httService.getSinglePost(id);
  }

}
