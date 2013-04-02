
/*!
The HTML region utilizes the full HTML5 ContentEditable featureset and adds some layers on top of that to normalize it
between browsers and to make it nicer to use.

Dependencies:
  rangy-core - https://code.google.com/p/rangy/
  rangy-serializer
  rangy-cssclassapplier
*/


(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mercury.configure('toolbars:html', {
    defined: {
      style: [
        'Style', {
          select: '/mercury/templates/style'
        }
      ],
      sep1: ' ',
      block: [
        'Block Format', {
          select: '/mercury/templates/block'
        }
      ],
      sep2: '-'
    },
    color: {
      bgcolor: [
        'Background Color', {
          palette: '/mercury/templates/bgcolor'
        }
      ],
      sep1: ' ',
      color: [
        'Text Color', {
          palette: '/mercury/templates/color'
        }
      ],
      sep2: '-'
    },
    decoration: {
      bold: ['Bold'],
      italic: ['Italicize'],
      strike: ['Strikethrough'],
      underline: ['Underline'],
      sep1: '-'
    },
    script: {
      subscript: ['Subscript'],
      superscript: ['Superscript'],
      sep1: '-'
    },
    justify: {
      justifyLeft: ['Align Left'],
      justifyCenter: ['Center'],
      justifyRight: ['Align Right'],
      justifyFull: ['Justify Full'],
      sep1: '-'
    },
    list: {
      unorderedList: ['Unordered List'],
      orderedList: ['Numbered List'],
      sep1: '-'
    },
    indent: {
      indent: ['Increase Indentation'],
      outdent: ['Decrease Indentation'],
      sep1: '-'
    },
    rules: {
      rule: [
        'Horizontal Rule', {
          title: 'Insert a horizontal rule'
        }
      ],
      sep1: '-'
    },
    extra: {
      clean: [
        'Remove Formatting', {
          title: 'Remove formatting for the selection'
        }
      ],
      sep1: ' ',
      edit: [
        'Edit HTML', {
          title: 'Edit the HTML content'
        }
      ],
      sep2: '-'
    },
    table: {
      rowBefore: [
        'Insert Table Row', {
          title: 'Insert a table row before the cursor'
        }
      ],
      rowAfter: [
        'Insert Table Row', {
          title: 'Insert a table row after the cursor'
        }
      ],
      rowDelete: [
        'Delete Table Row', {
          title: 'Delete this table row'
        }
      ],
      colBefore: [
        'Insert Table Column', {
          title: 'Insert a table column before the cursor'
        }
      ],
      colAfter: [
        'Insert Table Column', {
          title: 'Insert a table column after the cursor'
        }
      ],
      colDelete: [
        'Delete Table Column', {
          title: 'Delete this table column'
        }
      ],
      sep1: ' ',
      colIncrease: [
        'Increase Cell Columns', {
          title: 'Increase the cells colspan'
        }
      ],
      colDecrease: [
        'Decrease Cell Columns', {
          title: 'Decrease the cells colspan and add a new cell'
        }
      ],
      rowIncrease: [
        'Increase Cell Rows', {
          title: 'Increase the cells rowspan'
        }
      ],
      rowDecrease: [
        'Decrease Cell Rows', {
          title: 'Decrease the cells rowspan and add a new cell'
        }
      ]
    }
  });

  Mercury.Region.Html = (function(_super) {

    __extends(Html, _super);

    Html.define('Mercury.Region.Html', 'html');

    Html.include(Mercury.Region.Modules.DropIndicator);

    Html.include(Mercury.Region.Modules.HtmlSelection);

    Html.include(Mercury.Region.Modules.SelectionValue);

    Html.include(Mercury.Region.Modules.ContentEditable);

    Html.supported = document.designMode && (!Mercury.support.msie || Mercury.support.msie >= 10) && (window.rangy && window.rangy.supported);

    Html.prototype.toolbars = ['html'];

    Html.prototype.events = {
      'keydown': 'onKeyEvent',
      'paste': 'onPaste'
    };

    function Html() {
      try {
        window.rangy.init();
      } catch (e) {
        this.notify(this.t('requires Rangy'));
        return false;
      }
      Html.__super__.constructor.apply(this, arguments);
    }

    Html.prototype.onDropFile = function(files, options) {
      var uploader,
        _this = this;
      uploader = new Mercury.Uploader(files, {
        mimeTypes: this.config('regions:html:mimeTypes')
      });
      return uploader.on('uploaded', function(file) {
        _this.focus();
        return _this.handleAction('file', file);
      });
    };

    Html.prototype.onDropItem = function() {
      return this.pushHistory();
    };

    Html.prototype.onPaste = function(e) {
      return console.debug('pasted', e);
    };

    Html.prototype.onKeyEvent = function(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40) {
        return;
      }
      if (e.metaKey && e.keyCode === 90) {
        return;
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

    Html.prototype.actions = {
      bold: function() {
        return this.toggleWrapSelectedWordsInClass('red');
      },
      italic: function() {
        return this.toggleWrapSelectedWordsInClass('highlight');
      },
      underline: function() {
        return this.toggleWrapSelectedWordsInClass('blue');
      },
      rule: function() {
        return this.replaceSelection('<hr/>');
      },
      link: function() {},
      table: function() {},
      justifyRight: function() {},
      justifyFull: function() {},
      unorderedList: function() {},
      orderedList: function() {},
      indent: function() {},
      outdent: function() {},
      clean: function() {},
      edit: function() {},
      rowBefore: function() {},
      rowAfter: function() {},
      rowDelete: function() {},
      colBefore: function() {},
      colAfter: function() {},
      colDelete: function() {},
      sep1: function() {},
      colIncrease: function() {},
      colDecrease: function() {},
      rowIncrease: function() {},
      rowDecrease: function() {},
      file: function(file) {
        var action;
        action = file.isImage() ? 'image' : 'link';
        return this.handleAction(action, {
          url: file.get('url'),
          text: file.get('name')
        });
      },
      snippets: function() {},
      save: function() {},
      preview: function() {},
      history: function() {}
    };

    return Html;

  })(Mercury.Region);

}).call(this);
