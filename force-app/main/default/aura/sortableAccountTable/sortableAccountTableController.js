({
    doInit : function(component, event, helper) {
        component.set('v.accountColumns', [
            {
                label: 'Name',
                fieldName: 'Name',
                type: 'text',
                sortable: true
            },
            {
                label: 'Account Source',
                fieldName: 'AccountSource',
                type: 'text',
                sortable: true
            },
            {
                label: 'Rating',
                fieldName: 'Rating',
                type: 'text',
                sortable: true
            },
            {
                label: 'Employees',
                fieldName: 'NumberOfEmployees',
                type: 'number',
                sortable: true
            }
        ]);
        helper.getAccountData(component);
    },

    handleSort : function(component, event, helper){
        var sortBy = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');

        component.set('v.sortBy', sortBy);
        component.set('v.sortDirection', sortDirection);

        helper.sortDate(component, sortBy, sortDirection)
    }
})