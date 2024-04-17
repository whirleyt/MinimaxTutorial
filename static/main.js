$(document).ready(function() {

    let minimaxValues= [10, 100, 10, 2, 20, 2, 10]
    let score=0;


    $('#resultLink').on('click', function(event) {
        var link = $('#resultLink');
        if (!link.attr('href')) {
            event.preventDefault();

            $('#linkDescription').text('Try Again');

            link.attr('href', '/minimaxBasicsQuiz');

            $('#resultsText').css('display', 'block');

            $('#alphabeta-quiz-container').css('box-shadow', '0px 0px 10px #76c893');
        }
    });

    $('#basic-results-btn').on('click', function() {
            var minimaxValueAnswers = {
            };
            event.preventDefault();
            let answersCorrect= 0;
            for(let i=1; i<=minimaxValues.length; i++){
                if($('.minimax-value-'+ i).val() != '') minimaxValueAnswers['question'+i]= $('.minimax-value-'+ i).val();
                if($('.minimax-value-'+ i).val() == minimaxValues[i-1]) {
                    answersCorrect +=1;
                }
            }
            score= Math.floor((answersCorrect / minimaxValues.length) * 100);
            $('#basic-results').html('<h6>You Scored ' + score  + '%</h6>');
            if(score==100) {
                $('#next-container').css('display', 'block');
                $('.basics-quiz-container').css('box-shadow', '0px 0px 10px #76c893');
                $('#basic-results').css('color', '#76c893')
            } else {
                $('#next-container').css('display', 'none');
                $('.basics-quiz-container').css('box-shadow', '0px 0px 10px black');
                $('#basic-results').css('color', 'black')
            }

            postData= {
                answers: minimaxValueAnswers,
                score: score
            }

            $.ajax({
            url: '/save_answers_and_score',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success: function(response) {
                console.log('Answers and score saved successfully');
            },
            error: function(xhr, status, error) {
                console.error('Error saving answers/score:', error);
            }
        });

    })

    var currentPage = 1;
    updatePage(currentPage);

    $('#next').on('click', function() {
        currentPage++;
        updatePage(currentPage);
    });

    $('#previous').on('click', function() {
        currentPage--;
        updatePage(currentPage);
    });

    function updatePage(page) {
        if (page === 1) {
            $('#previous').css('display', 'none');
        } else {
            $('#previous').css('display', 'inline');
        }
        if (page === 10) {
            $('#next').css('display', 'none');
            $('#restart').css('display', 'inline');
            $('#quiz').css('display', 'inline');
        } else {
            $('#next').css('display', 'inline');
            $('#quiz').css('display', 'none');
            $('#restart').css('display', 'none');
        }
        switch (page) {
            case 1:
                $('#content').html('<p>Page 1</p>');
                break;
            case 2:
                $('#content').html('<p>Page 2</p>');
                break;
            case 3:
                $('#content').html('<p>Page 3</p>');
                break;
            case 4:
                $('#content').html('<p>Page 4</p>');
                break;
            case 5:
                $('#content').html('<p>Page 5</p>');
                break;
            case 6:
                $('#content').html('<p>Page 6</p>');
                break;
            case 7:
                $('#content').html('<p>Page 7</p>');
                break;
            case 8:
                $('#content').html('<p>Page 8</p>');
                break;
            case 9:
                $('#content').html('<p>Page 9</p>');
                break;
            case 10:
                $('#content').html('<p>Page 10</p>');
                break;
        }
    }
});

