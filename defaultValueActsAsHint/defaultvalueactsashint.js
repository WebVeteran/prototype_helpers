(function(){
  var methods = {
    defaultValueActsAsHint: function(element){
      element = $(element);
      element._default = element.value;
      element._type = element.type;
      
      // make it plain text to show the value
      element.type = 'text';
      
      return element.observe('focus', function(){
        if(element._default != element.value) return;
        element.type = element._type;
        element.removeClassName('hint').value = '';
      }).observe('blur', function(){
        if(element.value.strip() != '') return;
        element.type = 'text';
        element.addClassName('hint').value = element._default;
      }).addClassName('hint');
    }
  };
   
  $w('input textarea').each(function(tag){ Element.addMethods(tag, methods) });
})();