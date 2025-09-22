import { useEffect, useState } from "react";
import { validateEmail } from "../../../../components/shared/utils/validators";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogTitle, Typography } from "@mui/material";
import Input from "../../../../components/shared/Input";
import CustomPrimaryButton from "../../../../components/shared/CustomPrimaryButton";
import { useDispatch } from "react-redux";
import { sendFriendInvitation } from "../../../../features/friends/friendsActions";
const AddFriendsDialog = ({ isDialogOpen, closeDialogHandler }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSendInvitation = () => {
    if (!isFormValid) return;

    dispatch(
      sendFriendInvitation({
        data: { targetMailAddress: email },
        closeDialogHandler: handleCloseDialog,
      })
    );
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
            Enter e-mail address of friend which you would like to invite
          </DialogContentText>
          <Input
            label="Email"
            type="text"
            value={email}
            setValue={setEmail}
            placeholder="Enter email address"
          />
        </DialogContent>
        <DialogActions>
          <CustomPrimaryButton
            onClick={handleSendInvitation}
            disabled={!isFormValid}
            label="Send"
            additionalStyles={{
              marginLeft: "15px",
              marginRight: "15px",
              marginBottom: "10px",
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddFriendsDialog;
