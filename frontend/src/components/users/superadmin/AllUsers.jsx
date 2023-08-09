import { useState, useEffect } from "react";
import { getAllUsers, deleteUser, reset } from "./../../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import UpdateUserForm from "./UpdateUserForm";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

let userToEdit;
export default function AllUsers() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);


  const handleClickOpen = (person) => {
    userToEdit = person;
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(reset())
  };

  const handleDelete = (email) => {
    dispatch(deleteUser({ email }));
  };

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const handleGetUser = async () => {
      const data = await dispatch(getAllUsers());
      setAllUsers(data.payload);
    };
    handleGetUser();
  }, [dispatch, isSuccess, isError, message, user]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("User Updated successfully");
    }
    dispatch(reset())
  }, [isError, isSuccess, message, dispatch]);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {allUsers.map((person, index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5">
          <div className="flex gap-x-4">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <Link to="">
                  {person.firstName} {person.lastName}
                </Link>
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                Email: {person.email}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                Type: {person.user_type ? person.user_type : "None"}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <p className="mt-1 text-xs leading-3 text-gray-500">
              <Button
                onClick={() => handleClickOpen(person)}
                sx={{ marginRight: "10px" }}
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
              >
                Edit
              </Button>

              <Button
                onClick={() => {
                  handleDelete(person.email);
                }}
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </p>
          </div>
        </li>
      ))}
      <div style={{ width: "900px" }}>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle className="text-center bg-teal-700 text-white">
            Update User info
          </DialogTitle>
          <DialogContent>
            <UpdateUserForm userToEdit={userToEdit} handleClose={handleClose} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ul>
  );
}
