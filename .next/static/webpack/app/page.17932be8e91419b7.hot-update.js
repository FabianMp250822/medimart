"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./app/page.js":
/*!*********************!*\
  !*** ./app/page.js ***!
  \*********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ \"(app-pages-browser)/./node_modules/sweetalert2/dist/sweetalert2.all.js\");\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_layout_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/layout/Layout */ \"(app-pages-browser)/./components/layout/Layout.js\");\n/* harmony import */ var _components_sections_home1_About__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/sections/home1/About */ \"(app-pages-browser)/./components/sections/home1/About.js\");\n/* harmony import */ var _components_sections_home1_Banner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/sections/home1/Banner */ \"(app-pages-browser)/./components/sections/home1/Banner.js\");\n/* harmony import */ var _components_sections_home1_Services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/sections/home1/Services */ \"(app-pages-browser)/./components/sections/home1/Services.js\");\n/* harmony import */ var _components_sections_home1_Features__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/sections/home1/Features */ \"(app-pages-browser)/./components/sections/home1/Features.js\");\n/* harmony import */ var _components_sections_home1_Funfacts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/sections/home1/Funfacts */ \"(app-pages-browser)/./components/sections/home1/Funfacts.js\");\n/* harmony import */ var _components_sections_home1_Testimonial__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/components/sections/home1/Testimonial */ \"(app-pages-browser)/./components/sections/home1/Testimonial.js\");\n/* harmony import */ var _components_sections_home1_WhyChooseUs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/components/sections/home1/WhyChooseUs */ \"(app-pages-browser)/./components/sections/home1/WhyChooseUs.js\");\n/* harmony import */ var _components_sections_home1_Process__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/components/sections/home1/Process */ \"(app-pages-browser)/./components/sections/home1/Process.js\");\n/* harmony import */ var _components_sections_home1_Team__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/components/sections/home1/Team */ \"(app-pages-browser)/./components/sections/home1/Team.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\n\nfunction Home() {\n    _s();\n    const [selectedSede, setSelectedSede] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const sedes = [\n        {\n            id: 1,\n            name: \"Sede 1\",\n            image: \"https://picsum.photos/200/200?random=1\"\n        },\n        {\n            id: 2,\n            name: \"Sede 2\",\n            image: \"https://picsum.photos/200/200?random=2\"\n        },\n        {\n            id: 3,\n            name: \"Sede 3\",\n            image: \"https://picsum.photos/200/200?random=3\"\n        },\n        {\n            id: 4,\n            name: \"Sede 4\",\n            image: \"https://picsum.photos/200/200?random=4\"\n        }\n    ];\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const storedSede = localStorage.getItem(\"selectedSede\");\n        if (!storedSede) {\n            openSedeModal(); // Si no hay sede seleccionada, abre el modal\n        } else {\n            setSelectedSede(storedSede);\n        }\n    }, []);\n    const handleSedeSelect = (sede)=>{\n        setSelectedSede(sede);\n        localStorage.setItem(\"selectedSede\", sede);\n        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().close(); // Cerrar el modal de SweetAlert2\n    };\n    const openSedeModal = ()=>{\n        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().fire({\n            title: \"Selecciona una Sede\",\n            html: '\\n        <style>\\n          .sede-grid {\\n            display: flex;\\n            justify-content: space-around;\\n            flex-wrap: wrap;\\n          }\\n          .sede-item {\\n            cursor: pointer;\\n            text-align: center;\\n            transition: transform 0.3s ease;\\n          }\\n          .sede-item:hover {\\n            transform: scale(1.05);\\n          }\\n          .sede-item img {\\n            width: 100px;\\n            height: 100px;\\n            border-radius: 50%;\\n            transition: box-shadow 0.3s ease;\\n            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\\n          }\\n          .sede-item img:hover {\\n            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);\\n          }\\n          .sede-item h3 {\\n            margin-top: 10px;\\n            font-size: 1rem;\\n            transition: color 0.3s ease;\\n            font-weight: 600;\\n          }\\n          .sede-item:hover h3 {\\n            color: #1d4ed8; /* Cambia el color a azul durante el hover */\\n          }\\n        </style>\\n        <div class=\"sede-grid\">\\n          '.concat(sedes.map((sede)=>'\\n                <div class=\"sede-item\" id=\"sede-'.concat(sede.id, '\">\\n                  <img src=\"').concat(sede.image, '\" alt=\"').concat(sede.name, '\" />\\n                  <h3>').concat(sede.name, \"</h3>\\n                </div>\\n              \")).join(\"\"), \"\\n        </div>\\n      \"),\n            showConfirmButton: false,\n            didOpen: ()=>{\n                sedes.forEach((sede)=>{\n                    document.getElementById(\"sede-\".concat(sede.id)).addEventListener(\"click\", ()=>handleSedeSelect(sede.name));\n                });\n            }\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_layout_Layout__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n            headerStyle: 1,\n            footerStyle: 1,\n            children: selectedSede && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_sections_home1_Banner__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                        fileName: \"/home/flag/Documentos/Arquitectura/medimart pack/medimart/app/page.js\",\n                        lineNumber: 109,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_sections_home1_Features__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {}, void 0, false, {\n                        fileName: \"/home/flag/Documentos/Arquitectura/medimart pack/medimart/app/page.js\",\n                        lineNumber: 110,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_sections_home1_About__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                        fileName: \"/home/flag/Documentos/Arquitectura/medimart pack/medimart/app/page.js\",\n                        lineNumber: 111,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_sections_home1_Services__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                        fileName: \"/home/flag/Documentos/Arquitectura/medimart pack/medimart/app/page.js\",\n                        lineNumber: 112,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_sections_home1_WhyChooseUs__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {}, void 0, false, {\n                        fileName: \"/home/flag/Documentos/Arquitectura/medimart pack/medimart/app/page.js\",\n                        lineNumber: 113,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_sections_home1_Funfacts__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {}, void 0, false, {\n                        fileName: \"/home/flag/Documentos/Arquitectura/medimart pack/medimart/app/page.js\",\n                        lineNumber: 114,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_sections_home1_Process__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {}, void 0, false, {\n                        fileName: \"/home/flag/Documentos/Arquitectura/medimart pack/medimart/app/page.js\",\n                        lineNumber: 115,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_sections_home1_Testimonial__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {}, void 0, false, {\n                        fileName: \"/home/flag/Documentos/Arquitectura/medimart pack/medimart/app/page.js\",\n                        lineNumber: 116,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_sections_home1_Team__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {}, void 0, false, {\n                        fileName: \"/home/flag/Documentos/Arquitectura/medimart pack/medimart/app/page.js\",\n                        lineNumber: 117,\n                        columnNumber: 13\n                    }, this)\n                ]\n            }, void 0, true)\n        }, void 0, false, {\n            fileName: \"/home/flag/Documentos/Arquitectura/medimart pack/medimart/app/page.js\",\n            lineNumber: 106,\n            columnNumber: 7\n        }, this)\n    }, void 0, false);\n}\n_s(Home, \"7faXRZ8BseGvSwVl4aGFWpxiGjI=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9wYWdlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU0QztBQUNiO0FBQ2lCO0FBQ007QUFDRTtBQUNJO0FBQ0E7QUFDQTtBQUNNO0FBQ0E7QUFDUjtBQUNOO0FBRXJDLFNBQVNhOztJQUN0QixNQUFNLENBQUNDLGNBQWNDLGdCQUFnQixHQUFHZiwrQ0FBUUEsQ0FBQztJQUVqRCxNQUFNZ0IsUUFBUTtRQUNaO1lBQUVDLElBQUk7WUFBR0MsTUFBTTtZQUFVQyxPQUFPO1FBQXlDO1FBQ3pFO1lBQUVGLElBQUk7WUFBR0MsTUFBTTtZQUFVQyxPQUFPO1FBQXlDO1FBQ3pFO1lBQUVGLElBQUk7WUFBR0MsTUFBTTtZQUFVQyxPQUFPO1FBQXlDO1FBQ3pFO1lBQUVGLElBQUk7WUFBR0MsTUFBTTtZQUFVQyxPQUFPO1FBQXlDO0tBQzFFO0lBRURsQixnREFBU0EsQ0FBQztRQUNSLE1BQU1tQixhQUFhQyxhQUFhQyxPQUFPLENBQUM7UUFFeEMsSUFBSSxDQUFDRixZQUFZO1lBQ2ZHLGlCQUFpQiw2Q0FBNkM7UUFDaEUsT0FBTztZQUNMUixnQkFBZ0JLO1FBQ2xCO0lBQ0YsR0FBRyxFQUFFO0lBRUwsTUFBTUksbUJBQW1CLENBQUNDO1FBQ3hCVixnQkFBZ0JVO1FBQ2hCSixhQUFhSyxPQUFPLENBQUMsZ0JBQWdCRDtRQUNyQ3ZCLHdEQUFVLElBQUksaUNBQWlDO0lBQ2pEO0lBRUEsTUFBTXFCLGdCQUFnQjtRQUNwQnJCLHVEQUFTLENBQUM7WUFDUjJCLE9BQU87WUFDUEMsTUFBTSxxakNBNkNVLE9BVFZkLE1BQ0NlLEdBQUcsQ0FDRixDQUFDTixPQUFTLHFEQUVNQSxPQURvQkEsS0FBS1IsRUFBRSxFQUFDLG9DQUNSUSxPQUFwQkEsS0FBS04sS0FBSyxFQUFDLFdBQ2pCTSxPQUQwQkEsS0FBS1AsSUFBSSxFQUFDLGdDQUMxQixPQUFWTyxLQUFLUCxJQUFJLEVBQUMsa0RBSXJCYyxJQUFJLENBQUMsS0FBSTtZQUdoQkMsbUJBQW1CO1lBQ25CQyxTQUFTO2dCQUNQbEIsTUFBTW1CLE9BQU8sQ0FBQyxDQUFDVjtvQkFDYlcsU0FDR0MsY0FBYyxDQUFDLFFBQWdCLE9BQVJaLEtBQUtSLEVBQUUsR0FDOUJxQixnQkFBZ0IsQ0FBQyxTQUFTLElBQU1kLGlCQUFpQkMsS0FBS1AsSUFBSTtnQkFDL0Q7WUFDRjtRQUNGO0lBQ0Y7SUFFQSxxQkFDRTtrQkFDRSw0RUFBQ2YsaUVBQU1BO1lBQUNvQyxhQUFhO1lBQUdDLGFBQWE7c0JBQ2xDMUIsOEJBQ0M7O2tDQUNFLDhEQUFDVCx5RUFBTUE7Ozs7O2tDQUNQLDhEQUFDRSwyRUFBUUE7Ozs7O2tDQUNULDhEQUFDSCx3RUFBS0E7Ozs7O2tDQUNOLDhEQUFDRSwyRUFBUUE7Ozs7O2tDQUNULDhEQUFDSSwrRUFBV0E7Ozs7O2tDQUNaLDhEQUFDRiwyRUFBUUE7Ozs7O2tDQUNULDhEQUFDRywyRUFBT0E7Ozs7O2tDQUNSLDhEQUFDRiw4RUFBV0E7Ozs7O2tDQUNaLDhEQUFDRyx3RUFBSUE7Ozs7Ozs7Ozs7Ozs7QUFNakI7R0EzR3dCQztLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvcGFnZS5qcz9iZTY3Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU3dhbCBmcm9tIFwic3dlZXRhbGVydDJcIjtcbmltcG9ydCBMYXlvdXQgZnJvbSBcIkAvY29tcG9uZW50cy9sYXlvdXQvTGF5b3V0XCI7XG5pbXBvcnQgQWJvdXQgZnJvbSBcIkAvY29tcG9uZW50cy9zZWN0aW9ucy9ob21lMS9BYm91dFwiO1xuaW1wb3J0IEJhbm5lciBmcm9tIFwiQC9jb21wb25lbnRzL3NlY3Rpb25zL2hvbWUxL0Jhbm5lclwiO1xuaW1wb3J0IFNlcnZpY2VzIGZyb20gXCJAL2NvbXBvbmVudHMvc2VjdGlvbnMvaG9tZTEvU2VydmljZXNcIjtcbmltcG9ydCBGZWF0dXJlcyBmcm9tIFwiQC9jb21wb25lbnRzL3NlY3Rpb25zL2hvbWUxL0ZlYXR1cmVzXCI7XG5pbXBvcnQgRnVuZmFjdHMgZnJvbSBcIkAvY29tcG9uZW50cy9zZWN0aW9ucy9ob21lMS9GdW5mYWN0c1wiO1xuaW1wb3J0IFRlc3RpbW9uaWFsIGZyb20gXCJAL2NvbXBvbmVudHMvc2VjdGlvbnMvaG9tZTEvVGVzdGltb25pYWxcIjtcbmltcG9ydCBXaHlDaG9vc2VVcyBmcm9tIFwiQC9jb21wb25lbnRzL3NlY3Rpb25zL2hvbWUxL1doeUNob29zZVVzXCI7XG5pbXBvcnQgUHJvY2VzcyBmcm9tIFwiQC9jb21wb25lbnRzL3NlY3Rpb25zL2hvbWUxL1Byb2Nlc3NcIjtcbmltcG9ydCBUZWFtIGZyb20gXCJAL2NvbXBvbmVudHMvc2VjdGlvbnMvaG9tZTEvVGVhbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCBbc2VsZWN0ZWRTZWRlLCBzZXRTZWxlY3RlZFNlZGVdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgY29uc3Qgc2VkZXMgPSBbXG4gICAgeyBpZDogMSwgbmFtZTogXCJTZWRlIDFcIiwgaW1hZ2U6IFwiaHR0cHM6Ly9waWNzdW0ucGhvdG9zLzIwMC8yMDA/cmFuZG9tPTFcIiB9LFxuICAgIHsgaWQ6IDIsIG5hbWU6IFwiU2VkZSAyXCIsIGltYWdlOiBcImh0dHBzOi8vcGljc3VtLnBob3Rvcy8yMDAvMjAwP3JhbmRvbT0yXCIgfSxcbiAgICB7IGlkOiAzLCBuYW1lOiBcIlNlZGUgM1wiLCBpbWFnZTogXCJodHRwczovL3BpY3N1bS5waG90b3MvMjAwLzIwMD9yYW5kb209M1wiIH0sXG4gICAgeyBpZDogNCwgbmFtZTogXCJTZWRlIDRcIiwgaW1hZ2U6IFwiaHR0cHM6Ly9waWNzdW0ucGhvdG9zLzIwMC8yMDA/cmFuZG9tPTRcIiB9LFxuICBdO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc3RvcmVkU2VkZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic2VsZWN0ZWRTZWRlXCIpO1xuXG4gICAgaWYgKCFzdG9yZWRTZWRlKSB7XG4gICAgICBvcGVuU2VkZU1vZGFsKCk7IC8vIFNpIG5vIGhheSBzZWRlIHNlbGVjY2lvbmFkYSwgYWJyZSBlbCBtb2RhbFxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRTZWxlY3RlZFNlZGUoc3RvcmVkU2VkZSk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlU2VkZVNlbGVjdCA9IChzZWRlKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWRTZWRlKHNlZGUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2VsZWN0ZWRTZWRlXCIsIHNlZGUpO1xuICAgIFN3YWwuY2xvc2UoKTsgLy8gQ2VycmFyIGVsIG1vZGFsIGRlIFN3ZWV0QWxlcnQyXG4gIH07XG5cbiAgY29uc3Qgb3BlblNlZGVNb2RhbCA9ICgpID0+IHtcbiAgICBTd2FsLmZpcmUoe1xuICAgICAgdGl0bGU6ICdTZWxlY2Npb25hIHVuYSBTZWRlJyxcbiAgICAgIGh0bWw6IGBcbiAgICAgICAgPHN0eWxlPlxuICAgICAgICAgIC5zZWRlLWdyaWQge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgICAgICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgICAgIH1cbiAgICAgICAgICAuc2VkZS1pdGVtIHtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIC5zZWRlLWl0ZW06aG92ZXIge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLnNlZGUtaXRlbSBpbWcge1xuICAgICAgICAgICAgd2lkdGg6IDEwMHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDBweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMC4zcyBlYXNlO1xuICAgICAgICAgICAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLnNlZGUtaXRlbSBpbWc6aG92ZXIge1xuICAgICAgICAgICAgYm94LXNoYWRvdzogMCA2cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gICAgICAgICAgfVxuICAgICAgICAgIC5zZWRlLWl0ZW0gaDMge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgfVxuICAgICAgICAgIC5zZWRlLWl0ZW06aG92ZXIgaDMge1xuICAgICAgICAgICAgY29sb3I6ICMxZDRlZDg7IC8qIENhbWJpYSBlbCBjb2xvciBhIGF6dWwgZHVyYW50ZSBlbCBob3ZlciAqL1xuICAgICAgICAgIH1cbiAgICAgICAgPC9zdHlsZT5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlZGUtZ3JpZFwiPlxuICAgICAgICAgICR7c2VkZXNcbiAgICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgIChzZWRlKSA9PiBgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlZGUtaXRlbVwiIGlkPVwic2VkZS0ke3NlZGUuaWR9XCI+XG4gICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c2VkZS5pbWFnZX1cIiBhbHQ9XCIke3NlZGUubmFtZX1cIiAvPlxuICAgICAgICAgICAgICAgICAgPGgzPiR7c2VkZS5uYW1lfTwvaDM+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5qb2luKCcnKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICBgLFxuICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxuICAgICAgZGlkT3BlbjogKCkgPT4ge1xuICAgICAgICBzZWRlcy5mb3JFYWNoKChzZWRlKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgIC5nZXRFbGVtZW50QnlJZChgc2VkZS0ke3NlZGUuaWR9YClcbiAgICAgICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlU2VkZVNlbGVjdChzZWRlLm5hbWUpKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxMYXlvdXQgaGVhZGVyU3R5bGU9ezF9IGZvb3RlclN0eWxlPXsxfT5cbiAgICAgICAge3NlbGVjdGVkU2VkZSAmJiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxCYW5uZXIgLz5cbiAgICAgICAgICAgIDxGZWF0dXJlcyAvPlxuICAgICAgICAgICAgPEFib3V0IC8+XG4gICAgICAgICAgICA8U2VydmljZXMgLz5cbiAgICAgICAgICAgIDxXaHlDaG9vc2VVcyAvPlxuICAgICAgICAgICAgPEZ1bmZhY3RzIC8+XG4gICAgICAgICAgICA8UHJvY2VzcyAvPlxuICAgICAgICAgICAgPFRlc3RpbW9uaWFsIC8+XG4gICAgICAgICAgICA8VGVhbSAvPlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9MYXlvdXQ+XG4gICAgPC8+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJTd2FsIiwiTGF5b3V0IiwiQWJvdXQiLCJCYW5uZXIiLCJTZXJ2aWNlcyIsIkZlYXR1cmVzIiwiRnVuZmFjdHMiLCJUZXN0aW1vbmlhbCIsIldoeUNob29zZVVzIiwiUHJvY2VzcyIsIlRlYW0iLCJIb21lIiwic2VsZWN0ZWRTZWRlIiwic2V0U2VsZWN0ZWRTZWRlIiwic2VkZXMiLCJpZCIsIm5hbWUiLCJpbWFnZSIsInN0b3JlZFNlZGUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwib3BlblNlZGVNb2RhbCIsImhhbmRsZVNlZGVTZWxlY3QiLCJzZWRlIiwic2V0SXRlbSIsImNsb3NlIiwiZmlyZSIsInRpdGxlIiwiaHRtbCIsIm1hcCIsImpvaW4iLCJzaG93Q29uZmlybUJ1dHRvbiIsImRpZE9wZW4iLCJmb3JFYWNoIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoZWFkZXJTdHlsZSIsImZvb3RlclN0eWxlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/page.js\n"));

/***/ })

});