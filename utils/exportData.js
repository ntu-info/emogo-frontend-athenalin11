import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { getAllSentimentRecords, getAllVlogRecords, getAllGpsRecords } from './database';

// 匯出所有資料為 JSON 檔案
export const exportAllData = async () => {
  try {
    const sentimentRecords = getAllSentimentRecords();
    const vlogRecords = getAllVlogRecords();
    const gpsRecords = getAllGpsRecords();

    const data = {
      exportDate: new Date().toISOString(),
      sentimentRecords,
      vlogRecords,
      gpsRecords,
      stats: {
        totalSentiment: sentimentRecords.length,
        totalVlogs: vlogRecords.length,
        totalGPS: gpsRecords.length,
      }
    };

    const fileName = `emogo_data_${Date.now()}.json`;
    const fileUri = FileSystem.documentDirectory + fileName;

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data, null, 2));

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
      console.log('✅ Data exported and shared successfully');
      return true;
    } else {
      console.log('⚠️ Sharing not available on this device');
      return false;
    }
  } catch (error) {
    console.error('❌ Error exporting data:', error);
    return false;
  }
};

// 匯出個別資料類型
export const exportSentimentData = async () => {
  try {
    const records = getAllSentimentRecords();
    const fileName = `sentiment_data_${Date.now()}.json`;
    const fileUri = FileSystem.documentDirectory + fileName;

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(records, null, 2));

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
    const fileUri = FileSystem.documentDirectory + fileName;

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(records, null, 2));

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
    const fileUri = FileSystem.documentDirectory + fileName;

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(records, null, 2));

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
