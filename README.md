# angular-loading-directive
Add the *__loading__* directive to any HTML element to make it appear whenever there is at least one pending XHR request. You can place elements wherever you like and style them with CSS animations to bring them to life. This is a simple, automatated way to give the user loading/saving feedback.
``` html
<div class="LoadingBar" loading></div>
```

**File Size**: 2.1K minified; 0.8K gzipped

## Installation
1. Install via npm
```
$ npm install angular-loading-directive
```
2. Add *zt.angular-loading* as a dependency of your app
``` javascript
	angular.module('myApp', ['zt.angular-loading', ... ])
```

## Usage
Add the *__loading__* directive to any element that you would like to act as a loading bar, wheel, modal, etc.
``` html
<div class="LoadingModal">
    <div class="LoadingWheel" loading>
</div>
```
To see an example go to the [github.io site](https://zackthoutt.github.io/angular-loading-directive/)

## Configuration
#### Adjust the latency threshold
By default, any element with the loading directive will be shown for the duration of the time there is at least one XHR request pending. If you would like to customize this and only display the loading bar for slower responses use the LoadingProvider to set this threshold.
``` javascript
angular.module('myApp', ['zt.angular-loading'])
    .config(function(LoadingProvider) {
        LoadingProvider.latencyThreshold = 100;
    });
```

#### Hide on certain request types
By default, the loading directive is visible when there is a pending XHR request of any type. You can configre the loading bar to only be visible while certian types of requests are pending. Perhaps you want to give the user feedback about loading but not saving so the app feels more fluid and automatic. Then restrict the request types tracked to only GET requests.
``` javascript
angular.module('myApp', ['zt.angular-loading'])
    .config(function(LoadingProvider) {
        LoadingProvider.requestType = ['GET'];
    });
```

#### Ignoring individual XHR requests
When your app is polling it can be very annoying to the user to keep showing the loading bar for what are supposed to be transparent updates. To ignore individual requests pass the *__hideLoading__* attribute to the `$http` request configuration.
``` javascript
$http.get('/test', {
    hideLoading: true
});
$http.patch('/test', {
    hideLoading: true
});
```

## Manual usage
If you would like to manually show and hide your loading elements then you can use the service API.
``` javascript
angular.module('myApp', ['zt.angular-loading'])
    .controller('myAppcontroller', function(Loading) {
        var self = this;
        self.showLoading = function() {
            Loading.show();
        };
        self.hideLoading = function() {
            Loading.hide();
        };
        self.showLoadingFor = function(milliseconds) {
            Loading.showFor(milliseconds);
        };
    });
```
