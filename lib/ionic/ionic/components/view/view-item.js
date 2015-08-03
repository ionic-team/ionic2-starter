'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _angular2Angular2 = require('angular2/angular2');

var _angular2SrcCoreCompilerElement_injector = require('angular2/src/core/compiler/element_injector');

var _navNavController = require('../nav/nav-controller');

var ViewItem = (function () {
    function ViewItem(viewCtrl, component) {
        var params = arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, ViewItem);

        this.viewCtrl = viewCtrl;
        this.component = component;
        this.params = new _navNavController.NavParams(params);
        this.instance = null;
        this.state = 0;
        this.disposals = [];
        this.protos = {};
        this._nbItms = [];
        this._promises = [];
    }

    _createClass(ViewItem, [{
        key: 'addProtoViewRef',
        value: function addProtoViewRef(name, protoViewRef) {
            this.protos[name] = protoViewRef;
        }
    }, {
        key: 'stage',
        value: function stage(callback) {
            var _this = this;

            var viewCtrl = this.viewCtrl;
            if (this.instance || !viewCtrl) {
                // already compiled this view
                return callback();
            }
            var annotation = new _angular2Angular2.Component({
                selector: 'ion-view',
                host: {
                    'class': 'nav-item'
                }
            });
            var ionViewComponent = _angular2SrcCoreCompilerElement_injector.DirectiveBinding.createFromType(this.component, annotation);
            // compile the Component
            viewCtrl.compiler.compileInHost(ionViewComponent).then(function (componentProtoViewRef) {
                // figure out the sturcture of this Component
                // does it have a navbar? Is it tabs? Should it not have a navbar or any toolbars?
                var itemStructure = _this.sturcture = _this.inspectStructure(componentProtoViewRef);
                // get the appropriate Pane which this ViewItem will fit into
                viewCtrl.panes.get(itemStructure, function (pane) {
                    _this.pane = pane;
                    // create a new injector just for this ViewItem
                    var injector = viewCtrl.injector.resolveAndCreateChild([(0, _angular2Angular2.bind)(_navNavController.NavParams).toValue(_this.params), (0, _angular2Angular2.bind)(ViewItem).toValue(_this)]);
                    // add the content of the view to the content area
                    // it will already have the correct context
                    var contentContainer = pane.contentContainerRef;
                    var hostViewRef = contentContainer.create(componentProtoViewRef, -1, null, injector);
                    // get the component's instance, and set it to the this ViewItem
                    _this.setInstance(viewCtrl.viewMngr.getComponent(new _angular2Angular2.ElementRef(hostViewRef, 0)));
                    _this.viewElement(hostViewRef._view.render._view.rootNodes[0]);
                    // remember how to dispose of this reference
                    _this.disposals.push(function () {
                        contentContainer.remove(contentContainer.indexOf(hostViewRef));
                    });
                    // get the view's context so when creating the navbar
                    // it uses the same context as the content
                    var context = {
                        boundElementIndex: 0,
                        parentView: {
                            _view: hostViewRef._view.componentChildViews[0]
                        }
                    };
                    // get the item container's nav bar
                    var navbarViewContainer = viewCtrl.navbarViewContainer();
                    // get the item's navbar protoview
                    var navbarProtoView = _this.protos.navbar;
                    // add a navbar view if the pane has a navbar container, and the
                    // item's instance has a navbar protoview to go to inside of it
                    if (navbarViewContainer && navbarProtoView) {
                        (function () {
                            var navbarView = navbarViewContainer.create(navbarProtoView, -1, context, injector);
                            _this.disposals.push(function () {
                                navbarViewContainer.remove(navbarViewContainer.indexOf(navbarView));
                            });
                        })();
                    }
                    // this item has finished loading
                    try {
                        _this.loaded();
                    } catch (e) {
                        console.error(e);
                    }
                    // fire callback when all child promises have been resolved
                    Promise.all(_this._promises).then(function () {
                        callback();
                        _this._promises = [];
                    });
                }, function (panesErr) {
                    console.error(panesErr);
                });
            }, function (compileInHostErr) {
                console.error(compileInHostErr);
            });
        }
    }, {
        key: 'addPromise',
        value: function addPromise(childPromise) {
            this._promises.push(childPromise);
        }
    }, {
        key: 'inspectStructure',
        value: function inspectStructure(componentProtoViewRef) {
            var navbar = false;
            var key = '_';
            componentProtoViewRef._protoView.elementBinders.forEach(function (rootElementBinder) {
                if (!rootElementBinder.componentDirective || !rootElementBinder.nestedProtoView) return;
                rootElementBinder.nestedProtoView.elementBinders.forEach(function (nestedElementBinder) {
                    if (isComponent(nestedElementBinder, 'Tabs')) {
                        navbar = true;
                    }
                    if (!nestedElementBinder.componentDirective && nestedElementBinder.nestedProtoView) {
                        nestedElementBinder.nestedProtoView.elementBinders.forEach(function (templatedElementBinder) {
                            if (isComponent(templatedElementBinder, 'Navbar')) {
                                navbar = true;
                            }
                        });
                    }
                });
            });
            if (this.viewCtrl.childNavbar()) {
                navbar = false;
            }
            if (navbar) key += 'n';
            return {
                navbar: navbar,
                key: key
            };
        }
    }, {
        key: 'enableBack',
        value: function enableBack() {
            // update if it's possible to go back from this nav item
            if (this.viewCtrl) {
                var previousItem = this.viewCtrl.getPrevious(this);
                // the previous view may exist, but if it's about to be destroyed
                // it shouldn't be able to go back to
                return !!(previousItem && !previousItem.shouldDestroy);
            }
            return false;
        }
    }, {
        key: 'setInstance',
        value: function setInstance(instance) {
            this.instance = instance;
            this.instance._viewItem = this;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            for (var i = 0; i < this.disposals.length; i++) {
                this.disposals[i]();
            }
            this.didUnload();
            // just to help prevent any possible memory leaks
            for (var _name in this) {
                if (this.hasOwnProperty(_name)) {
                    this[_name] = null;
                }
            }
        }
    }, {
        key: 'viewElement',
        value: function viewElement(val) {
            if (arguments.length) {
                this._vwEle = val;
            }
            return this._vwEle;
        }
    }, {
        key: 'navbarView',
        value: function navbarView() {
            if (arguments.length) {
                this._nbView = arguments[0];
            }
            return this._nbView;
        }
    }, {
        key: 'navbarElement',
        value: function navbarElement() {
            var navbarView = this.navbarView();
            if (navbarView) {
                return navbarView.getElementRef();
            }
        }
    }, {
        key: 'titleElement',
        value: function titleElement() {
            var navbarView = this.navbarView();
            if (navbarView) {
                return navbarView.titleElement();
            }
        }
    }, {
        key: 'backButtonElement',
        value: function backButtonElement() {
            var navbarView = this.navbarView();
            if (navbarView) {
                return navbarView.backButtonElement();
            }
        }
    }, {
        key: 'backButtonTextElement',
        value: function backButtonTextElement() {
            var navbarView = this.navbarView();
            if (navbarView) {
                return navbarView.backButtonTextElement();
            }
        }
    }, {
        key: 'navbarItemElements',
        value: function navbarItemElements() {
            var navbarView = this.navbarView();
            if (navbarView) {
                return navbarView.itemElements();
            }
        }
    }, {
        key: 'postRender',
        value: function postRender() {
            // the elements are in the DOM and the browser
            // has rendered them in their correct locations
            var navbarView = this.navbarView();
            if (navbarView) {
                navbarView.alignTitle();
            }
        }
    }, {
        key: 'loaded',

        /*
          The view has loaded. This event only happens once per view being
          created. If a view leaves but is cached, then this will not
          fire again on a subsequent viewing. This method is a good place
          to put your setup code for the view; however, it is not the
          recommended method to use when a view becomes active.
        */
        value: function loaded() {
            this.instance && this.instance.viewLoaded && this.instance.viewLoaded();
        }
    }, {
        key: 'willEnter',

        /*
          The view is about to enter and become the active view.
        */
        value: function willEnter() {
            this.instance && this.instance.viewWillEnter && this.instance.viewWillEnter();
        }
    }, {
        key: 'didEnter',

        /*
          The view has fully entered and is now the active view. This
          will fire, whether it was the first load or loaded from the cache.
        */
        value: function didEnter() {
            if (this.pane) {
                this.pane.showPane = true;
            }
            var navbarView = this.navbarView();
            if (navbarView) {
                navbarView.didEnter();
            }
            this.instance && this.instance.viewDidEnter && this.instance.viewDidEnter();
        }
    }, {
        key: 'willLeave',

        /*
          The view has is about to leave and no longer be the active view.
        */
        value: function willLeave() {
            this.instance && this.instance.viewWillLeave && this.instance.viewWillLeave();
        }
    }, {
        key: 'didLeave',

        /*
          The view has finished leaving and is no longer the active view. This
          will fire, whether it is cached or unloaded.
        */
        value: function didLeave() {
            this.instance && this.instance.viewDidLeave && this.instance.viewDidLeave();
        }
    }, {
        key: 'willUnload',

        /*
          The view is about to be destroyed and have its elements removed.
        */
        value: function willUnload() {
            this.instance && this.instance.viewWillUnload && this.instance.viewWillUnload();
        }
    }, {
        key: 'didUnload',

        /*
          The view has been destroyed and its elements have been removed.
        */
        value: function didUnload() {
            this.instance && this.instance.viewDidUnload && this.instance.viewDidUnload();
        }
    }, {
        key: 'index',
        get: function get() {
            return this.viewCtrl ? this.viewCtrl.indexOf(this) : -1;
        }
    }]);

    return ViewItem;
})();

exports.ViewItem = ViewItem;

function isComponent(elementBinder, id) {
    return elementBinder && elementBinder.componentDirective && elementBinder.componentDirective.metadata.id == id;
}