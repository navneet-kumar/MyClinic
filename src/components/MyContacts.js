import { Icon, Item, Text } from "native-base";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import Contacts from "react-native-contacts";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { isAndroid, ShowOkAlert, Warning } from "../components/Helpers";
import { getAllPatients, insertPatients } from "../Database";
import Patient from "../modal/Patient";
import Constants from "./Constants";
import Styles from "./Style";

class MyContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      contacts: []
    };
  }
  componentWillMount() {
    if (this.state.contacts.length === 0) {
      getAllPatients().then(patients => {
        this.setState({ isLoading: false, contacts: patients });
      });
    }
  }

  syncPhoneContacts() {
    this.setState({ isLoading: true });

    let isAllowedToReadContacts = true;
    let contactList = [];

    // check if permissions are granted to read contacts
    if (isAndroid()) {
      if (
        Constants.permissions["android.permission.READ_CONTACTS"] !== "granted"
      ) {
        isAllowedToReadContacts = false;
        ShowOkAlert(
          "Please allow us to read your contacts and help us give you a better experience."
        );
      }
    }

    // if allowed read the contacts and push it to database
    if (isAllowedToReadContacts) {
      Contacts.getAll((err, contacts) => {
        if (err) {
          Warning(err);
        } else if (contacts.length > 0) {
          for (var i in contacts) {
            try {
              let patient = new Patient();
              patient.id = contacts[i].recordID;
              patient.name =
                (contacts[i].givenName || "") +
                " " +
                (contacts[i].familyName || "");
              patient.mobile = contacts[i].phoneNumbers[0].number;
              contactList.push(patient);
            } catch (err) {
              Warning(err);
            }
          }
          insertPatients(contactList).then(count => {
            ShowOkAlert(count + " contacts synced successfully !");
          });
          this.setState({ isLoading: false, contacts: contactList });
        }
      });
    }
  }

  render() {
    return (
      <Item style={{ borderColor: "transparent" }}>
        <SectionedMultiSelect
          single={true}
          items={this.state.contacts}
          showDropDowns={true}
          hideConfirm={true}
          showDropDowns={false}
          loading={this.state.isLoading}
          uniqueKey="id"
          displayKey="name"
          searchPlaceholderText="Search patient ..."
          onSelectedItemsChange={() => {}}
          onSelectedItemObjectsChange={contact => {
            this.props.onContactSelected(contact[0]);
          }}
          itemFontFamily={Constants.font}
          selectToggleIconComponent={
            <Icon type="AntDesign" name="contacts" style={Styles.iconStyle} />
          }
          ref={SectionedMultiSelect =>
            (this._sectionedMultiSelect = SectionedMultiSelect)
          }
          colors={{
            selectToggleTextColor: Constants.theme_color,
            text: Constants.theme_color
          }}
          styles={{
            button: {
              backgroundColor: Constants.theme_color
            },
            subItemText: {
              color: Constants.theme_color
            }
          }}
          headerComponent={
            <Item
              style={{
                padding: 15,
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 99,
                borderColor: "transparent"
              }}
            >
              <TouchableOpacity
                onPress={() => this._sectionedMultiSelect._toggleSelector()}
              >
                <Icon
                  type="MaterialIcons"
                  name="cancel"
                  style={Styles.iconStyle}
                />
              </TouchableOpacity>
            </Item>
          }
          stickyFooterComponent={
            <Item
              style={{
                padding: 8,
                backgroundColor: Constants.theme_color,
                justifyContent: "center"
              }}
              onPress={() => {
                this._sectionedMultiSelect._toggleSelector();
                this.syncPhoneContacts();
              }}
            >
              <Icon
                type="MaterialIcons"
                name="sync"
                style={[
                  Styles.iconStyle,
                  { color: Constants.theme_compliment_color }
                ]}
              />
              <Text
                style={{
                  color: Constants.theme_compliment_color
                }}
              >
                sync contacts
              </Text>
            </Item>
          }
        />
      </Item>
    );
  }
}

export default MyContacts;
