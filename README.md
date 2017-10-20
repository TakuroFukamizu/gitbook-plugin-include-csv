# gitbook-plugin-include-csv
==============

## What is it?
A Gitbook plugin for including and rending CSV file in your book.

## How to install it?
You can install via NPM: 

```sh
$ npm install --save gitbook-plugin-include-csv
```

And config your book.json file.

```json
{
    "plugins": ["include-csv"]
}
```

## How to use it?

```
{% showCsv src="./hoge.csv" %}{% endshowCsv %}
```

```
{% showCsv %}
"hoge","fuga"
"a","0001"
"b","002"
{% endshowCsv %}
```

