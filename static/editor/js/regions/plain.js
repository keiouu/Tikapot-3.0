
/*!
The Plain region is a simplified single line HTML5 Content Editable region. It restricts paste, drag/drop, and only
provides the ability to do some common actions like bold, italics, and underline. This is a useful region for headings
 and other single line areas.

Dependencies:
  rangy-core - https://code.google.com/p/rangy/
  rangy-serializer
  rangy-cssclassapplier
*/


(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mercury.configure('toolbars:plain', {
    decoration: {
      bold: ['Bold'],
      italic: ['Italicize'],
      underline: ['Underline']
    }
  });

  Mercury.Region.Plain = (function(_super) {

    __extends(Plain, _super);

    Plain.define('Mercury.Region.Plain', 'plain');

    Plain.include(Mercury.Region.Modules.HtmlSelection);

    Plain.include(Mercury.Region.Modules.SelectionValue);

    Plain.include(Mercury.Region.Modules.ContentEditable);

    Plain.supported = document.designMode && (!Mercury.support.msie || Mercury.support.msie >= 10) && (window.rangy && window.rangy.supported);

    Plain.prototype.toolbars = ['plain'];

    Plain.prototype.events = {
      'keydown': 'onKeyEvent',
      'paste': 'onPaste'
    };

    function Plain() {
      try {
        window.rangy.init();
      } catch (e) {
        this.notify(this.t('requires Rangy'));
        return false;
      }
      Plain.__super__.constructor.apply(this, arguments);
      if (!this.config('regions:plain:actions')) {
        this.actions = null;
      }
    }

    Plain.prototype.onDropItem = function(e) {
      return e.preventDefault();
    };

    Plain.prototype.onPaste = function(e) {
      return e.preventDefault();
    };

    Plain.prototype.onKeyEvent = function(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40) {
        return;
      }
      if (e.metaKey && e.keyCode === 90) {
        return;
      }
      if (e.keyCode === 13) {
        return e.preventDefault();
      }
      if (e.metaKey) {
        switch (e.keyCode) {
          case 66:
            e.preventDefault();
            return this.handleAction('bold');
          case 73:
            e.preventDefault();
            return this.handleAction('italic');
          case 85:
            e.preventDefault();
            return this.handleAction('underline');
        }
      }
      return this.pushHistory(e.keyCode);
    };

    Plain.prototype.actions = {
      bold: function() {
        return this.toggleWrapSelectedWordsInClass('red');
      },
      italic: function() {
        return this.toggleWrapSelectedWordsInClass('highlight');
      },
      underline: function() {
        return this.toggleWrapSelectedWordsInClass('blue');
      },
      link: function() {},
      character: function() {}
    };

    return Plain;

  })(Mercury.Region);

}).call(this);
