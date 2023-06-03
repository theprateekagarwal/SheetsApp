import React, {useEffect, useState } from 'react'; 
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native'; 
import Navbar from '../components/Navbar'; 
import Table from '../components/Table';  
import exportToExcel from '../utils/excelUtils'; 
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const HomeScreen = () => { 
  const [data, setData] = useState(Array(50).fill(''));  
  const handleDownload = () => { 
    console.log("12131321321321");
    console.log(data);
   
    exportToExcel(data);
   
  }; 
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });
  useEffect(()=> {
    try{
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      },
    );
    return () => subscription?.remove();
    }
    catch(e){
      console.error('Error setting  Dimensions:', e);
    }
  });
  let props = {
    data:data,
    setData:setData,
    dimensions:dimensions
    }
  return ( 
    <SafeAreaView style={styles.container}> 
      
      <Navbar onDownload={handleDownload} /> 
      <Table {...props}/>
      {/* <Grid />  */}
    </SafeAreaView> 
  ); 
}; 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
  }, 
}); 
export default HomeScreen;