*This repository is a mirror of the [component](http://component.io) module [enricomarino/foundation](http://github.com/enricomarino/foundation). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/enricomarino-foundation`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
#foundation

Zurb Foundation CSS framework component

[http://foundation.zurb.com](http://foundation.zurb.com/)

### usage
As this module doesn't export the jQuery object directly, it provides a `foundation.init` method that you can call with `foundation.init(element)` –`element` being either `document` or a particular element in which you want the foundation plugins to work.