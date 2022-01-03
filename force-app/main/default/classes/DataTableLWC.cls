public with sharing class DataTableLWC {
    public static List<Account> fetchAccount(){
        return [SELECT Id, Name, Phone, Type, Industry, Rating FROM Account limit 100];
    }
}
