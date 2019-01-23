import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { URL } from '../../config/config';
import { HttpService } from '../../service/http.service';

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
  public datas = [];
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

    this.http.get('/bannerGet')
      .subscribe(r => {
        console.log(r);
        this.datas = r['data'];
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
        const a = (e['code'] === 200) ? '上传成功' : '上传失败';
        alert(a);
      });
  }
}
