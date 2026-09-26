// --global
MAX_CHARACTHER = 150;
timeout = 2000;
const URL = 'https://bytegrad.com/course-assets/js/1/api';


// --GET Element from HTML
const textAreaEL = document.querySelector('#textarea');
const formEL = document.querySelector('.form');
const charactherCounterEL = document.querySelector('.counter');
const submitbthEL = document.querySelector('.submit-btn');
const feedbackList = document.querySelector('.feedbacks');
const upVoteEL = document.querySelector('.upvote');








// Functions
const renderfeedback = (Enterfeeds) => {
    const feedbackItem = `
        <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${Enterfeeds.upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${Enterfeeds.badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${Enterfeeds.company}</p>
                <p class="feedback__text">${Enterfeeds.text}</p>
            </div>
            <p class="feedback__date">${Enterfeeds.daysAgo === 0 ? 'NEW' : `${Enterfeeds.daysAgo}d`}</p>
        </li>
    `;

    feedbackList.insertAdjacentHTML('beforeend', feedbackItem);
};

// handlerCountCharacther
function charactherHandler() {
    const textAreaELvalueLength = textAreaEL.value.length;
    const charactherLeft = MAX_CHARACTHER - textAreaELvalueLength;
    charactherCounterEL.textContent = charactherLeft;
};
// handlerCountCharacther
// remove class form
function changeClass(textCheck) {
    const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';
    formEL.classList.add(className);
    setTimeout(() => formEL.classList.remove(className), timeout);

};
// remove class form
// handler form input
function inputHandler() {
    // get textareavalue
    const textAreaELValue = textAreaEL.value;
    // condition input 
    if (textAreaELValue.includes('#') && textAreaELValue.length >= 5) {
        changeClass('valid');
        submitbthEL.blur();
        textAreaEL.value = "";
        charactherCounterEL.textContent = MAX_CHARACTHER;


    } else {
        changeClass('invalid');
        textAreaEL.focus();
        return;

    }
    // get element from html
    const hashtag = textAreaELValue.split(' ').find((word) => word.includes('#'));
    const companyName = hashtag.substring(1).toUpperCase();
    const badgeLetter = companyName.substring(0, 1);
    const vote = 0;
    const dayAgo = 0;

    const feeditemObject = {
        upvoteCount: vote,
        badgeLetter: badgeLetter,
        company: companyName,
        text: textAreaELValue,
        daysAgo: dayAgo
    }
    renderfeedback(feeditemObject);
    // send information to Server 
    fetch(`${URL}/feedbacks`, {
        method : 'POST',
        body : JSON.stringify(feeditemObject) ,
        headers : {
            Accept : 'Application/json',
            'content-type' : 'Application/json'
        }
    })




};
// handler form input



//Events
textAreaEL.addEventListener('input', charactherHandler);
formEL.addEventListener('submit', inputHandler);
// Get URL

fetch(`${URL}/feedbacks`)
    .then(Response => {
        return Response.json();
    })
    .then(data => {
        const feedbackapi = data.feedbacks;
        const spinerEL = document.querySelector('.spinner');
        feedbackapi.forEach(element => renderfeedback(element));
        spinerEL.remove();





    }).catch(error => console.log(error.message));









