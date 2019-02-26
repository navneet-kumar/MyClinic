import { Body, Button, Icon, Left, Right, Text, View } from "native-base";
import React from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import Constants from "./Constants";
import { positiveNegativeAlert } from "./Helpers";
import Styles from "./Style";

class DefaultHeader extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Left>
          <Text style={styles.settingsText}>{this.props.item.title}</Text>
        </Left>
        <Right style={{ flex: 0, flexDirection: "row" }}>
          {this.props.expanded ? (
            <Button transparent iconRight>
              <Icon name="eye" type="Entypo" style={Styles.iconStyle} />
            </Button>
          ) : (
            <Button transparent iconRight>
              <Icon
                name="eye-with-line"
                type="Entypo"
                style={Styles.iconStyle}
              />
            </Button>
          )}
          <Button
            transparent
            iconRight
            onPress={() => this.props.onEdit(this.props.item)}
          >
            <Icon name="pencil" type="EvilIcons" style={Styles.iconStyle} />
          </Button>
          <Button
            transparent
            iconRight
            onPress={() => {
              positiveNegativeAlert(
                'Are you sure you want to delete template "' +
                  this.props.item.title +
                  '" ?',
                "DELETE",
                "CANCEL",
                () => this.props.onDelete(this.props.item)
              );
            }}
          >
            <Icon
              name="trash"
              type="EvilIcons"
              style={[Styles.iconStyle, { color: Constants.theme_color_error }]}
            />
          </Button>
        </Right>
      </View>
    );
  }
}

class DefaultContent extends React.Component {
  render() {
    return (
      <Text
        style={[
          { padding: 10 },
          this.props.contentStyle
            ? this.props.contentStyle
            : { backgroundColor: "#fff" }
        ]}
      >
        {this.props.content}
      </Text>
    );
  }
}

class AccordionSubItem extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0.3)
  };
  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 500
    }).start();
  }
  render() {
    let { fadeAnim } = this.state;
    return (
      <Animated.View style={{ ...this.props.style, opacity: fadeAnim }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

class AccordionItem extends React.Component {
  render() {
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() => this.props.setSelected(this.props.index)}
        >
          <View>
            <DefaultHeader
              item={this.props.item}
              expanded={this.props.expanded}
              headerStyle={this.props.headerStyle}
              icon={this.props.icon}
              iconStyle={this.props.iconStyle}
              expandedIcon={this.props.expandedIcon}
              expandedIconStyle={this.props.expandedIconStyle}
              onEdit={this.props.onEdit}
              onDelete={this.props.onDelete}
            />
          </View>
        </TouchableWithoutFeedback>
        {this.props.expanded ? (
          <AccordionSubItem>
            {this.props.renderContent ? (
              this.props.renderContent(this.props.item)
            ) : (
              <DefaultContent
                content={this.props.item.content}
                contentStyle={this.props.contentStyle}
              />
            )}
          </AccordionSubItem>
        ) : null}
      </View>
    );
  }
}

export default class Accordion extends React.Component {
  state = { selected: undefined };
  setSelected(index) {
    if (this.state.selected === index) {
      this.setState({ selected: undefined });
    } else {
      this.setState({ selected: index });
    }
  }

  componentDidMount() {
    this.setState({ selected: this.props.expanded });
  }

  noItems() {
    return (
      <Body>
        <Text style={styles.settingsText}> No templates found </Text>
      </Body>
    );
  }

  render() {
    return (
      <FlatList
        data={this.props.dataArray}
        extraData={this.state}
        style={[
          {
            borderColor: "#d3d3d3",
            borderWidth: 0.5
          },
          this.props.style
        ]}
        keyExtractor={(item, index) => String(index)}
        ListEmptyComponent={this.noItems()}
        renderItem={({ item, index }) => (
          <AccordionItem
            key={String(index)}
            item={item}
            expanded={this.state.selected === index}
            index={index}
            setSelected={this.setSelected.bind(this)}
            headerStyle={this.props.headerStyle}
            contentStyle={this.props.contentStyle}
            renderContent={this.props.renderContent}
            icon={this.props.icon}
            iconStyle={this.props.iconStyle}
            expandedIcon={this.props.expandedIcon}
            expandedIconStyle={this.props.expandedIconStyle}
            onEdit={this.props.onEdit}
            onDelete={this.props.onDelete}
          />
        )}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  defaultHeader: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },
  settingsText: {
    color: Constants.theme_color
  }
});
