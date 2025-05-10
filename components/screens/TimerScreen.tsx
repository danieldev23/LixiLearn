import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  Alert,
  Switch,
  Modal,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

// Thiết lập kiểu dữ liệu
interface Reminder {
  id: string;
  time: string;
  active: boolean;
  days: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  notificationId?: string;
  category: string;
}

interface DaysObject {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}



export default function TimerScreen(): JSX.Element {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [activeReminder, setActiveReminder] = useState<Reminder | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [lastLearned, setLastLearned] = useState<string | null>(null);
  const [weeklyProgress, setWeeklyProgress] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [selectedDays, setSelectedDays] = useState<DaysObject>({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('Từ vựng');

  const weekDays: string[] = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const categories: string[] = ['Từ vựng', 'Ngữ pháp', 'Đọc hiểu', 'Nghe', 'Nói'];

  // Hàm load dữ liệu từ local storage
  useEffect(() => {
    loadReminders();
    loadStreak();
    loadWeeklyProgress();
  }, []);

  const loadReminders = async (): Promise<void> => {
    try {
      const savedReminders = await AsyncStorage.getItem('englishReminders');
      if (savedReminders) {
        setReminders(JSON.parse(savedReminders));
      }
    } catch (error) {
      console.error('Lỗi khi tải reminders:', error);
    }
  };

  const loadStreak = async (): Promise<void> => {
    try {
      const streak = await AsyncStorage.getItem('streakCount');
      const lastLearnedDay = await AsyncStorage.getItem('lastLearned');
      
      if (streak) setStreakCount(parseInt(streak));
      if (lastLearnedDay) setLastLearned(lastLearnedDay);
      
      // Kiểm tra nếu đã quá 1 ngày kể từ lần học cuối
      if (lastLearnedDay) {
        const lastDate = new Date(lastLearnedDay);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1) {
          // Reset streak nếu đã quá 1 ngày
          setStreakCount(0);
          await AsyncStorage.setItem('streakCount', '0');
        }
      }
    } catch (error) {
      console.error('Lỗi khi tải streak:', error);
    }
  };

  const loadWeeklyProgress = async (): Promise<void> => {
    try {
      const progress = await AsyncStorage.getItem('weeklyProgress');
      if (progress) {
        setWeeklyProgress(JSON.parse(progress));
      }
    } catch (error) {
      console.error('Lỗi khi tải tuần tiến độ:', error);
    }
  };

  // Lưu dữ liệu vào local storage
  const saveReminders = async (updatedReminders: Reminder[]): Promise<void> => {
    try {
      await AsyncStorage.setItem('englishReminders', JSON.stringify(updatedReminders));
    } catch (error) {
      console.error('Lỗi khi lưu reminders:', error);
    }
  };

  const updateStreak = async (): Promise<void> => {
    const today = new Date().toISOString().split('T')[0];
    
    try {
      if (lastLearned !== today) {
        const newStreakCount = streakCount + 1;
        setStreakCount(newStreakCount);
        setLastLearned(today);
        
        await AsyncStorage.setItem('streakCount', newStreakCount.toString());
        await AsyncStorage.setItem('lastLearned', today);
        
        // Cập nhật tiến độ hàng tuần
        const dayOfWeek = new Date().getDay();
        const newWeeklyProgress = [...weeklyProgress];
        newWeeklyProgress[dayOfWeek] += 1;
        setWeeklyProgress(newWeeklyProgress);
        await AsyncStorage.setItem('weeklyProgress', JSON.stringify(newWeeklyProgress));
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật streak:', error);
    }
  };

  // Xử lý thông báo
  const scheduleNotification = async (reminder: Reminder): Promise<string> => {
    const [hours, minutes] = reminder.time.split(':').map(num => parseInt(num));
    
    // Tạo trigger cho từng ngày trong tuần
    const triggers = [];
    if (reminder.days.monday) triggers.push(1);
    if (reminder.days.tuesday) triggers.push(2);
    if (reminder.days.wednesday) triggers.push(3);
    if (reminder.days.thursday) triggers.push(4);
    if (reminder.days.friday) triggers.push(5);
    if (reminder.days.saturday) triggers.push(6);
    if (reminder.days.sunday) triggers.push(0);
    
    // Chuẩn bị nội dung thông báo với ngẫu nhiên
    const messages = [
      "Đã đến giờ học tiếng Anh rồi! 🇬🇧",
      "Bạn ơi, hãy dành 10 phút học tiếng Anh nào!",
      "Streak của bạn sẽ mất nếu không học hôm nay đấy!",
      `Đã đến giờ học ${reminder.category} rồi!`,
      "Bạn còn nhớ cam kết học tiếng Anh không?",
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Đăng ký thông báo cho mỗi ngày đã chọn
    const notificationIds = [];
    
    for (const weekDay of triggers) {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "⏰ LixiLearn AI nhắc bạn học tiếng Anh!",
          body: randomMessage,
          sound: '1.wav',
          badge: 1,
          data: { screen: 'Learning' },
        },
        trigger: {
          type: 'calendar',
          hour: hours,
          minute: minutes,
          weekday: weekDay,
          repeats: true,
        },
      });
      notificationIds.push(id);
    }
    
    return notificationIds.join(',');
  };

  const cancelNotification = async (notificationId: string): Promise<void> => {
    const ids = notificationId.split(',');
    for (const id of ids) {
      await Notifications.cancelScheduledNotificationAsync(id);
    }
  };

  // Xử lý thêm reminder mới
  const addReminder = async (): Promise<void> => {
    const timeString = selectedTime.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    
    const newReminder: Reminder = {
      id: Date.now().toString(),
      time: timeString,
      active: true,
      days: { ...selectedDays },
      category: selectedCategory,
    };
    
    // Lên lịch thông báo
    const notificationId = await scheduleNotification(newReminder);
    newReminder.notificationId = notificationId;
    
    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    await saveReminders(updatedReminders);
    
    setShowModal(false);
    Alert.alert('Thành công', `Đã tạo nhắc nhở học tiếng Anh lúc ${timeString}`);
  };

  // Xử lý xóa reminder
  const deleteReminder = async (id: string): Promise<void> => {
    const reminderToDelete = reminders.find(item => item.id === id);
    
    if (reminderToDelete && reminderToDelete.notificationId) {
      await cancelNotification(reminderToDelete.notificationId);
    }
    
    const updatedReminders = reminders.filter(item => item.id !== id);
    setReminders(updatedReminders);
    await saveReminders(updatedReminders);
  };

  // Xử lý bật/tắt reminder
  const toggleReminder = async (id: string): Promise<void> => {
    const updatedReminders = reminders.map(reminder => {
      if (reminder.id === id) {
        const updatedReminder = { ...reminder, active: !reminder.active };
        
        // Xử lý thông báo
        (async () => {
          if (updatedReminder.active) {
            if (updatedReminder.notificationId) {
              await cancelNotification(updatedReminder.notificationId);
            }
            const newNotificationId = await scheduleNotification(updatedReminder);
            updatedReminder.notificationId = newNotificationId;
          } else if (updatedReminder.notificationId) {
            await cancelNotification(updatedReminder.notificationId);
          }
        })();
        
        return updatedReminder;
      }
      return reminder;
    });
    
    setReminders(updatedReminders);
    await saveReminders(updatedReminders);
  };

  // Xử lý chọn ngày
  const toggleDay = (day: keyof DaysObject): void => {
    setSelectedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  // Xử lý chọn thời gian
  const onTimeChange = (_: any, selectedDate?: Date): void => {
    setShowTimePicker(false);
    if (selectedDate) {
      setSelectedTime(selectedDate);
    }
  };

  // Hiển thị badge cho số ngày trong tuần đã chọn
  const getSelectedDaysCount = (): number => {
    return Object.values(selectedDays).filter(Boolean).length;
  };

  // Mô phỏng hoàn thành bài học
  const simulateCompletedLesson = async (): Promise<void> => {
    await updateStreak();
    Alert.alert(
      'Bài học hoàn thành!',
      `Chúc mừng! Bạn đã duy trì ${streakCount} ngày liên tiếp.`,
      [{ text: 'Tuyệt vời!' }]
    );
  };

  // Hiển thị badge chỉ ra ngày trong tuần
  const renderDayBadge = (day: keyof DaysObject, label: string): JSX.Element => {
    return (
      <TouchableOpacity
        style={[
          styles.dayBadge,
          selectedDays[day] ? styles.dayBadgeSelected : null
        ]}
        onPress={() => toggleDay(day)}
      >
        <Text style={[
          styles.dayBadgeText,
          selectedDays[day] ? styles.dayBadgeTextSelected : null
        ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  // Render streak indicator
  const renderStreakIndicator = (): JSX.Element => {
    return (
      <View style={styles.streakContainer}>
        <View style={styles.streakInfo}>
          <FontAwesome5 name="fire" size={24} color="#FF9500" />
          <Text style={styles.streakText}>{streakCount}</Text>
          <Text style={styles.streakLabel}>ngày</Text>
        </View>
        
        <TouchableOpacity
          style={styles.completeButton}
          onPress={simulateCompletedLesson}
        >
          <Text style={styles.completeButtonText}>Hoàn thành bài học hôm nay</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render weekly progress
  const renderWeeklyProgress = (): JSX.Element => {
    return (
      <View style={styles.weeklyProgress}>
        <Text style={styles.sectionTitle}>Tiến độ tuần này</Text>
        <View style={styles.progressContainer}>
          {weekDays.map((day, index) => (
            <View key={day} style={styles.progressDay}>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar,
                    { height: `${Math.min(100, weeklyProgress[index] * 20)}%` }
                  ]}
                />
              </View>
              <Text style={styles.progressDayText}>{day}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Render danh sách các reminder
  const renderReminders = (): JSX.Element => {
    if (reminders.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Image 
            source={{ uri: 'https://d35aaqx5ub95lt.cloudfront.net/images/owls/speaking.svg' }}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>
            Chưa có nhắc nhở nào. Hãy thêm giờ học để duy trì thói quen!
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.remindersList}>
        {reminders.map((reminder) => (
          <View key={reminder.id} style={styles.reminderItem}>
            <View style={styles.reminderInfo}>
              <View style={styles.reminderTimeContainer}>
                <MaterialCommunityIcons name="clock-outline" size={22} color="#4b6cb7" />
                <Text style={styles.reminderTime}>{reminder.time}</Text>
              </View>
              
              <View style={styles.reminderDetails}>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryText}>{reminder.category}</Text>
                </View>
                <View style={styles.daysContainer}>
                  {Object.entries(reminder.days).map(([key, value], index) => (
                    value ? (
                      <Text key={key} style={styles.dayIndicator}>
                        {weekDays[(index + 1) % 7]}
                      </Text>
                    ) : null
                  ))}
                </View>
              </View>
            </View>
            
            <View style={styles.reminderActions}>
              <Switch
                value={reminder.active}
                onValueChange={() => toggleReminder(reminder.id)}
                trackColor={{ false: '#D1D1D6', true: '#58CC02' }}
                thumbColor="#FFFFFF"
              />
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteReminder(reminder.id)}
              >
                <Ionicons name="trash-outline" size={22} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    );
  };

  // Modal thêm reminder mới
  const renderAddReminderModal = (): JSX.Element => {
    return (
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tạo nhắc nhở học tập</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Chọn thời gian</Text>
                <TouchableOpacity 
                  style={styles.timePickerButton}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Ionicons name="time-outline" size={22} color="#4b6cb7" />
                  <Text style={styles.timePickerText}>
                    {selectedTime.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: false 
                    })}
                  </Text>
                </TouchableOpacity>
              </View>

              {showTimePicker && (
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onTimeChange}
                />
              )}

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Chọn ngày trong tuần</Text>
                <View style={styles.daysSelection}>
                  {renderDayBadge('monday', 'T2')}
                  {renderDayBadge('tuesday', 'T3')}
                  {renderDayBadge('wednesday', 'T4')}
                  {renderDayBadge('thursday', 'T5')}
                  {renderDayBadge('friday', 'T6')}
                  {renderDayBadge('saturday', 'T7')}
                  {renderDayBadge('sunday', 'CN')}
                </View>
                <Text style={styles.daysSelected}>
                  Đã chọn {getSelectedDaysCount()} ngày
                </Text>
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Chọn kỹ năng</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                  {categories.map(category => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.categoryBadge,
                        selectedCategory === category ? styles.categorySelected : null
                      ]}
                      onPress={() => setSelectedCategory(category)}
                    >
                      <Text style={[
                        styles.categoryBadgeText,
                        selectedCategory === category ? styles.categorySelectedText : null
                      ]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </ScrollView>

            <TouchableOpacity 
              style={styles.saveButton}
              onPress={addReminder}
            >
              <Text style={styles.saveButtonText}>Tạo nhắc nhở</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lịch học tiếng Anh</Text>
        <Image 
          source={{ uri: 'https://d35aaqx5ub95lt.cloudfront.net/images/owls/speaking.svg' }}
          style={styles.mascot}
        />
      </View>

      {renderStreakIndicator()}
      {renderWeeklyProgress()}

      <View style={styles.remindersSection}>
        <Text style={styles.sectionTitle}>Nhắc nhở của bạn</Text>
        <ScrollView style={styles.remindersContainer}>
          {renderReminders()}
        </ScrollView>
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setShowModal(true)}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {renderAddReminderModal()}
    </View>
  );
}

// Định nghĩa styles
interface StylesProps {
  container: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  mascot: ImageStyle;
  streakContainer: ViewStyle;
  streakInfo: ViewStyle;
  streakText: TextStyle;
  streakLabel: TextStyle;
  completeButton: ViewStyle;
  completeButtonText: TextStyle;
  weeklyProgress: ViewStyle;
  sectionTitle: TextStyle;
  progressContainer: ViewStyle;
  progressDay: ViewStyle;
  progressBarContainer: ViewStyle;
  progressBar: ViewStyle;
  progressDayText: TextStyle;
  remindersSection: ViewStyle;
  remindersContainer: ViewStyle;
  remindersList: ViewStyle;
  emptyContainer: ViewStyle;
  emptyImage: ImageStyle;
  emptyText: TextStyle;
  reminderItem: ViewStyle;
  reminderInfo: ViewStyle;
  reminderTimeContainer: ViewStyle;
  reminderTime: TextStyle;
  reminderDetails: ViewStyle;
  categoryTag: ViewStyle;
  categoryText: TextStyle;
  daysContainer: ViewStyle;
  dayIndicator: TextStyle;
  reminderActions: ViewStyle;
  deleteButton: ViewStyle;
  addButton: ViewStyle;
  modalContainer: ViewStyle;
  modalContent: ViewStyle;
  modalHeader: ViewStyle;
  modalTitle: TextStyle;
  modalScroll: ViewStyle;
  fieldContainer: ViewStyle;
  fieldLabel: TextStyle;
  timePickerButton: ViewStyle;
  timePickerText: TextStyle;
  daysSelection: ViewStyle;
  dayBadge: ViewStyle;
  dayBadgeSelected: ViewStyle;
  dayBadgeText: TextStyle;
  dayBadgeTextSelected: TextStyle;
  daysSelected: TextStyle;
  categoriesContainer: ViewStyle;
  categoryBadge: ViewStyle;
  categorySelected: ViewStyle;
  categoryBadgeText: TextStyle;
  categorySelectedText: TextStyle;
  saveButton: ViewStyle;
  saveButtonText: TextStyle;
}

const styles = StyleSheet.create<StylesProps>({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1CB0F6',
  },
  mascot: {
    width: 60,
    height: 60,
  },
  streakContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  streakLabel: {
    fontSize: 16,
    color: '#777',
    marginLeft: 4,
  },
  completeButton: {
    backgroundColor: '#58CC02',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  weeklyProgress: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    marginTop: 10,
  },
  progressDay: {
    alignItems: 'center',
    width: '13%',
  },
  progressBarContainer: {
    height: 100,
    width: 10,
    backgroundColor: '#E5E5EA',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#1CB0F6',
    borderRadius: 5,
  },
  progressDayText: {
    fontSize: 12,
    color: '#777',
    marginTop: 6,
  },
  remindersSection: {
    flex: 1,
    padding: 16,
  },
  remindersContainer: {
    flex: 1,
  },
  remindersList: {
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 40,
  },
  emptyImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    lineHeight: 22,
  },
  reminderItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reminderTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  reminderDetails: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryTag: {
    backgroundColor: '#1CB0F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 20,
    marginBottom: 10
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayIndicator: {
    fontSize: 12,
    color: '#777',
    marginRight: 4,
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  reminderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 12,
  },
  addButton: {
    position: 'absolute',
    bottom: 90,
    right: 24,
    backgroundColor: '#58CC02',
    width: 60,
    height: 60,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalScroll: {
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  timePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  timePickerText: {
    fontSize: 18,
    marginLeft: 8,
    color: '#333',
  },
  daysSelection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  dayBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  dayBadgeSelected: {
    backgroundColor: '#58CC02',
  },
  dayBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#777',
  },
  dayBadgeTextSelected: {
    color: '#FFFFFF',
  },
  daysSelected: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 10,
  },
  categorySelected: {
    backgroundColor: '#1CB0F6',
  },
  categoryBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#777',
  },
  categorySelectedText: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#58CC02',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});