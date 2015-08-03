"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _angular2Angular2 = require('angular2/angular2');

var _ionicIonic = require('ionic/ionic');

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
var SongDetailPage = function SongDetailPage(nav, navParams) {
    _classCallCheck(this, SongDetailPage);

    this.nav = nav;
    this.song = navParams.song;
    console.log('Showing song', this.song);
};
exports.SongDetailPage = SongDetailPage;
exports.SongDetailPage = SongDetailPage = __decorate([(0, _angular2Angular2.Component)({ selector: 'ion-view' }), (0, _angular2Angular2.View)({
    directives: [_ionicIonic.Content, _ionicIonic.Navbar, _ionicIonic.NavbarTemplate],
    templateUrl: 'songs/song_detail.html'
}), __metadata('design:paramtypes', [typeof _ionicIonic.NavController !== 'undefined' && _ionicIonic.NavController || Object, typeof _ionicIonic.NavParams !== 'undefined' && _ionicIonic.NavParams || Object])], SongDetailPage);