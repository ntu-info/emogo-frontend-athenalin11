import { Platform } from 'react-native';
import Constants from 'expo-constants';

let Notifications = null;

// 檢查是否在 Expo Go 中運行
const isExpoGo = Constants.appOwnership === 'expo';

// 只在非 Expo Go 環境中導入通知模組
if (!isExpoGo) {
  try {
    Notifications = require('expo-notifications');
    
    // 設定通知處理器
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  } catch (error) {
    console.log('⚠️ Notifications not available in this environment');
  }
}

// 請求通知權限
export const requestNotificationPermissions = async () => {
  if (!Notifications || isExpoGo) {
    console.log('⚠️ Notifications not supported in Expo Go');
    return false;
  }
  
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('⚠️ Notification permission not granted');
      return false;
    }

    console.log('✅ Notification permission granted');
    return true;
  } catch (error) {
    console.error('❌ Error requesting notification permissions:', error);
    return false;
  }
};

// 取消所有已排程的通知
export const cancelAllNotifications = async () => {
  if (!Notifications || isExpoGo) {
    console.log('⚠️ Notifications not supported in Expo Go');
    return;
  }
  
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('✅ All notifications cancelled');
  } catch (error) {
    console.error('❌ Error cancelling notifications:', error);
  }
};

// 設定每日 3 次提醒（上午 10:00、下午 3:00、晚上 8:00）
export const scheduleDailyNotifications = async () => {
  if (!Notifications || isExpoGo) {
    console.log('⚠️ Notifications not supported in Expo Go - will work in production build');
    return false;
  }
  
  try {
    // 先取消所有現有通知
    await cancelAllNotifications();

    const times = [
      { hour: 10, minute: 0, title: '早安！', body: '記錄一下現在的心情吧 🌅' },
      { hour: 15, minute: 0, title: '午安！', body: '該記錄下午的心情了 ☀️' },
      { hour: 20, minute: 0, title: '晚安！', body: '睡前記錄今天的心情 🌙' },
    ];

    for (const time of times) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: time.title,
          body: time.body,
          data: { type: 'daily_reminder' },
        },
        trigger: {
          hour: time.hour,
          minute: time.minute,
          repeats: true,
        },
      });
    }

    console.log('✅ Daily notifications scheduled (10:00, 15:00, 20:00)');
    return true;
  } catch (error) {
    console.error('❌ Error scheduling notifications:', error);
    return false;
  }
};

// 立即發送測試通知
export const sendTestNotification = async () => {
  if (!Notifications || isExpoGo) {
    console.log('⚠️ Notifications not supported in Expo Go - will work in production build');
    return false;
  }
  
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '測試通知 🔔',
        body: '通知功能正常運作！',
        data: { type: 'test' },
      },
      trigger: {
        seconds: 2,
      },
    });
    console.log('✅ Test notification scheduled');
    return true;
  } catch (error) {
    console.error('❌ Error sending test notification:', error);
    return false;
  }
};

// 取得所有已排程的通知
export const getScheduledNotifications = async () => {
  try {
    const notifications = await Notifications.getAllScheduledNotificationsAsync();
    console.log('📋 Scheduled notifications:', notifications.length);
    return notifications;
  } catch (error) {
    console.error('❌ Error getting scheduled notifications:', error);
    return [];
  }
};
