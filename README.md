## UIListView
An efficient, dynamic list view for angular applications.  It's able to handle data sets with thousands of
items while providing a similar interface to ng-repeat.  Unlike other variations, row heights are based
on the row content, and the list view dynamicly updates to accomodate changes.

This is an initial release.  More features and testing are in the works.

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

## Installation

```
bower install ui-listView
```

## API

### options
type: `Object`

Configuration options for the list view.  You can provide the options to the directive with an "options" attribute as shown in the example above.

#### options.style
type: `String`
default: `"default"`

Set the style of the list view.  Set this value to null or "" to not use a built-in style.  Currently there is only one style, "default".

#### options.listView
type: `Object`

This property is added by the list view to provide API access.  Documentation is coming shortly.

#### 

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