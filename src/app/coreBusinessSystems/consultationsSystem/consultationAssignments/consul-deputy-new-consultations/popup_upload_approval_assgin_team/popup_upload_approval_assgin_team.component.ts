import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-popup_upload_approval_assgin_team',
  templateUrl: './popup_upload_approval_assgin_team.component.html',
  styleUrls: ['./popup_upload_approval_assgin_team.component.css']
})
export class Popup_upload_approval_assgin_teamComponent implements OnInit {

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
