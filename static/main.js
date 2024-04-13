

document.getElementById('resultLink').addEventListener('click', function(event) {
    var link = document.getElementById('resultLink');
    if (!link.hasAttribute('href')) {
        event.preventDefault();

        document.getElementById('linkDescription').textContent = 'Try Again';

        link.setAttribute('href', '/minimaxBasicsQuiz');

        document.getElementById('resultsText').style.display = 'block';

        document.getElementById('alphabeta-quiz-container').style.boxShadow= '0px 0px 10px #76c893';
    }
});