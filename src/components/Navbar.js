import React from 'react'; 
import { View, Button, StyleSheet, StatusBar} from 'react-native'; 
 
const Navbar = ({ onDownload }) => { 
  return ( 
    <View style={styles.container}>
    <StatusBar backgroundColor={"#90ee90"} translucent={true} barStyle={'light-content'} />
    <View style={styles.container}> 
      <Button title="Download" onPress={onDownload} color={"green"} /> 
    </View>
    </View>
  ); 
}; 
 
const styles = StyleSheet.create({ 
  container: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'center', 
    paddingTop: 18,
    paddingBottom: 5,
    paddingEnd: 5
    // Add any other styles for the navbar container 
  }, 
}); 
 
export default Navbar;