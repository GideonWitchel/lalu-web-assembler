import flask as fk
from flask import render_template
import re
import logging
import html
import sys

logging.basicConfig(level=logging.DEBUG)

app = fk.Flask(__name__)


def assemble(textIn):
    return "Fake Assembly\n\ndgefdgh\n"+textIn

def serve(textIn):
    return render_template("webassembler.html", inputText=textIn, outputText=assemble(textIn))


@app.route('/', methods=["GET", "POST"])
def serveBlank():
    if fk.request.method == 'POST':
        logging.info("==== Req Type is POST ====")
        text = fk.request.form['inputArea']
        return serve(text)

    return serve("")


app.run(host='0.0.0.0', port='3000')
