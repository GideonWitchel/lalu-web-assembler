import flask as fk
from flask import render_template
import re
import logging
import html

logging.basicConfig(level=logging.DEBUG)

app = fk.Flask(__name__)

def serve(textIn):
    return render_template("webassembler.html")

@app.route('/', methods=["GET", "POST"])
def serveBlank():
    reqType = fk.request.method
    if reqType == 'GET':
        logging.info("==== Req Type is GET ====")
        return serve("")
    elif reqType == 'POST':
        logging.info("==== Req Type is POST ====")

    return render_template("home.html")


@app.route('/', methods=["POST"])
def serveFilled():
    reqType = fk.request.method
    if reqType == 'GET':
        logging.info("==== Req Type is GET ====")
    elif reqType == 'POST':
        logging.info("==== Req Type is POST ====")

    return render_template("home.html")

@app.route('/formPage', methods=['POST'])
def formHandler():
    logging.info('Handling Form')
    user = escapeHtml(fk.request.form['user'])
    password = escapeHtml(fk.request.form['pass'])
    passVer = escapeHtml(fk.request.form['verPass'])
    email = escapeHtml(fk.request.form['email'])

    errU = ""
    errP = ""
    errV = ""
    errE = ""
    err = False

    if not valid_user(user):
        errU = "That's not a valid username."
        err = True
    if not valid_pass(password):
        errP = "That's not a valid password"
        err = True
    if password != passVer:
        errV = "Passwords do not match."
        err = True
    if email != "" and not valid_email(email):
        errE = "That's not a valid email."
        err = True

    if err:
        logging.info('Invalid Form')
        return (render_template("home.html", errU=errU, errP=errP, errV=errV, errE=errE, u=user, p=password, v=passVer,
                                e=email))
    logging.info("Success! Valid Form")
    return render_template("welcome.html", u=user)


app.run(host='0.0.0.0', port='3000')
