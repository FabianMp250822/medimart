"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/appointment/page",{

/***/ "(app-pages-browser)/./app/data/sedesData.js":
/*!*******************************!*\
  !*** ./app/data/sedesData.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sedesData: function() { return /* binding */ sedesData; }\n/* harmony export */ });\n// data/sedesData.js\nconst sedesData = {\n    Barranquilla: {\n        nombre: \"Cl\\xednica de la Costa - Barranquilla\",\n        direccion: \"Calle 85 #47-11, Barranquilla\",\n        telefono: \"+57 5 3855555\",\n        whatsappNumber: \"+573003456789\",\n        whatsappMessage: \"Hola, me gustar\\xeda saber m\\xe1s sobre las consultas disponibles en la Cl\\xednica de la Costa en Barranquilla.\",\n        servicios: [\n            \"Radioterapia\",\n            \"Urgencias 24h\",\n            \"Consultas M\\xe9dicas Especializadas\"\n        ],\n        image: \"/assets/images/sedes/barranquilla.png\"\n    },\n    Cartagena: {\n        nombre: \"Cl\\xednica de la Costa - Cartagena\",\n        direccion: \"Calle 23 # 65 - 103 Blas de lezo\",\n        telefono: \"+57 5 6654321\",\n        whatsappNumber: \"+573003456789\",\n        whatsappMessage: \"Hola, me gustar\\xeda saber m\\xe1s sobre las consultas disponibles en la Cl\\xednica de la Costa en Cartagena.\",\n        servicios: [\n            \"Cirug\\xeda General\",\n            \"Hospitalizaci\\xf3n\",\n            \"Urgencias 24h\"\n        ],\n        image: \"/assets/images/sedes/Cartagena.png\"\n    },\n    \"Santa Marta\": {\n        nombre: \"Cl\\xednica de la Costa - Santa Marta\",\n        direccion: \"Avenida Libertador #55-10, Santa Marta\",\n        telefono: \"+57 5 4321234\",\n        whatsappNumber: \"+573003456789\",\n        whatsappMessage: \"Hola, me gustar\\xeda saber m\\xe1s sobre las consultas disponibles en la Cl\\xednica de la Costa en Santa Marta.\",\n        servicios: [\n            \"Consulta Externa\",\n            \"Radioterapia\",\n            \"Laboratorio Cl\\xednico\"\n        ],\n        image: \"https://picsum.photos/400/400?random=3\"\n    },\n    Rioacha: {\n        nombre: \"Cl\\xednica de la Costa - Rioacha\",\n        direccion: \"Carrera 12 #13-14, Rioacha\",\n        telefono: \"+57 5 3425678\",\n        whatsappNumber: \"+573003456789\",\n        whatsappMessage: \"Hola, me gustar\\xeda saber m\\xe1s sobre las consultas disponibles en la Cl\\xednica de la Costa en Rioacha.\",\n        servicios: [\n            \"Hospitalizaci\\xf3n\",\n            \"Pediatr\\xeda\",\n            \"Cirug\\xeda\"\n        ],\n        image: \"/assets/images/sedes/rioacha.jpeg\"\n    }\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9kYXRhL3NlZGVzRGF0YS5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsb0JBQW9CO0FBQ2IsTUFBTUEsWUFBWTtJQUNyQkMsY0FBYztRQUNaQyxRQUFRO1FBQ1JDLFdBQVc7UUFDWEMsVUFBVTtRQUNWQyxnQkFBZ0I7UUFDaEJDLGlCQUFpQjtRQUNqQkMsV0FBVztZQUFDO1lBQWdCO1lBQWlCO1NBQW1DO1FBQ2hGQyxPQUFPO0lBQ1Q7SUFDQUMsV0FBVztRQUNUUCxRQUFRO1FBQ1JDLFdBQVc7UUFDWEMsVUFBVTtRQUNWQyxnQkFBZ0I7UUFDaEJDLGlCQUFpQjtRQUNqQkMsV0FBVztZQUFDO1lBQW1CO1lBQW1CO1NBQWdCO1FBQ2xFQyxPQUFPO0lBQ1Q7SUFDQSxlQUFlO1FBQ2JOLFFBQVE7UUFDUkMsV0FBVztRQUNYQyxVQUFVO1FBQ1ZDLGdCQUFnQjtRQUNoQkMsaUJBQWlCO1FBQ2pCQyxXQUFXO1lBQUM7WUFBb0I7WUFBZ0I7U0FBc0I7UUFDdEVDLE9BQU87SUFDVDtJQUNBRSxTQUFTO1FBQ1BSLFFBQVE7UUFDUkMsV0FBVztRQUNYQyxVQUFVO1FBQ1ZDLGdCQUFnQjtRQUNoQkMsaUJBQWlCO1FBQ2pCQyxXQUFXO1lBQUM7WUFBbUI7WUFBYTtTQUFVO1FBQ3REQyxPQUFPO0lBQ1Q7QUFDRixFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9kYXRhL3NlZGVzRGF0YS5qcz8wNjU2Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGRhdGEvc2VkZXNEYXRhLmpzXG5leHBvcnQgY29uc3Qgc2VkZXNEYXRhID0ge1xuICAgIEJhcnJhbnF1aWxsYToge1xuICAgICAgbm9tYnJlOiBcIkNsw61uaWNhIGRlIGxhIENvc3RhIC0gQmFycmFucXVpbGxhXCIsXG4gICAgICBkaXJlY2Npb246IFwiQ2FsbGUgODUgIzQ3LTExLCBCYXJyYW5xdWlsbGFcIixcbiAgICAgIHRlbGVmb25vOiBcIis1NyA1IDM4NTU1NTVcIixcbiAgICAgIHdoYXRzYXBwTnVtYmVyOiBcIis1NzMwMDM0NTY3ODlcIixcbiAgICAgIHdoYXRzYXBwTWVzc2FnZTogXCJIb2xhLCBtZSBndXN0YXLDrWEgc2FiZXIgbcOhcyBzb2JyZSBsYXMgY29uc3VsdGFzIGRpc3BvbmlibGVzIGVuIGxhIENsw61uaWNhIGRlIGxhIENvc3RhIGVuIEJhcnJhbnF1aWxsYS5cIixcbiAgICAgIHNlcnZpY2lvczogW1wiUmFkaW90ZXJhcGlhXCIsIFwiVXJnZW5jaWFzIDI0aFwiLCBcIkNvbnN1bHRhcyBNw6lkaWNhcyBFc3BlY2lhbGl6YWRhc1wiXSxcbiAgICAgIGltYWdlOiBcIi9hc3NldHMvaW1hZ2VzL3NlZGVzL2JhcnJhbnF1aWxsYS5wbmdcIixcbiAgICB9LFxuICAgIENhcnRhZ2VuYToge1xuICAgICAgbm9tYnJlOiBcIkNsw61uaWNhIGRlIGxhIENvc3RhIC0gQ2FydGFnZW5hXCIsXG4gICAgICBkaXJlY2Npb246IFwiQ2FsbGUgMjMgIyA2NSAtIDEwMyBCbGFzIGRlIGxlem9cIixcbiAgICAgIHRlbGVmb25vOiBcIis1NyA1IDY2NTQzMjFcIixcbiAgICAgIHdoYXRzYXBwTnVtYmVyOiBcIis1NzMwMDM0NTY3ODlcIixcbiAgICAgIHdoYXRzYXBwTWVzc2FnZTogXCJIb2xhLCBtZSBndXN0YXLDrWEgc2FiZXIgbcOhcyBzb2JyZSBsYXMgY29uc3VsdGFzIGRpc3BvbmlibGVzIGVuIGxhIENsw61uaWNhIGRlIGxhIENvc3RhIGVuIENhcnRhZ2VuYS5cIixcbiAgICAgIHNlcnZpY2lvczogW1wiQ2lydWfDrWEgR2VuZXJhbFwiLCBcIkhvc3BpdGFsaXphY2nDs25cIiwgXCJVcmdlbmNpYXMgMjRoXCJdLFxuICAgICAgaW1hZ2U6IFwiL2Fzc2V0cy9pbWFnZXMvc2VkZXMvQ2FydGFnZW5hLnBuZ1wiLFxuICAgIH0sXG4gICAgXCJTYW50YSBNYXJ0YVwiOiB7XG4gICAgICBub21icmU6IFwiQ2zDrW5pY2EgZGUgbGEgQ29zdGEgLSBTYW50YSBNYXJ0YVwiLFxuICAgICAgZGlyZWNjaW9uOiBcIkF2ZW5pZGEgTGliZXJ0YWRvciAjNTUtMTAsIFNhbnRhIE1hcnRhXCIsXG4gICAgICB0ZWxlZm9ubzogXCIrNTcgNSA0MzIxMjM0XCIsXG4gICAgICB3aGF0c2FwcE51bWJlcjogXCIrNTczMDAzNDU2Nzg5XCIsXG4gICAgICB3aGF0c2FwcE1lc3NhZ2U6IFwiSG9sYSwgbWUgZ3VzdGFyw61hIHNhYmVyIG3DoXMgc29icmUgbGFzIGNvbnN1bHRhcyBkaXNwb25pYmxlcyBlbiBsYSBDbMOtbmljYSBkZSBsYSBDb3N0YSBlbiBTYW50YSBNYXJ0YS5cIixcbiAgICAgIHNlcnZpY2lvczogW1wiQ29uc3VsdGEgRXh0ZXJuYVwiLCBcIlJhZGlvdGVyYXBpYVwiLCBcIkxhYm9yYXRvcmlvIENsw61uaWNvXCJdLFxuICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9waWNzdW0ucGhvdG9zLzQwMC80MDA/cmFuZG9tPTNcIixcbiAgICB9LFxuICAgIFJpb2FjaGE6IHtcbiAgICAgIG5vbWJyZTogXCJDbMOtbmljYSBkZSBsYSBDb3N0YSAtIFJpb2FjaGFcIixcbiAgICAgIGRpcmVjY2lvbjogXCJDYXJyZXJhIDEyICMxMy0xNCwgUmlvYWNoYVwiLFxuICAgICAgdGVsZWZvbm86IFwiKzU3IDUgMzQyNTY3OFwiLFxuICAgICAgd2hhdHNhcHBOdW1iZXI6IFwiKzU3MzAwMzQ1Njc4OVwiLFxuICAgICAgd2hhdHNhcHBNZXNzYWdlOiBcIkhvbGEsIG1lIGd1c3RhcsOtYSBzYWJlciBtw6FzIHNvYnJlIGxhcyBjb25zdWx0YXMgZGlzcG9uaWJsZXMgZW4gbGEgQ2zDrW5pY2EgZGUgbGEgQ29zdGEgZW4gUmlvYWNoYS5cIixcbiAgICAgIHNlcnZpY2lvczogW1wiSG9zcGl0YWxpemFjacOzblwiLCBcIlBlZGlhdHLDrWFcIiwgXCJDaXJ1Z8OtYVwiXSxcbiAgICAgIGltYWdlOiBcIi9hc3NldHMvaW1hZ2VzL3NlZGVzL3Jpb2FjaGEuanBlZ1wiLFxuICAgIH0sXG4gIH07XG4gICJdLCJuYW1lcyI6WyJzZWRlc0RhdGEiLCJCYXJyYW5xdWlsbGEiLCJub21icmUiLCJkaXJlY2Npb24iLCJ0ZWxlZm9ubyIsIndoYXRzYXBwTnVtYmVyIiwid2hhdHNhcHBNZXNzYWdlIiwic2VydmljaW9zIiwiaW1hZ2UiLCJDYXJ0YWdlbmEiLCJSaW9hY2hhIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/data/sedesData.js\n"));

/***/ })

});