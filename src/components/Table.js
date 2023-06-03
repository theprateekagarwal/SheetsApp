import React, {useCallback, useState, useEffect} from 'react';
import {SafeAreaView, View, Text, StyleSheet, TextInput, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

 
 Tdata =Array(50).fill('');
 const Table = (props) => {
  // const [data, setData] = useState(Array(50).fill(''));
  const ROWS = Array.from({length: 10}, (_, i) => i + 1); // 10 row
  const COLS = ['A', 'B', 'C', 'D', 'E']; // 5 columns
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('tableData');
        if (storedData !== null) {
          props.setData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  const storeData = async newData => {
    try {
      await AsyncStorage.setItem('tableData', JSON.stringify(newData));
    } catch (error) {
      console.error('Error storing data in AsyncStorage:', error);
    }
  };
  
  const getCellIndex = useCallback(
    (row, col) => {
      // return the index of the cell given its row and column
      return (row - 1) * COLS.length + col - 1;
    },
    [COLS.length],
  );

  const renderHeader = () => (
    <View style={styles.row}>
      <View style={[styles.cell, styles.header]} />
      {COLS.map(col => (
        <View key={col} style={[styles.cell, styles.header]}>
          <Text style={styles.colHeader}>{col}</Text>
        </View>
      ))}
    </View>
  );

  const renderRow = row => (
    <View key={row} style={styles.row}>
      <View style={[styles.cell, styles.header]}>
        <Text>{`${row}`}</Text>
      </View>
      {COLS.map(col => {
        const index = (row - 1) * COLS.length + COLS.indexOf(col);
        const value = props.data[index];
        return (
          <View key={col} style={styles.cell}>
            <TextInput
              style={styles.input}
              value={value}
              selectionColor="#1976d2"
              underlineColorAndroid="transparent"
              onChangeText={text => {
                const cellIndex = getCellIndex(row, COLS.indexOf(col) + 1);
                const newData = [...props.data];
                newData[cellIndex] = text;
                props.setData(newData);
                console.log(props.data);
                storeData(newData);
              }}
            />
          </View>
        );
      })}
    </View>
  );
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: props.dimensions.window.width,
      backgroundColor: 'white',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    title: {
      alignItems: 'center',
      backgroundColor: 'white',
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    table: {
      borderWidth: 0,
      borderColor: 'black',
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      borderWidth: 1,
      borderColor: 'black',
      paddingVertical: 0,
      paddingHorizontal: 4,
      justifyContent: 'center',
      alignItems: 'center',
      width: props.dimensions.window.width/6 - 10,
      height: props.dimensions.window.height/12 - 10,
    },
    header: {
      backgroundColor: 'lightgrey',
    },
    colHeader: {
      fontWeight: 'bold',
    },
    input: {
      color: 'black',
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
      width: '100%',
      height: '100%',
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
      </View>
      <View style={styles.table}>
        {renderHeader()}
        {ROWS.map(row => renderRow(row))}
      </View>
    </SafeAreaView>
  );
};



export default Table;
