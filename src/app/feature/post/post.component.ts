import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/core/services/post/post.service';
import { Post } from 'src/app/core/types/post/post.type';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {


  id: number = -1;
  post: Post | null = null;
  constructor(private postService: PostService, private actRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];


    // VAN API 1 DB lekérdezésre
    this.postService.getSinglePost(this.id).subscribe((post:Post)=>{
      // this.post = post;
     });

     //NINCS API CSAK AZ ÖSSZES LEKÉRDEZÉSÉRE

     const post = this.postService.getSinglePostById(this.id);
     console.log(this.id);
     if(post === null){
      this.postService.getAllPosts()
     }else if(post === undefined){
      alert("NINCS ILYEN POST");
     }else{
      this.post = post;
     }



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


}
