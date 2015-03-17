/**
 * It`s Tanaka`s Template
 * @param {Object} arg .
 */
var TanakaTemplate = (function() {
var TanakaTemplate = function(arg) {
  this.init.call(this, arg);
};


/**
 * @param {Object} arg .
 * @param {Object=} opt .
 */
TanakaTemplate.prototype.init = function(arg, opt) {
  this.opt = {
    type: 'text/tanaka-template',
    tmeplate: null,
    target: null,
    befortag: '{{',
    aftertag: '}}',
    runFlg: true
  };

  this.setOpt(opt);

  if(arg && this.opt.runFlg) {
    this.run(arg);
  }
};


/**
 * オプション更新
 * @param {Object} opt .
 */
TanakaTemplate.prototype.setOpt = function(opt) {
  if(opt) {
    if(opt.type) {
      this.opt.type = opt.type;
    }
    if(opt.template) {
      this.opt.template = opt.template;
    }
    if(opt.target) {
      this.opt.target = opt.target;
    }
    if(opt.befortag) {
      this.opt.befortag = opt.befortag;
    }
    if(opt.aftertag) {
      this.opt.aftertag = opt.aftertag;
    }
    if(opt.runFlg) {
      this.opt.runFlg = opt.runFlg;
    }
  }
}


/**
 * 書き出し実行
 * @param {Object} arg .
 */
TanakaTemplate.prototype.run = function(arg) {
  var template, elm;
  template = this._getTemplate();
  if(template && template.innerText) {
    elm = this._setTemplateValue(template.innerText, arg);
  }
  if(elm) {
    this._render(elm);
  }
};


/**
 * テンプレートエレメントの取得処理
 * @return {string}
 */
TanakaTemplate.prototype._getTemplate = function() {
  var template, tmp;

  if(this.opt.template) {
    template = this.opt.template;
  } else if(document.querySelector) {
    template = document.querySelector('script[type="' + this.opt.type + '"]');
  } else {
    template =
      document.getElementsByTagName('script').find(function(elm){
        return elm.getAttribute('type') === this.opt.type;
      });
  }
  if(template.tagName !== 'SCRIPT') {
    template = null;
  }
  return template;
};


/**
 * テンプレートの変数置き換え処理
 * @param {string} template
 * @param {Object} arg
 * @return {Element}
 */
TanakaTemplate.prototype._setTemplateValue = function(template, arg) {
  Object.keys(arg).forEach((function (key) {
    template = template.split(this.opt.befortag + key + this.opt.aftertag).join(arg[key]);
  }).bind(this));
  template = template.replace(/\n/g, '');
  var tmp = document.createElement('div');
  tmp.innerHTML = template;
  return tmp.childNodes[0];
};


/**
 * @param {Element} elm .
 */
TanakaTemplate.prototype._render = function(elm) {
  if(!this.opt.runFlg && !this.opt.target) {
    return;
  }
  var target;
  if(this.opt.target) {
    this.opt.target.appendChild(elm);
  } else {
    var script = document.getElementsByTagName('script');
    target = script[script.length - 1];
    target.parentNode.insertBefore(elm, target);
  }
};

return TanakaTemplate;
})();
