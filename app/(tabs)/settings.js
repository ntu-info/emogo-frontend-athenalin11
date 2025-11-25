import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { exportAllData, exportSentimentData, exportVlogData, exportGpsData } from "../../utils/exportData";
import { clearAllData, getAllSentimentRecords, getAllVlogRecords, getAllGpsRecords } from "../../utils/database";
import { 
  scheduleDailyNotifications, 
  cancelAllNotifications, 
  sendTestNotification,
  getScheduledNotifications 
} from "../../utils/notifications";

export default function SettingsScreen() {
  const [stats, setStats] = useState({
    sentiment: 0,
    vlog: 0,
    gps: 0,
  });
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    loadStats();
    loadNotificationStatus();
  }, []);

  const loadStats = () => {
    setStats({
      sentiment: getAllSentimentRecords().length,
      vlog: getAllVlogRecords().length,
      gps: getAllGpsRecords().length,
    });
  };

  const loadNotificationStatus = async () => {
    const notifications = await getScheduledNotifications();
    setNotificationCount(notifications.length);
  };

  const handleExportAll = async () => {
    try {
      console.log('🔄 開始匯出流程...');
      const success = await exportAllData();
      if (success) {
        Alert.alert('✅ 成功', '資料已匯出並可分享\n\n檔案名稱: emogo_exported_data.json');
      } else {
        Alert.alert('⚠️ 提示', '分享功能不可用，但資料已儲存到裝置');
      }
    } catch (error) {
      console.error('匯出錯誤:', error);
      Alert.alert('❌ 失敗', `資料匯出失敗:\n${error.message}`);
    }
  };

  const handleExportSentiment = async () => {
    const success = await exportSentimentData();
    if (success) {
      Alert.alert('成功', '情緒問卷資料已匯出');
    }
  };

  const handleExportVlog = async () => {
    const success = await exportVlogData();
    if (success) {
      Alert.alert('成功', '影片資料已匯出');
    }
  };

  const handleExportGps = async () => {
    const success = await exportGpsData();
    if (success) {
      Alert.alert('成功', 'GPS 資料已匯出');
    }
  };

  const handleClearData = () => {
    Alert.alert(
      '確認刪除',
      '確定要刪除所有資料嗎？此操作無法復原。',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '刪除',
          style: 'destructive',
          onPress: () => {
            clearAllData();
            loadStats();
            Alert.alert('完成', '所有資料已刪除');
          },
        },
      ]
    );
  };

  const handleTestNotification = async () => {
    await sendTestNotification();
    Alert.alert('測試通知', '測試通知將在 2 秒後顯示');
  };

  const handleSetupNotifications = async () => {
    await scheduleDailyNotifications();
    await loadNotificationStatus();
    Alert.alert('完成', '已設定每日提醒（10:00、15:00、20:00）');
  };

  const handleCancelNotifications = async () => {
    await cancelAllNotifications();
    await loadNotificationStatus();
    Alert.alert('完成', '已取消所有通知');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>⚙️ 設定</Text>

        {/* 資料統計 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 資料統計</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>情緒問卷記錄</Text>
              <Text style={styles.statValue}>{stats.sentiment}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>影片記錄</Text>
              <Text style={styles.statValue}>{stats.vlog}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>GPS 記錄</Text>
              <Text style={styles.statValue}>{stats.gps}</Text>
            </View>
          </View>
        </View>

        {/* 資料匯出 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📤 資料匯出</Text>
          <TouchableOpacity style={styles.button} onPress={handleExportAll}>
            <Text style={styles.buttonText}>匯出所有資料</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary} onPress={handleExportSentiment}>
            <Text style={styles.buttonSecondaryText}>僅匯出情緒問卷</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary} onPress={handleExportVlog}>
            <Text style={styles.buttonSecondaryText}>僅匯出影片記錄</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary} onPress={handleExportGps}>
            <Text style={styles.buttonSecondaryText}>僅匯出 GPS 記錄</Text>
          </TouchableOpacity>
        </View>

        {/* 通知設定 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 通知設定</Text>
          <Text style={styles.infoText}>
            已排程通知: {notificationCount} 個
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleSetupNotifications}>
            <Text style={styles.buttonText}>設定每日提醒</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary} onPress={handleTestNotification}>
            <Text style={styles.buttonSecondaryText}>發送測試通知</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary} onPress={handleCancelNotifications}>
            <Text style={styles.buttonSecondaryText}>取消所有通知</Text>
          </TouchableOpacity>
        </View>

        {/* 危險區域 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ 危險區域</Text>
          <TouchableOpacity style={styles.dangerButton} onPress={handleClearData}>
            <Text style={styles.dangerButtonText}>刪除所有資料</Text>
          </TouchableOpacity>
        </View>

        {/* 關於 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ 關於</Text>
          <Text style={styles.aboutText}>Emogo - Experience Sampling App</Text>
          <Text style={styles.aboutText}>版本 1.0.0</Text>
          <Text style={styles.aboutText}>
            收集結構化與非結構化的主動/被動資料
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  section: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  statsContainer: {
    marginTop: 8,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonSecondary: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonSecondaryText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  dangerButton: {
    backgroundColor: "#F44336",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  dangerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});
