 import { LightningElement, track } from 'lwc';
 import { createRecord } from 'lightning/uiRecordApi';
 import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 import ACCOUNT_OBJECT from '@salesforce/schema/Account';
 import NAME_FIELD from '@salesforce/schema/Account.Name';
 import CONTACT_OBJECT from '@salesforce/schema/Contact';
 import CONTACTNAME_FIELD from '@salesforce/schema/Contact.LastName';
 import ACCOUNTID_FIELD from '@salesforce/schema/Contact.AccountId';
 
export default class createRelatedRecord extends LightningElement {
    @track accountName;
    @track accountId; 
    @track contactId; 
   
    handleNameChange(event){
        this.accountName = event.target.value;
    } 

    save() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.accountName;
        const accRecordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields};
        createRecord(accRecordInput)
            .then(account => {
                this.accountId = account.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success',
                    }),
                );

                const fields_Contact = {};
                fields_Contact[CONTACTNAME_FIELD.fieldApiName] = this.accountName + "'s contact"; 
                fields_Contact[ACCOUNTID_FIELD.fieldApiName] = this.accountId;  
                const recordInput_Contact = { apiName: CONTACT_OBJECT.objectApiName,
                                              fields : fields_Contact};

                  createRecord(recordInput_Contact)
                    .then(contact => {
                        this.contactId = contact.id;
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Success',
                                message: 'Contact created',
                                variant: 'success',
                            }),
                        );
 
                       this.accountName = ''; 
                    })
 
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}