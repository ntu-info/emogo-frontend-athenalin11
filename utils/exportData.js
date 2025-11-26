import { StorageAccessFramework } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';
import { getAllSentimentRecords, getAllVlogRecords, getAllGpsRecords } from './database';

// 匯出所有資料為 JSON 檔案
export const exportAllData = async () => {
  try {
    console.log('📤 開始匯出資料...');
    
    const sentimentRecords = getAllSentimentRecords();
    const vlogRecords = getAllVlogRecords();
    const gpsRecords = getAllGpsRecords();

    console.log('📊 資料統計:', {
      sentiment: sentimentRecords.length,
      vlog: vlogRecords.length,
      gps: gpsRecords.length
    });

    // 轉換為作業要求的格式
    const formattedData = {
      sentiment_records: sentimentRecords.map(record => ({
        id: record.id,
        timestamp: record.timestamp,
        valence: record.valence,
        arousal: record.arousal,
        dominance: record.dominance,
        notes: record.notes || ''
      })),
      vlog_records: vlogRecords.map(record => ({
        id: record.id,
        timestamp: record.timestamp,
        video_path: record.video_uri,
        duration: record.duration
      })),
      gps_records: gpsRecords.map(record => ({
        id: record.id,
        timestamp: record.timestamp,
        latitude: record.latitude,
        longitude: record.longitude,
        accuracy: record.accuracy
      }))
    };

    const jsonContent = JSON.stringify(formattedData, null, 2);
    const fileName = 'emogo_exported_data.json';

    console.log('📄 準備匯出檔案:', fileName);

    if (Platform.OS === 'android') {
      // Android: 使用 SAF (Storage Access Framework) - 新 API，無 deprecation 警告
      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      
      if (!permissions.granted) {
        Alert.alert('需要權限', '請授予儲存權限以匯出資料');
        return false;
      }

      const fileUri = await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        fileName,
        'application/json'
      );

      await StorageAccessFramework.writeAsStringAsync(fileUri, jsonContent);
      
      console.log('✅ 檔案已寫入:', fileUri);
      Alert.alert('✅ 成功', `資料已匯出:\n${fileName}\n\n請在您選擇的資料夾中查看檔案`);
      return true;
    } else {
      // iOS or other platforms
      Alert.alert('提示', '目前僅支援 Android 平台');
      return false;
    }
  } catch (error) {
    console.error('❌ Error exporting data:', error);
    console.error('錯誤詳情:', error.message, error.stack);
    Alert.alert('❌ 匯出失敗', `錯誤: ${error.message}`);
    return false;
  }
};

// 匯出個別資料類型（簡化版）
export const exportSentimentData = async () => {
  console.log('使用主要匯出功能');
  return await exportAllData();
};

export const exportVlogData = async () => {
  console.log('使用主要匯出功能');
  return await exportAllData();
};

export const exportGpsData = async () => {
  console.log('使用主要匯出功能');
  return await exportAllData();
};
