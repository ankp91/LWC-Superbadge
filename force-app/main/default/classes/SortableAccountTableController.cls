public with sharing class SortableAccountTableController {
    
    public class AccountWrapper{
        @AuraEnabled
        public string message;

        @AuraEnabled
        public List<Account> accountList;

        @AuraEnabled
        public Boolean success;
    }

    @AuraEnabled
    public static AccountWrapper getAccountName(){

        AccountWrapper accWrapper = new AccountWrapper();

        try {
            accWrapper.accountList = [SELECT Id, Name, AccountSource, Rating, NumberOfEmployees 
                                     From Account Order By AnnualRevenue
                                     DESC NULLS LAST
                                     LIMIT 50];
            accWrapper.message = 'Account Records are Retrieved';
            accWrapper.success = true;
        } catch (Exception e) {
            accWrapper.message = e.getMessage();
            accWrapper.success = false; 
        }
        return accWrapper;
    }
}