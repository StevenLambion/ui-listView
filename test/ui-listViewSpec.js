describe("ui-ListView", () => {
    
    var scope;
    var $compile;
    
    beforeEach(() => {
        angular.module("ui-listView.templates", []).run(["$templateCache", function ($templateCache) {
            $templateCache.put(
                "ui-listView.tpl.html",
                "<div class=\"ui-list-view\">\n" +
                "<div class=\"ui-list-view-cell\" ui-list-view-cell ng-repeat=\"cell in listView.cells\">\n" +
                "<div class=\"ui-list-view-cell-content\"></div>\n    </div>\n    <div class=\"ui-list-view-anchor\" ui-list-view-anchor></div>\n</div>"
            );
        }])
    });
    
    beforeEach(module("ui-listView"));
    
    beforeEach(inject(($rootScope, _$compile_) => {
        scope = $rootScope.$new();
        $compile = _$compile_;
    }));
    
    var element;
    var controller;
    
    function buildTemplate (expression, itemTemplate, optionsExpression) {
        var template = "<div ui-list-view=\"" + expression + "\"";
        if (optionsExpression) {
            if (typeof optionsExpression === "object") {
                optionsExpression = JSON.stringify(optionsExpression);
            }
            template += " options='" + optionsExpression + "'";
        }
        template += ">" + (itemTemplate || '') + "</div>";
        return angular.element(template);
    }
    
    function createListView (expression, itemTemplate, optionsExpression) {
         element = buildTemplate(expression, itemTemplate, optionsExpression);
         $compile(element)(scope);
         scope.$digest();
         controller = element.isolateScope().listView;
    }
    
    describe("Array expression", () => {
        
        it("should understand the format 'item in items'", () => {
            createListView("item in items");
        });
        
        it("should fail with the format '{ item: items }'", () => {
            expect(() => createListView("{ item: items }")).toThrow();
        });
        
        it("should fail with the format '{ key: value } in items'", () => {
            expect(() => createListView("{ key: value } in items")).toThrow();
        });
        
        it("should support filters'", () => {
            expect(() => createListView("item in items | orderBy:'field'")).not.toThrow();
        });
        
        it("should only allow an identifier name for the item'", () => {
            expect(() => createListView("anObject.item in items")).toThrow();
        });
        
        it("should allow an array to be accessed as a property'", () => {
            expect(() => createListView("item in anObject.items")).not.toThrow();
        });
        
    });
    
    describe("Options", () => {
        
    });
    
    describe("Items", () => {
        
        
        
    });
    
});