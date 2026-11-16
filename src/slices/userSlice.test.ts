import reducer, {
  createUser,
  fetchUsers,
  initialState,
  removeUser,
  setIsEdit,
  updateUser,
} from "./userSlice";
import { User } from "../models/userModels";

const john: User = { id: 1, name: "John", email: "john@gmail.com" };
const andy: User = { id: 2, name: "Andy", email: "andy@gmail.com" };
const withUsers = { ...initialState, users: [john, andy] };

describe("userSlice", () => {
  it("tracks loading, success and failure for fetchUsers", () => {
    const loading = reducer(initialState, { type: fetchUsers.pending.type });
    expect(loading.status).toBe("loading");

    const loaded = reducer(loading, { type: fetchUsers.fulfilled.type, payload: [john] });
    expect(loaded).toMatchObject({ status: "succeeded", users: [john] });

    const failed = reducer(loading, {
      type: fetchUsers.rejected.type,
      error: { message: "Network Error" },
    });
    expect(failed).toMatchObject({ status: "failed", error: "Network Error" });
  });

  it("adds, updates and removes users from fulfilled thunks", () => {
    const added = reducer(initialState, { type: createUser.fulfilled.type, payload: john });
    expect(added.users).toEqual([john]);

    const renamed = { ...john, name: "Johnny" };
    const updated = reducer(withUsers, { type: updateUser.fulfilled.type, payload: renamed });
    expect(updated.users).toEqual([renamed, andy]);

    const removed = reducer(withUsers, { type: removeUser.fulfilled.type, payload: 1 });
    expect(removed.users).toEqual([andy]);
  });

  it("records an error when a mutation fails", () => {
    const state = reducer(withUsers, {
      type: removeUser.rejected.type,
      error: { message: "Request failed with status code 404" },
    });
    expect(state.error).toBe("Request failed with status code 404");
    expect(state.users).toHaveLength(2);
  });

  it("toggles edit mode", () => {
    expect(reducer(initialState, setIsEdit(true)).isEdit).toBe(true);
  });
});
