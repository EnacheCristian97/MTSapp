import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
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

    constructor(private http: HttpClient) {}

    getPhotos(photoParams: PhotoParams){
        var response = this.photoCache.get(Object.values(photoParams).join('-'));
        if (response)
        {
          return of(response);
        }
    
        let params = this.getPaginationHeaders(photoParams.pageNumber, photoParams.pageSize);
    
        return this.getPaginatedResult<Photo []>(this.baseUrl + 'photos',params)
        .pipe(map(response =>{
          this.photoCache.set(Object.values(photoParams).join('-'), response);
          console.log(response);
          return response;
          
        }))

    }

    getPhotosV2(){

    }

    getPhoto(title: string)
    {
      const photo = [...this.photoCache.values()]
       .reduce((arr, elem) => arr.concat(elem.result), [])
       .find((photo: Photo)=> photo.title === title);
  
       if(photo)
       {
         return of(photo);
       }
  
      return this.http.get<Photo>(this.baseUrl + 'photos/' + title)
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

      // public addTitle(model: any){
      //   this.http.post(this.baseUrl + 'users/add-photo/', model);
      // }
  }