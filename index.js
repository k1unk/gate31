let posts = []
const LIMIT = 7
const URL = `https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=${LIMIT}`

let fetchData = async () => {
    let response = await fetch(URL);
    let postsJSON = await response.json();
    postsJSON.map(p => {
        p.selected = false
        posts.push(p)
    })
    const urlParams = new URLSearchParams(window.location.search);
    let filteredPosts = filterPosts(urlParams.get('searchQuery'))
    showPosts(filteredPosts)
}

let filterPosts = (searchValue) => {
    if (!searchValue) return posts
    else return posts.filter(p =>
        p.title.toLowerCase().includes(searchValue.toLowerCase()))
}

let showPosts = (postsToShow) => {
    document.getElementById('posts').innerHTML = ''
    if (postsToShow.length) {
        postsToShow.map(p => {
            let post = createPost(p)
            document.getElementById('posts').innerHTML += post
        })
    } else {
        document.getElementById('posts').innerHTML += `<p>Постов не найдено</p>>`
    }

    let allPosts = document.querySelectorAll('.post');
    allPosts.forEach(function (post, index) {
        let p = post.getElementsByClassName(`checkbox`)[0]
        p.addEventListener('click', function (event) {

            if (event.currentTarget.checked) {
                post.classList.add('post__selected')
                posts[index].selected = true
            } else {
                post.classList.remove('post__selected')
                posts[index].selected = false
            }
        });
    });

}

let createPost = (post) => {
    let checked = post.selected ? 'checked' : ''
    let postClass = post.selected ? `class="post post__selected"` : 'class="post"'
    return `
        <div ${postClass}>
            <div class="title">${post.title}</div>
            <div class="body">${post.body}</div>
            <input ${checked} class="checkbox" type="checkbox">
        </div>`;
}

let search = () => {
    let searchValue = document.getElementById('search').value

    if (searchValue) {
        window.history.pushState("", "",
            `${window.location.href.split('?')[0]}?searchQuery=${searchValue}`);
    } else {
        window.history.pushState("", "",
            `${window.location.href.split('?')[0]}`);
    }
    let filteredPosts = filterPosts(searchValue)
    showPosts(filteredPosts)
}

fetchData()
