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


  getAllPostsToComponent(): Observable<PostResponse>{
    return this.httService.getAllPosts();
  }

  getSinglePostById(id:number):Post | null | undefined{
    if( this.posts.value !== null){
      return this.posts.value.find((post)=>post.id == id);
    }else{
      return this.posts.value;
    }
  }

  getSinglePost(id:number):Observable<Post>{
    return this.httService.getSinglePost(id);
  }

}
