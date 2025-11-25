import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { insertSentimentRecord, insertVlogRecord, insertGpsRecord } from "../utils/database";
import * as FileSystem from "expo-file-system";

// 延遲導入 Camera 以避免初始化錯誤
let Camera = null;
let useCameraPermissions = null;
try {
  const CameraModule = require("expo-camera");
  Camera = CameraModule.CameraView;
  useCameraPermissions = CameraModule.useCameraPermissions;
} catch (error) {
  console.log("Camera module not available:", error);
}

export default function RecordScreen() {
  const router = useRouter();
  
  // 情緒問卷狀態 (PAD model: Pleasure-Arousal-Dominance)
  const [valence, setValence] = useState(5); // 1-9: 不愉快 -> 愉快
  const [arousal, setArousal] = useState(5); // 1-9: 平靜 -> 興奮
  const [dominance, setDominance] = useState(5); // 1-9: 被控制 -> 主導
  const [notes, setNotes] = useState("");

  // 相機狀態
  const [cameraPermission, requestCameraPermission] = useCameraPermissions ? useCameraPermissions() : [null, () => {}];
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  // GPS 狀態
  const [location, setLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);

  // 當前步驟
  const [step, setStep] = useState(1); // 1: 問卷, 2: 錄影, 3: 確認

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
      
      if (status === 'granted') {
        // 權限授予後立即取得位置
        await getCurrentLocation();
      } else {
        Alert.alert('需要權限', '請允許 APP 存取您的位置資訊');
      }
    } catch (error) {
      console.error('❌ Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      console.log('🔍 正在取得位置...');
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 0,
      });
      setLocation(loc);
      console.log('✅ Location obtained:', {
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
        accuracy: loc.coords.accuracy
      });
    } catch (error) {
      console.error('❌ Error getting location:', error);
      
      // 如果高精度失敗，嘗試使用較低精度
      try {
        console.log('🔍 嘗試使用平衡模式取得位置...');
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setLocation(loc);
        console.log('✅ Location obtained (balanced):', {
          lat: loc.coords.latitude,
          lng: loc.coords.longitude
        });
      } catch (error2) {
        console.error('❌ Error getting location (balanced):', error2);
        Alert.alert('錯誤', '無法取得位置資訊\n請確認已開啟 GPS 定位功能');
      }
    }
  };

  const startRecording = async () => {
    if (!cameraRef || isRecording) {
      console.log('⚠️ Camera not ready or already recording');
      return;
    }
    
    setIsRecording(true);
    try {
      console.log('🎥 開始錄影...');
      
      // 使用 Promise 來控制錄影時間
      const recordingPromise = cameraRef.recordAsync({
        maxDuration: 1, // 最多錄 1 秒
        quality: '720p',
        mute: false,
      });
      
      // 等待錄影完成（最多 1 秒）
      const video = await recordingPromise;
      
      if (video && video.uri) {
        setRecordedVideo(video.uri);
        console.log('✅ Video recorded successfully:', video.uri);
        
        // 錄影完成後自動進入下一步
        setTimeout(() => setStep(3), 500);
      } else {
        throw new Error('Video URI is null');
      }
      
      setIsRecording(false);
    } catch (error) {
      console.error('❌ Error recording video:', error);
      console.error('錯誤詳情:', error.message);
      setIsRecording(false);
      
      // 如果錄影失敗，詢問是否跳過
      Alert.alert(
        '錄影失敗',
        `無法錄製影片: ${error.message}\n\n是否跳過此步驟？`,
        [
          { 
            text: '重試', 
            style: 'cancel',
            onPress: () => console.log('用戶選擇重試')
          },
          { 
            text: '跳過', 
            onPress: () => {
              console.log('⏭️ 用戶選擇跳過錄影');
              setRecordedVideo(`mock://skipped_${Date.now()}.mp4`);
              setStep(3);
            }
          }
        ]
      );
    }
  };

  const saveAllData = async () => {
    try {
      // 儲存情緒問卷
      const sentimentId = insertSentimentRecord(valence, arousal, dominance, notes);
      
      // 儲存 vlog
      let vlogId = null;
      if (recordedVideo) {
        vlogId = insertVlogRecord(recordedVideo, 1);
      }
      
      // 儲存 GPS
      let gpsId = null;
      if (location) {
        gpsId = insertGpsRecord(
          location.coords.latitude,
          location.coords.longitude,
          location.coords.accuracy
        );
      }

      Alert.alert(
        '✅ 記錄成功！',
        `已儲存:\n• 情緒問卷 #${sentimentId}\n• 影片記錄 #${vlogId}\n• GPS 位置 #${gpsId}`,
        [
          {
            text: '確定',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.error('❌ Error saving data:', error);
      Alert.alert('錯誤', '儲存失敗');
    }
  };

  // 步驟 1: 情緒問卷
  if (step === 1) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>📝 情緒問卷</Text>
          <Text style={styles.subtitle}>請選擇最符合目前感受的選項 (1-9)</Text>

          {/* Valence: 愉悅度 */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionLabel}>😊 愉悅度 (Valence)</Text>
            <View style={styles.scaleContainer}>
              <Text style={styles.scaleLabel}>不愉快</Text>
              <View style={styles.scaleButtons}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[styles.scaleButton, valence === num && styles.scaleButtonActive]}
                    onPress={() => setValence(num)}
                  >
                    <Text style={[styles.scaleButtonText, valence === num && styles.scaleButtonTextActive]}>
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.scaleLabel}>愉快</Text>
            </View>
          </View>

          {/* Arousal: 激動度 */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionLabel}>⚡ 激動度 (Arousal)</Text>
            <View style={styles.scaleContainer}>
              <Text style={styles.scaleLabel}>平靜</Text>
              <View style={styles.scaleButtons}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[styles.scaleButton, arousal === num && styles.scaleButtonActive]}
                    onPress={() => setArousal(num)}
                  >
                    <Text style={[styles.scaleButtonText, arousal === num && styles.scaleButtonTextActive]}>
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.scaleLabel}>興奮</Text>
            </View>
          </View>

          {/* Dominance: 主導度 */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionLabel}>💪 主導度 (Dominance)</Text>
            <View style={styles.scaleContainer}>
              <Text style={styles.scaleLabel}>被控制</Text>
              <View style={styles.scaleButtons}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[styles.scaleButton, dominance === num && styles.scaleButtonActive]}
                    onPress={() => setDominance(num)}
                  >
                    <Text style={[styles.scaleButtonText, dominance === num && styles.scaleButtonTextActive]}>
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.scaleLabel}>主導</Text>
            </View>
          </View>

          {/* 備註 */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionLabel}>📋 備註（選填）</Text>
            <TextInput
              style={styles.textInput}
              placeholder="描述一下現在的心情..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={async () => {
              // 進入錄影步驟前，重新確認位置
              if (!location) {
                Alert.alert('提示', '正在取得位置資訊...');
                await getCurrentLocation();
              }
              setStep(2);
            }}
          >
            <Text style={styles.nextButtonText}>下一步：錄製影片 →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // 步驟 2: 錄影
  if (step === 2) {
    // 檢查相機模組是否可用
    if (!Camera || !useCameraPermissions) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.permissionText}>⚠️ 相機模組不可用</Text>
          <Text style={styles.subtitle}>這可能發生在 Expo Go 環境中</Text>
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={() => {
              console.log('⏭️ 跳過相機，使用模擬影片路徑');
              setRecordedVideo(`mock://video_${Date.now()}.mp4`);
              setStep(3);
            }}
          >
            <Text style={styles.nextButtonText}>跳過錄影，繼續 →</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!cameraPermission) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.permissionText}>正在載入相機權限...</Text>
        </View>
      );
    }

    if (!cameraPermission.granted) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.permissionText}>📷 需要相機權限</Text>
          <Text style={styles.subtitle}>允許 APP 使用相機來錄製 1 秒影片</Text>
          <TouchableOpacity 
            style={styles.permissionButton} 
            onPress={async () => {
              console.log('🔐 請求相機權限...');
              const result = await requestCameraPermission();
              console.log('權限結果:', result);
            }}
          >
            <Text style={styles.permissionButtonText}>授予相機權限</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => {
              setRecordedVideo(`mock://no_permission_${Date.now()}.mp4`);
              setStep(3);
            }}
          >
            <Text style={styles.cancelButtonText}>跳過錄影</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (recordedVideo) {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>✅ 影片已錄製</Text>
            <Text style={styles.subtitle}>1 秒影片已儲存</Text>
            
            <TouchableOpacity 
              style={styles.nextButton} 
              onPress={() => setStep(3)}
            >
              <Text style={styles.nextButtonText}>下一步：確認並儲存 →</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.retakeButton} 
              onPress={() => setRecordedVideo(null)}
            >
              <Text style={styles.retakeButtonText}>重新錄製</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.cameraContainer}>
        {Camera ? (
          <Camera 
            style={styles.camera}
            ref={(ref) => setCameraRef(ref)}
            mode="video"
            facing="back"
          >
            <View style={styles.cameraOverlay}>
              <Text style={styles.cameraTitle}>🎥 錄製 1 秒影片</Text>
              <Text style={styles.cameraSubtitle}>按下按鈕開始錄影</Text>
              
              <TouchableOpacity
                style={[styles.recordButton, isRecording && styles.recordButtonActive]}
                onPress={startRecording}
                disabled={isRecording}
              >
                <View style={styles.recordButtonInner} />
              </TouchableOpacity>

              {isRecording && (
                <Text style={styles.recordingText}>● 錄影中...</Text>
              )}
            </View>
          </Camera>
        ) : (
          <View style={styles.cameraContainer}>
            <View style={styles.cameraOverlay}>
              <Text style={styles.cameraTitle}>⚠️ 相機不可用</Text>
              <Text style={styles.cameraSubtitle}>在 Expo Go 中可能無法使用相機</Text>
              <TouchableOpacity 
                style={styles.nextButton} 
                onPress={() => {
                  setRecordedVideo('mock://video.mp4');
                  setStep(3);
                }}
              >
                <Text style={styles.nextButtonText}>跳過錄影 →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }

  // 步驟 3: 確認
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>✅ 確認資料</Text>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>📊 情緒問卷</Text>
          <Text style={styles.summaryText}>愉悅度: {valence}/9</Text>
          <Text style={styles.summaryText}>激動度: {arousal}/9</Text>
          <Text style={styles.summaryText}>主導度: {dominance}/9</Text>
          {notes && <Text style={styles.summaryText}>備註: {notes}</Text>}
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>🎥 影片記錄</Text>
          <Text style={styles.summaryText}>
            {recordedVideo ? '✅ 已錄製 1 秒影片' : '❌ 未錄製'}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>📍 GPS 位置</Text>
          {location ? (
            <>
              <Text style={styles.summaryText}>
                ✅ 緯度: {location.coords.latitude.toFixed(6)}
              </Text>
              <Text style={styles.summaryText}>
                ✅ 經度: {location.coords.longitude.toFixed(6)}
              </Text>
              <Text style={styles.summaryText}>
                精確度: ±{location.coords.accuracy?.toFixed(1)}m
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.summaryText}>❌ 無法取得位置</Text>
              <TouchableOpacity 
                style={styles.retryLocationButton}
                onPress={getCurrentLocation}
              >
                <Text style={styles.retryLocationButtonText}>🔄 重新取得位置</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, !location && styles.saveButtonDisabled]} 
          onPress={saveAllData}
          disabled={!location}
        >
          <Text style={styles.saveButtonText}>
            {location ? '💾 儲存所有資料' : '⏳ 請先取得位置...'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>取消</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  scaleContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
  },
  scaleLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  scaleButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  scaleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  scaleButtonActive: {
    backgroundColor: "#4CAF50",
  },
  scaleButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  scaleButtonTextActive: {
    color: "white",
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    minHeight: 80,
    textAlignVertical: "top",
  },
  nextButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  cameraSubtitle: {
    fontSize: 16,
    color: "white",
    marginTop: 8,
    marginBottom: 40,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FF5252",
  },
  recordButtonActive: {
    opacity: 0.7,
  },
  recordButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF5252",
  },
  recordingText: {
    fontSize: 18,
    color: "#FF5252",
    fontWeight: "bold",
    marginTop: 20,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
  },
  retakeButton: {
    backgroundColor: "#FF9800",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  retakeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  summaryCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  summaryText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  retryLocationButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 12,
  },
  retryLocationButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#9E9E9E",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  permissionText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  permissionButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    padding: 16,
    paddingHorizontal: 32,
  },
  permissionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
