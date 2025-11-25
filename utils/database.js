import * as SQLite from 'expo-sqlite';

// 開啟或建立資料庫
const db = SQLite.openDatabaseSync('emogo.db');

// 初始化資料庫表格
export const initDatabase = () => {
  try {
    // 建立情緒問卷記錄表
    db.execSync(`
      CREATE TABLE IF NOT EXISTS sentiment_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        valence INTEGER NOT NULL,
        arousal INTEGER NOT NULL,
        dominance INTEGER NOT NULL,
        notes TEXT
      );
    `);

    // 建立 vlog 記錄表
    db.execSync(`
      CREATE TABLE IF NOT EXISTS vlog_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        video_uri TEXT NOT NULL,
        duration INTEGER NOT NULL
      );
    `);

    // 建立 GPS 記錄表
    db.execSync(`
      CREATE TABLE IF NOT EXISTS gps_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        accuracy REAL
      );
    `);

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
};

// 插入情緒問卷記錄
export const insertSentimentRecord = (valence, arousal, dominance, notes = '') => {
  try {
    const timestamp = new Date().toISOString();
    const result = db.runSync(
      'INSERT INTO sentiment_records (timestamp, valence, arousal, dominance, notes) VALUES (?, ?, ?, ?, ?)',
      [timestamp, valence, arousal, dominance, notes]
    );
    console.log('✅ Sentiment record inserted:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('❌ Error inserting sentiment record:', error);
    return null;
  }
};

// 插入 vlog 記錄
export const insertVlogRecord = (videoUri, duration) => {
  try {
    const timestamp = new Date().toISOString();
    const result = db.runSync(
      'INSERT INTO vlog_records (timestamp, video_uri, duration) VALUES (?, ?, ?)',
      [timestamp, videoUri, duration]
    );
    console.log('✅ Vlog record inserted:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('❌ Error inserting vlog record:', error);
    return null;
  }
};

// 插入 GPS 記錄
export const insertGpsRecord = (latitude, longitude, accuracy = null) => {
  try {
    const timestamp = new Date().toISOString();
    const result = db.runSync(
      'INSERT INTO gps_records (timestamp, latitude, longitude, accuracy) VALUES (?, ?, ?, ?)',
      [timestamp, latitude, longitude, accuracy]
    );
    console.log('✅ GPS record inserted:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('❌ Error inserting GPS record:', error);
    return null;
  }
};

// 取得所有情緒記錄
export const getAllSentimentRecords = () => {
  try {
    const records = db.getAllSync('SELECT * FROM sentiment_records ORDER BY timestamp DESC');
    return records;
  } catch (error) {
    console.error('❌ Error fetching sentiment records:', error);
    return [];
  }
};

// 取得所有 vlog 記錄
export const getAllVlogRecords = () => {
  try {
    const records = db.getAllSync('SELECT * FROM vlog_records ORDER BY timestamp DESC');
    return records;
  } catch (error) {
    console.error('❌ Error fetching vlog records:', error);
    return [];
  }
};

// 取得所有 GPS 記錄
export const getAllGpsRecords = () => {
  try {
    const records = db.getAllSync('SELECT * FROM gps_records ORDER BY timestamp DESC');
    return records;
  } catch (error) {
    console.error('❌ Error fetching GPS records:', error);
    return [];
  }
};

// 刪除所有記錄（用於測試）
export const clearAllData = () => {
  try {
    db.runSync('DELETE FROM sentiment_records');
    db.runSync('DELETE FROM vlog_records');
    db.runSync('DELETE FROM gps_records');
    console.log('✅ All data cleared');
  } catch (error) {
    console.error('❌ Error clearing data:', error);
  }
};

export default db;
