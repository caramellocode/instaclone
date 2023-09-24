let instaposts = [ 
    {
        "name": "Tagesschau",
        "comments": [],
        "image": "img/1.png",
        "icon": "img/faficon1.png"
    },
    {
        "name": "Michaela Schmitt",
        "comments": ['Tolles Wetter und zeit zum chillen'],
        "image": "img/2.png",
        "icon": "img/faficon1.png"
    },
    {
        "name": "Marcello Caramello",
        "comments": [' 😊Tolles Wetter und gute Wander-Routen', ' München ist eine schöne Stadt'],
        "image": "img/3.png",
        "icon": "img/faficon1.png"
    },
   
   
    {
        "name": "Michaela Schmitt",
        "comments": ['Tolles Wetter und gute Wander-Routen', 'München ist eine schöne Stadt'],
        "image": "img/16.png",
        "icon": "img/faficon1.png"
    },
    {
        "name": "Michaela Schmitt",
        "comments": ['Lost in a Boad " jetzt Streamen" '],
        "image": "img/8.png",
        "icon": "img/faficon1.png"
    },
    {
        "name": "Sommer 2088",
        "population": 18.1,
        "comments": ['Tolles Wetter und gute Wander-Routen', 'Die Gasmaske sitzt'],
        "image": "img/6.png",
        "icon": "img/faficon1.png",
    },
    {
        "name": "Unicorn Live",
        "population": 18.1,
        "comments": ['Wir lieben Einhörner'],
        "image": "img/12.png",
        "icon": "img/faficon1.png",
    },
    {
        "name": "Blonde Wiking",
        "population": 18.1,
        "comments": ['New Wiking Movie comming soon...'],
        "image": "img/4.png",
        "icon": "img/faficon1.png",
    },
    {
        "name": "Der NerCyborg der Jäger",
        "population": 18.1,
        "comments": ['Neue Käfer Rasse entdeckt'],
        "image": "img/11.png",
        "icon": "img/faficon1.png"
    },
    {
        "name": "Der Nerd Käfer",
        "population": 18.1,
        "comments": ['Neue Käfer Rasse entdeckt'],
        "image": "img/15.png",
        "icon": "img/faficon1.png",
    }, {
        "name": "Der Cyborg Jäger",
        "population": 18.1,
        "comments": ['Angriff der ciborgs jetzt im Kino'],
        "image": "img/14.png",
        "icon": "img/faficon1.png"
    },
    
    
    
];
if (localStorage.getItem('instaposts')) {
    instaposts = JSON.parse(localStorage.getItem('instaposts'));
}

function saveToLocalStorage() {
    localStorage.setItem('instaposts', JSON.stringify(instaposts));
}


function createPostHTML(post, i) {
    return `
        <div class="card">
            <div class="land">
                <img class="land-icon" src="${post.icon || 'img/default-icon.png'}" alt="Icon for ${post.name}" />
                <h2>${post.name}</h2>
            </div>
            <img class="land-image" src="${post.image || 'img/default-image.png'}" alt="${post.name}" />

            <div class="action-icons">
                <div class="left-icons">
                    <img class="icon" src="img/herz.png" alt="Like" onclick="incrementLikes(${i})">
                    <span id="likeCount${i}">0</span>
                    <img class="icon" src="img/plaudern.png" alt="Comment" onclick="focusInput(${i})">
                    <img class="icon" src="img/direktes-instagram.png" alt="Third icon">
                </div>
                <div class="right-icon">
                    <img class="icon" src="img/instagram-speichern.png" alt="Fourth icon">
                </div>
            </div>

            <div id="landcontent${i}" style="padding-left: 12px;"></div>
            <div style="display:none;" id="inputContainer${i}">
                <input type="text" id="input${i}" style="width:40%; margin-left: 12px;" placeholder="Add a comment...">
                <button onclick="addComment(${i})">Post</button>
            </div>
        </div>
    `;
}

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < instaposts.length; i++) {
        const post = instaposts[i];
        content.innerHTML += createPostHTML(post, i); 

        let landcontent = document.getElementById(`landcontent${i}`); 
        for (let j = 0; j < post.comments.length; j++) {
            const comment = post.comments[j];
            landcontent.innerHTML += `<div>${comment}</div>`;
        }
    }
}

function addComment(index) {
    let input = document.getElementById(`input${index}`);
    if (input.value.trim() !== "") { 
        instaposts[index]['comments'].push(input.value);

        let landcontent = document.getElementById(`landcontent${index}`);
        let newCommentDiv = document.createElement('div');
        newCommentDiv.innerHTML = '&nbsp;' + input.value; 
        landcontent.appendChild(newCommentDiv);
        
        input.value = '';
        saveToLocalStorage();
    }
}

function incrementLikes(index) {
    let likeCount = document.getElementById(`likeCount${index}`);
    let heartIcon = document.querySelector(`.icon[onclick="incrementLikes(${index})"]`);
    
    let currentLikes = parseInt(likeCount.innerText, 10);
    likeCount.innerText = currentLikes + 1;
    
    heartIcon.src = 'img/herz_rot.png';
    saveToLocalStorage();
}

function focusInput(index) {
    let inputContainer = document.getElementById(`inputContainer${index}`);
    let input = document.getElementById(`input${index}`);
    if (inputContainer.style.display === 'none' || inputContainer.style.display === '') {
        inputContainer.style.display = 'inline-block'; 
        input.focus();
    } else {
        inputContainer.style.display = 'none';
    }
}


