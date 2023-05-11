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
  public users: IUser;
  public currentComments: IComment[];

  public postId: number;

  constructor(
    private postsDataService: PostsDataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getId();
    this.getPosts();
    this.getUsers();
    this.getComments();
  }

  public getId() {
    this.activatedRoute.params.subscribe((param) => {
      this.postId = Number(param['id']);
    });
  }

  public getPosts() {
    this.postsDataService
      .fetchPosts()
      .pipe(
        tap((postsResponse?) => {
          if (this.postId) {
            this.currentPost = postsResponse.filter(
              (post) => post.id === this.postId
            )[0];
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
          this.currentUser = userResponse.filter(
            (user) => user.id === this.currentPost?.userId
          )[0];
        })
      )
      .subscribe();
  }

  public getComments() {
    this.postsDataService
      .fetchComments()
      .pipe(
        tap((commentsResponse?) => {
          this.currentComments = commentsResponse.filter(
            (comment) => comment.postId === this.currentPost?.id
          );
        })
      )
      .subscribe();
  }
}
