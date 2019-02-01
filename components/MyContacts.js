import { Icon, Item } from "native-base";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import Contacts from "react-native-contacts";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { isAndroid, ShowOkAlert, Warning } from "../components/Helpers";
import Constants from "./Constants";
import Styles from "./Style";

class MyContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      contacts: [],
      selectedItems: []
    };
  }
  componentWillMount() {
    this.setState({ contacts: this.getAllContacts() });
  }

  getAllContacts() {
    let getContacts = true;
    var contactList = [];

    if (isAndroid()) {
      if (
        Constants.permissions["android.permission.READ_CONTACTS"] !== "granted"
      ) {
        getContacts = false;
        ShowOkAlert(
          "Please allow us to read your contacts and help us give you a better experience."
        );
      }
    }

    if (getContacts) {
      Contacts.getAll((err, contacts) => {
        if (err) {
          Warning(err);
        } else if (contacts.length > 0) {
          for (var i in contacts) {
            try {
              contactList.push({
                id: contacts[i].recordID,
                name:
                  (contacts[i].givenName || "") +
                  " " +
                  (contacts[i].familyName || ""),
                number: contacts[i].phoneNumbers[0].number
              });
            } catch (err) {
              Warning(err);
            }
          }
        }
      });
    }
    this.setState({ isLoading: false });
    return contactList;
  }

  render() {
    const { selectedItems } = this.state;
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
        />
      </Item>
    );
  }
}

export default MyContacts;
