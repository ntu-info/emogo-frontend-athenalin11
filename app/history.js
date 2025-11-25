import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { getAllSentimentRecords, getAllVlogRecords, getAllGpsRecords } from "../utils/database";

export default function HistoryScreen() {
  const [sentimentRecords, setSentimentRecords] = useState([]);
  const [vlogRecords, setVlogRecords] = useState([]);
  const [gpsRecords, setGpsRecords] = useState([]);
  const [activeTab, setActiveTab] = useState('sentiment');

  useEffect(() => {
    loadAllRecords();
  }, []);

  const loadAllRecords = () => {
    setSentimentRecords(getAllSentimentRecords());
    setVlogRecords(getAllVlogRecords());
    setGpsRecords(getAllGpsRecords());
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderSentimentRecords = () => {
    if (sentimentRecords.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>尚無情緒記錄</Text>
        </View>
      );
    }

    return sentimentRecords.map((record) => (
      <View key={record.id} style={styles.recordCard}>
        <Text style={styles.recordTime}>{formatDate(record.timestamp)}</Text>
        <View style={styles.recordContent}>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>😊 愉悅度:</Text>
            <Text style={styles.scoreValue}>{record.valence}/9</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>⚡ 激動度:</Text>
            <Text style={styles.scoreValue}>{record.arousal}/9</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>💪 主導度:</Text>
            <Text style={styles.scoreValue}>{record.dominance}/9</Text>
          </View>
          {record.notes && (
            <Text style={styles.notes}>📝 {record.notes}</Text>
          )}
        </View>
      </View>
    ));
  };

  const renderVlogRecords = () => {
    if (vlogRecords.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>尚無影片記錄</Text>
        </View>
      );
    }

    return vlogRecords.map((record) => (
      <View key={record.id} style={styles.recordCard}>
        <Text style={styles.recordTime}>{formatDate(record.timestamp)}</Text>
        <View style={styles.recordContent}>
          <Text style={styles.vlogInfo}>🎥 影片長度: {record.duration} 秒</Text>
          <Text style={styles.vlogPath} numberOfLines={1}>
            📁 {record.video_uri}
          </Text>
        </View>
      </View>
    ));
  };

  const renderGpsRecords = () => {
    if (gpsRecords.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>尚無位置記錄</Text>
        </View>
      );
    }

    return gpsRecords.map((record) => (
      <View key={record.id} style={styles.recordCard}>
        <Text style={styles.recordTime}>{formatDate(record.timestamp)}</Text>
        <View style={styles.recordContent}>
          <Text style={styles.gpsInfo}>
            📍 緯度: {record.latitude.toFixed(6)}
          </Text>
          <Text style={styles.gpsInfo}>
            📍 經度: {record.longitude.toFixed(6)}
          </Text>
          {record.accuracy && (
            <Text style={styles.gpsInfo}>
              🎯 精確度: ±{record.accuracy.toFixed(1)}m
            </Text>
          )}
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 歷史記錄</Text>
      </View>

      {/* 標籤選擇器 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'sentiment' && styles.tabActive]}
          onPress={() => setActiveTab('sentiment')}
        >
          <Text style={[styles.tabText, activeTab === 'sentiment' && styles.tabTextActive]}>
            情緒問卷 ({sentimentRecords.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'vlog' && styles.tabActive]}
          onPress={() => setActiveTab('vlog')}
        >
          <Text style={[styles.tabText, activeTab === 'vlog' && styles.tabTextActive]}>
            影片 ({vlogRecords.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'gps' && styles.tabActive]}
          onPress={() => setActiveTab('gps')}
        >
          <Text style={[styles.tabText, activeTab === 'gps' && styles.tabTextActive]}>
            位置 ({gpsRecords.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* 記錄列表 */}
      <ScrollView style={styles.scrollView}>
        {activeTab === 'sentiment' && renderSentimentRecords()}
        {activeTab === 'vlog' && renderVlogRecords()}
        {activeTab === 'gps' && renderGpsRecords()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#4CAF50",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  recordCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recordTime: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  recordContent: {
    marginTop: 4,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  scoreLabel: {
    fontSize: 14,
    color: "#666",
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
  },
  notes: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    fontStyle: "italic",
  },
  vlogInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  vlogPath: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  gpsInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
