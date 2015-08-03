"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _angular2Angular2 = require('angular2/angular2');

var _ionicIonic = require('ionic/ionic');

var _songDetail = require('./song-detail');

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
var SongsPage = (function () {
    function SongsPage(app, nav) {
        _classCallCheck(this, SongsPage);

        this.name = 'Max';
        this.nav = nav;
        this.app = app;
        this.songs = [{ title: 'Linoleum', artist: 'NOFX' }, { title: 'Rise Above', artist: 'Black Flag' }, { title: 'Ruby Soho', artist: 'Rancid' }, { title: 'Blitzkrieg Bop', artist: 'Ramones' }, { title: 'Where Eagles Dare', artist: 'Misfits' }, { title: 'Superman', artist: 'Goldfinger' }, { title: 'Give Me The Cure', artist: 'Fugazi' }];
    }

    _createClass(SongsPage, [{
        key: "openSong",
        value: function openSong(song) {
            this.nav.push(_songDetail.SongDetailPage, {
                song: song
            });
        }
    }, {
        key: "toggleMenu",
        value: function toggleMenu() {
            var aside = this.app.getComponent('mainMenu');
            aside.toggle();
        }
    }]);

    return SongsPage;
})();
exports.SongsPage = SongsPage;
exports.SongsPage = SongsPage = __decorate([(0, _angular2Angular2.Component)({ selector: 'ion-view' }), (0, _angular2Angular2.View)({
    directives: [_angular2Angular2.NgFor, _ionicIonic.Content, _ionicIonic.List, _ionicIonic.Item, _ionicIonic.Navbar, _ionicIonic.NavbarTemplate],
    templateUrl: 'songs/songs.html'
}), __metadata('design:paramtypes', [typeof _ionicIonic.IonicApp !== 'undefined' && _ionicIonic.IonicApp || Object, typeof _ionicIonic.NavController !== 'undefined' && _ionicIonic.NavController || Object])], SongsPage);