import { faCircleNotch, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions";
import { getIsLoggingOut } from "../selectors";
import Button from "./Button";
import ButtonIcon from "./ButtonIcon";
import IconButton from "./IconButton";
import Modal from "./Modal";
import Section from "./Section";
import Title from "./Title";
import ToggleContent from "./ToggleContent";

const Settings = () => {
  const dispatch = useDispatch();
  const isLoggingOut = useSelector(getIsLoggingOut);

  return (
    <ToggleContent
      toggle={({ open }) => (
        <IconButton>
          <FontAwesomeIcon onClick={open} icon={faCog} />
        </IconButton>
      )}
      content={({ close }) => (
        <Modal close={close}>
          <Title>Hallo!</Title>
          <Section size="md">
            <p>Klik hieronder om uit te loggen.</p>
          </Section>
          <Button type="button" danger onClick={() => dispatch(logout())}>
            {" "}
            {isLoggingOut && (
              <ButtonIcon>
                <FontAwesomeIcon icon={faCircleNotch} spin />
              </ButtonIcon>
            )}
            Log uit
          </Button>
        </Modal>
      )}
    />
  );
};

export default Settings;
