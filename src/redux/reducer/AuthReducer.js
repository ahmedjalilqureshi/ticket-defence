const initialState = {
  user: {},
  ticket: {},
  // user: { id: 1 },
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case "CLEAR_TICKET":
      return {
        ...state,
        ticket: {},
      };
    case "SET_IMAGE":
      return {
        ...state,
        ticket: { ...state.ticket, image:payload },
      };
    case "SET_IMAGE2":
      return {
        ...state,
        ticket: { ...state.ticket, image2: payload },
      };
    case "SET_IMAGE3":
      return {
        ...state,
        ticket: { ...state.ticket, image3: payload },
      };
    case "SET_IMAGE4":
      return {
        ...state,
        ticket: { ...state.ticket, image4: payload },
      };
    case "SET_IMAGE5":
      return {
        ...state,
        ticket: { ...state.ticket, image5: payload },
      };
    case "SET_IMAGE6":
      return {
        ...state,
        ticket: { ...state.ticket, image6: payload },
      };
    case "SET_LAWYER":
      return {
        ...state,
        ticket: { ...state.ticket, lawyer: payload },
      };
    case "SET_LICENSE_POINTS":
      return {
        ...state,
        ticket: { ...state.ticket, points: payload },
      };
    case "SET_LICENSE_POINTS2":
      return {
        ...state,
        ticket: { ...state.ticket, points2: payload },
      };
    case "SET_VIOLATION_TYPE":
      return {
        ...state,
        ticket: { ...state.ticket, violationType: payload },
      };
    case "SET_STATE":
      return {
        ...state,
        ticket: { ...state.ticket, state: payload },
      };
    case "USER":
      return {
        ...state,
        user: payload,
      };
    // case "SET_IMAGE":
    //   return {
    //     ...state,
    //     user: payload,
    //   };
    case "LOGOUT":
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
}
