import { auth, db } from '../../firebase';
import { USER_STATE_CHANGE } from '../constants';

export function fetchUser() {
    return ((dispatch) => {
        db.collection("users").doc(auth.currentUser.uid).get().then((snapshot) => {
            if (snapshot.exists) {
                dispatch({
                    type: USER_STATE_CHANGE,
                    currentUser: snapshot.data()
                })
            } else {
                console.log('does not exist')
            }
        })
    })
}