let score = JSON.parse(localStorage.getItem('scores'))
      || {
      Wons: 0,//default value
      Losses: 0,//default value
      Ties: 0 //default value
    };
    let isAutoPlaying = false;
    let intervalId;
    function autoPlay() {
      if (!isAutoPlaying) {
        intervalId = setInterval(() => {
          const playerMove = rpsbox();
          playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
      }
      else {
        clearInterval(intervalId);
        isAutoPlaying = false;
      }
    }


    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'r') {
        playGame('Rock');
      } else if (event.key === 'p') {
        playGame('Paper')
      } else if (event.key === 's') {
        playGame('Scissors')
      }
    });
    function playGame(playerMove) {
      const computerMove = rpsbox();
      let result = '';
      if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
          result = 'Tie';
        } else if (computerMove === 'Paper') {
          result = 'better luck next time'
        } else if (computerMove === 'Scissors') {
          result = 'Congrates you won'
        }
      } else if (playerMove === 'Paper') {
        if (computerMove === 'Paper') {
          result = 'Tie..';
        } else if (computerMove === 'Scissors') {
          result = 'better luck next time'
        } else if (computerMove === 'Rock') {
          result = 'Congrates you won'
        }
      } else if (playerMove === 'Scissors') {
        if (computerMove === 'Scissors') {
          result = 'Tie';
        } else if (computerMove === 'Rock') {
          result = 'better luck next time'
        } else if (computerMove === 'Paper') {
          result = 'Congrates you won'
        }
      }
      if (result === 'Congrates you won') {
        score.Wons += 1;
      } else if (result === 'better luck next time') {
        score.Losses += 1;
      } else if (result === 'Tie') {
        score.Ties += 1;
      }

      localStorage.setItem('scores', JSON.stringify(score));
      updateScroreElement();
      document.querySelector('.js-result').innerHTML = result;
      document.querySelector('.js-move').innerHTML = `You picked ${playerMove} - Computer picked  ${computerMove}`;
    }

    function updateScroreElement() {
      document.querySelector('.para').innerHTML = `Wons: ${score.Wons},Losses: ${score.Losses},Ties: ${score.Ties}`;
    }
    function rpsbox() {
      const randomNumber = Math.random();
      // console.log(randomNumber)
      let computerMove = '';
      if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
      } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
      } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissors';
      }
      // console.log(computerMove);
      return computerMove;
    }