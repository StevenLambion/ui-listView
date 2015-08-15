/**
 * @ngdoc module
 * @name sl.ui-listView
 * @description
 * Displays a list of items.  Designed to handle large data sets.
 */
angular.module("sl.ui-listView", [
    "sl.ui-listView.templates"
]).directive("uiListView", ($rootScope, $parse) => {
    var arrayRegexp = /([\s\S]+?)\s+(?:in)\s+([\s\S]+?)\s*$/; // "item in array [|filterName]"
    
    var defaultOptions = {
        style: "default"
    };
    
    /**
     * Run digest only if it is not currently running.
     */
    function safeDigest ($scope) {
        if (!$scope.$root.$$phase) {
            $scope.$digest();
        }
    }
    
    /**
     * ngdoc controller
     * @description
     * Displays a list of items.  Designed to handle large data sets.  The list view's controller
     * is added to the options object to provide an API.
     * @class
     */
    class UIListView {
        
        constructor ($scope) {
            this.$scope = $scope;
            this.cells = [];
            this.preferredHeight = 48;
            this._clear();
        }
        
        /**
         * Request that the row offsets be recomputed. It will perform the update
         * after the current digest.  This is useful if the offsets might be updated
         * multiple times during a single digest.
         * @param {Number} [startIndex] The index to start recomputing from.
         * @method
         */
        requestOffsetUpdate (startIndex) {
            var request = this._request;
            if (!request) {
                this._request = request = {
                    startIndex: startIndex
                };
                this.$scope.$$postDigest(() => {
                    this.updateRowOffsets(request.startIndex);
                    this._request = null;
                    safeDigest(this.$scope);
                });
            }
            request.startIndex = Math.min(request.startIndex, startIndex);
        }
        
        /**
         * Recompute the row offsets.
         * @param {Number} [startIndex] The index to start recomputing from.
         * @method
         */
        updateRowOffsets (startIndex) {
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
        updateCells () {
            var range = this.visibleRange;
            var offset = range.index;
            var lastIndex = offset + range.length;
            var rows = this.rows;
            var cells = this.cells;
            var cell, row, previousRow;
            
            cells.length = range.length;
            for(var i = offset; i < lastIndex; i++) {
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
        updateAnchor () {
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
        updateRange () {
            var viewport = this.viewport;
            var topOffset = viewport.offset;
            var bottomOffset = topOffset + viewport.height;
            
            var rows = this.rows;
            var row;
            
            var mid = this._findVisibleRowIndex(topOffset, bottomOffset);
            var foundFirst, foundLast;
            var firstIndex = 0, lastIndex = 0;
            var offset = 0;
            
            var range = this.visibleRange;
            
            while(!foundFirst || !foundLast) {
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
            
            this.visibleRange = {
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
        setViewport (offset, height) {
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
        layout () {
            this.updateAnchor();
            if (this.updateRange()) {
                this.updateCells();
                this.options.range = this.visibleRange;
                return true;
            }
            return false;
        }
        
        /**
         * The total scroll height of the list view.
         * @return {Number}
         * @method
         */
        getScrollHeight () {
            var len = this.rows.length;
            var lastRow = this.rows[len - 1];
            return len ? lastRow.offset + lastRow.height : 0;
        }
        
        /**
         * Retrieve the styles for a cell.  This is used to set values like the cell's
         * current "top" position.
         * @param {sl.ui-listView.Cell} cell
         */
        getCellStyle (cell) {
            return {
                top: cell.row.offset + "px"
            };
        }
        
        /**
         * Reload the list view from scratch.  The rows will be
         * computed.
         * @param {Object[]} [items] Optionally change the list view's items;
         * @method
         * @private
         */
        _reload (items) {
            this._clear();
            if (items) {
                this.originalItems = items;
            } else {
                items = this.originalItems;
            }
            if (this.rows.length > items.length) {
                this.rows.length = items.length;
            }
            this.cells.length = items.length;
            this._rebuildRows(items);
        }
        
        /**
         * Clears out and resets the list view's data.
         * @param {Boolean} [removeRows] Also remove the row meta data objects;
         * @method
         * @private
         */
        _clear (removeRows) {
            this.originalItems = [];
            if (!this.rows || removeRows) {
                this.rows = [];
            }
            this.visibleRange = {
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
        _rebuildRows (items) {
            var offset = 0;
            var rows = this.rows;
            var row;
            
            for (var i = 0; i < items.length; i++) {
                row = rows[i];
                if (!row) {
                    row = rows[i] = {
                        height: this.preferredHeight,
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
        _findVisibleRowIndex (topOffset, bottomOffset) {
            var range = this.visibleRange;
            var rows = this.rows;
            var row;
            var mid = Math.floor(range.index + (range.length / 2));
            var start = 0, end = rows.length;
            
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
        _callCellDelegate (cell, methodName, arg1, arg2, arg3) {
            var delegate = cell.delegate;
            if (delegate) {
                delegate[methodName](arg1, arg2, arg3);
            }
        }
        
    }
    
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
        scope: { options: "="},
        
        controller: UIListView,
        controllerAs: "listView",
        
        require: "uiListView",
        compile (element, attrs) {
            var match = arrayRegexp.exec(attrs.uiListView);
            if (!match) {
                throw Error("Invalid expression.  It must be in the form \"item in Array\" "); 
            }
            var itemIdentifier = match[1];
            var arrayGetter = $parse(match[2]);
            
            return function ($scope, element, attrs, listView) {
                var rawElement = element[0];
                listView.itemIdentifier = itemIdentifier;
                
                /**
                 * Update the viewport.
                 */
                function updateListView () {
                    var scrollTop = rawElement.scrollTop;
                    return listView.setViewport(scrollTop, rawElement.clientHeight);
                }
                
                function updateOptions (options, oldOptions) {
                    if (oldOptions) {
                        if (oldOptions.style) {
                            element.removeClass("ui-list-view-" + oldOptions.style);
                        }
                    }
                    if (options.style) {
                        element.addClass("ui-list-view-" + options.style);
                    }
                }
                
                function addDefaultOptions (options) {
                    for (var key in defaultOptions) {
                        if (!options.hasOwnProperty(key) || defaultOptions.hasOwnProperty(key)) {
                            options[key] = defaultOptions[key];
                        }
                    }
                }
                
                $scope.$watch("options", (options, oldOptions) => {
                    addDefaultOptions(options);
                    options.listView = listView;
                    listView.options = options;
                    updateOptions(options, oldOptions);
                    listView._reload();
                });
                
                var isScrolling; // For performance, don't retrieve items while the list is scrolling.
                var endScrollDigestTimer;
                $scope.$watchCollection(() => {
                    return !isScrolling ? arrayGetter($scope.$parent) : listView.originalItems;
                }, (items) => {
                    listView._reload(items);
                    updateListView();
                });
                
                $scope.$watch(() => {
                    return element[0].clientHeight;
                }, () => {
                    updateListView();
                });
                
                function handleScroll () {
                    if (updateListView()) {
                        isScrolling = true;
                        safeDigest($scope);
                        isScrolling = false;
                    }
                    clearTimeout(endScrollDigestTimer);
                    endScrollDigestTimer = setTimeout(() => {
                        updateListView();
                        safeDigest($scope);
                    });
                }
                
                element[0].addEventListener("scroll", handleScroll, false);
                
                /** 
                * Update row sizes and offsets if the window is resized.
                */
                function handleResize () {
                    updateListView();
                    safeDigest($scope);
                }
                window.addEventListener("resize", handleResize);
                
                $scope.$on("$destroy", () => {
                    window.removeEventListener("resize", handleResize);
                });
            };
        }
    };
    
})

.directive("uiListViewCell", () => {
    
    return {
        require: "^uiListView",
        link ($scope, element, attrs, listView, $transclude) {
            var rawElement = element[0];
            var cell = $scope.cell;
            var transcludeScope;
            
            $transclude((clone, scope) => {
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
                    row.height = height;
                    listView.requestOffsetUpdate(row.index);
                }
            }
            
            function updateRow (row) {
                transcludeScope[listView.itemIdentifier] = row.item;
                transcludeScope.$index = row.index;
                transcludeScope.$first = row.index === 0;
                transcludeScope.$last = row.index === listView.rows.length - 1;
                updateOffset(row.offset);
            }
            
            $scope.$watch(() => {
                return cell.row.index + "-" + rawElement.clientHeight;
            }, () => {
                updateSize();
            });
            
            cell.delegate = {
                rowDidChange: updateRow,
                offsetDidChange: updateOffset
            };
                
            updateRow(cell.row);
        }
    };
    
})

.directive("uiListViewAnchor", () => {
    
    return {
        require: "^uiListView",
        link ($scope, element, attr, listView) {
            var rawElement = element[0];
            
            listView.anchor = {
                updateAnchor (scrollHeight) {
                    rawElement.style.top = scrollHeight + "px";
                }
            };
            
        }
    };
    
});