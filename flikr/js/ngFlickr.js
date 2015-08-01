angular.module('ngFlickr', [
    'ngMaterial',
    'ngResource'])
    .factory('flickr', function ($resource) {
    return $resource('http://api.flickr.com/services/feeds/photos_public.gne', {
        format: 'json',
        jsoncallback: 'JSON_CALLBACK'
    }, {
        'load': {
            'method': 'JSONP'
        }
    });
})
    .directive('background', function () {
    return function (scope, element, attrs) {
        var url = attrs.background;
        element.css({
            'background-image': 'url(' + url + ')',
                'background-size': 'cover',
                'background-position': 'center'
        });
    };
})
    .filter('reverse', function () {
    return function (items) {
        if(items !== undefined) {
          return items.slice().reverse();
        }
    };
})
    .controller('FlickrController', ['$scope', '$mdSidenav', 'flickr', '$sce', function ($scope, $mdSidenav, flickr, $sce) {

    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.tags = ['London'];
    $scope.readonly = false;

    $scope.$watch('tags.length', function () {

        $scope.flickr = flickr.load({
            tags: $scope.tags.join(", ")
        });

    });

    $scope.secure = function (input) {

        return $sce.trustAsHtml(input);

    };

}]);
