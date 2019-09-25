import { Component, OnInit } from '@angular/core';
import {FunctiontreeserviceService} from '../service/data/functiontreeservice.service';
import {HttpResponse} from '@angular/common/http';
import {UserPrivilagesHttpBody} from '../service/data/httpBodies/user-privilages-http-body.service';
import {UserAccessService} from '../service/user-access.service';
import {HeaderComponent} from './components/header/header.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [HeaderComponent]
})
export class LayoutComponent implements OnInit {

  collapedSideBar: boolean;
  public userPrivilagesHttpBody: UserPrivilagesHttpBody;
  direction: string;

  // tslint:disable-next-line:max-line-length
  constructor(public treeService: FunctiontreeserviceService, public userAccessService: UserAccessService, private headerComponent: HeaderComponent) {}

  ngOnInit() {
    // this.treeService.getAllUserRoles().subscribe((response: HttpResponse<any>) => {
    //   console.log(response.body);
    //   this.userPrivilagesHttpBody = response.body;
    // });
    this.direction = this.headerComponent.direction;
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
}

