import * as FileSystem from 'expo-file-system';
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
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    console.log('📄 準備匯出檔案:', fileName);
    console.log('📁 暫存位置:', fileUri);

    // 寫入檔案到 app 的 document directory
    await FileSystem.writeAsStringAsync(fileUri, jsonContent);
    console.log('✅ 檔案已寫入暫存區');

    // 使用分享功能讓使用者選擇儲存位置（這樣不會有 deprecation 警告）
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/json',
        dialogTitle: '儲存資料檔案',
        UTI: 'public.json'
      });
      console.log('✅ 分享對話框已開啟');
      Alert.alert('✅ 成功', `資料已準備完成！\n請選擇儲存位置`);
      return true;
    } else {
      Alert.alert('❌ 錯誤', '此裝置不支援檔案分享功能');
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
