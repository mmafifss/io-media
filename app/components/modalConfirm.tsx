import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
import { imageRegistry } from "../utils/images";
import { DynamicButton } from "../components/button";
import { Box, CircularProgress, Typography } from "@mui/material";

interface IModalConfirm {
  title: string;
  textBody?: string;
  textBtn?: string;
  open: boolean;
  handleClose?: () => void;
  isError?: boolean;
  handleContinue?: () => any;
  type?: string;
  category?: string;
  image?: string;
  extraContent?: string[];
}

export const ModalConfirm = (props: IModalConfirm) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleContinue = async () => {
    if (props.handleContinue) {
      try {
        setIsLoading(true);
        await props.handleContinue();
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          minWidth: "574px",
          minHeight: "400px",
          textAlign: "center",
        },
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
          }}
        >
          <CircularProgress color="inherit" size="8rem" />
        </Box>
      ) : (
        <>
          <Image
            style={{
              width: "232px",
              height: "inherit",
              borderRadius: "0.4rem 0.4rem 0 0",
              objectFit: "cover",
              margin: "20px auto",
            }}
            src={imageRegistry.not_found}
            alt="foto sampul"
            width={300}
            height={300}
          ></Image>
          <DialogTitle style={{ fontSize: 24 }} id="alert-dialog-title">
            {props.title}
          </DialogTitle>
          <DialogContent sx={{ padding: "10px 10px", justifyItems: "center" }}>
            <DialogContentText
              sx={{ fontSize: 14 }}
              id="alert-dialog-description"
            >
              <Typography variant="body2" color="inherit">
                {props.textBody}
              </Typography>
            </DialogContentText>
            {props.extraContent && (
              <DialogContentText
                sx={{ maxWidth: 250, mt: 1 }}
                id="alert-dialog-description"
              >
                <ul>
                  {props.extraContent?.map((item: any, index) => (
                    <li key={index + 1}>
                      {props.category === "feature" ? (
                        <Typography variant="body2" color="inherit">
                          {item}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="inherit">
                          <span style={{ fontWeight: 400 }}>
                            {item.feature_name}
                          </span>{" "}
                          in{" "}
                          <span style={{ fontWeight: 500 }}>
                            {item.pricing_name}
                          </span>
                        </Typography>
                      )}
                    </li>
                  ))}
                </ul>
              </DialogContentText>
            )}
          </DialogContent>
          {props.type === "info" ? (
            <DialogActions sx={{ p: 2.5 }}>
              <DynamicButton
                text={props.textBtn ? props.textBtn : "Ok"}
                preset={props.isError ? "error" : "fillDarkGrey"}
                onClick={props.handleContinue}
                fullWidth
              />
            </DialogActions>
          ) : (
            <DialogActions
              sx={{ display: "flex", justifyContent: "space-between", p: 2.5 }}
            >
              <DynamicButton
                preset="outlineDarkGrey"
                text="Cancel"
                onClick={props.handleClose}
              />
              <DynamicButton
                text={isLoading ? "Loading..." : props.textBtn}
                preset={props.isError ? "error" : "fillDarkGrey"}
                onClick={handleContinue}
                disabled={isLoading} // Disable button while loading
              />
            </DialogActions>
          )}
        </>
      )}
    </Dialog>
  );
};
