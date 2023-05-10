import { Component, OnInit } from '@angular/core';
import { PostsDataService } from 'src/app/data/posts-data.service';
import { tap } from 'rxjs';
import { IPost } from '../interfaces/IPost';
import { IUser } from '../interfaces/IUser';
import { IComment } from '../interfaces/IComment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  public currentPost: IPost;
  public currentUser: IUser;
  public currentComments: IComment[];

  public postId: number;

  constructor(
    private postsDataService: PostsDataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.getUsers();
    this.getComments();
    this.activatedRoute.params.subscribe((param) => {
      this.postId = Number(param['id']);
      console.log(this.postId);
    });
  }

  public getPosts() {
    this.postsDataService
      .fetchPosts()
      .pipe(
        tap((postsResponse?) => {
          if(this.postId) {
          this.currentPost = postsResponse.filter(post => post.id === this.postId)[0];
          console.log(this.currentPost)
        }

        })
      )
      .subscribe();
  }

  public getUsers() {
    this.postsDataService
      .fetchUsers()
      .pipe(
        tap((userResponse?) => {
          this.currentUser = userResponse.filter(user => user.id === this.currentPost?.userId)[0];
          console.log(this.currentUser)
        })
      )
      .subscribe();
  }

  public getComments() {
    this.postsDataService
      .fetchComments()
      .pipe(
        tap((commentsResponse?) => {
          this.currentComments = commentsResponse.filter(comment => comment.postId === this.currentPost?.id);
          console.log(this.currentComments)
        })
      )
      .subscribe();
  }
}
