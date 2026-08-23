import React, { useState, useEffect } from 'react';
import { 
  Send, Mic, MicOff, Wifi, WifiOff, Globe, 
  Bot, User, Sparkles, CheckCircle2, RefreshCw, AlertCircle 
} from 'lucide-react';
import { api } from '../../services/api';
import { TraineeDetailData } from '../../types';

interface Message {
  sender: 'bot' | 'trainee';
  text: string;
  timestamp: string;
  extractedCard?: {
    status: string;
    wage?: number;
    employer?: string;
    satisfaction?: number;
    confidence: number;
  };
}

interface ConversationalFollowUpProps {
  trainee: TraineeDetailData;
  language: string;
}

export const ConversationalFollowUp: React.FC<ConversationalFollowUpProps> = ({ trainee, language: initialLanguage }) => {
  const [lang, setLang] = useState<'en' | 'hi'>(initialLanguage === 'hi' ? 'hi' : 'en');
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const traineeName = trainee.profile?.full_name || trainee.full_name || 'Gaurav Yadav';
  const traineeId = trainee.profile?.id || trainee.id || 'tr-1';

  // Network online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineQueue();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize first bot message based on wave and language
  useEffect(() => {
    const initPrompt = lang === 'hi'
      ? `नमस्ते ${traineeName} जी! राष्ट्रीय कौशल विकास मिशन की ओर से 90-दिन का फॉलो-अप। क्या आप अपने वर्तमान काम और मासिक वेतन से संतुष्ट हैं? कृपया अपने कार्यस्थल और वेतन के बारे में बताएं।`
      : `Hello ${traineeName}! This is your 90-day National Skilling Outcome check-in. Are you satisfied with your current role and monthly earnings? Please share your workplace and salary details.`;

    setMessages([
      {
        sender: 'bot',
        text: initPrompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [lang, traineeName]);

  const syncOfflineQueue = async () => {
    const cached = localStorage.getItem('vikasdrishti_offline_followups');
    if (cached) {
      try {
        const queue = JSON.parse(cached);
        for (const item of queue) {
          await api.processFollowUpMessage(item);
        }
        localStorage.removeItem('vikasdrishti_offline_followups');
      } catch (err) {
        console.error('Failed to sync offline queue:', err);
      }
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;

    if (!isListening) {
      recognition.start();
      setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      sender: 'trainee',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const textToSend = inputText.trim();
    setInputText('');

    // If offline, save locally
    if (!navigator.onLine) {
      const offlinePayload = {
        trainee_id: traineeId,
        checkpoint: 'DAY_90',
        raw_message: textToSend,
        language: lang,
        channel: 'WHATSAPP_SIMULATOR'
      };
      const existing = JSON.parse(localStorage.getItem('vikasdrishti_offline_followups') || '[]');
      existing.push(offlinePayload);
      localStorage.setItem('vikasdrishti_offline_followups', JSON.stringify(existing));

      const botReply: Message = {
        sender: 'bot',
        text: lang === 'hi'
          ? 'आपका संदेश ऑफलाइन सहेज लिया गया है। नेटवर्क उपलब्ध होने पर यह स्वतः सत्यापित हो जाएगा।'
          : 'Your response has been saved locally offline. It will synchronize automatically once reconnected.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
      return;
    }

    // If online, process via NLU
    setLoading(true);
    try {
      const res = await api.processFollowUpMessage({
        trainee_id: traineeId,
        checkpoint: 'DAY_90',
        raw_message: textToSend,
        language: lang,
        channel: 'WHATSAPP_AI'
      });

      const botReply: Message = {
        sender: 'bot',
        text: res.suggested_next_question || (lang === 'hi' ? 'धन्यवाद! आपकी जानकारी सफलतापूर्वक दर्ज कर ली गई है।' : 'Thank you! Your verified milestone has been registered in your Skill Passport.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        extractedCard: {
          status: res.extracted_status,
          wage: res.extracted_wage,
          employer: res.extracted_employer,
          satisfaction: res.job_satisfaction_rating,
          confidence: res.nlu_confidence
        }
      };

      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      console.error('NLU follow-up error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[560px]">
      
      {/* Top Chat Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white">VikasDrishti AI Follow-Up Assistant</h3>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-[10px] text-slate-400">
              Multilingual NLU • Rule & Regex Conversational Engine
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 text-xs">
          {/* Offline/Online Badge */}
          <span className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-bold border ${
            isOnline ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40' : 'bg-amber-950/60 text-amber-300 border-amber-800/40'
          }`}>
            {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            <span>{isOnline ? 'Online' : 'Offline (Local Sync)'}</span>
          </span>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
          >
            <Globe className="h-3 w-3 text-emerald-400" />
            <span>{lang === 'en' ? 'EN' : 'हिन्दी'}</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-950/40">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex flex-col ${m.sender === 'trainee' ? 'items-end' : 'items-start'}`}>
            <div className="flex items-start gap-2.5 max-w-[85%]">
              {m.sender === 'bot' && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60 text-xs font-bold mt-1">
                  <Bot className="h-3.5 w-3.5" />
                </div>
              )}

              <div className={`p-3.5 rounded-2xl text-xs space-y-2 ${
                m.sender === 'trainee'
                  ? 'bg-emerald-600 text-white rounded-tr-none shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                
                {/* Structured NLU Extraction Result Card */}
                {m.extractedCard && (
                  <div className="mt-2.5 p-3 rounded-xl bg-slate-950/80 border border-emerald-500/40 text-emerald-200 text-[11px] space-y-1.5 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-1 font-bold">
                      <span className="text-white flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-amber-400" />
                        Verified Milestone Extracted
                      </span>
                      <span className="text-emerald-400 font-mono">{Math.round(m.extractedCard.confidence * 100)}% Confidence</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 pt-1 text-slate-300">
                      <div>Status: <strong className="text-white block">{m.extractedCard.status}</strong></div>
                      <div>Employer: <strong className="text-white block">{m.extractedCard.employer || 'Declared'}</strong></div>
                      <div>Salary: <strong className="text-emerald-400 block">{m.extractedCard.wage ? `₹${m.extractedCard.wage.toLocaleString()}/mo` : 'Declared'}</strong></div>
                      <div>Satisfaction: <strong className="text-amber-300 block">{m.extractedCard.satisfaction}/5 Stars</strong></div>
                    </div>
                  </div>
                )}

                <span className={`block text-[9px] text-right font-mono ${
                  m.sender === 'trainee' ? 'text-emerald-200' : 'text-slate-500'
                }`}>
                  {m.timestamp}
                </span>
              </div>

              {m.sender === 'trainee' && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-200 text-xs font-bold mt-1">
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
            <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-400" />
            <span>Processing conversational response with rule + regex NLU...</span>
          </div>
        )}
      </div>

      {/* Input Row */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <div className="flex items-center gap-2">
          <button
            onClick={handleVoiceInput}
            title={isListening ? 'Listening...' : 'Voice Input (Dual-language)'}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              lang === 'hi'
                ? 'उदाहरण: "हाँ मैं टाटा पावर में काम कर रहा हूँ, वेतन ₹19,500 है..."'
                : 'e.g. "I am working at Tata Power as Solar Tech earning ₹19,500/mo, satisfaction 5/5..."'
            }
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />

          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition-all cursor-pointer shadow-md shadow-emerald-600/20"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
