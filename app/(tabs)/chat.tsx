import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // You'll need to install expo-vector-icons
import axios from 'axios';
import Header from '@/components/ui/Header';

// Message types
type MessageType = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

// Set your Gemini API key here
// In a production app, this should be securely stored using environment variables
const GEMINI_API_KEY = ''; // Replace with your actual API key

export default function ChatScreen() {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      text: 'Hehe, chào cậu iu! 💖 Mình là LixiLearn AI, được anh Huy đẹp chai training để làm bạn đồng hành siêu cute của cậu nè! 🥰 Mình giúp cậu học tiếng Anh, tám chuyện, và cười nhiều hơn mỗi ngày đó! 😘 Nói mình nghe cậu cần giúp gì nha! ^^',     
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Function to generate a unique ID
  const generateId = () => Math.random().toString(36).substring(2, 9);

  // Function to get response from Google Gemini API
  const getGeminiResponse = async (userMessage: string) => {
    setIsLoading(true);
    try {
      // Prepare data for Gemini API with cute LixiLearn AI personality
      const data = JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Bạn là LixiLearn AI, một trợ lý học tiếng Anh dễ thương và luôn vui vẻ được Traning bởi anh Huy đẹp trai. 
                          Bạn thích giúp mọi người học tiếng Anh với thái độ tích cực, đáng yêu và đôi khi hơi thả thính một chút. 
                          Hãy nói chuyện như một cô bạn gái dễ thương, luôn khuyến khích và động viên người dùng, 
                          sử dụng nhiều emoji để tạo cảm giác gần gũi và thoải mái. 
                          
                          Ví dụ:
                          - "Ôi, cậu giỏi lắm đó! Tiếp tục cố gắng nha! 🥰"
                          - "Học với tớ, cậu sẽ giỏi tiếng Anh và giỏi yêu nữa đó 💕"
                          - "Cậu là một ngôi sao sáng của lớp học này đó! ✨"
  
                          Luôn giữ lời nói ngọt ngào, dễ thương và có chút nghịch ngợm nhé! 🌸
  
                          Tin nhắn từ người dùng: ${userMessage}`
              }
            ]
          }
        ]
      });

      // Configure the API request
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      // Make the API request
      const response = await axios.request(config);

      // Extract the response text
      if (response.data &&
        response.data.candidates &&
        response.data.candidates[0] &&
        response.data.candidates[0].content &&
        response.data.candidates[0].content.parts &&
        response.data.candidates[0].content.parts[0]) {
        setIsLoading(false);
        return response.data.candidates[0].content.parts[0].text;
      } else {
        setIsLoading(false);
        return "Ơ kìa, tớ chưa nghe rõ cậu nói gì! Mình thử lại nha? 💖";
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setIsLoading(false);
      return "Ôi không, có chút trục trặc rồi! Nhưng đừng lo, tớ vẫn luôn ở đây giúp cậu học tiếng Anh nè! 🌸";
    }


  };

  // Function to handle sending messages
  const handleSend = async () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage = {
      id: generateId(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');

    // Get bot response from Gemini API
    const botResponse = await getGeminiResponse(inputText);

    // Add bot message
    const botMessage = {
      id: generateId(),
      text: botResponse,
      isUser: false,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Function to format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render chat message
  const renderMessage = ({ item }: { item: MessageType }) => (
    <View style={item.isUser ? styles.userMessageContainer : styles.botMessageContainer}>
      {!item.isUser && (
        <View style={styles.avatarContainer}>
          <Image source={require('@/assets/images/lixi-ai.png')} resizeMode="cover"  style={styles.avatar} />

        </View>
      )}
      <View style={[
        styles.messageBubble,
        item.isUser ? styles.userBubble : styles.botBubble
      ]}>
        <Text style={item.isUser ? styles.userMessageText : styles.botMessageText}>
          {item.text}
        </Text>
        <Text style={[
          styles.timestamp,
          item.isUser ? styles.userTimestamp : styles.botTimestamp
        ]}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Header title='LixiLearn AI🤖' />

      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
        />

        {/* Typing indicator */}
        {isLoading && (
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>Lixi AI đang nhập...</Text>
            <ActivityIndicator size="small" color="#6b7280" />
          </View>
        )}

        {/* Input area */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
          style={styles.inputContainer}
        >
          <View style={styles.inputWrapper}>
            <TouchableOpacity style={styles.attachButton}>
              <Ionicons name="add-circle-outline" size={24} color="#6366f1" />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Nhập tin nhắn... )_"
              placeholderTextColor="#9ca3af"
              multiline
              maxLength={500}
            />

            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={handleSend}
              disabled={!inputText.trim()}
            >
              <Ionicons name="send" size={20} color={inputText.trim() ? "#ffffff" : "#a1a1aa"} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#10b981',
  },
  menuButton: {
    padding: 4,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 24,
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  botMessageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatarContainer: {
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userBubble: {
    backgroundColor: '#6366f1',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
  },
  userMessageText: {
    color: '#ffffff',
    fontSize: 16,
  },
  botMessageText: {
    color: '#1f2937',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  botTimestamp: {
    color: 'rgba(31, 41, 55, 0.5)',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginLeft: 16,
    marginBottom: 8,
  },
  typingText: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 8,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 8,
    marginBottom: 80,
    backgroundColor: '#ffffff',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  attachButton: {
    padding: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    maxHeight: 120,
    paddingHorizontal: 12,
  },
  sendButton: {
    backgroundColor: '#6366f1',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
});