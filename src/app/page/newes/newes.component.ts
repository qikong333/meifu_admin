import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { URL } from '../../config/config';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-newes',
  templateUrl: './newes.component.html',
  styleUrls: ['./newes.component.scss']
})
export class NewesComponent implements OnInit {
  public uploader2: FileUploader;
  public content = '<p>Some html</p>';
  public title: string;
  public author: string;
  public source: string;
  public newsList: Array<any>;

  public newID: string;
  constructor(private http: HttpService) { }

  ngOnInit() {

    this.newGet();


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
        this.content += '<img class="camera" src="' + rsp.data.image_url + '" alt="">';
      } else {
        console.log(response);
      }
    };
  }



  sub() {
    if (!this.title || this.title.length === 0) { alert('请输入标题'); return; }
    if (!this.content || this.content.length === 0) { alert('请输入内容'); return; }
    let p = {};
    if (this.newID && this.newID.length > 0) {
      p = {
        id: this.newID,
        title: this.title,
        author: this.author,
        content: this.content,
        source: this.source
      };
    } else {
      p = {
        title: this.title,
        author: this.author,
        content: this.content,
        source: this.source
      };
    }
    this.http.post('/newAdd', p)
      .subscribe(e => {
        console.log(e);
        const a = (e['code'] === 200) ? '上传成功' : '上传失败';
        this.newGet();
        this.newID = '';
        this.title = '';
        this.author = '';
        this.content = '';
        this.source = '';
        alert(a);
      });

  }

  newGet() {
    this.http.get('/newGet')
      .subscribe(r => {
        this.newsList = r['data'];
      });
  }

  delet(id) {
    this.http.get('/newDelete', { id })
      .subscribe(r => {
        alert('删除成功');
        this.newsList = this.newsList.filter(a => a.id !== id);
      });
  }


  edit(id) {
    this.newID = id;
    this.http.get('/newGet', { id })
      .subscribe(r => {
        console.log(r);
        this.title = r['data']['0']['title'];
        this.author = r['data']['0']['author'];
        this.content = r['data']['0']['content'];
        this.source = r['data']['0']['source'];
      });
  }
}
