import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { URL } from '../../config/config';
import { HttpService } from '../../service/http.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public img: string;
  public imgUrl: string;
  public uploader2: FileUploader;
  public name: string;
  constructor(public http: HttpService) {
  }

  ngOnInit() {
    this.uploader2 = new FileUploader({
      url: URL + '/upLoad'
      , method: 'POST'
      , itemAlias: 'image'
      , autoUpload: true
    });
    this.uploader2.onSuccessItem = (item, response, status, headers) => {
      console.log(response);
      if (status === 200) {
        const rsp = JSON.parse(response);
        this.imgUrl = rsp.data.image_url;
        this.img = '<img class="camera" src="' + rsp.data.image_url + '" alt="">';
      } else {
        console.log(response);
      }
    };
  }

  upload() {
    const p = {
      name: '444',
      image: '222222'
    };
    this.http.post('/bannerAdd', p)
      .subscribe(e => {
        console.log(e);
      });
  }

  sub() {
    if (!this.name || this.name.length === 0) { alert('请输入名字'); return; }
    if (!this.img || this.img.length === 0) { alert('请上传图片'); return; }

    this.http.post('/bannerAdd', {
      name: this.name,
      image: this.imgUrl
    })
      .subscribe(e => {
        console.log(e);
      });
    // const z = (a && b) ? () => {
    //   console.log('ok');

    // return this.http.post('/bannerAdd', {
    //   name: this.name,
    //   image: this.img
    // })
    //   .subscribe(e => {
    //     console.log(e);
    //   });
    // } : '条件不足';
    // console.log(z);

  }
}
