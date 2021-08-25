export const searchService = { search: searchBooks }

function searchBooks(search) {
    const API_KEY = 'AIzaSyBj6uH299fNka4OlOEA05hitpszMFv3b1g';
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${API_KEY}`)
        .then(books => books.data.items)
}