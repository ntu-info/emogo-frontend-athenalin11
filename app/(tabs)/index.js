import { View, Text, Button, StyleSheet, ScrollView, Alert } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { initDatabase, getAllSentimentRecords, getAllVlogRecords, getAllGpsRecords } from "../../utils/database";
import { requestNotificationPermissions, scheduleDailyNotifications } from "../../utils/notifications";

export default function HomeScreen() {
  const [stats, setStats] = useState({
    sentimentCount: 0,
    vlogCount: 0,
    gpsCount: 0,
  });

  useEffect(() => {
    // 初始化資料庫
    initDatabase();
    
    // 請求通知權限並設定每日提醒
    setupNotifications();
    
    // 載入統計資料
    loadStats();
  }, []);

  const setupNotifications = async () => {
    const granted = await requestNotificationPermissions();
    if (granted) {
      await scheduleDailyNotifications();
    }
  };

  const loadStats = () => {
    const sentiments = getAllSentimentRecords();
    const vlogs = getAllVlogRecords();
    const gps = getAllGpsRecords();

    setStats({
      sentimentCount: sentiments.length,
      vlogCount: vlogs.length,
      gpsCount: gps.length,
    });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>📊 Emogo</Text>
        <Text style={styles.subtitle}>Experience Sampling App</Text>

        {/* 統計資料卡片 */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>📈 目前記錄數</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.sentimentCount}</Text>
              <Text style={styles.statLabel}>情緒問卷</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.vlogCount}</Text>
              <Text style={styles.statLabel}>影片記錄</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.gpsCount}</Text>
              <Text style={styles.statLabel}>位置記錄</Text>
            </View>
          </View>
        </View>

        {/* 功能按鈕 */}
        <View style={styles.buttonContainer}>
          <Link href="/record" asChild>
            <Button title="📝 開始新記錄" color="#4CAF50" />
          </Link>
          
          <View style={styles.spacing} />
          
          <Link href="/history" asChild>
            <Button title="📚 查看歷史記錄" color="#2196F3" />
          </Link>

          <View style={styles.spacing} />

          <Link href="/(tabs)/settings" asChild>
            <Button title="⚙️ 設定" color="#9E9E9E" />
          </Link>
        </View>

        {/* 提示訊息 */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 每天會在 10:00、15:00、20:00 收到提醒通知
          </Text>
          <Text style={styles.infoText}>
            📱 點擊「開始新記錄」來記錄心情、拍攝影片和位置
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  statsCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  spacing: {
    height: 12,
  },
  infoBox: {
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#1976D2",
    marginBottom: 8,
    lineHeight: 20,
  },
});
