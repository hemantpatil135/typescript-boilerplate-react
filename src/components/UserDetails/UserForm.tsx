import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createUser, updateUser } from "../../slices/userSlice";

const UserForm: React.FC = () => {
  const { userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isEdit, users } = useAppSelector((state) => state.userDetails);

  useEffect(() => {
    const existing = isEdit && userId ? users.find((u) => u.id === Number(userId)) : undefined;
    setName(existing?.name ?? "");
    setEmail(existing?.email ?? "");
  }, [userId, isEdit, users]);

  const handleSubmit = async () => {
    const action =
      isEdit && userId
        ? updateUser({ id: Number(userId), name, email })
        : createUser({ name, email });
    // unwrap() throws on a rejected request, so we only navigate on success.
    await dispatch(action).unwrap();
    navigate("/users");
  };

  return (
    <Box>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">
        {isEdit ? "Update User" : "Add User"}
      </Button>
    </Box>
  );
};

export default UserForm;
