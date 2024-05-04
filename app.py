from flask import Flask, render_template, request
from datetime import datetime
import json

app = Flask(__name__)

session = {}

@app.route('/')
def home():
    session['home_page_enter_time'] = datetime.now().strftime("%B %d, %Y %I:%M:%S %p")
    print_formatted_session()
    return render_template('home.html')


@app.route('/minimaxBasics')
def minimax_basics():
    session['minimax_basics_page_enter_time'] = datetime.now().strftime("%B %d, %Y %I:%M:%S %p")
    print_formatted_session()
    return render_template('minimax-tutorials/minimaxBasics.html')


@app.route('/alphabetaIntro')
def alphabeta_intro():
    session['alphabeta_intro_page_enter_time'] = datetime.now().strftime("%B %d, %Y %I:%M:%S %p")
    print_formatted_session()
    return render_template('minimax-tutorials/alphabetaIntro.html')


@app.route('/alphabetaMain')
def alphabeta_main():
    session['alphabeta_main_page_enter_time'] = datetime.now().strftime("%B %d, %Y %I:%M:%S %p")
    print_formatted_session()
    return render_template('minimax-tutorials/alphabetaMain.html')


@app.route('/minimaxBasicsQuiz')
def minimax_basics_quiz():
    session['minimax_basics_quiz_page_enter_time'] = datetime.now().strftime("%B %d, %Y %I:%M:%S %p")
    print_formatted_session()
    return render_template('minimax-quiz/minimaxBasicsQuiz.html')


@app.route('/alphabetaQuiz')
def alphabeta_quiz():
    session['alphabeta_quiz_page_enter_time'] = datetime.now().strftime("%B %d, %Y %I:%M:%S %p")
    print_formatted_session()
    return render_template('minimax-quiz/alphabetaQuiz.html')


@app.route('/save_minimax_answers_and_score', methods=['POST'])
def save_minimax_answers_and_score():
    data = request.json
    answers = data.get('answers')
    score = data.get('score')
    session['minimax_value_answers'] = answers
    session['minimax_value_score'] = score
    print_formatted_session()
    return 'Minimax answers and score saved successfully.'


@app.route('/save_ab_tutorial_time', methods=['POST'])
def save_ab_tutorial_time():
    data = request.json
    next_timestamps = data.get('nextTimestamps')
    session['ab_tutorial_next_timestamps'] = next_timestamps
    print_formatted_session()
    return 'Alpha-beta tutorial time saved successfully.'


@app.route('/save_alphabeta_answers_and_score', methods=['POST'])
def save_alphabeta_answers_and_score():
    data = request.json
    answers = data.get('answers')
    score = data.get('score')
    pruned_nodes = data.get('prunedNodes')
    session['alphabeta_value_answers'] = answers
    session['alphabeta_value_score'] = score
    session['pruned_nodes'] = pruned_nodes
    print_formatted_session()
    return 'Alpha-beta answers and score saved successfully.'


def print_formatted_session():
    formatted_session = json.dumps(session, indent=4)
    formatted_session = formatted_session.replace('{\n', '{\n ').replace('\n', '\n ').replace(',\n', ',\n ')
    print(formatted_session)


if __name__ == '__main__':
    app.run(debug=True)
