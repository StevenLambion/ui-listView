![travis CI status](https://travis-ci.org/StevenLambion/ui-listView.svg?branch=master)

## ui-listView
An Angular directive for an efficient, dynamically changing list.  It's able to handle data sets with thousands of
items while providing a similar interface to ng-repeat.  Unlike other variations, row heights are based
on the row content, and the list view dynamically updates to accommodate changes.

This is an initial release.  More features and testing are in the works.

## Installation

You can use bower to install ui-listView.

```
bower install ui-listView
```

Then include the "ui-listView" module into your angular application.

```
var appModule = angular.module("app", [ui-listView])
```

## Code Example

See live code examples on http://stevenlambion.github.io/ui-listView/

```
<div class="contact-list" ui-list-view="contact in contacts" options="listOptions">
    <p class="name"><strong>{{ contact.name }}</strong></p>
    <div class="email">{{ contact.email }}</div>
</div>
```

![Contact List Example](/examples/contactList.png?raw=true)

## Motivation

Working on many projects that required large or paged lists lead me to create this directive.  I wanted something with a simple interface like ng-repeat,
yet able to handle big data sets.  There was also a strong need for dynamic rows.  However, above all, I did this because it sounded like a fun problem to solve. 

## API

### options
type: `Object`

Configuration options for the list view.  You can provide the options to the directive with an "options" attribute as shown in the example above.

#### options.preferredHeight
type: `Number`
default: `48`

This is the initial preferred, or estimated, height of a row. 
Once a row is displayed, it'll use its content as the height and update the list view as it changes.

#### options.listView
type: `Object`

This property is added by the list view to provide API access.  Documentation is coming shortly.

#### options.range
type: `Object`

A read-only property that shows the current visible range of items being displayed.  It can be useful to indicate when to load more items
from a service when implementing infinite scroll.

## Styles
Use the following CSS classes on the ui-listView's element to set built-in styles, or use your own CSS classes for a custom style.

#### ui-list-view-bordered
Wraps the ui-listView and its cells in a border.

#### ui-list-view-striped
Adds a striped appearance to the cells.

## License

The MIT License (MIT)

Copyright (c) 2015 Steven Lambion

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.