import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  users: User[] = [];
  memberCache = new Map();

  constructor(private http: HttpClient) { }

  getMembers(userParams: UserParams)
  {
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response)
    {
      return of(response);
    }

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    return this.getPaginatedResult<Member []>(this.baseUrl + 'users',params)
    .pipe(map(response =>{
      this.memberCache.set(Object.values(userParams).join('-'), response);
      return response;
    }))
  }

  private getPaginatedResult<T>(url, params) {

    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number){
    let params = new HttpParams();

      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());

      return params;

  }

  getMember(username: string)
  {
    const member = [...this.memberCache.values()]
     .reduce((arr, elem) => arr.concat(elem.result), [])
     .find((member: Member)=> member.username === username);

     if(member)
     {
       return of(member);
     }

    return this.http.get<Member>(this.baseUrl + 'users/' + username)
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }

  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  setCoverPhoto(photoId: number)
  {
    return this.http.put(this.baseUrl + 'users/set-cover-photo/' + photoId, {});
  }

  deletePhoto(photoId : number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
