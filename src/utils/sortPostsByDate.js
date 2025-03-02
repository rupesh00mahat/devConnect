export const sortPostsByDate = (posts) => {
    let sortedPosts = posts.sort((a,b)=> {
        if(a.seconds === b.seconds){
            return b.nanoseconds - a.nanoseconds;
        }
        return b.seconds - a.seconds;
    })
    return sortedPosts.reverse();
}