import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchUsers, removeUser, setIsEdit } from "../../slices/userSlice";

const UserList: React.FC = () => {
  const { users, status, error } = useAppSelector((state) => state.userDetails);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    dispatch(setIsEdit(false));
    navigate("/user/add");
  };

  const handleEdit = (userId: number) => {
    dispatch(setIsEdit(true));
    navigate(`/user/edit/${userId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Button onClick={handleAddUser} variant="outlined" color="success">
        Add User
      </Button>
      {status === "loading" && <CircularProgress size={24} sx={{ m: 2 }} />}
      {error && <Alert severity="error">{error}</Alert>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(({ id, name, email }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(id)} variant="outlined">
                  Edit
                </Button>
                <Button onClick={() => dispatch(removeUser(id))} variant="outlined" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
