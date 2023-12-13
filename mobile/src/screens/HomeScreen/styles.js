import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    // marginBottom: 10,
    // justifyContent: 'space-between',
    // padding: 10,
  },
  button: {
    backgroundColor: '#3498db',
    margin: 10,
    // borderRadius: 30,
    // marginLeft: ,
    borderRadius: 20,
    height: 135,
    width: 164,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default styles;
