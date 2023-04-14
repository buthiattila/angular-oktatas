import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';

import {PostService} from 'src/app/core/services/blog/post.service';
import {Post} from 'src/app/core/types/blog/post.type';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  errorMsg: string = '';
  id: number = -1;
  post: Post | null = null;
  private unsubscribe = new Subject<void>();

  constructor(private postService: PostService, private actRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private init(): void {
    this.loading = true;
    this.id = this.actRoute.snapshot.params['id'];

    this.postService.posts$.pipe(takeUntil(this.unsubscribe)).subscribe((posts: Post[] | null) => {
      const post = this.postService.getSinglePostById(this.id);

      if (post === null) {
        this.postService.getAllPosts()
      } else if (post === undefined) {
        this.loading = false;
        this.errorMsg = 'A bejegyzés nem létezik'
      } else {
        this.loading = false;
        this.post = post; // post beállítás
      }
    });
  }

  closePost(): void {
    this.router.navigate(['blog/posts']);
  }

}
