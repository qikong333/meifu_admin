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
  public textDetail = '<p>Some html</p>';

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
        const img = '<img class="camera" src="' + rsp.data.image_url + '" alt="">';
        console.log(img);
        this.textDetail += img;
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

}

