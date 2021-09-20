import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Member } from "../_models/member";

@Injectable({
    providedIn: 'root'
  })

  export class FollowService{
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient){}

    addFollow(username: string){
        return this.http.post(this.baseUrl + 'follows/' + username, {});
    }

    getFollows(predicate: string){
        return this.http.get<Partial<Member[]>>(this.baseUrl + 'follows?predicate=' + predicate);
    }

  }