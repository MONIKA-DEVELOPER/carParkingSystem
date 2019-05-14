$(function(){
  $('#addForm').validate({
      rules : {
        carName :{
          required :{
            depends:function(){
                $(this).val($.trim($(this).val()));
                return true;
            }
        },
      },
      carNumber : {
        required :{
          depends:function(){
              $(this).val($.trim($(this).val()));
              return true;
          }
      },
    },
    owner : {
      required :{
        depends:function(){
            $(this).val($.trim($(this).val()));
            return true;
        }
    },
  },
     email : {
       required :{
         depends:function(){
             $(this).val($.trim($(this).val()));
             return true;
         }
     },
  },
   contact : {
     required :{
       depends:function(){
           $(this).val($.trim($(this).val()));
           return true;
       }
   },
   },
   company :{
   required :{
     depends:function(){
         $(this).val($.trim($(this).val()));
         return true;
     }
   },
   },
   floorNumber : {
      required :{
       depends:function(){
          $(this).val($.trim($(this).val()));
          return true;
      },
   }
 },
   file : {
     required :{
       depends:function(){
       $(this).val($.trim($(this).val()));
       return true;
    }
   }
   }
 },
      messages : {
        carName : {
          required : 'required',
        },
        carNumber :{
          required : 'required',
        },
        owner : {
          required : 'required',
        },
        email : {
          required : 'required',
        },
        contact : {
          required : 'required',
        },
        company : {
          required : 'required',
        },
        floorNumber : {
          required : 'required',
        },
        file: {
          required : 'required',
        },
      },
  });
});
