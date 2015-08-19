describe("ui-ListView", () => {
    
    var scope;
    var $compile;
    
    beforeEach(() => {
        angular.module("ui-listView.templates", []).run(["$templateCache", function ($templateCache) {
            $templateCache.put(
                "ui-listView.tpl.html",
                "<div class=\"ui-list-view\">\n" +
                "<div class=\"ui-list-view-cell\" style=\"padding:5px 5px\" ui-list-view-cell ng-repeat=\"cell in listView.cells\">\n" +
                "<div class=\"ui-list-view-cell-content\"></div>\n    </div>\n    <div class=\"ui-list-view-anchor\" ui-list-view-anchor></div>\n</div>"
            );
        }])
    });
    
    beforeEach(module("ui-listView"));
    
    beforeEach(inject(($rootScope, _$compile_) => {
        scope = $rootScope.$new();
        $compile = _$compile_;
    }));
    
    describe("directive", () => {
        var element;
        var listView;
        
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
            listView = element.controller("uiListView");
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
            
            it("should have a default preferredHeight", () => {
                createListView("item in items");
                expect(listView.options.preferredHeight).toBe(48);
            });
            
            it("should allow the user to set preferredHeight", () => {
                createListView("item in items", null, { preferredHeight: 96 });
                expect(listView.options.preferredHeight).toBe(96);
            });
            
            it("should add a reference to the listView controller", () => {
                scope.options = {};
                createListView("item in items", null, "options");
                expect(scope.options.listView).toBe(listView);
            });
            
            it("should provide the range of the listView", () => {
                scope.options = {};
                createListView("item in items", null, "options");
                expect(scope.options.range).toEqual(listView.visibleRange);
            });
            
        });
        
    });
    
    describe("controller", () => {
        
        var listView;
        var states = [{
            name: "Washington"
        }, {
            name: "California"
        }, {
            name: "Oregon"
        }, {
            name: "Montana"
        }, {
            name: "Idaho"
        }, {
            name: "Utah"
        }, {
            name: "Nevada"
        }, {
            name: "New Mexico"
        }, {
            name: "Texas"
        }, {
            name: "Colorado"
        }, {
            name: "North Dakota"
        }, {
            name: "South Dakota"
        }, {
            name: "Kentucky"
        }, {
            name: "Wyoming"
        }]; 
        
        beforeEach(() => {
            listView = new UIListView(scope);
            listView.setViewport(0, 100);
        });
        
        it("should reload rows with items", () => {
            listView.reload(states);
            expect(listView.originalItems).toBe(states);
            states.forEach((state, i) => {
                expect(state).toBe(listView.rows[i].item);
            });
        });
        
        it("should compute proper offsets", () => {
            var currentOffset = 0;
            listView.reload(states);
            listView.rows.forEach((row) => {
                expect(row.offset).toBe(currentOffset);
                currentOffset += row.height;
            });
        });
        
    });

});