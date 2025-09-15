import { useEffect, useState } from "react";
import { validateEmail } from "../../../../components/shared/utils/validators";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogTitle, Typography } from "@mui/material";
import Input from "../../../../components/shared/Input";
const AddFriendsDialog = ({
  isDialogOpen,
  closeDialogHandler,
  sendFriendInvitaion = () => {},
}) => {
  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSendInvitation = () => {
    //send friend req to the server
  };

  const handleCloseDialog = () => {
    closeDialogHandler();
    setEmail("");
  };

  useEffect(() => {
    setIsFormValid(validateEmail(email));
  }, [email, setIsFormValid]);

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography>Invite a Friend</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Enter e-mail address of friend which you would like to invite
            </Typography>
          </DialogContentText>
          <Input
            label="Email"
            type="text"
            value={email}
            setValue={setEmail}
            placeholder="Enter email address"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFriendsDialog;
