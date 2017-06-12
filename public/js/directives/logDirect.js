// public/js/directives/logDirect.js

//TODO a finir !!!!
angular.module('LogDirect',[]).directive('dpLog', function($compile){
        var login = '<a href="/login">Login</a>';
        var logout = '<a href="/logout">Logout</a>';
        var getTemplateUrl = function(isLog){
                if(isLog){
                        return logout;
                }else{
                        return login;
                }
        }
        return{
                restrict: 'E',
                scope: {
                        isLog: '@user'
                },
                link: function (scope, element, attributes){
                        element.html(getTemplateUrl(scope.isLog)).show();
                        $compile(element.contents())(scope);
                }
        };
});
