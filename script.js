const USE_PROXY = true;

const defaultSearchTerm = ""

const fallbackLocation = { latitude: 48.8575, longitude: 2.2982 }

let currentPhotoIndex = 0;

function assembleSearchURL (location, searchTerm = defaultSearchTerm){
    const proxy = "https://shrouded-mountain-15003.herokuapp.com/"
    return (USE_PROXY ? proxy: ``) + 
        `https://flickr.com/services/rest?` +
        `api_key=b34fa95989af5820cb1627033a5dce02&` +
        `format=json&` +
        `nojsoncallback=1&` +
        `method=flickr.photos.search&` +
        `safe_search=1&` +
        `per_page=5&` +
        `page=1&` +
        `text=${searchTerm}&` +
        `lat=${location.latitude}&` +
        `lon=${location.longitude}`
};

function assembleImageSourceURL (photoObj){
    return `https://farm${photoObj.farm}.staticflickr.com/` +
            `${photoObj.server}/` +
            `${photoObj.id} ${photoObj.secret}.jpg`
}

function constructImageURL (photoObj){
    return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}


var options = {
    enableHighAccuracy: true,
    maximumAge: 0 
};

function displayPhoto(location){
    let count = 0
    /*
    let nextButton = document.getElementById("next")
    nextButton.addEventListener("click", function(){
        let count = count + 1
    })
    console.log(count)
    */

   setInterval(function(){count++; console.log(count)}, 1000)
   
    const finalUrl = assembleSearchURL (location, searchTerm = defaultSearchTerm)
    
    
    fetch(finalUrl)
    .then(function(response){
        return response.json()
    })
    .then(function (response){
        const linkArr = []
        const imageURL = constructImageURL(response.photos.photo[0]);
        
        //console.log(imageURL)
        //console.log(response)
        //console.log(linkArr)
        
        for( let i = 0; i < 5; i++){
            linkArr.push(constructImageURL(response.photos.photo[i]))
        }
        
        let imageElement = document.createElement("img")
        imageElement.src = linkArr[count]
        document.getElementById("photoContainer").appendChild(imageElement)
        
        let a = document.createElement('a');
        let link = document.createTextNode("Flickr Link to Image");
        a.appendChild(link)
        a.title = "Flickr Link to Image"
        a.href = finalUrl
        document.body.appendChild(a)
        
        
    })
}

function success(pos){
    console.log(pos)
    displayPhoto(pos.coords)
}

function error(){
    displayPhoto(fallbackLocation)
}


navigator.geolocation.getCurrentPosition(success, error, options);
















