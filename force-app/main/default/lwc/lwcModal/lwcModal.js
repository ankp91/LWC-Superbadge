import { LightningElement, track} from 'lwc';
export default class lwcModal extends LightningElement {
    @track bShowModal = false;

    openModal() {
        this.bShowModal = true;
    }

    closeModal() {
        this.bShowModal = false;
    }
}