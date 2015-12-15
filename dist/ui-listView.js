;(function() {
/**
 * @ngdoc module
 * @name ui-listView
 * @description
 * Displays a list of items.  Designed to handle large data sets.
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _module = angular.module("ui-listView", ["ui-listView.templates"]);

var arrayRegexp = /^\s*([a-zA-Z0-9]+)\s+(?:in)\s+([a-zA-Z0-9.]+(\s*[|].*$)?)/; // "item in array [|filterName]"
var defaultOptions = {
    preferredHeight: 48
};

/**
 * Run digest only if it is not currently running.
 */
function safeDigest($scope) {
    if (!$scope.$root.$$phase) {
        $scope.$digest();
    }
}

/**
 * @ngdoc controller
 * @memberOf ui-listView
 * @description
 * Displays a list of items.  Designed to handle large data sets.  The list view's controller
 * is added to the options object to provide an API.
 * @class
 */

var UIListView = (function () {
    function UIListView() {
        _classCallCheck(this, UIListView);

        this.cells = [];
        this.setOptions({});
    }

    /**
     * Set new options for the list view.
     * @param {ui-listView.UIListView.Options} options
     * @method
     */

    _createClass(UIListView, [{
        key: "setOptions",
        value: function setOptions(options) {
            this._addDefaultOptions(options);
            options.listView = this;
            this.options = options;
            this.reload([]);
        }

        /**
          * Reload the list view from scratch.  The rows will be
          * computed.
          * @param {Object[]} [items] Optionally change the list view's items;
          * @method
          */
    }, {
        key: "reload",
        value: function reload(items) {
            if (items && items !== this.originalItems || !this.originalItems) {
                this._clear();
                this.originalItems = items;
            } else {
                items = this.originalItems;
            }
            if (this.rows.length > items.length) {
                this.rows.length = items.length;
            }
            this._rebuildRows(items);
        }

        /**
          * Request that the row offsets be recomputed. It will perform the update
          * after the current digest.  This is useful if the offsets might be updated
          * multiple times during a single digest.
          * @param {Number} [startIndex] The index to start recomputing from.
          * @method
          */
    }, {
        key: "requestOffsetUpdate",
        value: function requestOffsetUpdate(startIndex) {
            var _this = this;

            var request = this._request;
            if (!request) {
                this._request = request = {
                    startIndex: startIndex
                };
                this._callDelegate("throttle", function () {
                    _this.updateRowOffsets(request.startIndex);
                    _this._request = null;
                });
            }
            request.startIndex = Math.min(request.startIndex, startIndex);
        }

        /**
          * Recompute the row offsets.
          * @param {Number} [startIndex] The index to start recomputing from.
          * @method
          */
    }, {
        key: "updateRowOffsets",
        value: function updateRowOffsets(startIndex) {
            startIndex = startIndex || 0;
            var rows = this.rows;
            var row;
            var currentOffset = rows[startIndex].offset;
            var i;

            for (i = startIndex; i < rows.length; i++) {
                row = rows[i];
                row.offset = currentOffset;
                if (row.cell) {
                    this._callCellDelegate(row.cell, "offsetDidChange", row.offset);
                }
                currentOffset += row.height;
            }
            this.layout();
        }

        /**
          * Updates the cells when the visible range changes.
          * @method
          */
    }, {
        key: "updateCells",
        value: function updateCells() {
            var range = this.visibleRange;
            var offset = range.index;
            var lastIndex = offset + range.length;
            var rows = this.rows;
            var cells = this.cells;
            var cell, row, previousRow;

            // Always start with an odd value for CSS.
            if (offset > 1 && offset % 2) {
                offset--;
            }

            cells.length = range.length;
            for (var i = offset; i < lastIndex; i++) {
                cell = cells[i - offset];
                row = rows[i];
                if (!cell) {
                    cell = cells[i - offset] = {};
                }
                if (cell.row) {
                    cell.row.cell = null;
                }
                row.cell = cell;
                cell.row = row;
                cell.item = rows[i].item;
                cell.index = i;
                cell.itemIdentifier = this._callDelegate("getItemIdentifier", cell.item);
                if (previousRow) {
                    row.offset = previousRow.offset + previousRow.height;
                }
                this._callCellDelegate(cell, "rowDidChange", row);
                previousRow = row;
            }
        }

        /**
          * Updates the anchor position when the viewport is changes.
          * @method
          */
    }, {
        key: "updateAnchor",
        value: function updateAnchor() {
            var scrollHeight = this.getScrollHeight();
            var lastScrollHeight = this._lastScrollHeight;
            if (this.anchor) {
                this.anchor.updateAnchor(scrollHeight);
                this._lastScrollHeight = scrollHeight;
            }
            return scrollHeight !== lastScrollHeight;
        }

        /**
          * Updates the visible range when the viewport changes.
          * @return {Boolean} True if the range is changed.
          * @method
          */
    }, {
        key: "updateRange",
        value: function updateRange() {
            var viewport = this.viewport;
            var topOffset = viewport.offset;
            var bottomOffset = topOffset + viewport.height;

            var rows = this.rows;
            var row;

            var mid = this._findVisibleRowIndex(topOffset, bottomOffset);
            var foundFirst, foundLast;
            var firstIndex = 0,
                lastIndex = 0;
            var offset = 0;

            var range = this.visibleRange;

            while (!foundFirst || !foundLast) {
                if (!foundFirst) {
                    row = rows[mid - offset];
                    if (!row || row.offset + row.height < topOffset) {
                        foundFirst = true;
                        firstIndex = Math.max(mid - offset, 0);
                    }
                }
                if (!foundLast) {
                    row = rows[mid + offset];
                    if (!row || row.offset > bottomOffset) {
                        foundLast = true;
                        lastIndex = Math.min(mid + offset, rows.length);
                    }
                }
                offset++;
            }

            this.options.range = this.visibleRange = {
                index: firstIndex,
                length: lastIndex - firstIndex,
                total: rows.length
            };
            return range.index !== this.visibleRange.index || range.length !== this.visibleRange.length;
        }

        /**
          * Set a new viewport.  This will relayout the list to that viewport.  This should not be called
          * manually.
          * @return {Boolean} True if the range is changed.
          * @method
          */
    }, {
        key: "setViewport",
        value: function setViewport(offset, height) {
            this.viewport = {
                offset: offset,
                height: height
            };
            return this.layout();
        }

        /**
          * Relayout the list view.  This is normally called when the viewport is updated.
          * @return {Boolean} True if the range is changed.
          * @method
          */
    }, {
        key: "layout",
        value: function layout() {
            this.updateAnchor();
            if (this.updateRange()) {
                this.updateCells();
                return true;
            }
            return false;
        }

        /**
          * The total scroll height of the list view.
          * @return {Number}
          * @method
          */
    }, {
        key: "getScrollHeight",
        value: function getScrollHeight() {
            var len = this.rows.length;
            var lastRow = this.rows[len - 1];
            return len ? lastRow.offset + lastRow.height : 0;
        }

        /**
          * Retrieve the styles for a cell.  This is used to set values like the cell's
          * current "top" position.
          * @param {sl.ui-listView.Cell} cell
          * @method
          */
    }, {
        key: "getCellStyle",
        value: function getCellStyle(cell) {
            return {
                top: cell.row.offset + "px"
            };
        }

        /**
         * Apply the default options when new ones are set.
         * @param {ui-listView.UIListView.Options} options
         * @private
         */
    }, {
        key: "_addDefaultOptions",
        value: function _addDefaultOptions(options) {
            for (var key in defaultOptions) {
                if (!options.hasOwnProperty(key) && defaultOptions.hasOwnProperty(key)) {
                    options[key] = defaultOptions[key];
                }
            }
        }

        /**
          * Clears out and resets the list view's data.
          * @param {Boolean} [removeRows] Also remove the row meta data objects;
          * @method
          * @private
          */
    }, {
        key: "_clear",
        value: function _clear(removeRows) {
            this.originalItems = [];
            if (!this.rows || removeRows) {
                this.rows = [];
            }
            this.cells = [];
            this.options.range = this.visibleRange = {
                index: 0,
                length: 0
            };
        }

        /**
          * Rebuilds all the rows with the given items.
          * @param {Object[]} items
          * @method
          * @private
          */
    }, {
        key: "_rebuildRows",
        value: function _rebuildRows(items) {
            var offset = 0;
            var rows = this.rows;
            var row;

            for (var i = 0; i < items.length; i++) {
                row = rows[i];
                if (!row) {
                    row = rows[i] = {
                        height: this.options.preferredHeight,
                        offset: offset
                    };
                }
                row.index = i;
                row.item = items[i];
                row.cell = null;
                offset += row.height;
            }
        }

        /**
          * Tries to efficiently find a visible row within the given offset range.  It returns the
          * index of the first row found.
          * @param {Number} topOffset
          * @param {Number} bottomOffset
          * @method
          * @private
          */
    }, {
        key: "_findVisibleRowIndex",
        value: function _findVisibleRowIndex(topOffset, bottomOffset) {
            var range = this.visibleRange;
            var rows = this.rows;
            var row;
            var mid = Math.floor(range.index + range.length / 2);
            var start = 0,
                end = rows.length;

            if (mid > rows.length - 1) {
                mid = Math.max(rows.length - 1, 0);
            }

            while (end >= start && rows[mid]) {
                row = rows[mid];
                if (row.offset + row.height < topOffset) {
                    start = mid + 1;
                } else if (row.offset > bottomOffset) {
                    end = mid - 1;
                } else {
                    break; // first visible row found.
                }
                mid = start + Math.round((end - start) / 2);
            }

            return mid;
        }
    }, {
        key: "_callDelegate",
        value: function _callDelegate(methodName, arg1, arg2, arg3) {
            var delegate = this.delegate;
            if (delegate) {
                return delegate[methodName](arg1, arg2, arg3);
            }
        }

        /**
          * Call a method on the cell's delegate.
          * @param {sl.ui-listView.Cell} cell
          * @param {String} methodName
          * @param {Object} arg1
          * @param {Object} arg2
          * @param {Object} arg3
          * @method
          * @private
          */
    }, {
        key: "_callCellDelegate",
        value: function _callCellDelegate(cell, methodName, arg1, arg2, arg3) {
            var delegate = cell.delegate;
            if (delegate) {
                return delegate[methodName](arg1, arg2, arg3);
            }
        }
    }]);

    return UIListView;
})();

_module.controller("UIListView", UIListView);
_module.directive("uiListView", ["$rootScope", "$parse", function ($rootScope, $parse) {

    /**
     * @ngdoc directive
     * @name ui-listView
     * @description
     * Displays a list of items.  Designed to handle large data sets.
     */
    return {
        templateUrl: "ui-listView.tpl.html",
        replace: true, // TODO: remove
        transclude: true,
        scope: { options: "=" },

        controller: "UIListView",
        controllerAs: "listView",

        require: "uiListView",
        compile: function compile(element, attrs) {
            var match = arrayRegexp.exec(attrs.uiListView);
            if (!match) {
                throw Error("Invalid expression.  It must be in the form \"item in Array\" ");
            }
            var itemIdentifier = match[1];
            var arrayGetter = $parse(match[2]);

            return function ($scope, element, attrs, listView) {
                var rawElement = element[0];

                listView.delegate = {

                    getItemIdentifier: function getItemIdentifier() {
                        return itemIdentifier;
                    },

                    throttle: function throttle(fn) {
                        $scope.$$postDigest(fn);
                        safeDigest($scope);
                    }

                };

                /**
                 * Update the viewport.
                 */
                function updateListView() {
                    return listView.setViewport(rawElement.scrollTop, rawElement.clientHeight);
                }

                $scope.$watch("options", function (options) {
                    listView.setOptions(options || {});
                });

                var isScrolling; // For performance, don't retrieve items while the list is scrolling.
                var endScrollDigestTimer;
                $scope.$watchCollection(function () {
                    return !isScrolling ? arrayGetter($scope.$parent) : listView.originalItems;
                }, function (items) {
                    listView.reload(items);
                    updateListView();
                });

                /**
                 * Update the list when its size changes.
                 */
                $scope.$watch(function () {
                    return rawElement.clientHeight + "-" + rawElement.clientWidth;
                }, function () {
                    updateListView();
                });

                function handleScroll() {
                    if (updateListView()) {
                        isScrolling = true;
                        safeDigest($scope);
                        isScrolling = false;
                    }
                    clearTimeout(endScrollDigestTimer);
                    endScrollDigestTimer = setTimeout(function () {
                        updateListView();
                        safeDigest($scope);
                    });
                }

                rawElement.addEventListener("scroll", handleScroll, false);

                /** 
                * Digest the scope when the window resizes.
                */
                function handleResize() {
                    safeDigest($scope);
                }
                window.addEventListener("resize", handleResize);

                $scope.$on("$destroy", function () {
                    window.removeEventListener("resize", handleResize);
                });
            };
        }
    };
}]);
"use strict";

angular.module("ui-listView.templates", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("ui-listView.tpl.html", "<div class=\"ui-list-view\">\n    <div class=\"ui-list-view-cell\" ui-list-view-cell ng-repeat=\"cell in listView.cells\">\n        <div class=\"ui-list-view-cell-content\"></div>\n    </div>\n    <div class=\"ui-list-view-anchor\" ui-list-view-anchor></div>\n</div>");
}]);
/**
 * @ngdoc directive
 * @name uiListViewAnchor
 * @description
 * The anchor is used to set the list view's scroll height based on the last row's offset and height.
 * 
 * @private
 */
"use strict";

angular.module("ui-listView").directive("uiListViewAnchor", function () {

    return {
        require: "^uiListView",
        link: function link($scope, element, attr, listView) {
            var rawElement = element[0];

            listView.anchor = {
                updateAnchor: function updateAnchor(scrollHeight) {
                    rawElement.style.top = scrollHeight + "px";
                }
            };
        }
    };
});
/**
 * @ngdoc directive
 * @name uiListViewCell
 * @description
 * The visual representation of a list view cell.  A cell is a container
 * to a visible row.  As the list is scrolled, the cells are updated with the
 * current set of visible rows to display.
 * 
 * Certain choices were made for performance reasons.  For example, instead of
 * watchers, the directive acts as a delegate to the cell.  When the cell is updated, it
 * delegates those changes to the directive.
 * 
 * @private
 */
"use strict";

angular.module("ui-listView").directive("uiListViewCell", function () {

    return {
        require: "^uiListView",
        link: function link($scope, element, attrs, listView, $transclude) {
            var rawElement = element[0];
            var cell = $scope.cell;
            var transcludeScope;

            $transclude(function (clone, scope) {
                var content = element.children();
                transcludeScope = scope;
                updateRow(cell.row);
                content.empty();
                content.append(clone);
            });

            function updateOffset(offset) {
                rawElement.style.top = offset + "px";
            }

            function updateSize() {
                var height = rawElement.clientHeight;
                var row = cell.row;
                if (height !== row.height) {
                    //listView.setRowHeight(row, height);
                    row.height = height;
                    listView.requestOffsetUpdate(row.index);
                }
            }

            function updateRow(row) {
                transcludeScope[cell.itemIdentifier] = row.item;
                transcludeScope.$index = row.index;
                transcludeScope.$first = row.index === 0;
                transcludeScope.$last = row.index === listView.rows.length - 1;
                updateOffset(row.offset);
            }

            $scope.$watch(function () {
                return cell.row.index + "-" + rawElement.clientHeight;
            }, function () {
                updateSize();
            });

            cell.delegate = {
                rowDidChange: updateRow,
                offsetDidChange: updateOffset
            };

            updateRow(cell.row);
        }
    };
});
}());

//# sourceMappingURL=ui-listView.js.map