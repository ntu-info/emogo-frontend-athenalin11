import { writeAsStringAsync, documentDirectory } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';
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

    const fileName = `emogo_exported_data.json`;
    const fileUri = documentDirectory + fileName;

    await writeAsStringAsync(fileUri, JSON.stringify(formattedData, null, 2));
    
    console.log('✅ 檔案已寫入:', fileUri);
    console.log('📄 檔案內容預覽:', JSON.stringify(formattedData, null, 2).substring(0, 500));

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/json',
        dialogTitle: '匯出 Emogo 資料',
        UTI: 'public.json'
      });
      console.log('✅ Data exported and shared successfully');
      return true;
    } else {
      console.log('⚠️ Sharing not available on this device');
      Alert.alert('提示', `資料已儲存到:\n${fileUri}\n\n請手動從裝置複製此檔案`);
      return false;
    }
  } catch (error) {
    console.error('❌ Error exporting data:', error);
    console.error('錯誤詳情:', error.message, error.stack);
    throw error;
  }
};

// 匯出個別資料類型
export const exportSentimentData = async () => {
  try {
    const records = getAllSentimentRecords();
    const fileName = `sentiment_data_${Date.now()}.json`;
    const fileUri = documentDirectory + fileName;

    await writeAsStringAsync(fileUri, JSON.stringify(records, null, 2));

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Error exporting sentiment data:', error);
    return false;
  }
};

export const exportVlogData = async () => {
  try {
    const records = getAllVlogRecords();
    const fileName = `vlog_data_${Date.now()}.json`;
    const fileUri = documentDirectory + fileName;

    await writeAsStringAsync(fileUri, JSON.stringify(records, null, 2));

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Error exporting vlog data:', error);
    return false;
  }
};

export const exportGpsData = async () => {
  try {
    const records = getAllGpsRecords();
    const fileName = `gps_data_${Date.now()}.json`;
    const fileUri = documentDirectory + fileName;

    await writeAsStringAsync(fileUri, JSON.stringify(records, null, 2));

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Error exporting GPS data:', error);
    return false;
  }
};
