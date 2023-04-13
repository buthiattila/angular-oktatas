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

    // VAN API 1 DB lekérdezésre
    /*this.postService.getSinglePost(this.id).subscribe((post: Post) => {
      // this.post = post;
    });*/

    //OPCIONÁLIS PATH PARAMÉTEREK LEKÉRDEZÉSE
    /*this.post = {
      id: this.id,
      title: this.actRoute.snapshot.params['title'],
      body: this.actRoute.snapshot.params['body'],
      tags: this.actRoute.snapshot.params['tags'].split(','),
      reactions: this.actRoute.snapshot.params['reactions'],
      userId: 0
    }*/

    //QUERY PARAMÉTEREK LEKÉRDEZEÉS
    /*this.post = {
      id: this.id,
      title: this.actRoute.snapshot.queryParamMap.get('title')+'',
      body: this.actRoute.snapshot.queryParamMap.get('body')+'',
      tags: (this.actRoute.snapshot.queryParamMap.get('tags')+'').split(','),
      reactions: parseInt(this.actRoute.snapshot.queryParamMap.get('reactions')+''),
      userId: 0
    }*/
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
        this.errorMsg = 'NINCS ILYEN POST'
      } else {
        this.loading = false;
        this.post = post; // post beállítás
      }
    });
  }

  closePost(): void {
    this.router.navigate(['posts']);
  }

}
