import { fetchPosts } from "../../utils/fetchPosts";
import { sortPostsByDate } from "../../utils/sortPostsByDate";
import { addToFeed } from "../actions";

export const initiateFeed = (uid, following) => {
    return async (dispatch) => {
        try{
            let unsortedFeedArray = [];
             unsortedFeedArray = await fetchPosts(uid);
             if(following ){
                const followPosts = await Promise.all(following.map(async (id) => fetchPosts(id)));
                unsortedFeedArray = unsortedFeedArray.concat(...followPosts);
             }
             let sortedFeedArray = sortPostsByDate(unsortedFeedArray);
             dispatch(addToFeed(sortedFeedArray));
        }catch(e){
            console.log('Error', e.message);
        }
    }
}