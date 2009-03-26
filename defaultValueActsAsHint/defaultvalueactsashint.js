(function(){
  var methods = {
    defaultValueActsAsHint: function(element){
      element = $(element);
      element._default = element.value;
      element._type = element.type;
      
      // Password field? Turn off automcomplete and make it a text field. IE does not allow this.
      if (element._type.toLowerCase()=='password' && !Prototype.Browser.IE) {
		element.setAttribute('autocomplete','off');
		element.setAttribute('type','text');
      }
      
      return element.observe('focus', function(){
        if(element._default != element.value) return;
        if (!Prototype.Browser.IE) { element.setAttribute('type', element._type); } // Changes back, for password
        element.removeClassName('hint').value = '';
      }).observe('blur', function(){
        if(element.value.strip() != '') return;
        if (!Prototype.Browser.IE) { element.setAttribute('type','text'); } // Changes to text, for password
        element.addClassName('hint').value = element._default;
      }).addClassName('hint');
    }
  };
   
  $w('input textarea').each(function(tag){ Element.addMethods(tag, methods) });
})();