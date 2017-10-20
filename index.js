'use strict';

const fs = require('fs');
const csvSync = require('csv-parse/lib/sync');
const path = require('path');
const url = require('url');
const iconv = require('iconv-lite');

function buildTable(csvData, useHeader) {
    let html = "<table>";
    for(let i=0; i<csvData.length; i++) {
        if (useHeader && i==0) {
            html += "<tr>";
            html += csvData[i].map((col) => "<th>"+col+"</th>" ).join('');
            html += "</tr>";
            continue;
        }
        html += "<tr>";
        html += csvData[i].map((col) => "<td>"+col+"</td>" ).join('');
        html += "</tr>";
    }
    html += "</table>";
    return html;
}

const DEF_ENCODE = "utf-8";

module.exports = {
    blocks: {
        showCsv: {
            process: function(blk) {
                const tagBody = blk.body;
                const tagSrc = blk.kwargs.src;
                const useHeader = blk.kwargs.useHeader || false;
                const encoding = blk.kwargs.encoding || null;
                let csvData = null;
                let relativeSrcPath = null;
                
                if (tagSrc) {
                    const ctxFilePath = (this.ctx.file || {}).path || this.ctx.ctx.file.path || null;
                    const bookRootPath = this.book.root || this.output.root();
                    relativeSrcPath = url.resolve(ctxFilePath, tagSrc);
                    let filePath = decodeURI(path.resolve(bookRootPath, relativeSrcPath));
                    let data = fs.readFileSync(filePath);
                    // support various encodings
                    if (encoding) {
                        data = iconv.decode(data, encoding);
                        console.log(data);
                    }
                    console.log(data);
                    console.log(data.toString());
                    csvData = csvSync(data);
                } else {
                    // FIXME
                    csvData = tagBody;
                }
                let table = buildTable(csvData, useHeader); // build table html tags
                if (tagSrc) {
                    table = "<a href=\"/" + relativeSrcPath + "\" target=\"_blank\">" + tagSrc + "</a>" + table;
                }
                return table;
            }
        }
    }
};
