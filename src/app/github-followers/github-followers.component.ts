import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubFollowersService } from './github-followers.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {

  followers!: any[];

  constructor(
    private service: GithubFollowersService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .subscribe(combined =>{
      let id = combined[0].get('id');
      let page = combined[1].get('page');

      console.log(id, page);

      this.service.getFollowers()
      .subscribe((followers: any) => this.followers = followers);
    });    
  }


}