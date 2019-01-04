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

  public uploader2: FileUploader;
  editorContent = '<p>Some html</p>';

  constructor(public http: HttpService) {
    this.http.get('/bannerGet', {
      name: '444',
      Image: '222222'
    })
      .subscribe(e => {
        console.log(e);
      });


    this.upload();
  }

  ngOnInit() {

    this.uploader2 = new FileUploader({
      url: URL + '/upLoad'
      , method: 'POST'
      , itemAlias: 'image'
      , autoUpload: true
    });
    this.uploader2.onSuccessItem = function (item, response, status, headers) {
      console.log(response);
      if (status === 200) {
        const rsp = JSON.parse(response);
        const img = '<img class="camera" src="' + 'http://您的域坝' + rsp.url + '" alt="">';
        this.data.content += img;
      } else {
        console.log(response);
      }
    };
  }

  aa(e) {
    console.log(e);
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
}
