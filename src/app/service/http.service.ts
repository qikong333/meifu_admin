import { URL } from './../config/config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // 依据url缓存请求结果
  private cache = new Map();

  constructor(
    private httpClient: HttpClient,
  ) { }

  get(url: Url, params?: any, options?: any): Promise<Response> {
    return this.request(url, 'get', params, options);
  }

  post(url: Url, params?: any, options?: any): Promise<Response> {
    return this.request(url, 'post', params, options);
  }

  query(url: URL, queryParams?: Query, options?: any): Promise<QueryResponse> {
    const params = queryParams ? queryParams.serialize() : {};
    this.clearEmptyParams(params);
    return this.request(url, 'post', params, options).then((data) => {
      return <QueryResponse>data;
    });
  }

  // 通用基础方法
  request(url: URL, method: string, params: any = {}, options: any = {}): Promise<Response> {
    let requestUrl = url.toString();
    const fullUrl = requestUrl + '?';

    if (!requestUrl.startsWith('/') && !requestUrl.startsWith('http')) {
      requestUrl = environment.apiPath + requestUrl;
    }

  }

  clearEmptyParams(params: any) {
    if (!params) {
      return;
    }
    Object.keys(params).forEach((key) => {
      if (typeof params[key] === 'string' && !params[key]) {
        delete params[key];
      } else if (typeof params[key] === 'object') {
        this.clearEmptyParams(params[key]);
      }
    });
  }
}
