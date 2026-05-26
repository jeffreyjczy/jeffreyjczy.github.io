var character = [
    { value: "1", name: "Jeffrey Zhi Yee Chong", faculty: 'Science & Technology', facultyValue:'scitech' , rating: 3.4, reviews: "very good instructor, easy to understand", picture: "https://i.zoomtventertainment.com/story/pjimage_86_10.jpg?tr=w-1200,h-900" },
    { value: "2", name: "John Cena", faculty: 'School of Arts', facultyValue:'arts', rating: 2.5, reviews: "not really good discipline, gets angry easily", picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/John_Cena_July_2018.jpg/1200px-John_Cena_July_2018.jpg" },
    { value: "3", name: "Abraham Lincoln", faculty: 'School of Law', facultyValue: 'law', rating: 4.3, reviews: "Very friendly, provide less work and more activities", picture: "https://www.biography.com/.image/t_share/MTU5MDUzMTE0Mzk2MTI0OTUy/abraham-lincoln-1809---18652c-sixteenth-president-of-the-united-states-of-america-photo-by-stock-montagestock-montagegetty-images_promo.jpg" },
    { value: "4", name: "Albert Einstein", faculty: 'School of Buisness', facultyValue:'busi', rating: 4.9, reviews: "Perfect, best instructor in the school", picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/1536px-Albert_Einstein_Head.jpg" }
]

const charactersList = document.getElementById('charactersList');
const searchbar = document.getElementById("searchBar");

var facultyValue = "";

function facultyFilter(value) {
    facultyValue = value;
    const filteredCharacters = character.filter(character => {

        if (facultyValue == "all") {
            return {};
        }
        else {
            return character.facultyValue == facultyValue;
        }
    })
    displayCharacters(filteredCharacters);

}

console.log(searchBar);
searchbar.addEventListener('keyup', (e) => {
    const searchString = e.target.value;

    const filteredCharacters = character.filter(character => {

        if (facultyValue == "all") {
            return character.name.toLowerCase().includes(searchString);
        }
        else {
            return character.name.toLowerCase().includes(searchString) && character.facultyValue == facultyValue;
        }
        
    })
    displayCharacters(filteredCharacters);
});

const displayCharacters = (characters) => {
    const htmlString = characters.map((character) => {
        return `
            <li class="character">  
                <a href="profile" onclick="location.href=this.href+${character.value}+'.html';return false;">
                    <name>${character.name}</name>
                    <p>Faculty: ${character.faculty}</p>
                    <img src="${character.picture}"></img>
                </a>
            </li>`;

    })
        .join('');
    charactersList.innerHTML = htmlString;

};

function renderProfile(value) {
    for (var i = 0; i < character.length; i++) {
        if (value == character[i].value) {
            $("#proname").html("" + character[i].name)
            $("#proFaculty").html("" + character[i].faculty)
            $("#proRating").html("" + character[i].rating)
            $("#proReview").html("" + character[i].reviews)

            break;
        }
    }
}

function updateProfile(value, rating, review) {
    $("#proRating").html("" + rating);
    $("#proReview").html("" + review);
}










