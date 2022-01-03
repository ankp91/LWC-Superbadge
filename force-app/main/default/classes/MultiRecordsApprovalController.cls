public with sharing class MultiRecordsApprovalController {

    public class SubmittedRecordsWrapper{
        @AuraEnabled public Id workItemId;
        @AuraEnabled public String recordId;
        @AuraEnabled public String relatedTo;
        @AuraEnabled public String recordName;
        @AuraEnabled public String submittedBy;
        @AuraEnabled public Date submittedDate;
    }

    @AuraEnabled
    public static List<SubmittedRecordsWrapper> getSubmittedRecords(){
        List<SubmittedRecordsWrapper> lstSubmissionRecord = new List<SubmittedRecordsWrapper>();

        for(ProcessInstance ps : [SELECT Id, TargetObjectId, TargetObject.Name, CreatedDate,
                                 (SELECT ID FROM WorkItems WHERE OriginalActorId = : UserInfo.getUserId()),
                                 (SELECT OriginalActor.Name FROM Steps WHERE StepStatus = 'Started') FROM ProcessInstance]) {
                                    if(!ps.WorkItems.isEmpty()){
                                        SubmittedRecordsWrapper objSubmittedRecordsWrapper = new SubmittedRecordsWrapper();
                                        objSubmittedRecordsWrapper.workItemId = ps.WorkItems[0].Id;
                                        objSubmittedRecordsWrapper.recordId = ps.TargetObjectId;
                                        objSubmittedRecordsWrapper.recordName = ps.TargetObject.Name;
                                        objSubmittedRecordsWrapper.relatedTo = getObjectName(ps.TargetObjectId);
                                        objSubmittedRecordsWrapper.submittedDate = Date.newInstance(ps.CreatedDate.year(),ps.CreatedDate.month(),ps.CreatedDate.day());
                                        if(!ps.steps.isEmpty()){
                                            objSubmittedRecordsWrapper.submittedBy = ps.steps[0].OriginalActor.Name;
                                            lstSubmissionWrapper.add(objSubmittedRecordsWrapper);
                                        }
                                    }
        }

        return lstSubmissionRecord;
        
    }

    public static String getObjectName(String recordId){
        String keyPrefix = recordId.substring(0, 3);
        String objectName = '';
        Map<String, Schema.SObjectType> sObjectTypeMap = Schema.getGlobalDescribe();
        for (String obj : sObjectTypeMap.keySet() ) {
            Schema.DescribeSObjectResult sObjectResult = sObjectTypeMap.get(obj).getDescribe();
            if (sObjectResult.getKeyPrefix() == keyPrefix) {
                objectName = sObjectResult.getLabel();
                break;
            }
            
        }
        return objectName;
    }

}
