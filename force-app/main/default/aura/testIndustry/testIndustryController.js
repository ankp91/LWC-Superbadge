({
    doInit: function(component, event, helper) {
        var action = component.get("c.getIndustry");
        var inputIndustry = component.find("InputAccountIndustry");
        var opts=[];
        action.setCallback(this, function(a) {
            opts.push({
                class: "optionClass",
                label: "--- None ---",
                value: ""
            });
            for(var i=0;i< a.getReturnValue().length;i++){
                opts.push({"class": "optionClass", label: a.getReturnValue()[i], value: a.getReturnValue()[i]});
            }
            inputIndustry.set("v.options", opts);
             
        });
        $A.enqueueAction(action); 
    },
    onPicklistChange: function(component, event, helper) {
        //get the value of select option
        var selectedIndustry = component.find("InputAccountIndustry");
        alert(selectedIndustry.get("v.value"));
        if(selectedIndustry.get("v.value") === "Australia"){
            var aus = $A.get('$Resource.Australia') + '/images/australia.png';
            component.set('v.country', aus);
        }
    },

    closeModel : function(component, event, helper){
        component.set('v.hasModalOpen', false);
        component.set('v.selectedCountryId', null);
    },

    generateFlag : function(component, event, helper){
        component.set("v.hasModalOpen" , true);
        component.set("v.selectedCountryId" , event.currentTarget.getAttribute("data-Id"));
    }
})
