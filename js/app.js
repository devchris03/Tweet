// asigna variables
const form = document.querySelector('#formulario');
const listTweet = document.querySelector('#listTweet');
let tweets = [];


// agrega variables
loadEvents()
function loadEvents() {
    form.addEventListener('submit', addTweet);

    listTweet.addEventListener('click', deletedTweet);

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets') || []);
        showTweets()
    })
}


// agrega los tweets
function addTweet(event) {
    event.preventDefault();

    const tweet = document.querySelector('#tweetText').value;

    // verifica si el tweet esta vacio o tiene solo espacios en blanco
    if(tweet.trim() == '') {
        const msg = 'Un tweet debe contener al menos un carácter válido, por favor intente de nuevo';
        showAlert(msg);
        return
    }

    const objTweet = {
        id: Date.now(),
        tweet,
    }

    tweets = [...tweets, objTweet];

    // resetea el formulario
    form.reset();

    showTweets();
}


// muestra los tweets agregados en el HTML
function showTweets() {
    cleanTweet();

    if(tweets.length > 0) {
        tweets.forEach(tweet => {
            const li = document.createElement('li');
            const deleted = document.createElement('a')

            deleted.classList.add('borrar');
            li.dataset.tweetId = tweet.id;

            deleted.textContent = 'x';
            li.textContent = tweet.tweet;


            li.appendChild(deleted)
            listTweet.appendChild(li);
        })
    }


    syncStrogare();
}

// accede a los datos del documento
function syncStrogare() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


// limpia la para actualizarla
function cleanTweet() {
    while(listTweet.firstChild) {
        listTweet.removeChild(listTweet.firstChild);
    }
}

// elimina tweet
function deletedTweet(event) {
    const id = event.target.parentElement.dataset.tweetId
    tweets = tweets.filter(tweet => tweet.id != id);
    showTweets()
}


// muestra alerta
function showAlert(msg) {
    const alert = document.createElement('p');
    alert.classList.add('error');
    alert.textContent = msg;

    const content = document.querySelector('#content');

    // verifica si ya existe una alerta
    const exist = content.querySelector('.error');
    if(!exist) {
        content.appendChild(alert)
    }

    // elimina alerta luego de mostarse por 3s
    setTimeout(() => {
        alert.remove()
    }, 3000)
    
}

