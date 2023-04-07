import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post/post.service';
import { Post, PostResponse } from 'src/app/core/types/post/post.type';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {


  loading:boolean = false;
  posts: Post[] = [];
  errorMsg:string = '';

  constructor( private postService: PostService, private router: Router){}

  ngOnInit(): void {
    this.init();
  }

  private init(){
    //API

    this.loading =true;
    this.postService.getAllPostsToComponent().subscribe({
      next: (response: PostResponse)=>{
          this.posts = response.posts
          this.loading = false;
      },
      error: (err)=>{
        console.log(err);
        this.loading = false;
        this.errorMsg = err
      }
    })




   // this.postService.getAllPosts();
    //SUBS
    /*this.postService.posts$.subscribe((posts:Post[] | null)=>{
      if(posts !== null){
        this.loading = false;
        this.posts = posts;
      }else{
       this.loading = true;
      }
    });*/
  }


  editPost(post:Post){
    this.router.navigate(['post',post.id]);
  }

}
