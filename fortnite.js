

// https://codepen.io/matt47r/pen/xewZar

// Generic GET request
async function getRequest(url) {
    const response = await fetch(url);
    const info = await response.json()
    return info;
}

async function getFortniteUser(username) {
    const uidURL = 'https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=';
    const userInfo = await getRequest(uidURL + username);
    return userInfo;
}

async function getFortniteUserStats(uid) {
    const statsURL = 'https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id=';
    const userInfo = await getRequest(statsURL+uid);
    return userInfo;
}

const button = document.querySelector('#button1');
button.addEventListener('click', async function buttonClick() {
    resetUI();
    const name = document.getElementById('input-text').value;
    const user = await getFortniteUser(name);
    if (user.success === false) {
        document.querySelector('.uid').innerHTML = "Not a valid Fortnite user. Try again.";
    } else {
        document.querySelector('.uid').innerHTML = name + "'s UID: " + user.uid;
        document.querySelector('.name').innerHTML = name + "'s " + "Stats";
    }

    const userStats = await getFortniteUserStats(user.uid);
    displayStats(userStats.overallData.defaultModes);
})

const input = document.querySelector('#input-text');
input.addEventListener('keypress', function(e) {
    const keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        document.getElementById('button1').click();
    }
})

function numberWithCommas(x) {
    if (x === undefined) {
        return '';
    } else {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

function resetUI() {
    const uid = document.querySelector('.uid');
    const stats = document.querySelectorAll('.stat');
    uid.innerHTML = '';
    stats.forEach (stat => {
        stat.innerHTML = '';
    })
}

function displayStats(stats) {
    const playersOutlived = numberWithCommas(stats.playersoutlived);
    const score = numberWithCommas(stats.score);
    const placetop1 = numberWithCommas(stats.placetop1);
    const matchesPlayed = numberWithCommas(stats.matchesplayed);
    const kills = numberWithCommas(stats.kills);
    document.querySelector(".playersOutlived").innerHTML = playersOutlived;
    document.querySelector(".score").innerHTML = score;
    document.querySelector(".placeTop1").innerHTML = placetop1;
    document.querySelector(".matchesPlayed").innerHTML = matchesPlayed;
    document.querySelector(".kills").innerHTML = kills;
}