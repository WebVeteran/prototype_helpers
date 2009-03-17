(function(){
  var methods = {
    defaultValueActsAsHint: function(element){
      element = $(element);
      element._default = element.value;
      element._type = element.type;
      
      // Password field? Turn off automcomplete and make it a text field
      if (element._type.toLowerCase()=='password') {
		element.setAttribute('autocomplete','off');
		element.type = 'text';
      }
      
      return element.observe('focus', function(){
        if(element._default != element.value) return;
        element.type = element._type; // Changes back, for password
        element.removeClassName('hint').value = '';
      }).observe('blur', function(){
        if(element.value.strip() != '') return;
        element.type = 'text'; // Changes to text, for password
        element.addClassName('hint').value = element._default;
      }).addClassName('hint');
    }
  };
   
  $w('input textarea').each(function(tag){ Element.addMethods(tag, methods) });
})();