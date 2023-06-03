import XLSX from 'xlsx'; 
import * as FileSystem from 'expo-file-system'; 
import * as Sharing from 'expo-sharing'; 
 
const exportToExcel = async (arrayData) => { 
  const gridData = [];
  for (let i = 0; i < 10; i++) {
    gridData.push(arrayData.slice(i * 5, (i + 1) * 5));
  }
  const sheetData = gridData.map((row) => row.map((cell) => ({ v: cell }))); 
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData); 
  const workbook = XLSX.utils.book_new(); 
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); 
  const excelFile = XLSX.write(workbook, { 
    type: 'base64', 
    bookType: 'xlsx', 
  }); 
 
  const uri = FileSystem.cacheDirectory + 'grid.xlsx'; 
  await FileSystem.writeAsStringAsync(uri, excelFile, { 
    encoding: FileSystem.EncodingType.Base64, 
  }); 
 
  await Sharing.shareAsync(uri, { 
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
    dialogTitle: 'Download Data as an excel file', 
    UTI: 'com.microsoft.excel.xlsx', 
  }); 
}; 
 
export default exportToExcel;