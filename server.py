from flask import Flask, render_template, request, abort
from datetime import datetime

app = Flask(__name__)

session = {}


@app.route('/')
def home():
    session['home_page_enter_time'] = datetime.now().strftime("%B %d, %Y %H:%M:%S")
    print(session);
    return render_template('home.html')


@app.route('/minimaxBasics')
def minimax_basics():
    session['minimax_basics_page_enter_time'] = datetime.now().strftime("%B %d, %Y %H:%M:%S")
    print(session);
    return render_template('minimax-tutorials/minimaxBasics.html')


@app.route('/alphabetaIntro')
def alphabeta_intro():
    session['alphabeta_intro_page_enter_time'] = datetime.now().strftime("%B %d, %Y %H:%M:%S")
    print(session);
    return render_template('minimax-tutorials/alphabetaIntro.html')


@app.route('/alphabetaMain')
def alphabeta_main():
    session['alphabeta_main_page_enter_time'] = datetime.now().strftime("%B %d, %Y %H:%M:%S")
    print(session);
    return render_template('minimax-tutorials/alphabetaMain.html')


@app.route('/minimaxBasicsQuiz')
def minimax_basics_quiz():
    session['minimax_basics_quiz_page_enter_time'] = datetime.now().strftime("%B %d, %Y %H:%M:%S")
    print(session);
    return render_template('minimax-quiz/minimaxBasicsQuiz.html')


@app.route('/alphabetaQuiz')
def alphabeta_quiz():
    session['alphabeta_quiz_page_enter_time'] = datetime.now().strftime("%B %d, %Y %H:%M:%S")
    print(session);
    return render_template('minimax-quiz/alphabetaQuiz.html')


@app.route('/save_answers_and_score', methods=['POST'])
def save_answers_and_score():
    data = request.json
    answers = data.get('answers')
    score = data.get('score')
    session['minimax_value_answers'] = answers
    session['minimax_value_score'] = score
    print(session)
    return 'Answers and score saved successfully.'


if __name__ == '__main__':
    app.run(debug=True)
