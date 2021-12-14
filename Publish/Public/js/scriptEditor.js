/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/vendor/Onix/js/scriptEditor/src/commands.js":
/*!***************************************************************!*\
  !*** ./resources/vendor/Onix/js/scriptEditor/src/commands.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./resources/vendor/Onix/js/scriptEditor/src/consts.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (editor) {\n  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var cm = editor.Commands;\n  var md = editor.Modal;\n  var domc = editor.Components;\n  var modalTitle = opts.modalTitle,\n      codeViewOptions = opts.codeViewOptions,\n      commandAttachScript = opts.commandAttachScript,\n      toolbarIcon = opts.toolbarIcon,\n      onRun = opts.onRun,\n      onError = opts.onError,\n      starter = opts.starter;\n  var scriptTypesSupport = opts.scriptTypesSupport;\n  var content = null;\n\n  var appendToContent = function appendToContent(target, content) {\n    if (content instanceof HTMLElement) {\n      target.appendChild(content);\n    } else if (content) {\n      target.insertAdjacentHTML('beforeend', content);\n    }\n  };\n\n  if (editor.$.isString(scriptTypesSupport)) {\n    scriptTypesSupport = scriptTypesSupport.split(',');\n  }\n\n  if (editor.$.isArray(scriptTypesSupport)) {\n    scriptTypesSupport = scriptTypesSupport.includes('*') ? domc.getTypes().map(function (c) {\n      return c.id;\n    }) : scriptTypesSupport;\n  } // Add icons to specified component types\n\n\n  scriptTypesSupport && scriptTypesSupport.forEach(function (type) {\n    var typeOpt = domc.getType(type).model;\n    domc.addType(type, {\n      model: {\n        initToolbar: function initToolbar() {\n          typeOpt.prototype.initToolbar.apply(this, arguments);\n          var tb = this.get('toolbar');\n          var tbExists = tb.some(function (item) {\n            return item.command === _consts__WEBPACK_IMPORTED_MODULE_0__.cmdId;\n          });\n\n          if (!tbExists) {\n            tb.unshift(_objectSpread({\n              command: _consts__WEBPACK_IMPORTED_MODULE_0__.cmdId,\n              label: toolbarIcon\n            }, opts.toolbarBtnCustomScript));\n            this.set('toolbar', tb);\n          }\n        }\n      }\n    });\n  }); // Add the script command\n\n  cm.add(_consts__WEBPACK_IMPORTED_MODULE_0__.cmdId, _objectSpread({\n    run: function run(editor, sender) {\n      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n      this.editor = editor;\n      this.options = opts;\n      this.target = opts.target || editor.getSelected();\n      var target = this.target;\n      if (target) this.showCustomCode(target);\n    },\n    stop: function stop(editor) {\n      md.close();\n    },\n\n    /**\r\n     * Method which tells how to show the custom code\r\n     * @param  {Component} target\r\n     */\n    showCustomCode: function showCustomCode(target) {\n      var _this = this;\n\n      var editor = this.editor,\n          options = this.options;\n      var title = options.title || modalTitle;\n      if (!content) content = this.getContent();\n      var code = target.getScriptString() || starter;\n      md.open({\n        title: title,\n        content: content\n      }).getModel().once('change:open', function () {\n        return editor.stopCommand(_this.id);\n      });\n      this.getCodeViewer().setContent(code);\n    },\n\n    /**\r\n     * Custom pre-content. Can be a simple string or an HTMLElement\r\n     */\n    getPreContent: function getPreContent() {},\n\n    /**\r\n     * Custom post-content. Can be a simple string or an HTMLElement\r\n     */\n    getPostContent: function getPostContent() {},\n\n    /**\r\n     * Get all the content for the custom code\r\n     * @return {HTMLElement}\r\n     */\n    getContent: function getContent() {\n      var editor = this.editor;\n      var content = document.createElement('div');\n      var pfx = editor.getConfig('stylePrefix');\n      content.className = \"\".concat(pfx, \"attach-script\");\n      appendToContent(content, this.getPreContent());\n      var codeViewer = this.getCodeViewer();\n      codeViewer.refresh();\n      setTimeout(function () {\n        return codeViewer.focus();\n      }, 0);\n      content.appendChild(codeViewer.getElement());\n      appendToContent(content, this.getPostContent());\n      appendToContent(content, this.getContentActions());\n      return content;\n    },\n\n    /**\r\n     * Get the actions content. Can be a simple string or an HTMLElement\r\n     * @return {HTMLElement|String}\r\n     */\n    getContentActions: function getContentActions() {\n      var _this2 = this;\n\n      var editor = this.editor;\n      var actions = document.createElement('div');\n      actions.id = \"actns\";\n      var btn = document.createElement('button');\n      var pfx = editor.getConfig('stylePrefix');\n      btn.innerHTML = opts.buttonLabel;\n      btn.className = \"\".concat(pfx, \"btn-prim \").concat(pfx, \"btn-save__inject-logic\");\n\n      btn.onclick = function () {\n        return _this2.handleSave();\n      };\n\n      var runLogic = document.createElement('div');\n      runLogic.id = \"logic-toolbar\";\n      runLogic.className = \"fa fa-bug\";\n      runLogic.style = \"margin:5px;padding:10px;background:rgba(0,0,0,0.2);border-radius:3px;border:1px solid rgba(0,0,0,0.2);cursor:pointer\";\n\n      runLogic.onclick = function () {\n        return _this2.runCode();\n      };\n\n      actions.appendChild(runLogic);\n      actions.appendChild(btn);\n      return actions;\n    },\n\n    /**\r\n     * Handle the main save task\r\n     */\n    handleSave: function handleSave() {\n      var editor = this.editor,\n          target = this.target;\n      var code = this.getCodeViewer().getContent();\n      target.set('script', code);\n      editor.Modal.close();\n    },\n\n    /**\r\n     * Return the code viewer instance\r\n     * @return {CodeViewer}\r\n     */\n    getCodeViewer: function getCodeViewer() {\n      var editor = this.editor;\n\n      if (!this.codeViewer) {\n        this.codeViewer = editor.CodeManager.createViewer(_objectSpread({\n          codeName: 'javascript',\n          theme: 'hopscotch',\n          readOnly: 0,\n          autoBeautify: 1\n        }, codeViewOptions));\n      }\n\n      return this.codeViewer;\n    },\n\n    /**\r\n     * Evaluate code syntax\r\n     */\n    runCode: function runCode() {\n      //console.log(\"run\")\n      try {\n        var code = this.getCodeViewer().getContent();\n        Function('\"use strict\";' + code)(); // final code\n\n        onRun && onRun();\n      } catch (err) {\n        console.log(\"error\", err);\n        onError && onError(err);\n      }\n    }\n  }, commandAttachScript));\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvdmVuZG9yL09uaXgvanMvc2NyaXB0RWRpdG9yL3NyYy9jb21tYW5kcy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBSUEsaUVBQWUsVUFBQ0MsTUFBRCxFQUF1QjtBQUFBLE1BQWRDLElBQWMsdUVBQVAsRUFBTztBQUNsQyxNQUFNQyxFQUFFLEdBQUdGLE1BQU0sQ0FBQ0csUUFBbEI7QUFDQSxNQUFNQyxFQUFFLEdBQUdKLE1BQU0sQ0FBQ0ssS0FBbEI7QUFDQSxNQUFNQyxJQUFJLEdBQUdOLE1BQU0sQ0FBQ08sVUFBcEI7QUFDQSxNQUNJQyxVQURKLEdBUUlQLElBUkosQ0FDSU8sVUFESjtBQUFBLE1BRUlDLGVBRkosR0FRSVIsSUFSSixDQUVJUSxlQUZKO0FBQUEsTUFHSUMsbUJBSEosR0FRSVQsSUFSSixDQUdJUyxtQkFISjtBQUFBLE1BSUlDLFdBSkosR0FRSVYsSUFSSixDQUlJVSxXQUpKO0FBQUEsTUFLSUMsS0FMSixHQVFJWCxJQVJKLENBS0lXLEtBTEo7QUFBQSxNQU1JQyxPQU5KLEdBUUlaLElBUkosQ0FNSVksT0FOSjtBQUFBLE1BT0lDLE9BUEosR0FRSWIsSUFSSixDQU9JYSxPQVBKO0FBU0EsTUFBSUMsa0JBQWtCLEdBQUdkLElBQUksQ0FBQ2Msa0JBQTlCO0FBRUEsTUFBSUMsT0FBTyxHQUFHLElBQWQ7O0FBRUEsTUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFDQyxNQUFELEVBQVNGLE9BQVQsRUFBcUI7QUFDekMsUUFBSUEsT0FBTyxZQUFZRyxXQUF2QixFQUFvQztBQUNoQ0QsTUFBQUEsTUFBTSxDQUFDRSxXQUFQLENBQW1CSixPQUFuQjtBQUNILEtBRkQsTUFFTyxJQUFJQSxPQUFKLEVBQWE7QUFDaEJFLE1BQUFBLE1BQU0sQ0FBQ0csa0JBQVAsQ0FBMEIsV0FBMUIsRUFBdUNMLE9BQXZDO0FBQ0g7QUFDSixHQU5EOztBQVFBLE1BQUloQixNQUFNLENBQUNzQixDQUFQLENBQVNDLFFBQVQsQ0FBa0JSLGtCQUFsQixDQUFKLEVBQTJDO0FBQ3ZDQSxJQUFBQSxrQkFBa0IsR0FBR0Esa0JBQWtCLENBQUNTLEtBQW5CLENBQXlCLEdBQXpCLENBQXJCO0FBQ0g7O0FBRUQsTUFBSXhCLE1BQU0sQ0FBQ3NCLENBQVAsQ0FBU0csT0FBVCxDQUFpQlYsa0JBQWpCLENBQUosRUFBMEM7QUFDdENBLElBQUFBLGtCQUFrQixHQUFHQSxrQkFBa0IsQ0FBQ1csUUFBbkIsQ0FBNEIsR0FBNUIsSUFDakJwQixJQUFJLENBQUNxQixRQUFMLEdBQWdCQyxHQUFoQixDQUFvQixVQUFBQyxDQUFDO0FBQUEsYUFBSUEsQ0FBQyxDQUFDQyxFQUFOO0FBQUEsS0FBckIsQ0FEaUIsR0FDZ0JmLGtCQURyQztBQUVILEdBaENpQyxDQWtDbEM7OztBQUNBQSxFQUFBQSxrQkFBa0IsSUFBSUEsa0JBQWtCLENBQUNnQixPQUFuQixDQUEyQixVQUFBQyxJQUFJLEVBQUk7QUFDckQsUUFBTUMsT0FBTyxHQUFHM0IsSUFBSSxDQUFDNEIsT0FBTCxDQUFhRixJQUFiLEVBQW1CRyxLQUFuQztBQUNBN0IsSUFBQUEsSUFBSSxDQUFDOEIsT0FBTCxDQUFhSixJQUFiLEVBQW1CO0FBQ2ZHLE1BQUFBLEtBQUssRUFBRTtBQUNIRSxRQUFBQSxXQURHLHlCQUNXO0FBQ1ZKLFVBQUFBLE9BQU8sQ0FBQ0ssU0FBUixDQUFrQkQsV0FBbEIsQ0FBOEJFLEtBQTlCLENBQW9DLElBQXBDLEVBQTBDQyxTQUExQztBQUNBLGNBQU1DLEVBQUUsR0FBRyxLQUFLQyxHQUFMLENBQVMsU0FBVCxDQUFYO0FBQ0EsY0FBTUMsUUFBUSxHQUFHRixFQUFFLENBQUNHLElBQUgsQ0FBUSxVQUFBQyxJQUFJO0FBQUEsbUJBQUlBLElBQUksQ0FBQ0MsT0FBTCxLQUFpQi9DLDBDQUFyQjtBQUFBLFdBQVosQ0FBakI7O0FBRUEsY0FBSSxDQUFDNEMsUUFBTCxFQUFlO0FBQ1hGLFlBQUFBLEVBQUUsQ0FBQ00sT0FBSDtBQUNJRCxjQUFBQSxPQUFPLEVBQUUvQywwQ0FEYjtBQUVJaUQsY0FBQUEsS0FBSyxFQUFFckM7QUFGWCxlQUdPVixJQUFJLENBQUNnRCxzQkFIWjtBQUtBLGlCQUFLQyxHQUFMLENBQVMsU0FBVCxFQUFvQlQsRUFBcEI7QUFDSDtBQUNKO0FBZEU7QUFEUSxLQUFuQjtBQWtCSCxHQXBCcUIsQ0FBdEIsQ0FuQ2tDLENBeURsQzs7QUFDQXZDLEVBQUFBLEVBQUUsQ0FBQ2lELEdBQUgsQ0FBT3BELDBDQUFQO0FBQ0lxRCxJQUFBQSxHQURKLGVBQ1FwRCxNQURSLEVBQ2dCcUQsTUFEaEIsRUFDbUM7QUFBQSxVQUFYcEQsSUFBVyx1RUFBSixFQUFJO0FBQzNCLFdBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNBLFdBQUtzRCxPQUFMLEdBQWVyRCxJQUFmO0FBQ0EsV0FBS2lCLE1BQUwsR0FBY2pCLElBQUksQ0FBQ2lCLE1BQUwsSUFBZWxCLE1BQU0sQ0FBQ3VELFdBQVAsRUFBN0I7QUFDQSxVQUFNckMsTUFBTSxHQUFHLEtBQUtBLE1BQXBCO0FBRUEsVUFBSUEsTUFBSixFQUFZLEtBQUtzQyxjQUFMLENBQW9CdEMsTUFBcEI7QUFDZixLQVJMO0FBVUl1QyxJQUFBQSxJQVZKLGdCQVVTekQsTUFWVCxFQVVpQjtBQUNUSSxNQUFBQSxFQUFFLENBQUNzRCxLQUFIO0FBQ0gsS0FaTDs7QUFjSTtBQUNSO0FBQ0E7QUFDQTtBQUNRRixJQUFBQSxjQWxCSiwwQkFrQm1CdEMsTUFsQm5CLEVBa0IyQjtBQUFBOztBQUNuQixVQUFRbEIsTUFBUixHQUE0QixJQUE1QixDQUFRQSxNQUFSO0FBQUEsVUFBZ0JzRCxPQUFoQixHQUE0QixJQUE1QixDQUFnQkEsT0FBaEI7QUFDQSxVQUFNSyxLQUFLLEdBQUdMLE9BQU8sQ0FBQ0ssS0FBUixJQUFpQm5ELFVBQS9CO0FBQ0EsVUFBSSxDQUFDUSxPQUFMLEVBQWNBLE9BQU8sR0FBRyxLQUFLNEMsVUFBTCxFQUFWO0FBQ2QsVUFBSUMsSUFBSSxHQUFHM0MsTUFBTSxDQUFDNEMsZUFBUCxNQUE0QmhELE9BQXZDO0FBQ0FWLE1BQUFBLEVBQUUsQ0FBQzJELElBQUgsQ0FBUTtBQUNKSixRQUFBQSxLQUFLLEVBQUxBLEtBREk7QUFFSjNDLFFBQUFBLE9BQU8sRUFBUEE7QUFGSSxPQUFSLEVBR0dnRCxRQUhILEdBR2NDLElBSGQsQ0FHbUIsYUFIbkIsRUFHa0M7QUFBQSxlQUFNakUsTUFBTSxDQUFDa0UsV0FBUCxDQUFtQixLQUFJLENBQUNwQyxFQUF4QixDQUFOO0FBQUEsT0FIbEM7QUFJQSxXQUFLcUMsYUFBTCxHQUFxQkMsVUFBckIsQ0FBZ0NQLElBQWhDO0FBQ0gsS0E1Qkw7O0FBOEJJO0FBQ1I7QUFDQTtBQUNRUSxJQUFBQSxhQWpDSiwyQkFpQ29CLENBQUUsQ0FqQ3RCOztBQW1DSTtBQUNSO0FBQ0E7QUFDUUMsSUFBQUEsY0F0Q0osNEJBc0NxQixDQUFFLENBdEN2Qjs7QUF3Q0k7QUFDUjtBQUNBO0FBQ0E7QUFDUVYsSUFBQUEsVUE1Q0osd0JBNENpQjtBQUNULFVBQVE1RCxNQUFSLEdBQW1CLElBQW5CLENBQVFBLE1BQVI7QUFDQSxVQUFNZ0IsT0FBTyxHQUFHdUQsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0EsVUFBTUMsR0FBRyxHQUFHekUsTUFBTSxDQUFDMEUsU0FBUCxDQUFpQixhQUFqQixDQUFaO0FBQ0ExRCxNQUFBQSxPQUFPLENBQUMyRCxTQUFSLGFBQXVCRixHQUF2QjtBQUNBeEQsTUFBQUEsZUFBZSxDQUFDRCxPQUFELEVBQVUsS0FBS3FELGFBQUwsRUFBVixDQUFmO0FBQ0EsVUFBTU8sVUFBVSxHQUFHLEtBQUtULGFBQUwsRUFBbkI7QUFDQVMsTUFBQUEsVUFBVSxDQUFDQyxPQUFYO0FBQ0FDLE1BQUFBLFVBQVUsQ0FBQztBQUFBLGVBQU1GLFVBQVUsQ0FBQ0csS0FBWCxFQUFOO0FBQUEsT0FBRCxFQUEyQixDQUEzQixDQUFWO0FBQ0EvRCxNQUFBQSxPQUFPLENBQUNJLFdBQVIsQ0FBb0J3RCxVQUFVLENBQUNJLFVBQVgsRUFBcEI7QUFDQS9ELE1BQUFBLGVBQWUsQ0FBQ0QsT0FBRCxFQUFVLEtBQUtzRCxjQUFMLEVBQVYsQ0FBZjtBQUNBckQsTUFBQUEsZUFBZSxDQUFDRCxPQUFELEVBQVUsS0FBS2lFLGlCQUFMLEVBQVYsQ0FBZjtBQUVBLGFBQU9qRSxPQUFQO0FBQ0gsS0ExREw7O0FBNERJO0FBQ1I7QUFDQTtBQUNBO0FBQ1FpRSxJQUFBQSxpQkFoRUosK0JBZ0V3QjtBQUFBOztBQUNoQixVQUFRakYsTUFBUixHQUFtQixJQUFuQixDQUFRQSxNQUFSO0FBQ0EsVUFBTWtGLE9BQU8sR0FBR1gsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0FVLE1BQUFBLE9BQU8sQ0FBQ3BELEVBQVIsR0FBYSxPQUFiO0FBQ0EsVUFBTXFELEdBQUcsR0FBR1osUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQVo7QUFDQSxVQUFNQyxHQUFHLEdBQUd6RSxNQUFNLENBQUMwRSxTQUFQLENBQWlCLGFBQWpCLENBQVo7QUFDQVMsTUFBQUEsR0FBRyxDQUFDQyxTQUFKLEdBQWdCbkYsSUFBSSxDQUFDb0YsV0FBckI7QUFDQUYsTUFBQUEsR0FBRyxDQUFDUixTQUFKLGFBQW1CRixHQUFuQixzQkFBa0NBLEdBQWxDOztBQUNBVSxNQUFBQSxHQUFHLENBQUNHLE9BQUosR0FBYztBQUFBLGVBQU0sTUFBSSxDQUFDQyxVQUFMLEVBQU47QUFBQSxPQUFkOztBQUVBLFVBQU1DLFFBQVEsR0FBR2pCLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFqQjtBQUNBZ0IsTUFBQUEsUUFBUSxDQUFDMUQsRUFBVCxHQUFjLGVBQWQ7QUFDQTBELE1BQUFBLFFBQVEsQ0FBQ2IsU0FBVCxHQUFxQixXQUFyQjtBQUNBYSxNQUFBQSxRQUFRLENBQUNDLEtBQVQsR0FBaUIsc0hBQWpCOztBQUNBRCxNQUFBQSxRQUFRLENBQUNGLE9BQVQsR0FBbUI7QUFBQSxlQUFNLE1BQUksQ0FBQ0ksT0FBTCxFQUFOO0FBQUEsT0FBbkI7O0FBRUFSLE1BQUFBLE9BQU8sQ0FBQzlELFdBQVIsQ0FBb0JvRSxRQUFwQjtBQUNBTixNQUFBQSxPQUFPLENBQUM5RCxXQUFSLENBQW9CK0QsR0FBcEI7QUFFQSxhQUFPRCxPQUFQO0FBQ0gsS0FwRkw7O0FBc0ZJO0FBQ1I7QUFDQTtBQUNRSyxJQUFBQSxVQXpGSix3QkF5RmlCO0FBQ1QsVUFBUXZGLE1BQVIsR0FBMkIsSUFBM0IsQ0FBUUEsTUFBUjtBQUFBLFVBQWdCa0IsTUFBaEIsR0FBMkIsSUFBM0IsQ0FBZ0JBLE1BQWhCO0FBQ0EsVUFBTTJDLElBQUksR0FBRyxLQUFLTSxhQUFMLEdBQXFCUCxVQUFyQixFQUFiO0FBQ0ExQyxNQUFBQSxNQUFNLENBQUNnQyxHQUFQLENBQVcsUUFBWCxFQUFxQlcsSUFBckI7QUFDQTdELE1BQUFBLE1BQU0sQ0FBQ0ssS0FBUCxDQUFhcUQsS0FBYjtBQUNILEtBOUZMOztBQWdHSTtBQUNSO0FBQ0E7QUFDQTtBQUNRUyxJQUFBQSxhQXBHSiwyQkFvR29CO0FBQ1osVUFBUW5FLE1BQVIsR0FBbUIsSUFBbkIsQ0FBUUEsTUFBUjs7QUFFQSxVQUFJLENBQUMsS0FBSzRFLFVBQVYsRUFBc0I7QUFDbEIsYUFBS0EsVUFBTCxHQUFrQjVFLE1BQU0sQ0FBQzJGLFdBQVAsQ0FBbUJDLFlBQW5CO0FBQ2RDLFVBQUFBLFFBQVEsRUFBRSxZQURJO0FBRWRDLFVBQUFBLEtBQUssRUFBRSxXQUZPO0FBR2RDLFVBQUFBLFFBQVEsRUFBRSxDQUhJO0FBSWRDLFVBQUFBLFlBQVksRUFBRTtBQUpBLFdBS1h2RixlQUxXLEVBQWxCO0FBT0g7O0FBRUQsYUFBTyxLQUFLbUUsVUFBWjtBQUNILEtBbEhMOztBQW9ISTtBQUNSO0FBQ0E7QUFDUWMsSUFBQUEsT0F2SEoscUJBdUhjO0FBQ047QUFDQSxVQUFJO0FBQ0EsWUFBTTdCLElBQUksR0FBRyxLQUFLTSxhQUFMLEdBQXFCUCxVQUFyQixFQUFiO0FBQ0FxQyxRQUFBQSxRQUFRLENBQUMsa0JBQWtCcEMsSUFBbkIsQ0FBUixHQUZBLENBRW9DOztBQUNwQ2pELFFBQUFBLEtBQUssSUFBSUEsS0FBSyxFQUFkO0FBQ0gsT0FKRCxDQUlFLE9BQU9zRixHQUFQLEVBQVk7QUFDVkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksT0FBWixFQUFxQkYsR0FBckI7QUFDQXJGLFFBQUFBLE9BQU8sSUFBSUEsT0FBTyxDQUFDcUYsR0FBRCxDQUFsQjtBQUNIO0FBQ0o7QUFqSUwsS0FtSU94RixtQkFuSVA7QUFxSUgsQ0EvTEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvdmVuZG9yL09uaXgvanMvc2NyaXB0RWRpdG9yL3NyYy9jb21tYW5kcy5qcz9lY2M3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBjbWRJZFxyXG59IGZyb20gJy4vY29uc3RzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChlZGl0b3IsIG9wdHMgPSB7fSkgPT4ge1xyXG4gICAgY29uc3QgY20gPSBlZGl0b3IuQ29tbWFuZHM7XHJcbiAgICBjb25zdCBtZCA9IGVkaXRvci5Nb2RhbDtcclxuICAgIGNvbnN0IGRvbWMgPSBlZGl0b3IuQ29tcG9uZW50cztcclxuICAgIGNvbnN0IHtcclxuICAgICAgICBtb2RhbFRpdGxlLFxyXG4gICAgICAgIGNvZGVWaWV3T3B0aW9ucyxcclxuICAgICAgICBjb21tYW5kQXR0YWNoU2NyaXB0LFxyXG4gICAgICAgIHRvb2xiYXJJY29uLFxyXG4gICAgICAgIG9uUnVuLFxyXG4gICAgICAgIG9uRXJyb3IsXHJcbiAgICAgICAgc3RhcnRlclxyXG4gICAgfSA9IG9wdHM7XHJcbiAgICBsZXQgc2NyaXB0VHlwZXNTdXBwb3J0ID0gb3B0cy5zY3JpcHRUeXBlc1N1cHBvcnQ7XHJcblxyXG4gICAgbGV0IGNvbnRlbnQgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0IGFwcGVuZFRvQ29udGVudCA9ICh0YXJnZXQsIGNvbnRlbnQpID0+IHtcclxuICAgICAgICBpZiAoY29udGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChjb250ZW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgY29udGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoZWRpdG9yLiQuaXNTdHJpbmcoc2NyaXB0VHlwZXNTdXBwb3J0KSkge1xyXG4gICAgICAgIHNjcmlwdFR5cGVzU3VwcG9ydCA9IHNjcmlwdFR5cGVzU3VwcG9ydC5zcGxpdCgnLCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlZGl0b3IuJC5pc0FycmF5KHNjcmlwdFR5cGVzU3VwcG9ydCkpIHtcclxuICAgICAgICBzY3JpcHRUeXBlc1N1cHBvcnQgPSBzY3JpcHRUeXBlc1N1cHBvcnQuaW5jbHVkZXMoJyonKSA/XHJcbiAgICAgICAgICAgIGRvbWMuZ2V0VHlwZXMoKS5tYXAoYyA9PiBjLmlkKSA6IHNjcmlwdFR5cGVzU3VwcG9ydDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgaWNvbnMgdG8gc3BlY2lmaWVkIGNvbXBvbmVudCB0eXBlc1xyXG4gICAgc2NyaXB0VHlwZXNTdXBwb3J0ICYmIHNjcmlwdFR5cGVzU3VwcG9ydC5mb3JFYWNoKHR5cGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHR5cGVPcHQgPSBkb21jLmdldFR5cGUodHlwZSkubW9kZWw7XHJcbiAgICAgICAgZG9tYy5hZGRUeXBlKHR5cGUsIHtcclxuICAgICAgICAgICAgbW9kZWw6IHtcclxuICAgICAgICAgICAgICAgIGluaXRUb29sYmFyKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVPcHQucHJvdG90eXBlLmluaXRUb29sYmFyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGIgPSB0aGlzLmdldCgndG9vbGJhcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRiRXhpc3RzID0gdGIuc29tZShpdGVtID0+IGl0ZW0uY29tbWFuZCA9PT0gY21kSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRiRXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRiLnVuc2hpZnQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogY21kSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdG9vbGJhckljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5vcHRzLnRvb2xiYXJCdG5DdXN0b21TY3JpcHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KCd0b29sYmFyJywgdGIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAvLyBBZGQgdGhlIHNjcmlwdCBjb21tYW5kXHJcbiAgICBjbS5hZGQoY21kSWQsIHtcclxuICAgICAgICBydW4oZWRpdG9yLCBzZW5kZXIsIG9wdHMgPSB7fSkge1xyXG4gICAgICAgICAgICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0cztcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBvcHRzLnRhcmdldCB8fCBlZGl0b3IuZ2V0U2VsZWN0ZWQoKTtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0KSB0aGlzLnNob3dDdXN0b21Db2RlKHRhcmdldCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcChlZGl0b3IpIHtcclxuICAgICAgICAgICAgbWQuY2xvc2UoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRob2Qgd2hpY2ggdGVsbHMgaG93IHRvIHNob3cgdGhlIGN1c3RvbSBjb2RlXHJcbiAgICAgICAgICogQHBhcmFtICB7Q29tcG9uZW50fSB0YXJnZXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBzaG93Q3VzdG9tQ29kZSh0YXJnZXQpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBlZGl0b3IsIG9wdGlvbnMgfSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gb3B0aW9ucy50aXRsZSB8fCBtb2RhbFRpdGxlO1xyXG4gICAgICAgICAgICBpZiAoIWNvbnRlbnQpIGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKTtcclxuICAgICAgICAgICAgbGV0IGNvZGUgPSB0YXJnZXQuZ2V0U2NyaXB0U3RyaW5nKCkgfHwgc3RhcnRlcjtcclxuICAgICAgICAgICAgbWQub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRcclxuICAgICAgICAgICAgfSkuZ2V0TW9kZWwoKS5vbmNlKCdjaGFuZ2U6b3BlbicsICgpID0+IGVkaXRvci5zdG9wQ29tbWFuZCh0aGlzLmlkKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29kZVZpZXdlcigpLnNldENvbnRlbnQoY29kZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3VzdG9tIHByZS1jb250ZW50LiBDYW4gYmUgYSBzaW1wbGUgc3RyaW5nIG9yIGFuIEhUTUxFbGVtZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0UHJlQ29udGVudCgpIHt9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDdXN0b20gcG9zdC1jb250ZW50LiBDYW4gYmUgYSBzaW1wbGUgc3RyaW5nIG9yIGFuIEhUTUxFbGVtZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0UG9zdENvbnRlbnQoKSB7fSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0IGFsbCB0aGUgY29udGVudCBmb3IgdGhlIGN1c3RvbSBjb2RlXHJcbiAgICAgICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0Q29udGVudCgpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBlZGl0b3IgfSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29uc3QgcGZ4ID0gZWRpdG9yLmdldENvbmZpZygnc3R5bGVQcmVmaXgnKTtcclxuICAgICAgICAgICAgY29udGVudC5jbGFzc05hbWUgPSBgJHtwZnh9YXR0YWNoLXNjcmlwdGA7XHJcbiAgICAgICAgICAgIGFwcGVuZFRvQ29udGVudChjb250ZW50LCB0aGlzLmdldFByZUNvbnRlbnQoKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvZGVWaWV3ZXIgPSB0aGlzLmdldENvZGVWaWV3ZXIoKTtcclxuICAgICAgICAgICAgY29kZVZpZXdlci5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY29kZVZpZXdlci5mb2N1cygpLCAwKTtcclxuICAgICAgICAgICAgY29udGVudC5hcHBlbmRDaGlsZChjb2RlVmlld2VyLmdldEVsZW1lbnQoKSk7XHJcbiAgICAgICAgICAgIGFwcGVuZFRvQ29udGVudChjb250ZW50LCB0aGlzLmdldFBvc3RDb250ZW50KCkpO1xyXG4gICAgICAgICAgICBhcHBlbmRUb0NvbnRlbnQoY29udGVudCwgdGhpcy5nZXRDb250ZW50QWN0aW9ucygpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCB0aGUgYWN0aW9ucyBjb250ZW50LiBDYW4gYmUgYSBzaW1wbGUgc3RyaW5nIG9yIGFuIEhUTUxFbGVtZW50XHJcbiAgICAgICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR8U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldENvbnRlbnRBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGVkaXRvciB9ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgYWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBhY3Rpb25zLmlkID0gXCJhY3Ruc1wiO1xyXG4gICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgY29uc3QgcGZ4ID0gZWRpdG9yLmdldENvbmZpZygnc3R5bGVQcmVmaXgnKTtcclxuICAgICAgICAgICAgYnRuLmlubmVySFRNTCA9IG9wdHMuYnV0dG9uTGFiZWw7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc05hbWUgPSBgJHtwZnh9YnRuLXByaW0gJHtwZnh9YnRuLXNhdmVfX2luamVjdC1sb2dpY2A7XHJcbiAgICAgICAgICAgIGJ0bi5vbmNsaWNrID0gKCkgPT4gdGhpcy5oYW5kbGVTYXZlKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBydW5Mb2dpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBydW5Mb2dpYy5pZCA9IFwibG9naWMtdG9vbGJhclwiO1xyXG4gICAgICAgICAgICBydW5Mb2dpYy5jbGFzc05hbWUgPSBcImZhIGZhLWJ1Z1wiO1xyXG4gICAgICAgICAgICBydW5Mb2dpYy5zdHlsZSA9IFwibWFyZ2luOjVweDtwYWRkaW5nOjEwcHg7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLDAuMik7Ym9yZGVyLXJhZGl1czozcHg7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMik7Y3Vyc29yOnBvaW50ZXJcIjtcclxuICAgICAgICAgICAgcnVuTG9naWMub25jbGljayA9ICgpID0+IHRoaXMucnVuQ29kZSgpO1xyXG5cclxuICAgICAgICAgICAgYWN0aW9ucy5hcHBlbmRDaGlsZChydW5Mb2dpYyk7XHJcbiAgICAgICAgICAgIGFjdGlvbnMuYXBwZW5kQ2hpbGQoYnRuKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb25zO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhhbmRsZSB0aGUgbWFpbiBzYXZlIHRhc2tcclxuICAgICAgICAgKi9cclxuICAgICAgICBoYW5kbGVTYXZlKCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGVkaXRvciwgdGFyZ2V0IH0gPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBjb2RlID0gdGhpcy5nZXRDb2RlVmlld2VyKCkuZ2V0Q29udGVudCgpO1xyXG4gICAgICAgICAgICB0YXJnZXQuc2V0KCdzY3JpcHQnLCBjb2RlKTtcclxuICAgICAgICAgICAgZWRpdG9yLk1vZGFsLmNsb3NlKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0dXJuIHRoZSBjb2RlIHZpZXdlciBpbnN0YW5jZVxyXG4gICAgICAgICAqIEByZXR1cm4ge0NvZGVWaWV3ZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0Q29kZVZpZXdlcigpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBlZGl0b3IgfSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY29kZVZpZXdlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlVmlld2VyID0gZWRpdG9yLkNvZGVNYW5hZ2VyLmNyZWF0ZVZpZXdlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgY29kZU5hbWU6ICdqYXZhc2NyaXB0JyxcclxuICAgICAgICAgICAgICAgICAgICB0aGVtZTogJ2hvcHNjb3RjaCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0JlYXV0aWZ5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLmNvZGVWaWV3T3B0aW9ucyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb2RlVmlld2VyO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEV2YWx1YXRlIGNvZGUgc3ludGF4XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcnVuQ29kZSgpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInJ1blwiKVxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29kZSA9IHRoaXMuZ2V0Q29kZVZpZXdlcigpLmdldENvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgIEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjsnICsgY29kZSkoKTsgLy8gZmluYWwgY29kZVxyXG4gICAgICAgICAgICAgICAgb25SdW4gJiYgb25SdW4oKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIsIGVycik7XHJcbiAgICAgICAgICAgICAgICBvbkVycm9yICYmIG9uRXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC4uLmNvbW1hbmRBdHRhY2hTY3JpcHQsXHJcbiAgICB9KTtcclxufSJdLCJuYW1lcyI6WyJjbWRJZCIsImVkaXRvciIsIm9wdHMiLCJjbSIsIkNvbW1hbmRzIiwibWQiLCJNb2RhbCIsImRvbWMiLCJDb21wb25lbnRzIiwibW9kYWxUaXRsZSIsImNvZGVWaWV3T3B0aW9ucyIsImNvbW1hbmRBdHRhY2hTY3JpcHQiLCJ0b29sYmFySWNvbiIsIm9uUnVuIiwib25FcnJvciIsInN0YXJ0ZXIiLCJzY3JpcHRUeXBlc1N1cHBvcnQiLCJjb250ZW50IiwiYXBwZW5kVG9Db250ZW50IiwidGFyZ2V0IiwiSFRNTEVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImluc2VydEFkamFjZW50SFRNTCIsIiQiLCJpc1N0cmluZyIsInNwbGl0IiwiaXNBcnJheSIsImluY2x1ZGVzIiwiZ2V0VHlwZXMiLCJtYXAiLCJjIiwiaWQiLCJmb3JFYWNoIiwidHlwZSIsInR5cGVPcHQiLCJnZXRUeXBlIiwibW9kZWwiLCJhZGRUeXBlIiwiaW5pdFRvb2xiYXIiLCJwcm90b3R5cGUiLCJhcHBseSIsImFyZ3VtZW50cyIsInRiIiwiZ2V0IiwidGJFeGlzdHMiLCJzb21lIiwiaXRlbSIsImNvbW1hbmQiLCJ1bnNoaWZ0IiwibGFiZWwiLCJ0b29sYmFyQnRuQ3VzdG9tU2NyaXB0Iiwic2V0IiwiYWRkIiwicnVuIiwic2VuZGVyIiwib3B0aW9ucyIsImdldFNlbGVjdGVkIiwic2hvd0N1c3RvbUNvZGUiLCJzdG9wIiwiY2xvc2UiLCJ0aXRsZSIsImdldENvbnRlbnQiLCJjb2RlIiwiZ2V0U2NyaXB0U3RyaW5nIiwib3BlbiIsImdldE1vZGVsIiwib25jZSIsInN0b3BDb21tYW5kIiwiZ2V0Q29kZVZpZXdlciIsInNldENvbnRlbnQiLCJnZXRQcmVDb250ZW50IiwiZ2V0UG9zdENvbnRlbnQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJwZngiLCJnZXRDb25maWciLCJjbGFzc05hbWUiLCJjb2RlVmlld2VyIiwicmVmcmVzaCIsInNldFRpbWVvdXQiLCJmb2N1cyIsImdldEVsZW1lbnQiLCJnZXRDb250ZW50QWN0aW9ucyIsImFjdGlvbnMiLCJidG4iLCJpbm5lckhUTUwiLCJidXR0b25MYWJlbCIsIm9uY2xpY2siLCJoYW5kbGVTYXZlIiwicnVuTG9naWMiLCJzdHlsZSIsInJ1bkNvZGUiLCJDb2RlTWFuYWdlciIsImNyZWF0ZVZpZXdlciIsImNvZGVOYW1lIiwidGhlbWUiLCJyZWFkT25seSIsImF1dG9CZWF1dGlmeSIsIkZ1bmN0aW9uIiwiZXJyIiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/vendor/Onix/js/scriptEditor/src/commands.js\n");

/***/ }),

/***/ "./resources/vendor/Onix/js/scriptEditor/src/consts.js":
/*!*************************************************************!*\
  !*** ./resources/vendor/Onix/js/scriptEditor/src/consts.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cmdId\": () => (/* binding */ cmdId)\n/* harmony export */ });\nvar cmdId = 'edit-script';//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvdmVuZG9yL09uaXgvanMvc2NyaXB0RWRpdG9yL3NyYy9jb25zdHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPLElBQU1BLEtBQUssR0FBRyxhQUFkIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3ZlbmRvci9Pbml4L2pzL3NjcmlwdEVkaXRvci9zcmMvY29uc3RzLmpzPzIyMWMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNtZElkID0gJ2VkaXQtc2NyaXB0JzsiXSwibmFtZXMiOlsiY21kSWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./resources/vendor/Onix/js/scriptEditor/src/consts.js\n");

/***/ }),

/***/ "./resources/vendor/Onix/js/scriptEditor/src/scriptEditor.js":
/*!*******************************************************************!*\
  !*** ./resources/vendor/Onix/js/scriptEditor/src/scriptEditor.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _commands__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commands */ \"./resources/vendor/Onix/js/scriptEditor/src/commands.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nwindow.grapesjs.plugins.add(\"grapesjs-script-editor\", function (editor) {\n  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  var options = _objectSpread(_objectSpread({}, {\n    // Starter code\n    starter: \"let el = this\",\n    toolbarIcon: '<i class=\"fa fa-file-code-o\"></i>',\n    // Component types to allow script editing\n    // Avoid components with predefined scripts\n    scriptTypesSupport: [\"default\", \"wrapper\", \"text\", \"textnode\", \"image\", \"video\", \"svg\"],\n    // Object to extend the default component's toolbar button for the code, eg. `{ label: '</>', attributes: { title: 'Open custom code' } }`\n    // Pass a falsy value to avoid adding the button\n    toolbarBtnCustomScript: {},\n    // On run success\n    onRun: function onRun() {\n      return console.log(\"valid syntax\");\n    },\n    // Logic when there is an error on run\n    onError: function onError(err) {\n      return console.log(\"error\", err);\n    },\n    // Title for the custom code modal\n    modalTitle: \"Script\",\n    // Textarea label\n    codeLabel: \"JS\",\n    // Additional options for the code viewer, eg. `{ theme: 'hopscotch', readOnly: 0 }`\n    codeViewOptions: {},\n    // Label for the default save button\n    buttonLabel: \"Save\",\n    // Object to extend the default inject logic command.\n    // Check the source to see all available methods\n    commandAttachScript: {}\n  }), opts); // load commands\n\n\n  (0,_commands__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(editor, options);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvdmVuZG9yL09uaXgvanMvc2NyaXB0RWRpdG9yL3NyYy9zY3JpcHRFZGl0b3IuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUVBQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLE9BQWhCLENBQXdCQyxHQUF4QixDQUE0Qix3QkFBNUIsRUFBc0QsVUFBQ0MsTUFBRCxFQUF1QjtBQUFBLE1BQWRDLElBQWMsdUVBQVAsRUFBTzs7QUFDekUsTUFBTUMsT0FBTyxtQ0FDTjtBQUNDO0FBQ0FDLElBQUFBLE9BQU8sRUFBRSxlQUZWO0FBSUNDLElBQUFBLFdBQVcsRUFBRSxtQ0FKZDtBQU1DO0FBQ0E7QUFDQUMsSUFBQUEsa0JBQWtCLEVBQUUsQ0FDaEIsU0FEZ0IsRUFFaEIsU0FGZ0IsRUFHaEIsTUFIZ0IsRUFJaEIsVUFKZ0IsRUFLaEIsT0FMZ0IsRUFNaEIsT0FOZ0IsRUFPaEIsS0FQZ0IsQ0FSckI7QUFrQkM7QUFDQTtBQUNBQyxJQUFBQSxzQkFBc0IsRUFBRSxFQXBCekI7QUFzQkM7QUFDQUMsSUFBQUEsS0FBSyxFQUFFO0FBQUEsYUFBTUMsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWixDQUFOO0FBQUEsS0F2QlI7QUF5QkM7QUFDQUMsSUFBQUEsT0FBTyxFQUFFLGlCQUFDQyxHQUFEO0FBQUEsYUFBU0gsT0FBTyxDQUFDQyxHQUFSLENBQVksT0FBWixFQUFxQkUsR0FBckIsQ0FBVDtBQUFBLEtBMUJWO0FBNEJDO0FBQ0FDLElBQUFBLFVBQVUsRUFBRSxRQTdCYjtBQStCQztBQUNBQyxJQUFBQSxTQUFTLEVBQUUsSUFoQ1o7QUFrQ0M7QUFDQUMsSUFBQUEsZUFBZSxFQUFFLEVBbkNsQjtBQXFDQztBQUNBQyxJQUFBQSxXQUFXLEVBQUUsTUF0Q2Q7QUF3Q0M7QUFDQTtBQUNBQyxJQUFBQSxtQkFBbUIsRUFBRTtBQTFDdEIsR0FETSxHQTZDTmYsSUE3Q00sQ0FBYixDQUR5RSxDQWlEekU7OztBQUNBTixFQUFBQSxxREFBUSxDQUFDSyxNQUFELEVBQVNFLE9BQVQsQ0FBUjtBQUNILENBbkREIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3ZlbmRvci9Pbml4L2pzL3NjcmlwdEVkaXRvci9zcmMvc2NyaXB0RWRpdG9yLmpzPzBiNzkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbW1hbmRzIGZyb20gXCIuL2NvbW1hbmRzXCI7XG5cbndpbmRvdy5ncmFwZXNqcy5wbHVnaW5zLmFkZChcImdyYXBlc2pzLXNjcmlwdC1lZGl0b3JcIiwgKGVkaXRvciwgb3B0cyA9IHt9KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgLi4ue1xuICAgICAgICAgICAgLy8gU3RhcnRlciBjb2RlXG4gICAgICAgICAgICBzdGFydGVyOiBcImxldCBlbCA9IHRoaXNcIixcblxuICAgICAgICAgICAgdG9vbGJhckljb246ICc8aSBjbGFzcz1cImZhIGZhLWZpbGUtY29kZS1vXCI+PC9pPicsXG5cbiAgICAgICAgICAgIC8vIENvbXBvbmVudCB0eXBlcyB0byBhbGxvdyBzY3JpcHQgZWRpdGluZ1xuICAgICAgICAgICAgLy8gQXZvaWQgY29tcG9uZW50cyB3aXRoIHByZWRlZmluZWQgc2NyaXB0c1xuICAgICAgICAgICAgc2NyaXB0VHlwZXNTdXBwb3J0OiBbXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgXCJ3cmFwcGVyXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0bm9kZVwiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICBcInZpZGVvXCIsXG4gICAgICAgICAgICAgICAgXCJzdmdcIixcbiAgICAgICAgICAgIF0sXG5cbiAgICAgICAgICAgIC8vIE9iamVjdCB0byBleHRlbmQgdGhlIGRlZmF1bHQgY29tcG9uZW50J3MgdG9vbGJhciBidXR0b24gZm9yIHRoZSBjb2RlLCBlZy4gYHsgbGFiZWw6ICc8Lz4nLCBhdHRyaWJ1dGVzOiB7IHRpdGxlOiAnT3BlbiBjdXN0b20gY29kZScgfSB9YFxuICAgICAgICAgICAgLy8gUGFzcyBhIGZhbHN5IHZhbHVlIHRvIGF2b2lkIGFkZGluZyB0aGUgYnV0dG9uXG4gICAgICAgICAgICB0b29sYmFyQnRuQ3VzdG9tU2NyaXB0OiB7fSxcblxuICAgICAgICAgICAgLy8gT24gcnVuIHN1Y2Nlc3NcbiAgICAgICAgICAgIG9uUnVuOiAoKSA9PiBjb25zb2xlLmxvZyhcInZhbGlkIHN5bnRheFwiKSxcblxuICAgICAgICAgICAgLy8gTG9naWMgd2hlbiB0aGVyZSBpcyBhbiBlcnJvciBvbiBydW5cbiAgICAgICAgICAgIG9uRXJyb3I6IChlcnIpID0+IGNvbnNvbGUubG9nKFwiZXJyb3JcIiwgZXJyKSxcblxuICAgICAgICAgICAgLy8gVGl0bGUgZm9yIHRoZSBjdXN0b20gY29kZSBtb2RhbFxuICAgICAgICAgICAgbW9kYWxUaXRsZTogXCJTY3JpcHRcIixcblxuICAgICAgICAgICAgLy8gVGV4dGFyZWEgbGFiZWxcbiAgICAgICAgICAgIGNvZGVMYWJlbDogXCJKU1wiLFxuXG4gICAgICAgICAgICAvLyBBZGRpdGlvbmFsIG9wdGlvbnMgZm9yIHRoZSBjb2RlIHZpZXdlciwgZWcuIGB7IHRoZW1lOiAnaG9wc2NvdGNoJywgcmVhZE9ubHk6IDAgfWBcbiAgICAgICAgICAgIGNvZGVWaWV3T3B0aW9uczoge30sXG5cbiAgICAgICAgICAgIC8vIExhYmVsIGZvciB0aGUgZGVmYXVsdCBzYXZlIGJ1dHRvblxuICAgICAgICAgICAgYnV0dG9uTGFiZWw6IFwiU2F2ZVwiLFxuXG4gICAgICAgICAgICAvLyBPYmplY3QgdG8gZXh0ZW5kIHRoZSBkZWZhdWx0IGluamVjdCBsb2dpYyBjb21tYW5kLlxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIHNvdXJjZSB0byBzZWUgYWxsIGF2YWlsYWJsZSBtZXRob2RzXG4gICAgICAgICAgICBjb21tYW5kQXR0YWNoU2NyaXB0OiB7fSxcbiAgICAgICAgfSxcbiAgICAgICAgLi4ub3B0cyxcbiAgICB9O1xuXG4gICAgLy8gbG9hZCBjb21tYW5kc1xuICAgIGNvbW1hbmRzKGVkaXRvciwgb3B0aW9ucyk7XG59KTtcbiJdLCJuYW1lcyI6WyJjb21tYW5kcyIsIndpbmRvdyIsImdyYXBlc2pzIiwicGx1Z2lucyIsImFkZCIsImVkaXRvciIsIm9wdHMiLCJvcHRpb25zIiwic3RhcnRlciIsInRvb2xiYXJJY29uIiwic2NyaXB0VHlwZXNTdXBwb3J0IiwidG9vbGJhckJ0bkN1c3RvbVNjcmlwdCIsIm9uUnVuIiwiY29uc29sZSIsImxvZyIsIm9uRXJyb3IiLCJlcnIiLCJtb2RhbFRpdGxlIiwiY29kZUxhYmVsIiwiY29kZVZpZXdPcHRpb25zIiwiYnV0dG9uTGFiZWwiLCJjb21tYW5kQXR0YWNoU2NyaXB0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./resources/vendor/Onix/js/scriptEditor/src/scriptEditor.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./resources/vendor/Onix/js/scriptEditor/src/scriptEditor.js");
/******/ 	
/******/ })()
;