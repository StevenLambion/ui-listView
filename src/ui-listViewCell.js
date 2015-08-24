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
angular.module("ui-listView").directive("uiListViewCell", () => {
    
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
                    //listView.setRowHeight(row, height);
                    row.height = height;
                    listView.requestOffsetUpdate(row.index);
                }
            }
            
            function updateRow (row) {
                transcludeScope[cell.itemIdentifier] = row.item;
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
    
});
