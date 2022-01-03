public with sharing class CountryFlag {

    @AuraEnabled
    public static List<Account> getCountryName(){

        List<Account> country = [Select Id, countries__c from Account];

        return country;
        
    } 

    // @AuraEnabled        
    // public static List<String> getCountryName(String objectType, String selectedField){
    //    List<String> options = new List<String>();
    //    Schema.DescribeFieldResult fieldResult = Account.Countries__c.getDescribe();
    //    List<Schema.PicklistEntry> pList = fieldResult.getPicklistValues();
    //     for (Schema.PicklistEntry p: pList) {
    //         options.add(p.getLabel());
    //     }
    //     return options;
    // } 
}
