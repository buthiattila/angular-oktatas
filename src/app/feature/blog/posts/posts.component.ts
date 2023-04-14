import {Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, QueryList} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {PostService} from 'src/app/core/services/blog/post.service';
import {Post, PostResponse} from 'src/app/core/types/blog/post.type';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit,AfterViewInit {

  loading: boolean = false;
  posts: Post[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'title', 'body', 'tags', 'reactions', 'options'];
  errorMsg: string = '';

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  constructor(private postService: PostService, private router: Router) {
  }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private init(): void {
    this.loading = true;

    this.postService.getAllPostsToComponent().subscribe({
      next: (response: PostResponse) => {
        this.posts = response.posts;
        this.dataSource = new MatTableDataSource(this.posts);
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMsg = err.message;
      }
    });
  }

  openPost(post: Post): void {
    this.router.navigate(['blog/post', post.id]);
  }

}
