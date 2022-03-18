import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concat, of } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { PaginatedResult } from "../_models/pagination";
import { Photo } from "../_models/photo";
import { PhotoParams } from "../_models/photoParams";

@Injectable({
    providedIn: 'root'
  })
  export class PhotoService {
    baseUrl = environment.apiUrl;
    photoCache = new Map();
    photos: Photo[] = [];
    photo: Photo;
    comment: Comment;

    constructor(private http: HttpClient) {}

    getPhotos(photoParams: PhotoParams){
        var resp = this.photoCache.get(Object.values(photoParams).join('-'));
        if (resp)
        {
          return of(resp);
        }
        
    
        let params = this.getPaginationHeaders(photoParams.pageNumber, photoParams.pageSize);
    
        return this.getPaginatedResult<Photo []>(this.baseUrl + 'photos',params)
        .pipe(map(response =>{
          this.photoCache.set(Object.values(photoParams).join('-'), response);
          console.log(response);
          return response;
          
        }))

    }

    getPhoto(publicId: string)
    {
      const photo = [...this.photoCache.values()]
       .reduce((arr, elem) => arr.concat(elem.result), [])
       .find((photo: Photo)=> photo.publicId === publicId);
  
       if(photo)
       {
         return of(photo);
       }
  
      return this.http.get<Photo>(this.baseUrl + 'photos/' + publicId)
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

      addComment(comment: Comment){
        return this.http.post<Comment>(this.baseUrl + 'photos/add-comment', comment).subscribe(data =>{
          console.log(data);
          const comment = JSON.stringify(this.comment);
          this.photo.comments.push(data);
        });
      }

      getComments(){
        return this.http.get(this.baseUrl + 'maincomments/')
      }

  }