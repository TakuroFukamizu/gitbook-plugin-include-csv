# gitbook-plugin-include-csv

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
{% includeCsv src="./hoge.csv" %}{% endincludeCsv %}
```

```
{% includeCsv %}
hoge,fuga
a,0001
b,002
{% endincludeCsv %}
```

### Arguments

| name      | description                           | example        |
|-----------|---------------------------------------|----------------|
| src       | The file path for including CSV file. | ./filename.csv |
| encoding  | character encoding in CSV file.       | shift_jis      |
| useHeader | use 1st row for header.               | true           |

#### usage example

Show the table from csv file, 1st row is header, file's encoding is shift_jis(japanese traditional encoding format).
```
{% includeCsv src="./sample_records.csv", encoding="shift_jis", useHeader="true" %}{% endincludeCsv %}
```

Show the table from tag body, is row is header.
```
{% includeCsv useHeader="true" %}
c1,c2,c3
1,1,1
2,2,2
{% endincludeCsv %}
```
