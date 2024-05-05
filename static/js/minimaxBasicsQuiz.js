$(document).ready(function() {
    const minimaxValues = [8, 50, 8, 9, 14, 9, 9]

    var minimaxValueAnswers = {
        question1: [],
        question2: [],
        question3: [],
        question4: [],
        question5: [],
        question6: [],
        question7: [],
    };

    let score = 100;

    for (let i = 1; i <= minimaxValues.length; i++) {
        $('.minimax-value-' + i).on('input', function() {
            var inputVal = $(this).val();
            var correctUpdate = $('#correct-update');
            var incorrectUpdate = $('#incorrect-update');
            correctUpdate.removeClass('show-animation');
            incorrectUpdate.removeClass('show-animation');
            var newIncorrectUpdate = incorrectUpdate.clone(true);
            incorrectUpdate.before(newIncorrectUpdate);
            $("." + incorrectUpdate.attr("class") + ":last").remove();

            var incorrectUpdate = $('#incorrect-update');
            incorrectUpdate.css('visibility', 'hidden');
            incorrectUpdate[0].offsetHeight;



            if (inputVal != '') {
                minimaxValueAnswers['question' + i].push(inputVal);
                if (i == 2 || i == 5) {
                    if (inputVal.length === 2) {
                        if (inputVal == minimaxValues[i - 1]) {
                            $(this).prop('disabled', true);
                            $(this).css('border', '2px solid grey');
                            $('#correct-update').addClass('show-animation');
                            $('#pointer-' + i).css('visibility', 'hidden');
                            $('#pointer-info-' + i).css('visibility', 'hidden');
                            createNewPointer(i + 1)
                            $('.minimax-value-' + (i + 1)).prop('disabled', false);
                            $('.minimax-value-' + (i + 1)).focus();
                        } else {
                            $(this).css('border', '2px solid red');
                            score -= 5;
                            $('#incorrect-update').addClass('show-animation');
                        }
                    } else if (inputVal.length == 1) {
                        const str = String(minimaxValues[i - 1]);
                        const substr = str.substring(0, 1);
                        if (substr !== inputVal) {
                            $(this).css('border', '2px solid red');
                            score -= 5;
                            $('#incorrect-update').addClass('show-animation');
                        }
                    }
                } else {
                    if (inputVal == minimaxValues[i - 1]) {
                        $(this).prop('disabled', true);
                        $(this).css('border', '2px solid grey');
                        $('#correct-update').addClass('show-animation');
                        $('#pointer-' + i).css('visibility', 'hidden');
                        $('#pointer-info-' + i).css('visibility', 'hidden');
                        createNewPointer(i + 1)
                        $('.minimax-value-' + (i + 1)).prop('disabled', false);
                        $('.minimax-value-' + (i + 1)).focus();
                        if (i == 7) showResults();
                    } else {
                        $(this).css('border', '2px solid red')
                        score -= 5;
                        $('#incorrect-update').addClass('show-animation');
                    }
                }
            }
        });
    }

    function createNewPointer(newIndex) {
        if (newIndex != 8) {
            if (newIndex == 3 || newIndex == 4) {
                var newPointer = `<img id="pointer-${newIndex}" class="pointer" src="/static/images/pointer-left.png" alt="Navigation Pointer">`;
            } else {
                var newPointer = `<img id="pointer-${newIndex}" class="pointer" src="/static/images/pointer-right.png" alt="Navigation Pointer">`;
            }
            var newPointerInfo = `<p id="pointer-info-${newIndex}" class="pointer-info">Next</p>`;
            $('#pointer-container').append(newPointer);
            $('#pointer-container').append(newPointerInfo);
        }
    }

    function showResults() {
        setTimeout(function() {
            $('#basic-results').html('<h6>You Scored ' + score + '%</h6>');
            $('.basics-quiz-container').css('box-shadow', '0px 0px 10px #76c893');
            $('#basic-results').css('color', '#76c893')
            setTimeout(function() {
                $('#next-container').css('display', 'block');
            }, 1000);
        }, 2000);
        saveQuizSession1()
    }

    function saveQuizSession1() {
        postData = {
            answers: minimaxValueAnswers,
            score: score
        }

        $.ajax({
            url: '/save_minimax_answers_and_score',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success: function(response) {
                console.log('Minimax answers and score saved successfully');
            },
            error: function(xhr, status, error) {
                console.error('Error saving minimax answers/score:', error);
            }
        });
    }

});

