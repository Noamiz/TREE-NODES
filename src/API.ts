import { projectDatabase } from "./firebase/config.js";
// import generateId from "./utils/idGenerator";

const API = {
  async fetchTree() {
    const snapshot = await projectDatabase.ref().once("value");
    return snapshot.val();
  },

  setTree(data: any) {
    projectDatabase.ref().set(data, function (error) {
      if (error) {
        alert("Saving tree failed");
      } else {
        alert("Tree saved successfuly!");
      }
    });
  },
};

export default API;
