import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { useEagerConnect, useInactiveListener } from "../../../hooks";

// Mui
import { default as MuiAppBar } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Components
import DialogWalletOptions from "./DialogWalletOptions";

export default function AppBar() {
  const { activate, account, deactivate } = useWeb3React<Web3Provider>();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const [open, setOpen] = useState(false);

  const handleClose = (connector: AbstractConnector | undefined) => {
    if (connector) activate(connector);

    return setOpen(false);
  };

  return (
    <>
      <DialogWalletOptions open={open} onClose={handleClose} />
      <Box>
        <MuiAppBar position="static" color="inherit">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Arweave Social dApp
            </Typography>
            {!!account ? (
              <Button
                variant="contained"
                color="inherit"
                size="large"
                onClick={() => deactivate()}
              >
                Disconnect
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setOpen(true)}
              >
                Connect
              </Button>
            )}
          </Toolbar>
        </MuiAppBar>
      </Box>
    </>
  );
}