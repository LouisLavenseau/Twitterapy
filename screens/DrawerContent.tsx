import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, Caption, Paragraph, Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AuthContext } from "../components/Context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import displayCounts from "../components/DisplayCounts";
import ProfileImage from "../components/ProfileImage";
import { useEffect } from "react";

export default function DrawerContent(props: any) {
  const { returnAccount, signOut } = React.useContext(AuthContext);
  const [user, setUser] = React.useState("john doe");

  useEffect(() => {
    if (returnAccount.profileImage == "../assets/images/profile.svg")
      setUser("john doe");
    else setUser("real user");
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
              }}
            >
              <ProfileImage
                source={returnAccount.profileImage}
                user={user}
                size={53}
                style={{ top: 10 }}
              ></ProfileImage>
              <View
                style={{
                  width: 150,
                  marginLeft: 15,
                  flexDirection: "column",
                }}
              >
                <Title style={styles.title}>{returnAccount.name}</Title>
                <Caption style={styles.caption}>
                  @{returnAccount.userName}
                </Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {displayCounts(returnAccount.friendsCount)}
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {displayCounts(returnAccount.followersCount)}
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="My profile"
              onPress={() => {
                props.navigation.navigate("MyProfile");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="More">
            <DrawerItem
              label="About us"
              labelStyle={{
                color: "black",
              }}
              onPress={() => {
                props.navigation.navigate("AboutUs");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopWidth: 0.5,
    borderTopColor: "#dfdfdf",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },

  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  userInfoSection: {
    paddingLeft: 20,
  },

  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
});
