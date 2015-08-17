/**
 * @ngdoc directive
 * @name uiListViewAnchor
 * @description
 * The anchor is used to set the list view's scroll height based on the last row's offset and height.
 * 
 * @private
 */
angular.module("ui-listView").directive("uiListViewAnchor", () => {
    
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
