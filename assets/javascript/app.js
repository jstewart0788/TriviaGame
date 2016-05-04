window.onload = function(){
	$(".answer").on("click", function(){
		game.selectedAnswer = $(this).text();
		game.reveal();
	});
};

var game = {
	questions:[
	{	
		question:"",
		answers:["Press to Start", "" , "" , ""]
	},
	{
		question:"1) What word, that relates to art and architecture, can describe elaborate churches from the Middle Ages, or grotesque, medieval fiction?",
		answers:["Art Deco", "Surrealism", "Gothic", "Expressionism"],
		correctAnswerIndex: 2,
		gifImage:"assets/images/gothic.gif"
	},
	{
		question:"2) Whose art style became known as Surrealism?",
		answers:["Francisco de Goya", "Edgar Degas", "Peter Paul Rubens", "Salvador Dali"],
		correctAnswerIndex:3,
		gifImage:"assets/images/dali.gif"
	},
	{
		question:"3) How many paintings did Vincent Van Gogh sell in his lifetime?",
		answers:["1","3","5","7"],
		correctAnswerIndex:0,
		gifImage:"assets/images/vangogh.gif"
	},
	{
		question:"4) Pop Art originated in which city?",
		answers:["Amsterdam","New York","Frankfurt","London"],
		correctAnswerIndex:3,
		gifImage:"assets/images/popart.gif"
	},
	{
		question:"5) How many times has the Mona Lisa been stolen?",
		answers:["8","10","1","5"],
		correctAnswerIndex:2,
		gifImage:"assets/images/monalisa.gif"
	},
	{
		question:"6) Leonardi Da Vinci invented which one of these items?",
		answers:["Kites","High heels","Gunpowder","Wine cork"],
		correctAnswerIndex:1,
		gifImage:"assets/images/davinci.gif"
	}],
	numberOfQuestions:6,
	counter: "",
	state: 0,
	timeRemaining: 30,
	correctAnswers: 0,
	incorrectAnswers: 0,
	unanswered: 0,
	selectedAnswer: "",
	progress:function(){
		game.state++;
		game.resetTimer();
		if(game.state <= game.numberOfQuestions)
		{
			$("#timeRemaining").text("Time Remaining: " + game.timeRemaining + " seconds");
			game.counter = setInterval(game.count, 1000);
			$("#question").text(game.questions[game.state].question);
			$("#answer1").text(game.questions[game.state].answers[0]);
			$("#answer2").text(game.questions[game.state].answers[1]);
			$("#answer3").text(game.questions[game.state].answers[2]);
			$("#answer4").text(game.questions[game.state].answers[3]);

		}
		else
		{
			$("#timeRemaining").empty();
			$("#question").html('All done, here\'s how you did!<br><h3>Correct Answers: ' + game.correctAnswers+ '<br>Incorrect Answers: '+ game.incorrectAnswers +'<br>Unanswered: ' + game.unanswered + '</h3>');
			$("#answer1").text("Start Over?");
			$("#answer2").empty();
			$("#answer3").empty();
			$("#answer4").empty();
			//reset game
			game.state = 0;
			game.incorrectAnswers = 0;
			game.correctAnswers = 0;
			game.unanswered = 0;
		}



	},
	count:function(){
		game.timeRemaining--;
		$("#timeRemaining").text("Time Remaining: " + game.timeRemaining + " seconds");
		if (game.timeRemaining == 0)
		 {
		 	game.selectedAnswer = "";
		 	game.reveal();
		 }
	},
	resetTimer:function(){
		game.timeRemaining = 30;
	},
	reveal:function(){
		if(game.state > 0)
		{
			if(game.questions[game.state].answers[game.questions[game.state].correctAnswerIndex] == game.selectedAnswer )
			{
				game.correctAnswers++;
				$("#question").html('Correct!<br><br><br><img src="'+ game.questions[game.state].gifImage +'">');
				$("#answer1").empty();
				$("#answer2").empty();
				$("#answer3").empty();
				$("#answer4").empty();
			}
			else if(game.selectedAnswer == "")
			{
				game.unanswered++;
				$("#question").html('Out of Time!<br><br><h3>The correct answer was: ' + game.questions[game.state].answers[game.questions[game.state].correctAnswerIndex] +'</h3><br><img src="'+ game.questions[game.state].gifImage +'">');
				$("#answer1").empty();
				$("#answer2").empty();
				$("#answer3").empty();
				$("#answer4").empty();			
			}
			else
			{
				game.incorrectAnswers++;
				$("#question").html('Nope!<br><br><h3>The correct answer was: ' + game.questions[game.state].answers[game.questions[game.state].correctAnswerIndex]+'</h3><br><img src="'+ game.questions[game.state].gifImage +'">');
				$("#answer1").empty();
				$("#answer2").empty();
				$("#answer3").empty();
				$("#answer4").empty();			
			}
			clearInterval(game.counter);
			setTimeout(game.progress, 4000);
		}
		else
			game.progress();
	}
};