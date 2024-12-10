// Define the function globally to make it accessible
window.getRandomCat = async function () {
    const response = await fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1");
    const data = await response.json();
    const cat = data[0];

    console.log(cat);

    // Dynamically update the HTML
    document.getElementById("cat-image").innerHTML = `
        <img src="${cat.url}" alt="Random Cat" style="max-width: 300px; display: block; margin: 15px auto;" />
        <p>Breed: ${cat.breeds.length > 0 ? cat.breeds[0].name : "Unknown"}</p>
    `;
};
