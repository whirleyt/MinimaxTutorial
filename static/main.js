$(document).ready(function() {
    let linesToHighlight = [];
    let minimaxValues= [8, 50, 8, 9, 14, 9, 9]

    const alphabetaPageData = [
                    {   page: 1,
                        alphabetaUpdate: [{ id: "1", alpha: ' -∞', beta: ' +∞', style:'display: none;'}],
                        text: '',
                        textStyle: ''
                    },
                    {
                        page: 2,
                        alphabetaUpdate: [
                            { id:"2", alpha: ' -∞', beta: ' +∞', style:'left: 300px; top: 20px;'},
                        ],
                        text: "<div><div><p>We start alpha at -∞, and beta at +∞.</p></div><div><p>This sets a baseline that any actual score will surpass, allowing us to effectively track and update the highest and lowest scores encountered during the search.</p></div></div>",
                        textStyle: ''
                    },
                    {
                        page: 3,
                        alphabetaUpdate: [
                            { id:"2", alpha: ' -∞', beta: ' +∞', style:'left: 300px; top: 20px;'},
                            { id:"3", alpha: '-∞', beta: '+∞', style:'left: 113px; top: 180px;'},
                            { id:"4", alpha: '-∞', beta: '+∞', style:'left: 38px; top: 340px;'},
                        ],
                        text: "<div><p>Alpha-beta values are not updated until we see the first value.</p></div>",
                        textStyle: ''
                    },
                    {
                        page: 4,
                        alphabetaUpdate: [
                            { id:"2", alpha: ' -∞', beta: ' +∞', style:'left: 300px; top: 20px;'},
                            { id:"3", alpha: '-∞', beta: '+∞', style:'left: 113px; top: 180px;'},
                            { id:"4", alpha: '-∞', beta: '+∞', style:'left: 38px; top: 340px;'},
                            { id:"5", alpha: '10', beta: '+∞', style:'left: 162px; top: 340px;'},
                        ],
                        text: "<div><p>10 is larger than -∞.</p></div>",
                        textStyle: ''
                    },
                    {
                        page: 5,
                        alphabetaUpdate: [
                            { id:"2", alpha: ' -∞', beta: ' +∞', style:'left: 300px; top: 20px;'},
                            { id:"3", alpha: '-∞', beta: '+∞', style:'left: 113px; top: 180px;'},
                            { id:"4", alpha: '-∞', beta: '+∞', style:'left: 38px; top: 340px;'},
                            { id:"5", alpha: '10', beta: '+∞', style:'left: 162px; top: 340px;'},
                            { id:"6", alpha: '-∞', beta: '10', style:'left: 232px; top: 180px;'},
                        ],
                        text: "<div><p>The Max Node prefers 10 over 6.</p></div><div><p>The alpha-beta values that are passed down are -∞ and ∞. 10, the value of the min node, gets passed down as the lowest value seen so far. </p></div>",
                        textStyle: ''
                    },
                    {
                        page: 6,
                        alphabetaUpdate: [
                            { id:"2", alpha: ' -∞', beta: ' +∞', style:'left: 300px; top: 20px;'},
                            { id:"3", alpha: '-∞', beta: '+∞', style:'left: 113px; top: 180px;'},
                            { id:"4", alpha: '-∞', beta: '+∞', style:'left: 38px; top: 340px;'},
                            { id:"5", alpha: '10', beta: '+∞', style:'left: 162px; top: 340px;'},
                            { id:"6", alpha: '-∞', beta: '10', style:'left: 232px; top: 180px;'},
                            { id:"7", alpha: '-∞', beta: '10', style:'left: 185px; top: 385px;'},
                            { id:"8", alpha: '100', beta: '10', style:'left: 315px; top: 385px;'},
                        ],
                        text: "<div><p>100 is larger than -∞.</p></div>",
                        textStyle: ''
                    },
                     {
                         page: 7,
                         alphabetaUpdate: [
                            { id:"2", alpha: ' -∞', beta: ' +∞', style:'left: 300px; top: 20px;'},
                            { id:"3", alpha: '-∞', beta: '+∞', style:'left: 113px; top: 180px;'},
                            { id:"4", alpha: '-∞', beta: '+∞', style:'left: 38px; top: 340px;'},
                            { id:"5", alpha: '10', beta: '+∞', style:'left: 162px; top: 340px;'},
                            { id:"6", alpha: '-∞', beta: '10', style:'left: 232px; top: 180px;'},
                            { id:"7", alpha: '-∞', beta: '10', style:'left: 185px; top: 385px;'},
                            { id:"8", alpha: '100', beta: '10', style:'font-weight: bold; color: #0077b6; left: 315px; top: 385px;'},
                        ],
                         text: "<h4>Is<img class='b-symbol-q' src='/static/images/beta.png' alt='Beta Symbol'><span>≤</span><img class='a-symbol-q' src='/static/images/alpha.png' alt='Alpha Symbol'><span>?</span></h4>",
                         textStyle: ''
                     },
                     {
                         page: 8,
                         alphabetaUpdate: [
                            { id: "2", alpha: ' -∞', beta: ' +∞', style:'left: 300px; top: 20px;'},
                            { id:"3", alpha: '-∞', beta: '+∞', style:'left: 113px; top: 180px;'},
                            { id:"4", alpha: '-∞', beta: '+∞', style:'left: 38px; top: 340px;'},
                            { id:"5", alpha: '10', beta: '+∞', style:'left: 162px; top: 340px;'},
                            { id:"6", alpha: '-∞', beta: '10', style:'left: 232px; top: 180px;'},
                            { id:"7", alpha: '-∞', beta: '10', style:'left: 185px; top: 385px;'},
                            { id:"8", alpha: '100', beta: '10', style:'font-weight: bold; color: #0077b6; left: 315px; top: 385px;'},
                        ],
                         text: "<h4>Is<img class='b-symbol-q' src='/static/images/beta.png' alt='Beta Symbol'><span>≤</span><img class='a-symbol-q' src='/static/images/alpha.png' alt='Alpha Symbol'><span>?</span></h4><div style='margin-top: -10px;'><h6 class='yes'>Yes! <span class='prune-word'>Prune</span></h6></div>",
                         textStyle: ''
                     },
                    {
                         page: 9,
                         alphabetaUpdate: [
                            { id:"2", alpha: ' -∞', beta: ' +∞', style:'left: 300px; top: 20px;'},
                            { id:"3", alpha: '-∞', beta: '+∞', style:'left: 113px; top: 180px;'},
                            { id:"4", alpha: '-∞', beta: '+∞', style:'left: 38px; top: 340px;'},
                            { id:"5", alpha: '10', beta: '+∞', style:'left: 162px; top: 340px;'},
                            { id:"6", alpha: '-∞', beta: '10', style:'left: 232px; top: 180px;'},
                            { id:"7", alpha: '-∞', beta: '10', style:'left: 185px; top: 385px;'},
                            { id:"8", alpha: '100', beta: '10', style:'left: 315px; top: 385px;'},
                            { id:"9", alpha: '10', beta: '∞', style:'left: 422px; top: 20px;'},
                            { id:"10", alpha: '10', beta: '∞', style:'left: 495px; top: 180px;'},
                            { id:"11", alpha: '10', beta: '∞', style:'left: 420px; top: 340px;'},
                         ],
                         text: "<div><p>10 seen by the Min Node is the highest value seen so far, so alpha is updated and the value gets passed down.</p></div>",
                         textStyle: ''
                     },
                     {
                         page: 10,
                         alphabetaUpdate: [
                            { id:"2", alpha: ' -∞', beta: ' +∞', style:'left: 300px; top: 20px;'},
                            { id:"3", alpha: '-∞', beta: '+∞', style:'left: 113px; top: 180px;'},
                            { id:"4", alpha: '-∞', beta: '+∞', style:'left: 38px; top: 340px;'},
                            { id:"5", alpha: '10', beta: '+∞', style:'left: 162px; top: 340px;'},
                            { id:"6", alpha: '-∞', beta: '10', style:'left: 232px; top: 180px;'},
                            { id:"7", alpha: '-∞', beta: '10', style:'left: 185px; top: 385px;'},
                            { id:"8", alpha: '100', beta: '10', style:'left: 315px; top: 385px;'},
                            { id:"9", alpha: '10', beta: '∞', style:'left: 422px; top: 20px;'},
                            { id:"10", alpha: '10', beta: '∞', style:'left: 495px; top: 180px;'},
                            { id:"11", alpha: '10', beta: '∞', style:'left: 420px; top: 340px;'},
                            { id:"12", alpha: '10', beta: '1', style:'left: 535px; top: 340px;'},
                            { id:"13", alpha: '10', beta: '2', style:'left: 610px; top: 180px;'},
                         ],
                         text: "<div><p>1 is lower than ∞, so beta is updated.</p></div><div><p>Infinity is passed down for beta. The Min Node with a value of 2 updates beta because 2 is less than ∞.</p><div>",
                         textStyle: ''
                     },
                    {
                         page: 11,
                         alphabetaUpdate: [
                            { id:"2", alpha: ' -∞', beta: ' +∞', style:'left: 300px; top: 20px;'},
                            { id:"3", alpha: '-∞', beta: '+∞', style:'left: 113px; top: 180px;'},
                            { id:"4", alpha: '-∞', beta: '+∞', style:'left: 38px; top: 340px;'},
                            { id:"5", alpha: '10', beta: '+∞', style:'left: 162px; top: 340px;'},
                            { id:"6", alpha: '-∞', beta: '10', style:'left: 232px; top: 180px;'},
                            { id:"7", alpha: '-∞', beta: '10', style:'left: 185px; top: 385px;'},
                            { id:"8", alpha: '100', beta: '10', style:'left: 315px; top: 385px;'},
                            { id:"9", alpha: '10', beta: '∞', style:'left: 422px; top: 20px;'},
                            { id:"10", alpha: '10', beta: '∞', style:'left: 495px; top: 180px;'},
                            { id:"11", alpha: '10', beta: '∞', style:'left: 420px; top: 340px;'},
                            { id:"12", alpha: '10', beta: '1', style:'left: 535px; top: 340px;'},
                            { id:"13", alpha: '10', beta: '2', style:'font-weight: bold; color: #0077b6; left: 610px; top: 180px;'},
                         ],
                         text: "<h4>Is<img class='b-symbol-q' src='/static/images/beta.png' alt='Beta Symbol'><span>≤</span><img class='a-symbol-q' src='/static/images/alpha.png' alt='Alpha Symbol'><span>?</span></h4>",
                         textStyle: ''
                     },
                     {
                         page: 12,
                         alphabetaUpdate: [
                            { id:"2", alpha: ' -∞', beta: ' +∞', style:'left: 300px; top: 20px;'},
                            { id:"3", alpha: '-∞', beta: '+∞', style:'left: 113px; top: 180px;'},
                            { id:"4", alpha: '-∞', beta: '+∞', style:'left: 38px; top: 340px;'},
                            { id:"5", alpha: '10', beta: '+∞', style:'left: 162px; top: 340px;'},
                            { id:"6", alpha: '-∞', beta: '10', style:'left: 232px; top: 180px;'},
                            { id:"7", alpha: '-∞', beta: '10', style:'left: 185px; top: 385px;'},
                            { id:"8", alpha: '100', beta: '10', style:'left: 315px; top: 385px;'},
                            { id:"9", alpha: '10', beta: '∞', style:'left: 422px; top: 20px;'},
                            { id:"10", alpha: '10', beta: '∞', style:'left: 495px; top: 180px;'},
                            { id:"11", alpha: '10', beta: '∞', style:'left: 420px; top: 340px;'},
                            { id:"12", alpha: '10', beta: '1', style:'left: 535px; top: 340px;'},
                            { id:"13", alpha: '10', beta: '2', style:'font-weight: bold; color: #0077b6; left: 610px; top: 180px;'},
                         ],
                         text: "<h4>Is<img class='b-symbol-q' src='/static/images/beta.png' alt='Beta Symbol'><span>≤</span><img class='a-symbol-q' src='/static/images/alpha.png' alt='Alpha Symbol'><span>?</span></h4><div style='margin-top: -10px;'><h6 class='yes'>Yes! <span class='prune-word'>Prune</span></h6></div>",
                         textStyle: ''
                     },
          ];

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
        renderContent();
        $('.code-container').removeClass('highlighted-code');
        switch (page) {
            case 1:
                linesToHighlight = [];
                highlightLines();
                break;
            case 2:
                linesToHighlight = [22];
                highlightLines();
                break;
            case 3:
                linesToHighlight = [7, 16];
                highlightLines();
                break;
            case 4:
                linesToHighlight = [9];
                highlightLines();
                break;
            case 5:
                linesToHighlight = [18];
                highlightLines();
                break;
            case 6:
                linesToHighlight = [9];
                highlightLines();
                break;
            case 7:
                linesToHighlight = [10];
                highlightLines();
                break;
            case 8:
                linesToHighlight = [11];
                highlightLines();
                break;
            case 9:
                linesToHighlight = [7, 16, 9];
                highlightLines();
                break;
            case 10:
                linesToHighlight = [18];
                highlightLines();
                break;
            case 11:
                linesToHighlight = [19];
                highlightLines();
                break;
            case 12:
                linesToHighlight = [20];
                highlightLines();
                break;
        }
        if (page === 1) {
            $('#previous').css('display', 'none');
            $('#pointer-1').css('display', 'block');
            $('#pointer-1-info').css('display', 'block');
        } else {
            $('#previous').css('display', 'inline');
            $('#pointer-1').css('display', 'none');
            $('#pointer-1-info').css('display', 'none');
        }

        if(page >= 8){
            $('#prune-node-1').addClass('prune-node');
        } else {
            $('#prune-node-1').removeClass('prune-node');
        }

        if(page === 12){
            $('#next').css('display', 'none');
            setTimeout(function() {
               $('#restart').css('display', 'inline');
               $('#quiz').css('display', 'inline');
            }, 1000);
            $('#prune-node-2').addClass('prune-node');
            $('#prune-node-3').addClass('prune-node');
            $('#prune-node-4').addClass('prune-node');
            $('#prune-value').addClass('prune-value');
        } else {
            $('#next').css('display', 'inline');
            $('#quiz').css('display', 'none');
            $('#restart').css('display', 'none');
            $('#prune-node-2').removeClass('prune-node');
            $('#prune-node-3').removeClass('prune-node');
            $('#prune-node-4').removeClass('prune-node');
            $('#prune-value').removeClass('prune-value');

        }
    }

      function highlightLines(){
           linesToHighlight.forEach(line => {
                $('#line-'+line).addClass('highlighted-code');
           });
      }

      function renderContent() {
                  const currentPageData = alphabetaPageData.find(p => p.page === currentPage);

                  if (currentPageData) {
                      const abContainer = document.getElementById('alpha-beta-info-container');
                      const descriptionContainer = document.getElementById('description-container');
                    if(abContainer){
                      if (currentPageData.alphabetaUpdate.length > 0) {
                          abContainer.innerHTML = currentPageData.alphabetaUpdate.map((ab, index) => `
                              <div style="${ab.style}" class="alpha-beta-page-info">
                                  <img class="a-symbol" src="/static/images/alpha.png" alt="Alpha Symbol">
                                  <span style="color: black; padding: -2px; margin: -2px; font-size: 9px;">=</span>
                                  ${ab.alpha}
                                  <span style="color: black; padding: -2px; margin: -2px;">,</span>
                                  <img class="b-symbol" src="/static/images/beta.png" alt="Beta Symbol">
                                  <span style="color: black; padding: -2px; margin: -2px; font-size: 9px;">=</span>
                                  ${ab.beta}
                              </div>
                          `).join('');
                          }
                      descriptionContainer.innerHTML = currentPageData.text;
                      descriptionContainer.style = currentPageData.textStyle;
                      }
                  }
              }
      var minimaxValueAnswers = {
        question1: [],
        question2: [],
        question3: [],
        question4: [],
        question5: [],
        question6: [],
        question7: [],
      };

      let score= 100;

      for(let i=1; i<=minimaxValues.length; i++){
          $('.minimax-value-'+ i).on('input', function() {
                var inputVal = $(this).val();
                $('#correct-update').removeClass('show-animation');
                $('#correct-update').removeClass('show-animation');

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



                if(inputVal != '') {
                minimaxValueAnswers['question' + i].push(inputVal);
                if(i==2 || i== 5){
                    if(inputVal.length === 2){
                        if(inputVal == minimaxValues[i-1]) {
                            $(this).prop('disabled', true);
                            $(this).css('border', '2px solid grey');
                            $('#correct-update').addClass('show-animation');
                            $('#pointer-'+ i).css('visibility', 'hidden');
                            $('#pointer-info-'+ i).css('visibility', 'hidden');
                            createNewPointer(i+1)
                            $('.minimax-value-' + (i+1)).prop('disabled', false);
                        } else {
                            $(this).css('border', '2px solid red');
                            score-= 5;
                            $('#incorrect-update').addClass('show-animation');
                        }
                    } else if(inputVal.length==1) {
                        const str= String(minimaxValues[i-1]);
                        const substr= str.substring(0, 1);
                        if(substr !== inputVal){
                            $(this).css('border', '2px solid red');
                            score-= 5;
                            $('#incorrect-update').addClass('show-animation');
                        }
                   }
                } else {
                    if(inputVal == minimaxValues[i-1]) {
                    $(this).prop('disabled', true);
                    $(this).css('border', '2px solid grey');
                    $('#correct-update').addClass('show-animation');
                    $('#pointer-'+ i).css('visibility', 'hidden');
                    $('#pointer-info-'+ i).css('visibility', 'hidden');
                    createNewPointer(i+1)
                    $('.minimax-value-' + (i+1)).prop('disabled', false);
                    if(i == 7) showResults();
                    } else {
                      $(this).css('border', '2px solid red')
                      score-= 5;
                      $('#incorrect-update').addClass('show-animation');
                    }
                }
                }
          });
      }

    function createNewPointer(newIndex){
        if(newIndex != 8){
            if(newIndex==3 || newIndex==4){
                var newPointer = `<img id="pointer-${newIndex}" class="pointer" src="/static/images/pointer-left.png" alt="Navigation Pointer">`;
            } else {
                var newPointer = `<img id="pointer-${newIndex}" class="pointer" src="/static/images/pointer-right.png" alt="Navigation Pointer">`;
            }
            var newPointerInfo= `<p id="pointer-info-${newIndex}" class="pointer-info">Next</p>`;
            $('#pointer-container').append(newPointer);
            $('#pointer-container').append(newPointerInfo);
        }
    }

    function showResults(){
        setTimeout(function() {
        $('#basic-results').html('<h6>You Scored ' + score  + '%</h6>');
        $('#next-container').css('display', 'block');
        $('.basics-quiz-container').css('box-shadow', '0px 0px 10px #76c893');
        $('#basic-results').css('color', '#76c893')
        }, 2000);
    }

//      $('#basic-results-btn').on('click', function() {
//            var minimaxValueAnswers = {
//            };
//            event.preventDefault();
//            let answersCorrect= 0;
//            for(let i=1; i<=minimaxValues.length; i++){
//                if($('.minimax-value-'+ i).val() != '') minimaxValueAnswers['question'+i]= $('.minimax-value-'+ i).val();
//                if($('.minimax-value-'+ i).val() == minimaxValues[i-1]) {
//                    answersCorrect +=1;
//                }
//            }
//            score= Math.floor((answersCorrect / minimaxValues.length) * 100);
//            $('#basic-results').html('<h6>You Scored ' + score  + '%</h6>');
//            if(score==100) {
//                $('#next-container').css('display', 'block');
//                $('.basics-quiz-container').css('box-shadow', '0px 0px 10px #76c893');
//                $('#basic-results').css('color', '#76c893')
//            } else {
//                $('#next-container').css('display', 'none');
//                $('.basics-quiz-container').css('box-shadow', '0px 0px 10px black');
//                $('#basic-results').css('color', 'black')
//            }
//
//            postData= {
//                answers: minimaxValueAnswers,
//                score: score
//            }
//
//            $.ajax({
//            url: '/save_answers_and_score',
//            type: 'POST',
//            contentType: 'application/json',
//            data: JSON.stringify(postData),
//            success: function(response) {
//                console.log('Answers and score saved successfully');
//            },
//            error: function(xhr, status, error) {
//                console.error('Error saving answers/score:', error);
//            }
//        });
//
//    })
});

