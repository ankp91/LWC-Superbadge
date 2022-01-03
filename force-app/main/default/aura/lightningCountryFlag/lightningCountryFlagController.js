({
    //  doInit : function(component, event, helper) {

    // //     alert(component.find("makeId").get('v.value'));
    // //     var country = component.get('v.countries');


    // //     if(country === "Australia"){
    // //         var australia = $A.get('$Resource.Australia'); //+ '/images/flag-australia.png';
    // //         alert(australia);
    // //     }

    //     var action = component.get('c.getCountryName');
    //     var inputCountry = component.find('accountCountry');
    //     var opts = [];
    //     action.setCallback(this, function(response){
    //         opts.push({
    //             class: "optionClass",
    //             label: "---None---",
    //             value: ""
    //         });
    //         for(var i=0; i< response.getReturnValue().length; i++){
    //             opts.push({"class": "optionClass", label: a.getReturnValue()[i], value: a.getReturnValue()[i]});
    //         }
    //         inputCountry.set('v.options', opts);
    //     });
    //     $A.enqueueAction(action);
    // },
      
     onPicklistChange : function(component, event, helper){
         var selectedCountry = component.find("accountCountry");
         alert(selectedCountry.get("v.value"));
    },
    generateFlag : function(component, event, helper){
        var country = component.get('v.countries');
        var act = component.get('c.getCountryName');
        act.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var rt = response.getReturnValue();
                component.set('v.countries', rt);
            }
        });

        $A.enqueueAction(act);

        if(country != undefined){
            var australia = $A.get('$Resource.Australia');
            var china = $A.get('$Resource.China');
            var europe = $A.get('$Resource.Europe');
            var france = $A.get('$Resource.France');
            var india = $A.get('$Resource.India');
            var italy = $A.get('$Resource.Italy');
            var japan = $A.get('$Resource.Japan');
            var russia = $A.get('$Resource.Russia');
            var sa = $A.get('$Resource.SouthAfrica');
            var sk = $A.get('$Resource.SouthKorea');
            var usa = $A.get('$Resource.USA');

            if('v.countries' === 'Australia'){
                component.set('v.countries', australia);
            }
            
        }
    } 
})
