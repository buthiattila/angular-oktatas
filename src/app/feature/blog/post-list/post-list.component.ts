import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";

import {PostService} from "../../../core/services/blog/post.service";
import {PostResponse} from "../../../core/types/blog/post.type";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$: Observable<PostResponse> = new Subject();

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.posts$ = this.postService.getAllPostsToComponent();
  }

}
