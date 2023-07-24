import {
  GET_EVENTS,
  SET_LOADING_EVENTS,
  SET_ERROR,
  GET_FIELD,
  SET_LOADING,
  SET_ERROR_FIELD,
  SET_PAY,
  SET_LOADING_PAY,
  SET_ERROR_PAY
} from '../actionTypes';
const url = `http://192.168.40.84:4001`
// const url = 'https://letseat-backend.herokuapp.com'

export const getAllEvents = (payload) => {
  return { type: GET_EVENTS, payload };
};

export const getFieldByPk = (payload) => {
  return { type: GET_FIELD, payload };
};

export const loadingEvents = (payload) => {
  return { type: SET_LOADING_EVENTS, payload };
};

export const errorEvents = (payload) => {
  return { type: SET_ERROR, payload };
};

export const loadingField = (payload) => {
  return { type: SET_LOADING, payload };
};

export const errorField = (payload) => {
  return { type: SET_ERROR_FIELD, payload };
};

export const setPay = (payload) => {
  return { type: SET_PAY, payload };
};

export const loadingPay = (payload) => {
  return { type: SET_LOADING_PAY, payload };
};

export const errorPay = (payload) => {
  return { type: SET_ERROR_PAY, payload };
};


export  const getEvent = () => {
  return (dispatch, getState) => {
    dispatch(loadingEvents(true));
    dispatch(errorEvents(null));
    fetch(url+'/events')
      .then((response) => {
        if (!response.ok) throw new Error('cannot fetch');
        return response.json();
      })
      .then((data) => {
        dispatch(getAllEvents(data));
      })
      .catch((error) => {
        dispatch(errorEvents(error));
      })
      .finally(() => {
        dispatch(loadingEvents(false));
      });
  };
}

export const detail = (id) => {
  return (dispatch) => {
    dispatch(loadingField(true));
    dispatch(errorField(null));
    fetch(url+'/event/'+id)
      .then((response) => {
        if (!response.ok) throw new Error('cannot fetch');
        return response.json();
      })
      .then((data) => {
        dispatch(getFieldByPk(data));
      })
      .catch((error) => {
        dispatch(errorField(error));
      })
      .finally(() => {
        console.log('finally');
        dispatch(loadingField(false));
      });
  }
}

export function createEvent({event_name, time, data, userId, fieldId}) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      fetch(url+"/event", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({event_name, time, data, userId, people: 10, fieldId})
    })
    .then((respon) => {
      if(!respon.ok) throw new Error ('gagal create event')
      return respon.json()
    })
    .then((data) => {
      console.log("create sukses:", data)
      dispatch(payment({eventId: data.id, fieldId}))
      resolve()
    })
    .catch((err) => {
      console.log(err);
      reject()
    });
    })
  }
}

export const payment = ({eventId, fieldId}) => {
  console.log('trigger:',{eventId, fieldId});
  return (dispatch) => {
    dispatch(loadingPay(true));
    dispatch(errorPay(null));
    fetch(url+"/payment", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({eventId, fieldId})
    })
    .then((respon) => {
      if(!respon.ok) throw new Error ('gagal pay')
      return respon.json()
    })
    .then((data) => {
      console.log(data);
      dispatch(setPay(data))
    })
    .catch((err) => {
      console.log(err);
    })
  }
}



