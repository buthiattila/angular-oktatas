import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";

import {PostService} from 'src/app/core/services/blog/post.service';
import {Post, PostResponse} from 'src/app/core/types/blog/post.type';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  loading: boolean = false;
  posts: Post[] = [];
  errorMsg: string = '';
  displayedColumns: string[] = ['id', 'title', 'body', 'tags', 'reactions', 'options'];

  constructor(private postService: PostService, private router: Router) {
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.loading = true;

    this.postService.getAllPostsToComponent().subscribe({
      next: (response: PostResponse) => {
        this.posts = response.posts;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMsg = err.message;
      }
    });
  }

  openPost(post: Post): void {
    this.router.navigate(['post', post.id]);
  }

}
