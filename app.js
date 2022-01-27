let teamNames = ['Real Madrid', 'Barcelona', 'Manchester United', 'Liverpool', 'Juventus', 'Chelsea', 'Milan', 'Bayern Munich']
const randomly = () => Math.random() - 0.5;
let traitInfo = Array(teamNames.length).fill({}); // for the snippet.
let dynamicTeams = [].concat(teamNames).sort(randomly);
let leftArray = [];
let rightArray = [];
let leftSide = document.getElementById('left_side');
let rightSide = document.getElementById('right_side');

function createTeam(teamName) {
    const team = document.createElement('div');
    team.id = 'team';
    team.innerHTML = teamName;

    return team;
}

function generateWinner(team) {
    var body = document.getElementById('main');
    body.innerHTML = '';
    const winner = document.createElement('center');
    winner.appendChild(document.createElement('p'));
    winner.firstChild.id = 'winner';
    winner.firstChild.innerHTML = `The winner club is ${team}`;

    body.appendChild(winner);
}

function init() {
    let j = 0;

    traitInfo.forEach((t, i) => {

        if (j < 4) {
            leftArray.push(createTeam(dynamicTeams[i]));
        } else {
            rightArray.push(createTeam(dynamicTeams[i]));
        }
        j++;
    });

    leftArray.forEach((t) => {
        leftSide.appendChild(t);
    });
    rightArray.forEach((t) => {
        rightSide.appendChild(t);
    });



}

function spin() {
    var indexesLeft = [];
    var indexesRight = [];

    if (leftArray.length == 1) {

        var randomSide = (Math.random() >= 0.5) ? 1 : 0;
        leftSide.innerHTML = '';
        rightSide.innerHTML = '';

        if (randomSide == 1) {
            generateWinner(leftArray[0].innerText)
        } else {
            generateWinner(rightArray[0].innerText)
        }

    } else {
        for (var i = 0; i < leftArray.length / 2; i++) {
            console.log("left " + i);
            var randomIndex = generateRandomIndex(indexesLeft, leftArray.length - 1);
            indexesLeft[i] = randomIndex;
        }

        for (var i = 0; i < leftArray.length; i++) {
            console.log("right " + i);
            if (!indexesLeft.includes(i)) {
                indexesRight.push(i);
            }
        }

        indexesLeft.forEach((t) => {
            delete leftArray[t];
        })

        indexesRight.forEach((t) => {
            delete rightArray[t];
        })

        leftArray = leftArray.filter(function(element) {
            return element !== undefined;
        });
        rightArray = rightArray.filter(function(element) {
            return element !== undefined;
        });


        leftSide.innerHTML = '';
        rightSide.innerHTML = '';

        leftArray.forEach((t) => {
            leftSide.appendChild(t);
        });
        rightArray.forEach((t) => {
            rightSide.appendChild(t);
        });
    }
}

// let dynamicArray = (teams) => {
//     const randomly = () => Math.random() - 0.5;
//     let traitInfo = Array(teams.length).fill({}); // for the snippet.
//     let dynamicTeams = [].concat(teams).sort(randomly);

//     return dynamicTeams;
// }

function generateRandomIndex(array, maxNum) {
    var randomIndex = Math.floor(Math.random() * maxNum);
    if (array.includes(randomIndex)) {
        return generateRandomIndex(array, maxNum);
    } else {
        return randomIndex;
    }
}

init();