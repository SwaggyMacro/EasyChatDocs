'use client';

import Image, { type StaticImageData } from 'next/image';
import { NoPrefetchLink as Link } from '@/components/no-prefetch-link';
import { useEffect, useRef, useState, type ComponentType, type CSSProperties, type KeyboardEvent } from 'react';
import {
  ArrowRight,
  AudioLines,
  Activity,
  BookOpen,
  Check,
  ChevronRight,
  Cpu,
  Download,
  Keyboard,
  Languages,
  Menu,
  MessagesSquare,
  Mic,
  MicSignal,
  MousePointer2,
  Pause,
  Play,
  ScanText,
  Settings2,
  Sparkles,
  SquarePen,
  Volume2,
  X,
} from 'lucide-react';

import screenshotDemo from '../../../content/docs/images/screenrecord-example.gif';
import selectionDemo from '../../../content/docs/images/screenrecord-selection.webp';
import translateDemo from '../../../content/docs/images/screenrecord-quick-translate.gif';
import { setLanguagePreference } from '@/lib/language-preference';
import { qqGroupUrl } from '@/lib/shared';
import styles from './home-experience.module.css';

type Language = 'en' | 'zh';
type Icon = ComponentType<{ className?: string }>;
type Demo = {
  id: string;
  title: string;
  short: string;
  description: string;
  scenario: string;
  requirement: string;
  href: string;
  icon: Icon;
  media?: StaticImageData;
  video?: string;
  preview?: 'input' | 'live-translation';
};

const copy = {
  zh: {
    navFeatures: '功能', navSetup: '快速开始', navPerformance: '性能', navDocs: '文档', github: 'GitHub', qqGroup: '加入 QQ 群',
    kicker: '跨平台桌面客户端 · 当前兼容 Windows',
    title: '翻译图片、文本和声音，也能润色、总结和纠错。',
    intro: '框选截图、选中文字或按下快捷键即可处理；观看没有中文字幕的海外视频或直播时，还能实时识别语音并显示翻译字幕。',
    heroFeatures: ['截图翻译', '划词翻译', '输入翻译', '润色总结', '语法纠错', '语音识别翻译', '同声传译'],
    primary: '快速开始', secondary: '下载 EasyChat',
    ocrMetric: 'OCR 80+ 种语言', speechMetric: '语音识别 10 种语言',
    demoLabel: '选择一种用法', demoAction: '查看操作说明', scenario: '适合', requirement: '需要',
    demos: [
      { id: 'screenshot', title: '截图翻译', short: '框选屏幕', description: '框选网页、视频、图片或软件界面中的文字，完成 OCR 识别后直接显示译文，OCR 支持 80+ 种语言。', scenario: '无法复制的页面、视频字幕、游戏界面', requirement: '翻译源 + 对应语言的 OCR 模型', href: '/zh/docs/feature/screenshot-translation', icon: ScanText, media: screenshotDemo },
      { id: 'selection', title: '划词工具栏', short: '选中文字', description: '选中文字后，在原位置打开工具栏，进行翻译、纠错、润色、总结或解释。', scenario: '网页阅读、邮件、文档和外语学习', requirement: 'AI 大模型；普通翻译也可使用机器翻译', href: '/zh/docs/feature/selection', icon: MousePointer2, media: selectionDemo },
      { id: 'input', title: '输入翻译', short: '输入后写回', description: '在任意应用的输入位置调用 EasyChat，用熟悉的语言输入，翻译完成后直接写回原来的输入框。', scenario: '跨国聊天、邮件、客服回复和游戏交流', requirement: '已配置的翻译服务', href: '/zh/docs/feature/input-translation', icon: SquarePen, preview: 'input' },
      { id: 'translate', title: '快捷翻译', short: '随时输入', description: '打开独立窗口输入文字，或读取当前选中的文本，查看译文、重点词和词典详情。', scenario: '临时查词、短句翻译和写作检查', requirement: '已配置的翻译源', href: '/zh/docs/feature/quick-translate', icon: Languages, media: translateDemo },
      { id: 'speech', title: '实时字幕', short: '听系统声音', description: '识别电脑正在播放的音频，将原文和译文持续显示在悬浮字幕窗口中，支持 10 种语言识别。', scenario: '海外视频、直播、会议和网课', requirement: 'ASR 模型 + 翻译源', href: '/zh/docs/feature/simultaneous-interpretation/asr', icon: AudioLines, video: '/videos/screenrecord-asr.mp4' },
      { id: 'live-translation', title: '同声传译', short: '说话即翻译', description: '按下麦克风开始说话，实时识别语音并翻译成目标语言，再通过虚拟音频设备发送给会议、语音或直播软件。', scenario: '跨语言会议、语音聊天、演示与直播', requirement: 'ASR 模型 + 翻译源 + 虚拟音频驱动', href: '/zh/docs/feature/simultaneous-interpretation', icon: MicSignal, preview: 'live-translation' },
    ] as Demo[],
    setupKicker: '第一次使用', setupTitle: '三步完成基础设置', setupIntro: '先把一项功能跑通，再按需要下载 OCR 或语音模型。',
    steps: [
      { title: '安装 EasyChat', description: '选择安装包或便携版，当前版本兼容 Windows。', detail: '安装版会创建桌面快捷方式；便携版解压后运行 EasyChat.exe 即可。', href: '/zh/docs/installation', action: '查看下载方式', icon: Download },
      { title: '接入翻译服务', description: '添加 AI 大模型或机器翻译服务，并测试连接。', detail: 'EasyChat 不提供第三方 API Key。需要纠错、润色、总结等功能时，建议配置 AI 大模型。', href: '/zh/docs/engine', action: '选择翻译源', icon: Settings2 },
      { title: '设置快捷键', description: '软件不预设默认快捷键，需要为常用功能自行添加。', detail: '可以先给截图翻译或输入翻译设置一个全局快捷键，并避开 Windows、输入法或其他软件已占用的组合。', href: '/zh/docs/pages/shortcuts', action: '配置快捷键', icon: Keyboard },
    ],
    memoryKicker: '轻量运行', memoryTitle: '常用功能开启后，内存占用仍保持在较低水平。', memoryIntro: '选择一个运行状态，查看 EasyChat 的参考内存占用。', memoryApprox: '约', memoryUnit: 'MB', memoryScale: '0–400 MB 状态对比', memoryNote: '以下为当前版本的参考数据。实际占用会随操作系统、加载的模型、识别语言和使用方式而变化。',
    memoryStates: [
      { id: 'idle', label: '静默运行', value: 80, displayValue: '80', description: '在后台待命，没有执行识别或翻译任务。', icon: Activity },
      { id: 'active', label: '日常使用', value: 200, displayValue: '150–200', description: '进行文本翻译、划词或写作辅助。', icon: SquarePen },
      { id: 'ocr', label: '截图 OCR', value: 300, displayValue: '300', description: '识别期间加载 OCR 模块；完成识别后会自动卸载，内存回落到日常使用水平。', icon: ScanText },
      { id: 'speech', label: '语音识别翻译', value: 400, displayValue: '400', description: '识别期间持续加载语音模型；停止识别后会释放模块，内存回落到日常使用水平。', icon: AudioLines },
    ],
    asrBenchmarkTitle: 'ASR（语音识别）纯 CPU 实时识别参考测试', asrBenchmarkDevice: 'AMD Ryzen 7 8845HS · 16 GB LPDDR5-6000', asrMemoryLabel: '内存占用', asrMemoryValue: '约 200 MB', asrCpuLabel: 'CPU 占用', asrCpuValue: '约 5–10%', asrBenchmarkNote: '这里的 200 MB 是 ASR 语音识别模块本身的参考占用；上方约 400 MB 是 EasyChat 进行语音识别翻译时的应用整体参考占用。实际表现会随语言模型、音频负载、运行环境和并发任务变化。',
    exploreKicker: '更多功能', exploreTitle: '按内容来源找功能', exploreIntro: '选择图片、文本或音视频，查看对应的处理方式。',
    allGroup: '全部',
    groups: [
      { id: 'image', label: '图片', icon: ScanText, items: [
        { title: '截图翻译', description: '识别并翻译框选区域', href: '/zh/docs/feature/screenshot-translation', icon: ScanText },
        { title: '截图取词', description: '提取、复制、解释图片文字', href: '/zh/docs/feature/image-ocr', icon: MousePointer2 },
      ] },
      { id: 'text', label: '文本', icon: SquarePen, items: [
        { title: '输入翻译', description: '翻译后写回当前输入框', href: '/zh/docs/feature/input-translation', icon: SquarePen },
        { title: '快捷翻译', description: '输入或读取选中文本', href: '/zh/docs/feature/quick-translate', icon: Languages },
        { title: '快捷纠正', description: '检查语法并给出解释', href: '/zh/docs/feature/quick-correction', icon: Check },
        { title: '划词工具栏', description: '在选中文本旁直接处理', href: '/zh/docs/feature/selection', icon: MousePointer2 },
      ] },
      { id: 'media', label: '音视频', icon: AudioLines, items: [
        { title: '实时字幕', description: '系统声音转双语字幕', href: '/zh/docs/feature/simultaneous-interpretation/asr', icon: AudioLines },
        { title: '同声传译', description: '翻译麦克风并输出音频', href: '/zh/docs/feature/simultaneous-interpretation', icon: MicSignal },
      ] },
    ],
    noticeTitle: '开始前先确认', notice: 'EasyChat 面向跨平台桌面使用，当前版本兼容 Windows。只有翻译服务需要自行申请 API Key；截图 OCR 与实时语音识别需要下载对应模型。',
    resources: '文档入口', resourceLinks: [
      { title: '快速开始', href: '/zh/docs/quickstart', icon: ArrowRight },
      { title: '页面介绍', href: '/zh/docs/pages', icon: BookOpen },
      { title: '设置说明', href: '/zh/docs/settings', icon: Settings2 },
    ],
  },
  en: {
    navFeatures: 'Features', navSetup: 'Get started', navPerformance: 'Performance', navDocs: 'Docs', github: 'GitHub', qqGroup: 'Join QQ group',
    kicker: 'Cross-platform desktop tool · Windows currently supported',
    title: 'Translate images, text, and audio. Polish, summarize, and correct writing.',
    intro: 'Capture an image, select text, or use a shortcut. For videos, live streams, and online meetings without subtitles in a language you understand, EasyChat can recognize speech and display translated subtitles in real time.',
    heroFeatures: ['Screenshot translation', 'Selected text', 'Input translation', 'Polish & summarize', 'Grammar correction', 'Speech translation', 'Live Translation'],
    primary: 'Quick start', secondary: 'Download EasyChat',
    ocrMetric: 'OCR in 80+ languages', speechMetric: 'Speech in 10 languages',
    demoLabel: 'Choose a feature', demoAction: 'Read the guide', scenario: 'Useful for', requirement: 'Requires',
    demos: [
      { id: 'screenshot', title: 'Screenshot translation', short: 'Capture an image', description: 'Capture text from a page, video, image, or application and show the translation after OCR, with support for 80+ languages.', scenario: 'Non-selectable text, subtitles, documents, and application interfaces', requirement: 'A translation service and the matching OCR model', href: '/en/docs/feature/screenshot-translation', icon: ScanText, media: screenshotDemo },
      { id: 'selection', title: 'Selection toolbar', short: 'Select text', description: 'Open a compact toolbar beside selected text to translate, correct, polish, summarize, or explain it.', scenario: 'Web pages, email, documents, and language learning', requirement: 'An AI model; machine translation is also available for standard translation', href: '/en/docs/feature/selection', icon: MousePointer2, media: selectionDemo },
      { id: 'input', title: 'Typing translation', short: 'Translate and insert', description: 'Open EasyChat from any text field, write in your preferred language, and insert the translation back into the original application.', scenario: 'Cross-language messaging, email, customer support, and games', requirement: 'A configured translation service', href: '/en/docs/feature/input-translation', icon: SquarePen, preview: 'input' },
      { id: 'translate', title: 'Quick translate', short: 'Translate on demand', description: 'Open a focused window for typed or selected text and review the translation, key terms, and dictionary details.', scenario: 'Quick lookups, short translations, and writing checks', requirement: 'A configured translation service', href: '/en/docs/feature/quick-translate', icon: Languages, media: translateDemo },
      { id: 'speech', title: 'Live subtitles', short: 'Listen to audio', description: 'Recognize audio in 10 languages and display the original text and translation in a floating subtitle window.', scenario: 'Videos, live streams, online meetings, and classes', requirement: 'An ASR model and a translation service', href: '/en/docs/feature/simultaneous-interpretation/asr', icon: AudioLines, video: '/videos/screenrecord-asr.mp4' },
      { id: 'live-translation', title: 'Live Translation', short: 'Speak and translate', description: 'Start the microphone to recognize your speech, translate it in real time, and send the result through a virtual audio device to meetings, voice chats, or streams.', scenario: 'Cross-language meetings, voice chats, demos, and live streams', requirement: 'An ASR model, a translation service, and a virtual audio driver', href: '/en/docs/feature/simultaneous-interpretation', icon: MicSignal, preview: 'live-translation' },
    ] as Demo[],
    setupKicker: 'First use', setupTitle: 'Get ready in three steps', setupIntro: 'Start with one working feature, then add OCR or speech models when needed.',
    steps: [
      { title: 'Install EasyChat', description: 'Choose an installer or portable build. The current release supports Windows.', detail: 'The installer creates a desktop shortcut. The portable build runs directly after extraction.', href: '/en/docs/installation', action: 'Installation guide', icon: Download },
      { title: 'Connect a translation service', description: 'Add an AI model or machine translation service and test the connection.', detail: 'EasyChat does not include third-party API keys. Configure an AI model for correction, polishing, summaries, and other language tools.', href: '/en/docs/engine', action: 'Choose a service', icon: Settings2 },
      { title: 'Set a shortcut', description: 'EasyChat has no default shortcuts; add your own for the features you use.', detail: 'Start with screenshot or typing translation and avoid combinations already reserved by the operating system, an input method, or another application.', href: '/en/docs/pages/shortcuts', action: 'Configure shortcuts', icon: Keyboard },
    ],
    memoryKicker: 'Lightweight by design', memoryTitle: 'Memory use stays modest, even with recognition features running.', memoryIntro: 'Choose a runtime state to see the approximate memory footprint.', memoryApprox: 'About', memoryUnit: 'MB', memoryScale: '0–400 MB state comparison', memoryNote: 'These figures are reference values for the current release. Actual usage varies with the operating system, loaded models, recognition language, and usage pattern.',
    memoryStates: [
      { id: 'idle', label: 'Idle', value: 80, displayValue: '80', description: 'Waiting in the background without an active recognition or translation task.', icon: Activity },
      { id: 'active', label: 'Everyday use', value: 200, displayValue: '150–200', description: 'Translating text, using the selection toolbar, or working with writing tools.', icon: SquarePen },
      { id: 'ocr', label: 'Screenshot OCR', value: 300, displayValue: '300', description: 'The OCR module is loaded during recognition and unloaded afterward, returning memory use to the everyday range.', icon: ScanText },
      { id: 'speech', label: 'Live speech translation', value: 400, displayValue: '400', description: 'The speech model remains loaded during recognition and is released when recognition stops, returning memory use to the everyday range.', icon: AudioLines },
    ],
    asrBenchmarkTitle: 'ASR (speech recognition) real-time CPU benchmark', asrBenchmarkDevice: 'AMD Ryzen 7 8845HS · 16 GB LPDDR5-6000', asrMemoryLabel: 'Memory usage', asrMemoryValue: 'About 200 MB', asrCpuLabel: 'CPU usage', asrCpuValue: 'About 5–10%', asrBenchmarkNote: 'The 200 MB figure refers to the ASR speech recognition module in the reference test. The approximately 400 MB figure above represents total EasyChat memory use during live speech translation. Actual results vary with the language model, audio workload, runtime environment, and concurrency.',
    exploreKicker: 'More tools', exploreTitle: 'Find a feature by input', exploreIntro: 'Choose images, text, or audio and video to see the available tools.',
    allGroup: 'All',
    groups: [
      { id: 'image', label: 'Images', icon: ScanText, items: [{ title: 'Screenshot translation', description: 'Capture and translate a selected area', href: '/en/docs/feature/screenshot-translation', icon: ScanText }, { title: 'Screenshot OCR', description: 'Extract and work with text in images', href: '/en/docs/feature/image-ocr', icon: MousePointer2 }] },
      { id: 'text', label: 'Text', icon: SquarePen, items: [{ title: 'Typing translation', description: 'Translate and insert text into the active field', href: '/en/docs/feature/input-translation', icon: SquarePen }, { title: 'Quick translate', description: 'Translate typed or selected text', href: '/en/docs/feature/quick-translate', icon: Languages }, { title: 'Quick correction', description: 'Check grammar and review explanations', href: '/en/docs/feature/quick-correction', icon: Check }, { title: 'Selection toolbar', description: 'Work directly beside selected text', href: '/en/docs/feature/selection', icon: MousePointer2 }] },
      { id: 'media', label: 'Audio & video', icon: AudioLines, items: [{ title: 'Live subtitles', description: 'Turn system audio into translated subtitles', href: '/en/docs/feature/simultaneous-interpretation/asr', icon: AudioLines }, { title: 'Live Translation', description: 'Translate microphone input and output speech', href: '/en/docs/feature/simultaneous-interpretation', icon: MicSignal }] },
    ],
    noticeTitle: 'Before you start', notice: 'EasyChat is designed for cross-platform desktop use; the current release supports Windows. Only translation services require your own API keys. OCR and real-time speech recognition require local models.',
    resources: 'Documentation', resourceLinks: [{ title: 'Quick start', href: '/en/docs/quickstart', icon: ArrowRight }, { title: 'Page guide', href: '/en/docs/pages', icon: BookOpen }, { title: 'Settings reference', href: '/en/docs/settings', icon: Settings2 }],
  },
};

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.24c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

function InputTranslationPreview({ language }: { language: Language }) {
  const zh = language === 'zh';
  return (
    <div className={`${styles.mediaEnter} absolute inset-0 grid place-items-center p-5 sm:p-8`}>
      <div className="w-full max-w-[620px] rounded-lg border border-[#315582] bg-[#0d2343] shadow-[0_24px_70px_rgba(0,0,0,.35)]">
        <div className="flex items-center justify-between border-b border-[#315582] px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-white"><SquarePen className="size-4 text-blue-300" />{zh ? '输入翻译' : 'Input translation'}</div>
          <span className="rounded border border-[#4d74a2] bg-[#132e53] px-2 py-1 text-xs text-blue-200">{zh ? '快捷键需自行设置' : 'Set your own shortcut'}</span>
        </div>
        <div className="grid gap-4 p-4 sm:p-6">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs text-[#8da9cc]"><span>{zh ? '源语言' : 'Source language'}</span><ArrowRight className="size-3.5" /><span>{zh ? '目标语言' : 'Target language'}</span></div>
          <div className="rounded-md border border-[#426995] bg-[#071a36] p-4 text-sm leading-6 text-[#dbeafe]">{zh ? '你好，想确认一下明天下午的会议时间。' : '你好，想确认一下明天下午的会议时间。'}<span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-blue-300 align-middle" /></div>
          <div className="flex items-center gap-3"><span className="h-px flex-1 bg-[#315582]" /><span className="text-[11px] font-medium text-blue-300">{zh ? '翻译完成' : 'TRANSLATED'}</span><span className="h-px flex-1 bg-[#315582]" /></div>
          <div className="rounded-md border border-blue-400/35 bg-blue-400/10 p-4 text-sm leading-6 text-white">Hello, I&apos;d like to confirm the time of tomorrow afternoon&apos;s meeting.</div>
          <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs text-[#8da9cc]">{zh ? '目标：当前输入框' : 'Target: active input field'}</span><button type="button" tabIndex={-1} className="inline-flex h-10 items-center gap-2 rounded-md bg-blue-400 px-4 text-sm font-semibold text-[#071a36]"><ArrowRight className="size-4" />{zh ? '翻译并投递' : 'Translate & insert'}</button></div>
        </div>
      </div>
    </div>
  );
}

function LiveTranslationPreview({ language, onDelivered }: { language: Language; onDelivered: (delivered: boolean) => void }) {
  const zh = language === 'zh';
  const phrase = zh
    ? { source: '我想把设计评审安排在周五上午。', translation: 'Could we move the design review to Friday morning?', incoming: 'Would Friday morning work for the design review?' }
    : { source: 'I would like to move the design review to Friday morning.', translation: '我想把设计评审安排在周五上午。', incoming: '设计评审安排在周五上午可以吗？' };
  const [isListening, setIsListening] = useState(false);
  const [progress, setProgress] = useState(0);
  const [delivered, setDelivered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const isComplete = progress === 6;
  const sourceText = phrase.source.slice(0, Math.ceil((progress / 6) * phrase.source.length));

  useEffect(() => {
    if (!isListening) return;

    if (progress === 6) {
      setIsListening(false);
      setDelivered(true);
      onDelivered(true);
      return;
    }

    const timeout = window.setTimeout(() => setProgress((value) => Math.min(value + 1, 6)), 460);
    return () => window.clearTimeout(timeout);
  }, [isListening, progress, onDelivered]);

  useEffect(() => {
    if (!isPlaying) return;
    const timeout = window.setTimeout(() => setIsPlaying(false), 4000);
    return () => window.clearTimeout(timeout);
  }, [isPlaying]);

  function toggleListening() {
    if (isComplete) {
      setProgress(0);
      setDelivered(false);
      setIsPlaying(false);
      onDelivered(false);
    }
    setIsListening((value) => !value || isComplete);
  }

  return (
    <div className={`${styles.mediaEnter} absolute inset-0 grid place-items-center p-3 sm:p-8`}>
      <div className="max-h-full w-full max-w-[650px] overflow-y-auto rounded-lg border border-[#315582] bg-[#0d2343] shadow-[0_24px_70px_rgba(0,0,0,.35)]">
        <div className="flex items-center justify-between gap-3 border-b border-[#315582] px-4 py-3">
          <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-white"><MicSignal className="size-4 shrink-0 text-blue-300" />{zh ? '同声传译' : 'Live Translation'}</div>
          <span className={`inline-flex shrink-0 items-center gap-1.5 rounded border px-2 py-1 text-[11px] font-medium ${isListening ? 'border-rose-300/50 bg-rose-300/10 text-rose-200' : 'border-[#4d74a2] bg-[#132e53] text-blue-200'}`}><span className={`size-1.5 rounded-full ${isListening ? 'animate-pulse bg-rose-300' : 'bg-blue-300'}`} />{isListening ? (zh ? '正在聆听' : 'Listening') : (zh ? '已就绪' : 'Ready')}</span>
        </div>

        <div className="grid gap-4 p-4 sm:p-6">
          <div className="rounded-md border border-[#426995] bg-[#071a36] p-3 sm:p-4">
            <div className="flex items-center justify-between gap-3 border-b border-[#315582] pb-3"><div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-full bg-[#43698f] text-[11px] font-semibold text-white">A</span><div><p className="text-xs font-semibold text-white">Alex</p><p className="text-[10px] text-[#8da9cc]">{zh ? '语音聊天' : 'Voice chat'}</p></div></div><span className="text-[10px] text-[#8da9cc]">09:41</span></div>
            <div className="mt-4 grid gap-3" aria-live="polite">
              <div className="max-w-[86%] rounded-md rounded-tl-none bg-[#173456] px-3 py-2.5 text-sm leading-5 text-[#dbeafe]"><p>{phrase.incoming}</p><span className="mt-1 block text-[10px] text-[#88a6c9]">09:41</span></div>
              {delivered && <div className="ml-auto max-w-[90%] rounded-md rounded-tr-none bg-blue-400 px-3 py-2.5 text-[#071a36] shadow-[0_8px_20px_rgba(37,99,235,.2)]">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setIsPlaying((value) => !value)} aria-label={isPlaying ? (zh ? '暂停英文语音消息' : 'Pause translated voice message') : (zh ? '播放英文语音消息' : 'Play translated voice message')} className="grid size-8 shrink-0 place-items-center rounded-full bg-[#071a36] text-blue-200 transition-colors hover:bg-[#102a4d]">{isPlaying ? <Pause className="size-3.5" /> : <Play className="ml-0.5 size-3.5 fill-current" />}</button>
                  <div className={`flex h-8 min-w-20 flex-1 items-center gap-0.5 ${isPlaying ? styles.voiceMessagePlaying : ''}`} aria-hidden="true">{[9, 15, 22, 12, 19, 25, 14, 20, 10].map((height, index) => <span key={index} className={styles.voiceMessageBar} style={{ '--voice-height': `${height}px`, '--voice-delay': `${index * -88}ms` } as CSSProperties} />)}</div>
                  <span className="shrink-0 font-mono text-[11px] font-semibold tabular-nums">0:04</span>
                </div>
                <div className="mt-2 border-t border-[#173b63]/25 pt-2"><p className="text-sm font-medium leading-5">{phrase.translation}</p><span className="mt-1 flex items-center gap-1 text-[10px] text-[#173b63]"><Volume2 className="size-3" />{zh ? '中文 → 英文 · 已翻译发送' : 'English voice · translated and sent'}</span></div>
              </div>}
            </div>
          </div>

          <div className="rounded-md border border-blue-400/35 bg-blue-400/10 p-3 sm:p-4">
            <div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-blue-200"><Mic className="size-3.5" />{zh ? '你正在说中文' : 'You are speaking English'}</span><span className="font-mono text-[11px] text-blue-300">{Math.round((progress / 6) * 100)}%</span></div>
            <div className={`mt-2 flex h-8 items-center gap-1 ${isListening ? styles.translationWaveActive : ''}`} aria-hidden="true">{[14, 24, 36, 19, 31, 42, 25, 17, 33, 22, 38, 16, 28].map((height, index) => <span key={index} className={styles.translationWaveBar} style={{ '--wave-height': `${height}px`, '--wave-delay': `${index * -72}ms` } as CSSProperties} />)}</div>
            <p className="mt-1 min-h-6 text-sm leading-6 text-white">{sourceText || (zh ? '点击麦克风，说出你的回复。' : 'Select the microphone and speak your reply.')}<span className={`ml-0.5 inline-block h-4 w-px bg-blue-200 align-middle ${isListening ? 'animate-pulse' : 'opacity-0'}`} /></p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#315582] pt-4">
            <span className="text-xs text-[#8da9cc]">{delivered ? (zh ? '英文语音已发送给 Alex' : 'Translated voice sent to Alex') : (zh ? '松开后自动翻译并发送' : 'Translation sends automatically when complete')}</span>
            <button type="button" onClick={toggleListening} className={`inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold transition-colors ${isListening ? 'bg-rose-300 text-[#3a0a1d] hover:bg-rose-200' : 'bg-blue-400 text-[#071a36] hover:bg-blue-300'}`}><span className="grid size-5 place-items-center rounded-full bg-black/10">{isListening ? <Pause className="size-3.5" /> : <Mic className="size-3.5" />}</span>{isListening ? (zh ? '停止说话' : 'Stop speaking') : (isComplete ? (zh ? '再次发送语音' : 'Send another voice reply') : (zh ? '按住说话' : 'Hold to speak'))}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeExperience({ language }: { language: Language }) {
  const t = copy[language];
  const alternateLanguage = language === 'zh' ? 'en' : 'zh';
  const [activeDemo, setActiveDemo] = useState(0);
  const [liveTranslationDelivered, setLiveTranslationDelivered] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeMemory, setActiveMemory] = useState(0);
  const [activeGroup, setActiveGroup] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const demo = t.demos[activeDemo];
  const step = t.steps[activeStep];
  const memory = t.memoryStates[activeMemory];
  const group = activeGroup === 0 ? null : t.groups[activeGroup - 1];
  const visibleItems = group
    ? group.items
    : Array.from(
        new Map(t.groups.flatMap((item) => item.items).map((item) => [item.title, item])).values(),
      );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function selectDemo(index: number) {
    setActiveDemo(index);
    setLiveTranslationDelivered(false);
  }

  function handleDemoKeys(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = (index + direction + t.demos.length) % t.demos.length;
    selectDemo(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="min-h-dvh overflow-x-hidden bg-[#f5f8fc] text-[#10213b] selection:bg-blue-300 selection:text-[#07162f]">
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${scrolled || menuOpen ? 'border-[#244a78] bg-[#071a36]/95 backdrop-blur-xl' : 'border-transparent bg-transparent'}`}>
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-8">
          <Link href={`/${language}`} className="flex min-h-11 items-center gap-3 text-white" aria-label="EasyChat home">
            <span className="grid size-9 overflow-hidden rounded-md bg-white"><Image src="/easychat-logo.png" alt="" width={36} height={36} className="size-9 object-cover" priority /></span>
            <span className="text-base font-semibold">EasyChat</span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-[#bfd3ed] md:flex" aria-label="Primary navigation">
            <a href="#features" className="inline-flex min-h-10 items-center gap-2 hover:text-white"><Sparkles className="size-3.5" />{t.navFeatures}</a>
            <a href="#setup" className="inline-flex min-h-10 items-center gap-2 hover:text-white"><Settings2 className="size-3.5" />{t.navSetup}</a>
            <a href="#performance" className="inline-flex min-h-10 items-center gap-2 hover:text-white"><Cpu className="size-3.5" />{t.navPerformance}</a>
            <Link href={`/${language}/docs`} className="inline-flex min-h-10 items-center gap-2 hover:text-white"><BookOpen className="size-3.5" />{t.navDocs}</Link>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Link href={`/${alternateLanguage}`} onClick={() => setLanguagePreference(alternateLanguage)} className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm text-[#bfd3ed] hover:bg-white/10 hover:text-white"><Image src={language === 'zh' ? '/us.png' : '/cn.png'} alt="" width={18} height={12} className="h-3 w-[18px] rounded-[2px] object-cover" />{language === 'zh' ? 'English' : '中文'}</Link>
            {language === 'zh' && <a href={qqGroupUrl} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-md border border-[#426995] bg-[#16365f] px-3 text-sm font-medium text-white hover:bg-[#1e4d83]" aria-label={t.qqGroup}><MessagesSquare className="size-4" />{t.qqGroup}</a>}
            <a href="https://github.com/SwaggyMacro/EasyChat" target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-md border border-[#426995] px-3 text-sm font-medium text-white hover:bg-white/10"><GitHubIcon className="size-4" />{t.github}</a>
          </div>
          <button type="button" className="grid size-11 place-items-center rounded-md text-white md:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
        {menuOpen && <div className="border-t border-[#244a78] bg-[#071a36] px-5 pb-5 md:hidden"><nav className="grid pt-3 text-sm text-white"><a href="#features" onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center gap-3"><Sparkles className="size-4 text-blue-300" />{t.navFeatures}</a><a href="#setup" onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center gap-3"><Settings2 className="size-4 text-blue-300" />{t.navSetup}</a><a href="#performance" onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center gap-3"><Cpu className="size-4 text-blue-300" />{t.navPerformance}</a><Link href={`/${language}/docs`} className="flex min-h-11 items-center gap-3"><BookOpen className="size-4 text-blue-300" />{t.navDocs}</Link><div className="mt-2 flex flex-wrap gap-3"><Link href={`/${alternateLanguage}`} onClick={() => setLanguagePreference(alternateLanguage)} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#426995] px-4"><Image src={language === 'zh' ? '/us.png' : '/cn.png'} alt="" width={18} height={12} className="h-3 w-[18px] rounded-[2px] object-cover" />{language === 'zh' ? 'English' : '中文'}</Link>{language === 'zh' && <a href={qqGroupUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#426995] px-4" aria-label={t.qqGroup}><MessagesSquare className="size-4" />{t.qqGroup}</a>}<a href="https://github.com/SwaggyMacro/EasyChat" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#426995] px-4"><GitHubIcon className="size-4" />GitHub</a></div></nav></div>}
      </header>

      <main>
        <section className="relative overflow-hidden bg-[#071a36] pb-16 pt-28 text-white lg:pb-24 lg:pt-36">
          <div className="pointer-events-none absolute inset-0 opacity-35 [background-size:48px_48px] [background-image:linear-gradient(to_right,#214b7d_1px,transparent_1px),linear-gradient(to_bottom,#214b7d_1px,transparent_1px)]" />
          <div className="relative mx-auto max-w-[1440px] px-5 lg:px-8">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <p className="flex items-center justify-center gap-3 text-xs font-semibold text-blue-300"><span className="size-2 rounded-full bg-blue-300 shadow-[0_0_20px_#60a5fa]" />{t.kicker}</p>
              <h1 className="mt-5 text-5xl font-semibold leading-none text-white sm:text-6xl lg:text-7xl">EasyChat</h1>
              <p className="mt-7 max-w-4xl text-2xl font-medium leading-snug text-[#e3efff] sm:text-3xl lg:text-4xl">{t.title}</p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#aebfda] sm:text-lg">{t.intro}</p>
              <div className="mt-7 flex max-w-4xl flex-wrap justify-center gap-2" aria-label={language === 'zh' ? 'EasyChat 功能' : 'EasyChat features'}>
                {t.heroFeatures.map((feature) => <span key={feature} className="inline-flex min-h-8 items-center rounded border border-[#365f91] bg-[#0c284e] px-3 text-xs font-medium text-[#c8dcf6]">{feature}</span>)}
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-3"><a href="#setup" className="inline-flex h-12 items-center gap-2 rounded-md bg-blue-400 px-5 text-sm font-semibold text-[#071a36] hover:bg-blue-300">{t.primary}<ArrowRight className="size-4" /></a><Link href={`/${language}/docs/installation`} className="inline-flex h-12 items-center gap-2 rounded-md border border-[#4d74a2] px-5 text-sm font-semibold text-white hover:bg-white/10"><Download className="size-4" />{t.secondary}</Link></div>
            </div>

            <div id="features" className="mt-14 scroll-mt-20 overflow-hidden rounded-lg border border-[#315582] bg-[#0c2344] shadow-[0_32px_90px_rgba(0,8,24,0.55)] lg:mt-20 lg:scroll-mt-24">
              <div className="flex min-h-11 flex-wrap items-center gap-2 border-b border-[#315582] px-4 py-2"><span className="size-2.5 rounded-full bg-[#ff6b6b]" /><span className="size-2.5 rounded-full bg-[#ffd166]" /><span className="size-2.5 rounded-full bg-[#5dd39e]" /><span className="ml-3 text-xs text-[#8da9cc]">EasyChat</span><div className="ml-auto flex flex-wrap gap-2"><span className="rounded border border-blue-300/25 bg-blue-300/10 px-2 py-1 text-[11px] text-blue-200">{t.ocrMetric}</span><span className="rounded border border-blue-300/25 bg-blue-300/10 px-2 py-1 text-[11px] text-blue-200">{t.speechMetric}</span></div></div>
              <div className="grid lg:grid-cols-[230px_minmax(0,1fr)_300px]">
                <div className="border-b border-[#315582] p-3 lg:border-b-0 lg:border-r">
                  <p className="px-3 pb-3 pt-2 text-[11px] font-semibold text-[#7fa6d5]">{t.demoLabel}</p>
                  <div role="tablist" aria-label={t.demoLabel} className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                    {t.demos.map((item, index) => { const DemoIcon = item.icon; const active = activeDemo === index; return <button key={item.id} ref={(node) => { tabRefs.current[index] = node; }} type="button" role="tab" aria-selected={active} onClick={() => selectDemo(index)} onKeyDown={(event) => handleDemoKeys(event, index)} className={`flex min-h-12 items-center gap-3 rounded-md px-3 text-left text-sm transition-colors ${active ? 'bg-blue-400 text-[#071a36]' : 'text-[#bfd3ed] hover:bg-white/7 hover:text-white'}`}><DemoIcon className="size-4 shrink-0" /><span><span className="block font-semibold">{item.title}</span><span className={`mt-0.5 hidden text-xs lg:block ${active ? 'text-[#16365f]' : 'text-[#7897bb]'}`}>{item.short}</span></span></button>; })}
                  </div>
                </div>
                <div className={`relative overflow-hidden bg-[#051225] ${demo.preview === 'live-translation' ? (liveTranslationDelivered ? 'min-h-[650px] sm:min-h-[660px]' : 'min-h-[530px] sm:min-h-[550px]') : 'min-h-[280px] sm:min-h-[390px] lg:min-h-[500px]'}`}>
                  {demo.video ? <video key={demo.id} src={demo.video} autoPlay loop muted playsInline controls preload="metadata" aria-label={`${demo.title}: ${demo.description}`} className={`${styles.mediaEnter} absolute inset-0 h-full w-full object-contain object-center`} /> : demo.media ? <Image key={demo.id} src={demo.media} alt={`${demo.title}: ${demo.description}`} fill unoptimized priority={activeDemo === 0} sizes="(max-width: 1024px) 100vw, 60vw" className={`${styles.mediaEnter} object-contain object-center`} /> : demo.preview === 'live-translation' ? <LiveTranslationPreview key={demo.id} language={language} onDelivered={setLiveTranslationDelivered} /> : <InputTranslationPreview key={demo.id} language={language} />}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(transparent,rgba(5,18,37,.72))]" />
                </div>
                <aside className="border-t border-[#315582] p-5 lg:border-l lg:border-t-0 lg:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2"><span className="inline-flex rounded border border-blue-300/30 bg-blue-300/10 px-2 py-1 text-xs font-medium text-blue-200">{demo.short}</span><span className="text-xs text-[#8da9cc]">{language === 'zh' ? '快捷键需自行设置' : 'Shortcuts are user-defined'}</span></div>
                  <h2 className="mt-6 text-xl font-semibold">{demo.title}</h2><p className="mt-3 text-sm leading-6 text-[#abc3df]">{demo.description}</p>
                  <dl className="mt-6 space-y-4 border-t border-[#315582] pt-5 text-sm"><div><dt className="text-xs text-[#7897bb]">{t.scenario}</dt><dd className="mt-1.5 leading-5 text-[#dbeafe]">{demo.scenario}</dd></div><div><dt className="text-xs text-[#7897bb]">{t.requirement}</dt><dd className="mt-1.5 leading-5 text-[#dbeafe]">{demo.requirement}</dd></div></dl>
                  <Link href={demo.href} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-200">{t.demoAction}<ArrowRight className="size-4" /></Link>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section id="setup" className="scroll-mt-20 border-y border-[#244a78] bg-[#0d284d] py-20 text-white lg:scroll-mt-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div><p className="text-xs font-semibold text-blue-300">{t.setupKicker}</p><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{t.setupTitle}</h2><p className="mt-4 max-w-md leading-7 text-[#abc3df]">{t.setupIntro}</p></div>
              <div>
                <div className="relative grid gap-3 md:grid-cols-3"><div className="absolute left-[16.5%] right-[16.5%] top-6 hidden h-px bg-[#426995] md:block" />{t.steps.map((item, index) => { const StepIcon = item.icon; const active = activeStep === index; return <button key={item.title} type="button" onClick={() => setActiveStep(index)} className={`relative z-10 min-h-28 rounded-md border p-4 text-left transition-colors ${active ? 'border-blue-400 bg-[#16416e] text-white' : 'border-[#315582] bg-[#0c2344] text-[#dbeafe] hover:border-blue-300 hover:bg-[#102d52]'}`}><span className={`grid size-11 place-items-center rounded-md border ${active ? 'border-blue-300 bg-blue-400 text-[#071a36]' : 'border-[#426995] bg-[#0d284d] text-blue-200'}`}><StepIcon className="size-5" /></span><span className="mt-4 block text-sm font-semibold">0{index + 1} · {item.title}</span></button>; })}</div>
                <div className="mt-5 grid gap-6 rounded-md border border-[#315582] bg-[#0c2344] p-6 md:grid-cols-[1fr_auto] md:items-center"><div><h3 className="text-lg font-semibold text-white">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#abc3df]">{step.description}</p><p className="mt-4 border-l-2 border-blue-400 pl-4 text-sm leading-6 text-[#c8dcf6]">{step.detail}</p></div><Link href={step.href} className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-blue-400 px-4 text-sm font-semibold text-[#071a36] hover:bg-blue-300">{step.action}<ArrowRight className="size-4" /></Link></div>
              </div>
            </div>
          </div>
        </section>

        <section id="performance" className="scroll-mt-20 border-y border-[#244a78] bg-[#091d38] py-20 text-white lg:scroll-mt-24 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <p className="text-xs font-semibold text-blue-300">{t.memoryKicker}</p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{t.memoryTitle}</h2>
                <p className="mt-4 max-w-md leading-7 text-[#9eb7d7]">{t.memoryIntro}</p>
                <p className="mt-6 max-w-md text-xs leading-5 text-[#7593b7]">{t.memoryNote}</p>
              </div>
              <div className="overflow-hidden rounded-lg border border-[#315582] bg-[#0d284d]">
                <div className="grid border-b border-[#315582] sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label={t.memoryIntro}>
                  {t.memoryStates.map((item, index) => { const StateIcon = item.icon; const active = activeMemory === index; return <button key={item.id} type="button" role="tab" aria-selected={active} onClick={() => setActiveMemory(index)} className={`flex min-h-16 items-center gap-3 border-[#315582] px-4 text-left text-sm transition-colors max-sm:border-b sm:[&:not(:last-child)]:border-r ${active ? 'bg-blue-400 text-[#071a36]' : 'text-[#bfd3ed] hover:bg-white/5 hover:text-white'}`}><StateIcon className="size-4 shrink-0" /><span className="font-semibold">{item.label}</span></button>; })}
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
                    <div><p className="text-sm text-[#8da9cc]">{memory.label}</p><p className="mt-2 flex flex-wrap items-baseline gap-2"><span className="text-sm text-blue-300">{t.memoryApprox}</span><span className="font-mono text-5xl font-semibold text-white sm:text-7xl">{memory.displayValue}</span><span className="text-lg text-[#a9c1df]">{t.memoryUnit}</span></p></div>
                    <p className="max-w-sm text-sm leading-6 text-[#b8cce5]">{memory.description}</p>
                  </div>
                  <div className="mt-8">
                    <div className="relative h-7" style={{ '--memory-width': `${(activeMemory / (t.memoryStates.length - 1)) * 100}%` } as CSSProperties}>
                      <div className="pointer-events-none absolute inset-x-0 top-2 h-3 overflow-hidden rounded-sm border border-[#426995] bg-[#071a36]"><div className={`${styles.memoryFill} h-full bg-blue-400`} /></div>
                      <input className={styles.memoryRange} type="range" min="0" max={t.memoryStates.length - 1} step="1" value={activeMemory} onChange={(event) => setActiveMemory(Number(event.currentTarget.value))} aria-label={t.memoryIntro} aria-valuetext={`${memory.label}: ${t.memoryApprox} ${memory.displayValue} ${t.memoryUnit}`} />
                    </div>
                    <div className="mt-1 grid grid-cols-4 font-mono text-[11px] text-[#6f8eb3]">{t.memoryStates.map((item, index) => <button key={item.id} type="button" onClick={() => setActiveMemory(index)} className={`min-h-8 text-center transition-colors ${activeMemory === index ? 'text-blue-200' : 'hover:text-[#abc3df]'}`}>{item.displayValue}</button>)}</div>
                    <p className="mt-3 text-right text-[11px] text-[#6f8eb3]">{t.memoryScale}</p>
                  </div>
                  {memory.id === 'speech' && <div className="mt-8 grid gap-5 border-t border-[#315582] pt-6 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-white"><Cpu className="size-4 text-blue-300" />{t.asrBenchmarkTitle}</p>
                      <p className="mt-2 font-mono text-xs text-[#7fa0c7]">{t.asrBenchmarkDevice}</p>
                      <p className="mt-3 max-w-2xl text-xs leading-5 text-[#8da9cc]">{t.asrBenchmarkNote}</p>
                    </div>
                    <dl className="grid grid-cols-2 overflow-hidden rounded-md border border-[#315582] bg-[#071a36]">
                      <div className="min-w-32 border-r border-[#315582] p-4"><dt className="text-xs text-[#7897bb]">{t.asrMemoryLabel}</dt><dd className="mt-2 text-lg font-semibold text-blue-200">{t.asrMemoryValue}</dd></div>
                      <div className="min-w-32 p-4"><dt className="text-xs text-[#7897bb]">{t.asrCpuLabel}</dt><dd className="mt-2 text-lg font-semibold text-blue-200">{t.asrCpuValue}</dd></div>
                    </dl>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#244a78] bg-[#091d38] py-20 text-white lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl"><p className="text-xs font-semibold text-blue-300">{t.exploreKicker}</p><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{t.exploreTitle}</h2><p className="mt-4 leading-7 text-[#abc3df]">{t.exploreIntro}</p></div>
            <div className="mt-9 inline-flex max-w-full overflow-x-auto rounded-md border border-[#315582] bg-[#0c2344] p-1" role="tablist" aria-label={t.exploreKicker}><button type="button" role="tab" aria-selected={activeGroup === 0} onClick={() => setActiveGroup(0)} className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded px-4 text-sm font-semibold ${activeGroup === 0 ? 'bg-blue-400 text-[#071a36]' : 'text-[#bfd3ed] hover:bg-white/10 hover:text-white'}`}><Sparkles className="size-4" />{t.allGroup}</button>{t.groups.map((item, index) => { const GroupIcon = item.icon; const tabIndex = index + 1; return <button key={item.id} type="button" role="tab" aria-selected={activeGroup === tabIndex} onClick={() => setActiveGroup(tabIndex)} className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded px-4 text-sm font-semibold ${activeGroup === tabIndex ? 'bg-blue-400 text-[#071a36]' : 'text-[#bfd3ed] hover:bg-white/10 hover:text-white'}`}><GroupIcon className="size-4" />{item.label}</button>; })}</div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{visibleItems.map((item) => { const ItemIcon = item.icon; return <Link key={item.title} href={item.href} className="group flex min-h-32 flex-col rounded-md border border-[#315582] bg-[#0c2344] p-5 hover:border-blue-300 hover:bg-[#102d52] hover:shadow-[0_12px_36px_rgba(0,8,24,.28)]"><div className="flex items-start justify-between"><span className="grid size-9 place-items-center rounded-md bg-[#16416e] text-blue-200"><ItemIcon className="size-4" /></span><ChevronRight className="size-4 text-[#8da9cc] transition-transform group-hover:translate-x-1 group-hover:text-blue-200" /></div><h3 className="mt-5 text-sm font-semibold text-white">{item.title}</h3><p className="mt-2 text-sm leading-5 text-[#abc3df]">{item.description}</p></Link>; })}</div>
          </div>
        </section>

        <section className="bg-[#0d284d] py-16 text-white lg:py-20"><div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1.15fr_.85fr] lg:px-8"><div className="rounded-md border border-[#426995] bg-[#0c2344] p-6"><p className="flex items-center gap-2 text-sm font-semibold text-blue-200"><span className="size-2 rounded-full bg-blue-300" />{t.noticeTitle}</p><p className="mt-3 max-w-2xl text-sm leading-6 text-[#abc3df]">{t.notice}</p></div><div><p className="text-xs font-semibold text-blue-300">{t.resources}</p><div className="mt-3 divide-y divide-[#315582] border-y border-[#315582]">{t.resourceLinks.map((item) => { const ResourceIcon = item.icon; return <Link key={item.title} href={item.href} className="flex min-h-12 items-center justify-between text-sm font-semibold text-[#dbeafe] hover:text-blue-200"><span className="flex items-center gap-3"><ResourceIcon className="size-4" />{item.title}</span><ChevronRight className="size-4" /></Link>; })}</div></div></div></section>
      </main>

      <footer className="border-t border-[#244a78] bg-[#071a36] text-[#abc3df]"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8"><div className="flex items-center gap-3 text-white"><span className="grid size-7 overflow-hidden rounded bg-white"><Image src="/easychat-logo.png" alt="" width={28} height={28} className="size-7 object-cover" /></span><span className="font-semibold">EasyChat</span></div><div className="flex flex-wrap gap-5"><Link href={`/${language}/docs`} className="inline-flex items-center gap-2 hover:text-white"><BookOpen className="size-4" />{t.navDocs}</Link>{language === 'zh' && <a href={qqGroupUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white" aria-label={t.qqGroup}><MessagesSquare className="size-4" />{t.qqGroup}</a>}<a href="https://github.com/SwaggyMacro/EasyChat" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><GitHubIcon className="size-4" />GitHub</a><Link href={`/${alternateLanguage}`} onClick={() => setLanguagePreference(alternateLanguage)} className="inline-flex items-center gap-2 hover:text-white"><Image src={language === 'zh' ? '/us.png' : '/cn.png'} alt="" width={18} height={12} className="h-3 w-[18px] rounded-[2px] object-cover" />{language === 'zh' ? 'English' : '中文'}</Link></div></div></footer>
    </div>
  );
}
