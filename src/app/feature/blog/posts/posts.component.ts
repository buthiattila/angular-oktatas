import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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

  constructor(private postService: PostService, private router: Router) {
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.loading = true;

    this.postService.getAllPostsToComponent().subscribe({
      next: (response: PostResponse) => {
        this.posts = response.posts
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err
      }
    });
  }

  openPost(post: Post): void {
    this.router.navigate(['post', post.id]);
  }

}
