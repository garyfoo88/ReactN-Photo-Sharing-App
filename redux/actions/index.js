import { auth, db } from "../../firebase";
import {
  CLEAR_DATA,
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_STATE_CHANGE,
} from "../constants";

export function clearData() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_DATA,
    });
  };
}

export function fetchUser() {
  return (dispatch) => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({
            type: USER_STATE_CHANGE,
            currentUser: snapshot.data(),
          });
        } else {
          console.log("does not exist");
        }
      });
  };
}

export function fetchUserPosts() {
  return (dispatch) => {
    db.collection("posts")
      .doc(auth.currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;

          return { id, ...data };
        });
        dispatch({
          type: USER_POSTS_STATE_CHANGE,
          posts,
        });
      });
  };
}

export function fetchUserFollowing() {
  return (dispatch) => {
    db.collection("following")
      .doc(auth.currentUser.uid)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        let following = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        dispatch({
          type: USER_FOLLOWING_STATE_CHANGE,
          following,
        });
        for (let i = 0; i < following.length; i++) {
          dispatch(fetchUsersData(following[i], true));
        }
      });
  };
}

export function fetchUsersData(uid, getPosts) {
  return (dispatch, getState) => {
    const found = getState().usersState.users.some((el) => el.uid === uid);
    if (!found) {
      db.collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let user = snapshot.data();
            user.uid = snapshot.id;
            dispatch({
              type: USERS_DATA_STATE_CHANGE,
              user,
            });
            dispatch(fetchUsersFollowingPosts(user.uid));
          } else {
            console.log("does not exist");
          }
        });
        if (getPosts) {
          dispatch(fetchUsersFollowingPosts(uid));
        }
    }
  };
}

export function fetchUsersFollowingPosts(uid) {
  return (dispatch, getState) => {
    db.collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        //console.log(snapshot.query._delegate._query.path.segments[1])

        const uid = snapshot.query._delegate._query.path.segments[1];

        const user = getState().usersState.users.find((el) => el.uid === uid);

        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data, user };
        });
        dispatch({
          type: USERS_POSTS_STATE_CHANGE,
          posts,
          uid,
        });
      });
  };
}
