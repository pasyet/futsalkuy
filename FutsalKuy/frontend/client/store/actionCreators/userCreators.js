import { storeData, storeUserId } from '../../lib/asyncStorage';
import {
  SET_USER,
  SET_ERROR, 
  SET_LOADING,
  GET_PARTICIPANT,
  SET_LOADING_PARTICIPANT,
  SET_ERROR_PARTICIPANT
} from '../actionTypes'
import { detail } from './mainCreators';
// const url = 'https://letseat-backend.herokuapp.com'
const url = `http://192.168.40.84:4001`
let user_data
export const setUser = (payload) => {
  return { type: SET_USER, payload };
};
export const setLoading = (payload) => {
  return { type: SET_LOADING, payload}
}
export const setError = (payload) => {
  return { type: SET_ERROR, payload };
};
export const getParticipant = (payload) => {
  return { type: GET_PARTICIPANT, payload };
};
export const loadingParticipant = (payload) => {
  return { type: SET_LOADING_PARTICIPANT, payload}
}
export const errorParticipant = (payload) => {
  return { type: SET_ERROR_PARTICIPANT, payload };
};


export function registerClient({username, email, password, phoneNumber, address}) {
  return () => {
    console.log(username, email, password, phoneNumber, address);
    return new Promise((resolve, reject) => {
      fetch(url+"/register", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, email, password, phoneNumber, address, profilePic: ''})
    })
    .then((respon) => {
      if(!respon.ok) throw new Error ('gagal fetch')
      return respon.json()
    })
    .then((data) => {
      console.log(data)
      resolve()
    })
    .catch((err) => {
      console.log(err);
      reject()
    });
    })
  }
}

export const loginClient = ({email, password}) => {
  
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      console.log('cek pro:',email,password);
      fetch(url+"/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
      })
      .then((respon) => {
        if(!respon.ok) throw new Error ('gagal fetch')
        return respon.json()
      })
      .then((data) => {
        user_data = data
      })
      .then(() => {
        storeData(user_data)
        .then(() => {
          console.log("data log:",user_data);
          dispatch(profilClient({access_token: user_data.access_token, UserId: user_data.id}))
        })
        resolve()
      })
      .catch((err) => {
        console.log("error:",err);
        dispatch({ type: SET_ERROR, err})
        reject()
      })
    })
  }
}
export const profilClient = ({access_token, UserId}) => {
  console.log('trigger:',access_token, UserId);
  return (dispatch) => {
    
      dispatch(setLoading(true));
      dispatch(setError(null));
      fetch(url+"/profile/"+ UserId, {
        headers: { 
          'Content-Type': 'application/json',
          'access_token': access_token
        }
      })
      .then((respon) => {
        if(!respon.ok) throw new Error ('gagal fetch')
        return respon.json()
      })
      .then((data) => {
        console.log(data.userId);
        dispatch(setUser(data.userId))
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: SET_ERROR, err})

      })
    
  }
}

export function editProfilClient({username, email, phoneNumber, address, UserId}) {
  return () => {
    console.log(username, email, phoneNumber, address);
    return new Promise((resolve, reject) => {
      fetch(url+"/profile/"+ UserId, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, email, phoneNumber, address})
    })
    .then((respon) => {
      if(!respon.ok) throw new Error ('gagal update profil')
      return respon.json()
    })
    .then(() => {
      console.log('Register Sukses')
      resolve()
    })
    .catch((err) => {
      console.log(err);
      reject()
    });
    })
  }
}

export function participantPost({eventId, userId}) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      fetch(url+"/participant", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({eventId, userId, role: 'Partisipant'})
    })
    .then((respon) => {
      if(!respon.ok) throw new Error ('gagal post partisipant')
      return respon.json()
    })
    .then(() => {
      console.log('Detail Partipant Updated')
      dispatch(detail(eventId))
    })
    .then(() => {
      console.log('Profil Updated')
      dispatch(profilClient({access_token: user_data.access_token, UserId: user_data.id}))
      resolve()
    })
    .catch((err) => {
      console.log(err)
      reject()
    })
    })
  }
}


export  const getParticipantJoin = () => {
  return (dispatch, getState) => {
    dispatch(loadingParticipant(true));
    dispatch(errorParticipant(null));
    fetch(url+'/participants')
      .then((response) => {
        if (!response.ok) throw new Error('cannot fetch');
        return response.json();
      })
      .then((data) => {
        console.log(data, 'data participant')
        dispatch(getParticipant(data));
      })
      .catch((error) => {
        dispatch(errorParticipant(error));
      })
      .finally(() => {
        dispatch(loadingParticipant(false));
      });
  };
}





