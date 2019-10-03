import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecializedEmployeeService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'response'
  };

  constructor(private http: HttpClient) {
  }

  c2Task09SubmitProofReadingReport(constId1: string,
                                   proofReadingReportAttachmentPath1: string,
                                   userId1: string,
                                   consAttType1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c2Task09SubmitProofReadingReport', {
      constId: constId1,
      proofReadingReportAttachmentPath: proofReadingReportAttachmentPath1,
      userId: userId1,
      consAttType: consAttType1
    }, this.httpOptions);
  }

  c2Task11ReviewProofReadingRemarks(constId1: string,
                                    reviewesConsReportPath1: string,
                                    attachmentType1: string,
                                    userId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c2Task11ReviewProofReadingRemarks', {
      constId: constId1,
      reviewesConsReportPath: reviewesConsReportPath1,
      attachmentType: attachmentType1,
      userId: userId1
    }, this.httpOptions);
  }

  c3Task02SendReportsToDesigner(constId1: string,
                                designerId1: string,
                                coordReportPdfPath1: string,
                                coordReportWordPath1: string,
                                attachmentPdfType1: string,
                                attachmentWordType1: string,
                                userId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c3Task02SendReportsToDesigner', {
      constId: constId1,
      designerId: designerId1,
      coordReportPdfPath: coordReportPdfPath1,
      coordReportWordPath: coordReportWordPath1,
      attachmentPdfType: attachmentPdfType1,
      attachmentWordType: attachmentWordType1,
      userId: userId1
    }, this.httpOptions);
  }

  searchEmployee(emplCode1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8086/getEmployeeInfos', {
      emplCode: emplCode1
    }, this.httpOptions);
  }

  c3Task03SendDesignedReport(constId1: string,
                             designedReportAttachPath1: string,
                             userId1: string,
                             consAttType1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c3Task03SendDesignedReport', {
      constId: constId1,
      designedReportAttachPath: designedReportAttachPath1,
      userId: userId1,
      consAttType: consAttType1
    }, this.httpOptions);
  }

  c4Task01ProcessRecompenseCalculation(constId1: string,
                                       recompenseCalcPath1: string,
                                       userId1: string,
                                       consAttType1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c4Task01ProcessRecompenseCalculation', {
      constId: constId1,
      recompenseCalcPath: recompenseCalcPath1,
      userId: userId1,
      consAttType: consAttType1
    }, this.httpOptions);
  }

  c4Task02ProcessFinancialLinkage(constId1: string,
                                  finacialLinkageAttachPath1: string,
                                  userId1: string,
                                  consAttType1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c4Task02ProcessFinancialLinkage', {
      constId: constId1,
      finacialLinkageAttachPath: finacialLinkageAttachPath1,
      userId: userId1,
      consAttType: consAttType1
    }, this.httpOptions);
  }
}
