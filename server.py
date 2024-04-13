from flask import Flask, render_template, request, abort

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/minimaxBasics')
def minimax_basics():
    return render_template('minimax-tutorials/minimaxBasics.html')


@app.route('/alphabetaIntro')
def alphabeta_intro():
    return render_template('minimax-tutorials/alphabetaIntro.html')


@app.route('/alphabetaMain')
def alphabeta_main():
    return render_template('minimax-tutorials/alphabetaMain.html')


@app.route('/minimaxBasicsQuiz')
def minimax_basics_quiz():
    return render_template('minimax-quiz/minimaxBasicsQuiz.html')


@app.route('/alphabetaQuiz')
def alphabeta_quiz():
    return render_template('minimax-quiz/alphabetaQuiz.html')


if __name__ == '__main__':
    app.run(debug=True)
