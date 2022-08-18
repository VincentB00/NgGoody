import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../model/Item.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService 
{

  constructor(private httpClient: HttpClient) { }

  uploadImage(file: File, itemID: number):Observable<Image[]>
  {
    // for (const [key, file] of Object.entries(files)) 
    // {
      
    // }

    let formData: FormData = new FormData();
    formData.append('images', file, file.name);
    
    return this.httpClient.post<Image[]>(`${environment.api}/images/${itemID}`, formData, {
      // headers: headers,
      withCredentials: true});
  }

  getImages(itemID: number): Observable<Image[]>
  {
    return this.httpClient.get<Image[]>(`${environment.api}/images/${itemID}`);
  }

  deleteImage(imageID: number): Observable<Response>
  {
    return this.httpClient.delete<Response>(`${environment.api}/images/${imageID}`, {withCredentials: true});
  }

}
