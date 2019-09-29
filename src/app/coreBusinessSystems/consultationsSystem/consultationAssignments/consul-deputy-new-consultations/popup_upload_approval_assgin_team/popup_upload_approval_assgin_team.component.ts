import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-popup_upload_approval_assgin_team',
  templateUrl: './popup_upload_approval_assgin_team.component.html',
  styleUrls: ['./popup_upload_approval_assgin_team.component.css']
})
export class Popup_upload_approval_assgin_teamComponent implements OnInit {

  uploadedFiles: any[] = [];
  uplo: File;
  private options = { headers: new HttpHeaders().set('Content-Type', 'multipart/form-data') };

    constructor(private messageService: MessageService,private http: HttpClient) {}

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
            this.uplo=file;
        }

       let bodyPost= JSON.stringify({
          'TYPE' :'multipart/form-data',
          'Fieldname':this.uplo,
      
      })
        // this.http.post(url,bodyPost,options).subscribe(
      //   (data) => {
      //     // console.log("data "+data);

      //     this.showSuccess(data.errorADescription);
      //     this.ngOnInit();
      //   },
      //   (err: HttpErrorResponse) =>{
      //     // console.log("err "+err.error.errorADescription);
      //     this.showError(err.error.errorADescription);
      //   }
      // );
        // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

  ngOnInit() {
  }

}
