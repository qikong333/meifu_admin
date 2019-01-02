import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL } from '../config/config';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  configUrl = 'assets/config.json';

  constructor(
    private http: HttpClient,
  ) { }

  static dateFormat(date: Date, sFormat: String = 'yyyy-MM-dd') {
    const time = {
      Year: 0,
      TYear: '0',
      Month: 0,
      TMonth: '0',
      Day: 0,
      TDay: '0',
      Hour: 0,
      THour: '0',
      hour: 0,
      Thour: '0',
      Minute: 0,
      TMinute: '0',
      Second: 0,
      TSecond: '0',
      Millisecond: 0
    };
    time.Year = date.getFullYear();
    time.TYear = String(time.Year).substr(2);
    time.Month = date.getMonth() + 1;
    time.TMonth = time.Month < 10 ? '0' + time.Month : String(time.Month);
    time.Day = date.getDate();
    time.TDay = time.Day < 10 ? '0' + time.Day : String(time.Day);
    time.Hour = date.getHours();
    time.THour = time.Hour < 10 ? '0' + time.Hour : String(time.Hour);
    time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
    time.Thour = time.hour < 10 ? '0' + time.hour : String(time.hour);
    time.Minute = date.getMinutes();
    time.TMinute = time.Minute < 10 ? '0' + time.Minute : String(time.Minute);
    time.Second = date.getSeconds();
    time.TSecond = time.Second < 10 ? '0' + time.Second : String(time.Second);
    time.Millisecond = date.getMilliseconds();

    if (sFormat !== undefined && sFormat.replace(/\s/g, '').length > 0) {
      sFormat = sFormat.replace(/yyyy/ig, String(time.Year))
        .replace(/yyy/ig, String(time.Year))
        .replace(/yy/ig, time.TYear)
        .replace(/y/ig, time.TYear)
        .replace(/MM/g, time.TMonth)
        .replace(/M/g, String(time.Month))
        .replace(/dd/ig, time.TDay)
        .replace(/d/ig, String(time.Day))
        .replace(/HH/g, time.THour)
        .replace(/H/g, String(time.Hour))
        .replace(/hh/g, time.Thour)
        .replace(/h/g, String(time.hour))
        .replace(/mm/g, time.TMinute)
        .replace(/m/g, String(time.Minute))
        .replace(/ss/ig, time.TSecond)
        .replace(/s/ig, String(time.Second))
        .replace(/fff/ig, String(time.Millisecond));
    } else {
      sFormat = time.Year + '-' + time.Month + '-' + time.Day + ' ' + time.Thour + ':' + time.TMinute + ':' + time.TSecond;
    }
    return sFormat;
  }

  public static buildURLSearchParams(paramMap) {
    for (const key of Object.keys(paramMap)) {
      let val = paramMap[key];
      if (val instanceof Date) {
        val = HttpService.dateFormat(val, 'yyyy-MM-dd hh:mm:ss');
      }
      if (paramMap) {
        return new HttpParams().set(key, val);
      }
    }
  }

  public get(url: string, paramMap?: any): Observable<object> {
    return this.http.get(URL + url, { params: HttpService.buildURLSearchParams(paramMap) });
  }

  // 默认Content-Type为application/json;
  public post(url: string, paramMap: any = null, options?: any): Observable<object> {
    return this.http.post(URL + url, HttpService.buildURLSearchParams(paramMap), options);
  }

  public postFormData(url: string, paramMap?: any): Observable<object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json;charset=utf-8'
    });
    return this.http.post(URL + url, HttpService.buildURLSearchParams(paramMap), { headers: headers });
  }
}
