"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ionicIonic = require('ionic/ionic');

var _songsSongs = require('./songs/songs');

var _playlistsPlaylists = require('./playlists/playlists');

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return (d && d(target, key), void 0);
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MyApp = (function () {
    function MyApp(app) {
        _classCallCheck(this, MyApp);

        console.log('IonicApp Start', _songsSongs.SongsPage);
        this.app = app;
        this.pages = [{ title: 'Songs', component: _songsSongs.SongsPage }, { title: 'Playlists', component: _playlistsPlaylists.PlaylistsPage }];
        this.firstPage = _songsSongs.SongsPage;
    }

    _createClass(MyApp, [{
        key: "openPage",
        value: function openPage(aside, page) {
            console.log('Opening page', page);
            // Close the side menu
            aside.close();
            // Reset the content nav to have just this page
            var nav = this.app.getComponent('nav');
            nav.setItems([page.component]);
        }
    }]);

    return MyApp;
})();
MyApp = __decorate([(0, _ionicIonic.App)({
    templateUrl: 'layout/main.html'
}), __metadata('design:paramtypes', [typeof _ionicIonic.IonicApp !== 'undefined' && _ionicIonic.IonicApp || Object])], MyApp);