import { Injectable } from '@angular/core';

import { SecurityDefinition } from 'src/app/adminSystems/securitySystem/privlegeManagement/security-definition/SecurityDefinition.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SecurityDefinitionService {

  url: string = "http://springdev.ipaedu.sa:8084/getSystemCategories"
  Categories: any[];
  constructor(private http: HttpClient) { }


  getAllCategories(): Observable<any> {
    return this.http.get(this.url)

  }



  postCategories(CategoryId: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/getSystemsForSysCatId', {
      systemCategoryId: CategoryId

    })

  }



  postSubsystem(systemId: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/getSubSystemsForSystemId', {
      systemId: systemId

    })

  }


  postSubsystemRole(systemRoleCode: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/getSystemRolesForSubSystem', {
      subSystemId: systemRoleCode

    })

  }

  postSystemFunctionsRole(systemRoleCode: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/getSystemFunctionsForRole', {
      systemRoleCode: systemRoleCode

    })

  }


  postFunctionsDsForFunction(systemFunctionId: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/getFunctionDsForFunctionId', {
      systemFunctionId: systemFunctionId

    })

  }

  //-------------------Update-------------------//
  updateCategories(sysCategoryId: number, sysCategoryAName: string, sysCategoryEName: string, userId: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/addSystemCategory', {
      sysCategoryId: sysCategoryId,
      sysCategoryAName: sysCategoryAName,
      sysCategoryEName: sysCategoryEName,
      userId: userId
    })

  }

  updateSubsystem(systemCode: number, systemAName: string, systemEName: string,sysCategoryId:number, userId: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/addSystemc', {
      systemCode: systemCode,
      systemAName: systemAName,
      systemEName: systemEName,
      sysCategoryId:sysCategoryId,
      userId: userId
    })

  }


  //-------------------Delete-------------------//
  deleteCategories(systemId: number, deleteAction: boolean): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/deleteSystemCategory', {
      sysCategoryId: systemId,
      deleteAction: deleteAction = true
    })

  }
  

  deleteSubSystems(systemCode: number, deleteAction: boolean, usrerID:number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/deleteSystemc', {
      systemCode:systemCode,
      deleteAction: deleteAction = true,
      userId:1
    })

  }



}
