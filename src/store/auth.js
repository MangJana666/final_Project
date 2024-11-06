import axios from "axios";
import Cookies from "js-cookie";
export default {
  namespaced: true,
  state() {
    return {
      token: null,
      tokenExpiration: null,
      userLogin: {},
      isLogin: false,
    };
  },
  mutations: {
    setToken(state, { idToken, expiresIn }) {
      state.token = idToken;
      state.tokenExpiration = expiresIn;
      Cookies.set("tokenExpirationDate", expiresIn);
      Cookies.set("jwt", idToken);
    },
    setUserLogin(state, { userData, loginStatus }) {
      state.userLogin = userData;
      state.isLogin = loginStatus;
    },
    setUserLogout(state) {
      state.token = null;
      state.userLogin = {};
      state.isLogin = false;
      state.tokenExpirationDate = null;
      Cookies.remove("jwt");
      Cookies.remove("tokenExpirationDate");
      Cookies.remove("UID");
    },
    setUserNew(state, payload) {
      state.users.push.payload;
    },
  },
  actions: {
    async getRegisterData({ commit, dispatch }, payload) {
      console.log(payload);
      const APIkey = `AIzaSyDOac1BsN7pYRz_jMooLoP03JGmAUpj34I`;
      const authUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
      try {
        const { data } = await axios.post(authUrl + APIkey, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });
        commit("setToken", {
          idToken: data.idToken,
          expiresIn:
            new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        });
        const newUserData = {
          userId: data.localId,
          fullname: payload.fullname,
          username: payload.username,
          email: payload.email,
        };
        Cookies.set("UID", newUserData.userId);
        await dispatch("addNewUser", newUserData);
      } catch (error) {
        console.log(error);
      }
    },
    async addNewUser({ commit, state }, payload) {
      console.log(payload);
      const userId = payload.userId;
      try {
        const { data } = await axios.post(
          `https://finalexamp-52cd8-default-rtdb.firebaseio.com/user.json?auth=${state.token}`,
          payload
        );
        commit("setUserLogin", { userData: payload, loginStatus: true });
      } catch (error) {
        console.log(error);
      }
    },
    async getLoginData({ commit, dispatch }, payload) {
      const APIkey = "AIzaSyDOac1BsN7pYRz_jMooLoP03JGmAUpj34I";
      const authUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
      try {
        const { data } = await axios.post(authUrl + APIkey, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });
        commit("setToken", {
          idToken: data.idToken,
          expiresIn:
            new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        });
        await dispatch("getUser", data.localId);
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser({ dispatch, rootState }, { id, updatedUser }) {
      try {
        const { data } = await axios.put(
          `https://finalexamp-52cd8-default-rtdb.firebaseio.com/user/${id}.json?auth=${rootState.auth.token}`,
          updatedUser
        );
        await dispatch("getUser", id);
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    },
    async getUser({ commit }, userId) {
      try {
        const response = await axios.get(
          `https://finalexamp-52cd8-default-rtdb.firebaseio.com/user/${userId}.json`
        );
        if (response.data) {
          commit("setUserLogin", {
            userData: response.data,
            loginStatus: true,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    // async getUser({ commit }, payload) {
    //   try {
    //     const { data } = await axios.get(
    //       `https://finalexamp-52cd8-default-rtdb.firebaseio.com/user.json`
    //     );
    //     console.log({ data, payload });
    //     for (let key in data) {
    //       if (data[key].userId === payload) {
    //         Cookies.set("UID", data[key].userId);
    //         commit("setUserLogin", { userData: data[key], loginStatus: true });
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async updateUser({ dispatch, rootState }, { userId, updateUser }) {
    //   try {
    //     const { data } = await axios.patch(
    //       `https://finalexamp-52cd8-default-rtdb.firebaseio.com/user/${userId}.json?auth=${rootState.auth.token}`,
    //       updateUser
    //     );
    //     await dispatch("getUser", userId);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
};
