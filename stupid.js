(function() {

	class Game {

		constructor() {

			this.gameStarted = false; //begin gameplay
			this.nextActionInterval = 3000; //time allowed between actions
			this.score = -1; //score
			this.currRound = 0; //keeping track of rounds so we can decrease actionInterval
			this.rightAnswer = "Click"
			this.audio = new Audio('./bloop.mp3')
		

			this.startButton = document.querySelector('button')
			this.startButton.addEventListener('click', this.startGame.bind(this))

		}

		chooseAction() {
			let rand = Math.floor(Math.random() * 6)
			let actions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "Click"]

			this.h1 = document.getElementById('action')
			this.h1.innerText = actions[rand]

			return actions[rand]
		}

		gameOver(message) {
				// wipe the screen
				
				this.h1.innerText = `${message} Your score is: ${this.score}`
				document.removeEventListener('click', this.getKey)
				window.clearTimeout(this.timer)

		}

		startGame() {
			if(this.gameStarted === false) {
				this.rightAnswer = "Click"
				this.gameStarted = true
				this.startButton.style = "display: none;"
				document.addEventListener('click', this.getKey.bind(this))
				document.addEventListener('keydown', this.getKey.bind(this))
				this.startTimer()
			}
			else {
				if(this.currRound % 5 === 0) {
					this.nextActionInterval -= 200
				}
				this.rightAnswer = this.chooseAction()
				this.startTimer()
			}
		}

		checkAnswer(input, rightAnswer) {
			console.log(input, rightAnswer)

			if(input === rightAnswer) {
				console.log("correct")
				this.score += 1
				this.currRound += 1
				this.audio.play()
				window.clearInterval(this.timer)


				this.startGame()
				
			}
			else {
				this.gameOver("You goofed!")
			}
		}

		startTimer() {
			console.log('starting timer')
			this.timer = window.setTimeout(() => {

				// game over
				console.log("time is up")
				this.gameOver("Too slow!")

			}, this.nextActionInterval)

		}

		getKey(e) {
			console.log(e.key)
			let input = ""

			if(e.key === undefined) {
				input = "Click"
			}
			else if (e.key === " ") {
				input = "Space"
			}
			else {
				input = e.key
			}

			this.checkAnswer(input, this.rightAnswer)
		}

	}


	let game = new Game()

}())
