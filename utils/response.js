export default new class{
        
    //成功的请求
     ok(obj){

         return {code:200,data:obj,msg:'ok'};

     }
     //失败的请求
     error(e){

         return {code:500,data:null,msg:e.message||'请求失败'};
     }

}();







