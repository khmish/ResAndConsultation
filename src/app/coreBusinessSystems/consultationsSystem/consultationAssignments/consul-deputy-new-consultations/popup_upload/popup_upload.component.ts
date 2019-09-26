import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-popup_upload',
  templateUrl: './popup_upload.component.html',
  styleUrls: ['./popup_upload.component.css']
})
export class Popup_uploadComponent implements OnInit {

  uploadedFiles: any[] = [];

    constructor(private messageService: MessageService) {}

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

  ngOnInit() {
  }

}
