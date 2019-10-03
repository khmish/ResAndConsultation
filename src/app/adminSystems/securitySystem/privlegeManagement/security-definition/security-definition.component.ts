import { Component, OnInit } from '@angular/core';
import { SecurityDefinitionService } from 'src/app/service/adminsystems/SecurityDefinition.service'
import { SecurityDefinition } from 'src/app/adminSystems/securitySystem/privlegeManagement/security-definition/SecurityDefinition.model'
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-security-definition',
  templateUrl: './security-definition.component.html',
  styleUrls: ['./security-definition.component.scss'],
  providers: [MessageService]

})
export class SecurityDefinitionComponent implements OnInit {

  constructor(private service: SecurityDefinitionService, private messageService: MessageService) { }
  showDeleteMsg() {
    this.messageService.add({ severity: 'success', summary: 'تم حذف السجل', detail: '' });
  }

  showUpdateMsg() {
    this.messageService.add({ severity: 'success', summary: 'تم التعديل بنجاح ', detail: '' });
  }
  public posts: SecurityDefinition[];
  postitem: any[];
  postSubSystems: any[];
  postSubSystemsRoles: any[];
  postSystemFunctionsRoles: any[]
  postFunctionsDsForFunctions: any[]
  errmsg1: any
  resy: any
  shown: boolean = true
  sysCategoryId :any 

  cols: any[]
  cols2: any[]
  cols3: any[]
  cols4: any[]
  cols5: any[]
  cols6: any[]

  showDiv() {
    this.shown = !this.shown
  }

  ngOnInit() {
    this.getCategories()
  }



  getCategories() {
    this.service.getAllCategories().subscribe(data => {
      let errmsg = data.errorMessage
      
      console.log("xxxx =  "+this.sysCategoryId)
      if (data.errorMessage.errorCode == 0) {
        this.posts = data.systemCategoryGetHttpBodies;
        console.log(data);
      } else
        console.log("erro");

    });



    this.cols = [
      { field: 'sysCategoryId', header: 'رمز نوع النظام' },
      { field: 'sysCategoryAName', header: 'مسمى نوع النظام بالعربي' },
      { field: 'sysCategoryEName', header: 'مسمى نوع النظام بالانجليزي' },

    ];
  }
  updateCategories(id, sysnameAr, sysnameEn, userID) {
    this.service.updateCategories(id, sysnameAr, sysnameEn, userID).subscribe(res => {
      this.postitem = res;

      this.getCategories()

    }, err => { console.log("لايوجد بيانات" + this.resy) });
    this.showUpdateMsg()
  }

  deleteCategories(id, atcionD) {
    this.service.deleteCategories(id, atcionD).subscribe(res => {
      console.log(res);
      this.postitem = res;

      this.getCategories()

    }, err => { console.log("لايوجد بيانات" + this.resy) });

    this.showDeleteMsg()
  }


  handleClick(id) {
    //this.showDiv()
    this.service.postCategories(id).subscribe(res => {
      this.resy = res.errorMessage.errorCode;
      this.sysCategoryId=id;
      console.log("++ "+this.sysCategoryId)
      console.log(res);
      let errmsg = res.errorMessage.errorCode
      if (this.resy == 0) {
        console.log("err " + errmsg);
        console.log("ID= " + this.resy);
        this.postitem = res;
      }
      if (res.errorMessage.errorCode > 0) {
        console.log("errXSXSX " + errmsg);
        console.log("ID=S " + id);
        this.postitem = res;
      }

    }, err => { console.log("لايوجد بيانات" + this.resy) });

    this.cols2 = [
      { field: 'systemCode', header: 'رقم النظام' },
      { field: 'systemAName', header: 'مسمى النظام بالعربي' },
      { field: 'systemEName', header: 'مسمى النظام بالانجليزي' },

    ];

  }
  
  updateclickSubSystemID(id, subSysAr, subSysEn, sysCategoryCode, userID) {
    this.service.updateSubsystem(id, subSysAr, subSysEn, this.sysCategoryId, userID).subscribe(res => {
      this.postitem = res;
      console.log("sysCategoryId=   "+ this.sysCategoryId)
      this.handleClick(this.sysCategoryId)
    }, err => { console.log("Error") });

    this.showUpdateMsg()

  }


 deleteclickSubSystemID(id, atcionD,userId) {
    this.service.deleteSubSystems(id, atcionD,userId).subscribe(res => {
      console.log(res);
      this.postitem = res;
      this.handleClick(this.sysCategoryId)
      

    }, err => { console.log("لايوجد بيانات" + this.resy) });

    this.showDeleteMsg()
  }




  clickSubSystemID(id) {
    this.service.postSubsystem(id).subscribe(res => {
      console.log(res);
      let errmsg = res.errorMessage.errorCode
      console.log("err " + errmsg);
      console.log("ID= " + id);
      this.postSubSystems = res;
    }, err => { console.log("Error") });

    this.cols3 = [
      { field: 'subSystemId', header: ' رمز النظام الفرعي' },
      { field: 'subSystemAName', header: 'مسمى النظام الفرعي بالعربي' },
      { field: 'subSystemEName', header: 'مسمى النظام الفرعي بالانجليزي' },
      { field: 'deleted', header: ' الحالة' }

    ];

  }

  
  



  clickSubSystemRoles(id) {
    this.service.postSubsystemRole(id).subscribe(res => {
      console.log(res);
      let errmsg = res.errorMessage.errorCode
      console.log("err " + errmsg);
      console.log("ID= " + id);
      this.postSubSystemsRoles = res;
    }, err => { console.log("Error  ") });

    this.cols4 = [
      { field: 'systemRoleCode', header: 'رمز الدور' },
      { field: 'systemRoleAName', header: 'مسمى الدور بالعربي' },
      { field: 'systemRoleEName', header: 'مسمى الدور بالانجليزي' },

    ];

  }

  clickSystemFunctionsRoles(id) {
    this.service.postSystemFunctionsRole(id).subscribe(res => {
      console.log(res);
      let errmsg = res.errorMessage.errorCode
      console.log("err " + errmsg);
      console.log("ID= " + id);
      this.postSystemFunctionsRoles = res;
    }, err => { console.log("Error  ") });

    this.cols5 = [
      { field: 'systemFunctionId', header: 'رمز الوظيفة ' },
      { field: 'systemFunctionAName', header: 'مسمى الوظيفة بالعربي' },
      { field: 'systemFunctionEName', header: 'مسمى الوظيفة بالانجليزي' },

    ];

  }
  clickFunctionsDsForFunction(id) {
    this.service.postFunctionsDsForFunction(id).subscribe(res => {
      console.log(res);
      let errmsg = res.errorMessage.errorCode
      console.log("err " + errmsg);
      console.log("ID= " + id);
      this.postFunctionsDsForFunctions = res;
    }, err => { console.log("Error  ") });

    this.cols6 = [
      { field: 'dsId', header: 'رقم النظام' },
      { field: 'dsArabicName', header: 'اسم النظام بالعربي' },
      { field: 'dsEnglishName', header: 'اسم النظام بالانجليزي' },

    ];

  }


}
