import React, { useReducer } from "react";
import axios from "axios";
import { APIusers } from "../helpers/config";
export const userContext = React.createContext();

const INIT_STATE = {
  user: null,
  users: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "ALL_USERS":
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getAllUsers = async () => {
    try {
      let result = await axios(APIusers);
      dispatch({
        type: "ALL_USERS",
        payload: result.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const createAUser = async (email, username, uid, imageURL) => {
    let user = {
      username,
      email,
      uid,
      imageURL,
    };
    console.log(user)
    try {
      await axios.post(APIusers, user);
    } catch (e) {
      console.log(e);
    }
  };

  const getAUser = async (uid) => {
    try {
      let result = await axios(APIusers + "?uid=" + uid);
      dispatch({
        type: "SET_USER",
        payload: result.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  // const AddToUserFollowings = async (userId, following) => {
  //   try {
  //     let tempAPI = APIusers + userId;
  //     await axios.patch(tempAPI, { following });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const removeFromUsersFollowing = async (userId, following) => {
  //   try {
  //     let tempAPI = APIusers + userId;
  //     await axios.patch(tempAPI, { following });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <userContext.Provider
      value={{
        createAUser,
        // AddToUserFollowings,
        // removeFromUsersFollowing,
        getAUser,
        getAllUsers,
        username: state.user,
        users: state.users,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
