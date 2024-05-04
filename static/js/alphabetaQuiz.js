$(document).ready(function() {
    const alphabetaValues= {
        1: { answer: ["-inf", "inf"], hint: "<div><p>Values are initialized at -∞ and ∞.</p></div>"},
        2: { answer: ["-inf", "inf"], hint: "<div><p>No values have been seen to update alpha or beta.</p></div>"},
        3: { answer: ["-inf", "inf"], hint: "<div><p>No values have been seen to update alpha or beta.</p></div>"},
        4: { answer: ["8", "inf"], hint: "<div><div><p>The algorithm has seen the value 8.</p></div><div><p>This is a max node, so if the value seen is greater than the current alpha, alpha should be updated.</p></div></div>"},
        5: { answer: ["-inf", "8"], hint: "<div><div><p>Alpha and beta values are only passed down, starting at -∞, ∞.</p></div><div><p>The value 8 is seen by a min node, so if it is less than the current beta, update beta.</p></div></div>"},
        6: { answer: ["-inf", "8"], hint: "<div><p>Alpha and beta values get passed down until updated by seeing a value.</p></div>"},
        7: { answer: ["50", "8"], hint: "<div><div><p>The algorithm has seen the value 50.</p></div><div><p>This is a max node, so if the value seen is greater than the current alpha, alpha should be updated.</p></div><div><p>Is β ≤ α? If so, prune!</p></div></div>"},
        8: { answer: ["-inf", "8"], hint: "<div><div><p>Alpha and beta values are only passed down, starting at -∞, ∞.</p></div><div><p>The algorithm has encountered the value 8 and it is seen by a min node, so if it is less than the current beta, update beta.</p></div></div>"},
        9: { answer: ["-inf", "8"], hint: "<div><p>Alpha and beta values get passed down until updated by seeing a value.</p></div>"},
        10: { answer: ["-inf", "8"], hint: "<div><p>Alpha and beta values get passed down until updated by seeing a value.</p></div>"},
        11: { answer: ["2", "8"], hint: "<div><div><p>The algorithm has seen the value 2.</p></div><div><p>This is a max node, so if the value seen is greater than the current alpha, alpha should be updated.</p></div></div>"},
        12: { answer: ["-inf", "8"], hint: "<div><div><p>Alpha and beta values are only passed down, starting at -∞, 8.</p></div><div><p>The value 9 is seen by a min node. If the value seen is less than the current beta, update beta.</p></div></div>"},
        13: { answer: ["-inf", "8"], hint: "<div><p>Alpha and beta values get passed down until updated by seeing a value.</p></div>"},
        14: { answer: ["14", "8"], hint: "<div><div><p>The algorithm has seen the value 14.</p></div><div><p>This is a max node, so if the value seen is greater than the current alpha, alpha should be updated.</p></div><div><p>Is β ≤ α? If so, prune!</p></div></div>"}
    }

    let currentQuestion = 2;
    updateHint(currentQuestion);

    var alphabetaAnswers = {
        question1: {alpha: [], beta: []},
        question2: {alpha: [], beta: []},
        question3: {alpha: [], beta: []},
        question4: {alpha: [], beta: []},
        question5: {alpha: [], beta: []},
        question6: {alpha: [], beta: []},
        question7: {alpha: [], beta: []},
        question8: {alpha: [], beta: []},
        question9: {alpha: [], beta: []},
        question10: {alpha: [], beta: []},
        question11: {alpha: [], beta: []},
        question12: {alpha: [], beta: []},
        question13: {alpha: [], beta: []},
        question14: {alpha: [], beta: []},
    };

    var prunedNodes= [];

    let score= 100;

	for (let i = 2; i <= 14; i++) {
        $('#alpha-input-' + i).on('input', function() {
            console.log(score)
            var inputVal = $(this).val();
            setUp()

            if (inputVal != '') {
                alphabetaAnswers['question' + i].alpha.push(inputVal);
                if (i == 7 || i == 14) {
                    if (inputVal.length === 2) {
                        if (inputVal == alphabetaValues[i].answer[0]) {
                            $(this).prop('disabled', true);
                            $(this).css('border', '2px solid #b0b0b0');
                            $('#correct-update-2').addClass('show-animation');
                            $('#beta-input-' + (i)).prop('disabled', false);
                            $('#beta-input-' + i).focus();
                        } else {
                            $(this).css('border', '2px solid red');
                            score -= 1;
                            $('#incorrect-update-2').addClass('show-animation');
                        }
                    } else if (inputVal.length == 1) {
                        const str = String(alphabetaValues[i].answer[0]);
                        const substr = str.substring(0, 1);
                        if (substr !== inputVal) {
                            $(this).css('border', '2px solid red');
                            score -= 1;
                            $('#incorrect-update-2').addClass('show-animation');
                        }
                    }
                } else if (i == 1 || i == 2 || i == 3 || i == 5 || i == 6 || i == 8 || i == 9 || i == 10 || i == 12 || i == 13) {
                    if (inputVal.length === 4) {
                        if (inputVal == alphabetaValues[i].answer[0]) {
                            $(this).prop('disabled', true);
                            $(this).css('border', '2px solid #b0b0b0');
                            $('#correct-update-2').addClass('show-animation');
                            $('#beta-input-' + (i)).prop('disabled', false);
                            $('#beta-input-' + i).focus();
                            var pointer = $('.pointer');
                            pointer.css('visibility', 'hidden');
                        } else {
                            $(this).css('border', '2px solid red');
                            score -= 1;
                            $('#incorrect-update-2').addClass('show-animation');
                        }
                    } else if (inputVal.length == 3) {
                        const str = String(alphabetaValues[i].answer[0]);
                        const substr = str.substring(0, 3);
                        if (substr !== inputVal) {
                            $(this).css('border', '2px solid red');
                            score -= 1;
                            $('#incorrect-update-2').addClass('show-animation');
                        }
                    } else if (inputVal.length == 2) {
                        const str = String(alphabetaValues[i].answer[0]);
                        const substr = str.substring(0, 2);
                        if (substr !== inputVal) {
                            $(this).css('border', '2px solid red');
                            score -= 1;
                            $('#incorrect-update-2').addClass('show-animation');
                        }
                    } else if (inputVal.length == 1) {
                        const str = String(alphabetaValues[i].answer[0]);
                        const substr = str.substring(0, 1);
                        if (substr !== inputVal) {
                            $(this).css('border', '2px solid red');
                            score -= 1;
                            $('#incorrect-update-2').addClass('show-animation');
                        }
                    }
                } else {
                    if (inputVal == alphabetaValues[i].answer[0]) {
                        $(this).prop('disabled', true);
                        $(this).css('border', '2px solid #b0b0b0');
                        $('#correct-update-2').addClass('show-animation');
                        $('#beta-input-' + (i)).prop('disabled', false);
                        $('#beta-input-' + i).focus();
                    } else {
                        $(this).css('border', '2px solid red')
                        score -= 1;
                        $('#incorrect-update-2').addClass('show-animation');
                    }
                }
            }
        })

        $('#beta-input-' + i).on('input', function() {
            console.log(score)
            var inputVal = $(this).val();
            setUp()

            if (inputVal != '') {
                alphabetaAnswers['question' + i].beta.push(inputVal);
                if (i == 1 || i == 2 || i == 3 || i == 4) {
                    if (inputVal.length === 3) {
                        if (inputVal == alphabetaValues[i].answer[1]) {
                            $(this).prop('disabled', true);
                            $(this).css('border', '2px solid #b0b0b0');
                            $('#correct-update-2').addClass('show-animation');
                            $('#alpha-input-' + (i + 1)).prop('disabled', false);
                            $('#alpha-input-' + (i + 1)).focus();
                            let currentQuestion = i + 1;
                            updateHint(currentQuestion);
                            var hintSection = $('.hint-text');
                            hintSection.hide();
                        } else {
                            $(this).css('border', '2px solid red');
                            score -= 1;
                            $('#incorrect-update-2').addClass('show-animation');
                        }
                    } else if (inputVal.length == 2) {
                        const str = String(alphabetaValues[i].answer[1]);
                        const substr = str.substring(0, 2);
                        if (substr !== inputVal) {
                            $(this).css('border', '2px solid red');
                            score -= 1;
                            $('#incorrect-update-2').addClass('show-animation');
                        }
                    } else if (inputVal.length == 1) {
                        const str = String(alphabetaValues[i].answer[1]);
                        const substr = str.substring(0, 1);
                        if (substr !== inputVal) {
                            $(this).css('border', '2px solid red');
                            score -= 1;
                            $('#incorrect-update-2').addClass('show-animation');
                        }
                    }
                } else {
                    if (inputVal == alphabetaValues[i].answer[1]) {
                        $(this).prop('disabled', true);
                        $(this).css('border', '2px solid #b0b0b0');
                        $('#correct-update-2').addClass('show-animation');
                        $('#alpha-input-' + (i + 1)).prop('disabled', false);
                        $('#alpha-input-' + (i + 1)).focus();
                        let currentQuestion = i + 1;
                        updateHint(currentQuestion);
                        var hintSection = $('.hint-text');
                        hintSection.hide();
                    } else {
                        $(this).css('border', '2px solid red')
                        score -= 1;
                        $('#incorrect-update-2').addClass('show-animation');
                    }
                }
            }
        })
    }

    function setUp() {
        var correctUpdate2 = $('#correct-update-2');
        var incorrectUpdate2 = $('#incorrect-update-2');
        correctUpdate2.removeClass('show-animation');
        incorrectUpdate2.removeClass('show-animation');
        var newIncorrectUpdate2 = incorrectUpdate2.clone(true);
        incorrectUpdate2.before(newIncorrectUpdate2);
        $("." + incorrectUpdate2.attr("class") + ":last").remove();
        var incorrectUpdate2 = $('#incorrect-update-2');
        incorrectUpdate2.css('visibility', 'hidden');
        incorrectUpdate2[0].offsetHeight;
    }

    function updateHint(questionNum) {
        if (questionNum <= 14) {
            var hintHTML = alphabetaValues[questionNum].hint;
            $('.hint-text').html(hintHTML);
        } else {
            displayResults();
        }
    }

    $('.hint-icon').click(function() {
        var hintSection = $('.hint-text');
        if (hintSection.is(':visible')) {
            hintSection.hide();
        } else {
            hintSection.show();
        }
    });

    function displayResults() {
        setTimeout(function() {
            $('.see-your-results').css('display', 'inline');
        }, 2000)
    }

    $('#resultLink').click(function() {
        $('.see-your-results').css('display', 'none');
        $('#resultsText').html('<h6>You Scored ' + score + '%</h6>');
        $('.alphabeta-quiz-container').css('box-shadow', '0px 0px 10px #76c893');
        saveQuizSession2()
        setTimeout(function() {
            $('#restart-2').css('display', 'inline');
        }, 2000)
    })

    var isOverSpecifiedElement;



    $(".prune-icon").draggable({
        revert: "invalid",
        helper: "clone",
        cursor: "move",
        start: function(event, ui) {
            $(this).addClass('dragging');
            var clone = $(this).clone().appendTo('body');
        },
        stop: function(event, ui) {
            $(this).removeClass('dragging');
        }
    });

    for (let i = 1; i <= 7; i++) {
        $('.tri-val-' + i).droppable({
            hoverClass: "drag-hover",
            accept: ".prune-icon",
            drop: function(event, ui) {
                setUp();
                console.log("Node pune on triangle value: " + i);
                score -= 5;
                prunedNodes.push("Node: " + i);
                $('#incorrect-update-2').addClass('show-animation');
            }
        })
    }


    for (let i = 1; i <= 8; i++) {
        $('.term-val-' + i).droppable({
            hoverClass: "drag-hover",
            accept: ".prune-icon",
            drop: function(event, ui) {
                setUp();
                console.log("Node pune on terminal value: " + i);
                prunedNodes.push("Terminal: " + i);
                if (i == 4 || i == 8) {
                    $('#correct-update-2').addClass('show-animation');
                    $('.term-val-' + i).addClass('prune-node')
                } else {
                    score -= 5;
                    $('#incorrect-update-2').addClass('show-animation');
                }
            }
        })
    }

    function saveQuizSession2() {
        postData = {
            answers: alphabetaAnswers,
            prunedNodes: prunedNodes,
            score: score
        }

        $.ajax({
            url: '/save_alphabeta_answers_and_score',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success: function(response) {
                console.log('Alpha-beta answers and score saved successfully');
            },
            error: function(xhr, status, error) {
                console.error('Error saving alpha-beta answers/score:', error);
            }
        });
    }
})