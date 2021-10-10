import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface QueryParams {
  [key: string]: string | number;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private headers = {};
  private readonly END_POINT: string;

  constructor(private http: HttpClient) {
    this.END_POINT = `${environment.serverUrl}`;
  }

  setHeaders(headers: {}) {
    if (headers != null) {
      this.headers = headers;
    }
  }
  // the user here can pass the return type
  // e.g : this.serviec.getRemove<_TYPE_>(....)
  // if the user dose not provide an id this will just get all
  // resources for a specific route
  // this will work on get and delete request with query params filtering
  getRemove<returnType>(
    id: string | null,
    route: string,
    qp: QueryParams = {},
    method: 'get' | 'delete' = 'get'
  ): Observable<returnType> {
    const cfqu = this.correctFormatForQueryUrl(qp);
    const url = `${this.END_POINT}/${route}${id ? '/' + id : ''}${cfqu}`;
    return this.http[method](url,{headers: this.headers}) as Observable<returnType>;
  }

  // this method will patch or post to any route
  // you choose
  postPatch<returnType>(
    route: string,
    data: any,
    id: string | null,
    method: 'post' | 'put' = 'post',
    qp: QueryParams = {}
  ): Observable<returnType> {
    // console.log(`${this.END_POINT}/${route}${id ? '/' + id : ''}`);
    const cfqu = this.correctFormatForQueryUrl(qp);
    return this.http[method](
      `${this.END_POINT}/${route}${id ? '/' + id : ''}${cfqu}`,
      data,
      {headers: this.headers}
    ) as Observable<returnType>;
  }

  getRemoveExt<returnType>(
    id: string | null,
    route: string,
    qp: QueryParams = {},
    method: 'get' | 'delete' = 'get'
  ): Observable<returnType> {
    const cfqu = this.correctFormatForQueryUrl(qp);
    const url = `${route}${id ? '/' + id : ''}${cfqu}`;
    return this.http[method](url,{headers: this.headers}) as Observable<returnType>;
  }

  // this method will patch or post to any route
  // you choose
  postPatchExt<returnType>(
    route: string,
    data: any,
    id: string | null,
    method: 'post' | 'put' = 'post',
    qp: QueryParams = {}
  ): Observable<returnType> {
    // console.log(`${this.END_POINT}/${route}${id ? '/' + id : ''}`);
    const cfqu = this.correctFormatForQueryUrl(qp);
    return this.http[method](
      `${route}${id ? '/' + id : ''}${cfqu}`,
      data,
      {headers: this.headers}
    ) as Observable<returnType>;
  }

  // In the return we will attach the '?' if the user provides a query params
  // and if the user provides a null we do not need to map the array to
  // anything, we just simply returns ''.
  // if there qp dose has some keys an values
  // e.g
  // const z = {userId: 1, name: 'rowad'} then
  // this method will return ["userId=1", "name=rowad"]
  private correctFormatForQueryUrl(qp: QueryParams): string {
    if (!qp) {
      return '';
    }
    const qpAsStr = this.mapQueryParamsToUrl(qp);
    return qpAsStr.length === 0 ? '' : `?${qpAsStr.join('&')}`;
  }

  // e.g :
  // const z = {userId: 1, name: 'rowad'} then
  // this method will return ["userId=1", "name=rowad"]
  private mapQueryParamsToUrl(qp: QueryParams): Array<string> {
    return Object.keys(qp).map((key: string) => {
      return `${key}=${qp[key]}`;
    });
  }
}
