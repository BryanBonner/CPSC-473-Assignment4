var main = function () {
	"using strict"

var url = "http://localhost:3000/trivia";
var question, answer;

$('#start').click(function() {
  $.ajax({
      type: 'GET',
      url: url + '/question',
      contentType: 'application/json',
      dataType: 'json',
      data:	question,
			success: function(question) {
				$('#question').append("<p>" + question['question'] + "</p")
			}
    });
	});
$('#answer').click(function() {
	$.ajax({
			type: 'POST',
			url: url + '/answer',
			contentType: 'application/json',
			dataType: 'json',
			data:	answer,
			success: function(answer) {
				alert(answer);
				// $('#question').append("<p>" + answer['answer'] + "</p")
			}
		});
})
};

$(document).ready(main);
