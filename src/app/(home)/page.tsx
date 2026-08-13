import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  AudioLines,
  BookOpen,
  Download,
  Keyboard,
  Languages,
  MousePointer2,
  ScanSearch,
  Settings2,
  TextCursorInput,
} from 'lucide-react';
import demoImage from '../../../content/docs/images/screenrecord-example.gif';

type Language = 'en' | 'zh';

type GuideLink = [string, string, string, typeof Download];

const copy = {
  en: {
    eyebrow: 'EasyChat Documentation',
    title: 'Translate what is on your screen, in your apps, and in your audio.',
    description:
      'EasyChat brings screenshot OCR, input translation, selected-text tools, real-time speech recognition, and AI text assistance into one Windows application.',
    primaryAction: 'Get started',
    secondaryAction: 'Download EasyChat',
    demoLabel: 'Screenshot translation in action',
    setupTitle: 'Start with a working translation flow',
    setupDescription: 'A provider and one shortcut are enough to translate your first piece of text. Add local models only when you need OCR or speech recognition.',
    setup: [
      ['Install EasyChat', 'Choose the installer or portable release for Windows.', '/en/docs/installation', Download],
      ['Configure a provider', 'Add an AI model or machine translation API key, then test the connection.', '/en/docs/engine', Settings2],
      ['Add a shortcut', 'Set up screenshot or input translation for the workflow you use most.', '/en/docs/pages/shortcuts', Keyboard],
    ] as GuideLink[],
    workflowsTitle: 'Choose the way you work',
    workflows: [
      ['Screenshot translation', 'Capture text from applications, videos, images, or pages that cannot be copied.', '/en/docs/feature/screenshot-translation', ScanSearch],
      ['Input translation', 'Translate text and send it back to the active input field.', '/en/docs/feature/input-translation', TextCursorInput],
      ['Selected text tools', 'Translate, correct, polish, summarize, or explain selected text.', '/en/docs/feature/selection', MousePointer2],
      ['Real-time speech recognition', 'Turn system audio into original and translated floating subtitles.', '/en/docs/pages/speech-recognition', AudioLines],
    ] as GuideLink[],
    exploreTitle: 'Find the right guide',
    explore: [
      ['Quick start', 'Complete the first-time configuration in four steps.', '/en/docs/quickstart', BookOpen],
      ['Page guide', 'Understand every destination in the application sidebar.', '/en/docs/pages', BookOpen],
      ['Settings reference', 'See what each setting changes before adjusting it.', '/en/docs/settings', Settings2],
    ] as GuideLink[],
    source: 'View source on GitHub',
  },
  zh: {
    eyebrow: 'EasyChat 文档',
    title: '翻译屏幕上的文字、正在输入的内容和系统音频。',
    description:
      'EasyChat 将截图 OCR、输入翻译、划词工具栏、实时语音识别和 AI 文本辅助集中在一个 Windows 应用中。',
    primaryAction: '开始使用',
    secondaryAction: '下载 EasyChat',
    demoLabel: '截图翻译实际效果',
    setupTitle: '先完成一条可用的翻译流程',
    setupDescription: '配置一个翻译服务并添加一个快捷键，就可以完成第一次翻译。只有在使用截图 OCR 或实时语音识别时，才需要继续下载本地模型。',
    setup: [
      ['下载安装', '选择 Windows 安装包或便携版并启动 EasyChat。', '/zh/docs/installation', Download],
      ['配置翻译源', '添加 AI 大模型或机器翻译 API Key，并测试连接。', '/zh/docs/engine', Settings2],
      ['添加快捷键', '为最常用的截图翻译或输入翻译配置全局快捷键。', '/zh/docs/pages/shortcuts', Keyboard],
    ] as GuideLink[],
    workflowsTitle: '按你的工作方式选择功能',
    workflows: [
      ['截图翻译', '识别并翻译应用、视频、图片或无法复制的页面文字。', '/zh/docs/feature/screenshot-translation', ScanSearch],
      ['输入翻译', '翻译文本后写回当前正在使用的输入位置。', '/zh/docs/feature/input-translation', TextCursorInput],
      ['划词工具栏', '翻译、纠错、润色、总结或解释选中的文本。', '/zh/docs/feature/selection', MousePointer2],
      ['实时语音识别', '把系统音频转换为原文和译文悬浮字幕。', '/zh/docs/pages/speech-recognition', AudioLines],
    ] as GuideLink[],
    exploreTitle: '继续阅读',
    explore: [
      ['快速开始', '按四个步骤完成首次配置。', '/zh/docs/quickstart', BookOpen],
      ['页面介绍', '了解软件侧边栏中每一个页面的用途。', '/zh/docs/pages', BookOpen],
      ['设置说明', '在调整配置前逐项了解每个设置的作用。', '/zh/docs/settings', Settings2],
    ] as GuideLink[],
    source: '在 GitHub 查看源代码',
  },
} satisfies Record<Language, {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  demoLabel: string;
  setupTitle: string;
  setupDescription: string;
  setup: GuideLink[];
  workflowsTitle: string;
  workflows: GuideLink[];
  exploreTitle: string;
  explore: GuideLink[];
  source: string;
}>;

function GuideCard({ item, className = '' }: { item: GuideLink; className?: string }) {
  const [title, description, href, Icon] = item;

  return (
    <Link
      href={href}
      className={`group flex min-h-40 flex-col p-6 transition-colors hover:bg-fd-muted/50 ${className}`}
    >
      <Icon className="size-5 text-emerald-600 dark:text-emerald-400" />
      <h3 className="mt-7 text-base font-semibold text-fd-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{description}</p>
      <ArrowRight className="mt-auto size-4 self-end text-fd-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-fd-foreground" />
    </Link>
  );
}

export default function HomePage({ language = 'en' }: { language?: Language }) {
  const content = copy[language];
  const docsPath = `/${language}/docs`;

  return (
    <main className="flex-1 bg-fd-background">
      <section className="overflow-hidden bg-fd-foreground text-fd-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8 lg:py-20">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 text-sm font-medium text-emerald-300">
              <span className="size-2 rounded-full bg-emerald-300" />
              {content.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">
              {content.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-fd-background/70">{content.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={docsPath}
                className="inline-flex h-11 items-center gap-2 bg-emerald-300 px-5 text-sm font-semibold text-fd-foreground transition-colors hover:bg-emerald-200"
              >
                {content.primaryAction}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href={`/${language}/docs/installation`}
                className="inline-flex h-11 items-center gap-2 border border-fd-background/30 px-5 text-sm font-semibold text-fd-background transition-colors hover:bg-fd-background/10"
              >
                <Download className="size-4" />
                {content.secondaryAction}
              </Link>
            </div>
          </div>

          <figure className="relative overflow-hidden border border-fd-background/20 bg-fd-background/10 shadow-2xl">
            <figcaption className="flex items-center gap-2 border-b border-fd-background/20 px-4 py-3 text-sm font-medium text-fd-background/80">
              <ScanSearch className="size-4 text-emerald-300" />
              {content.demoLabel}
            </figcaption>
            <Image
              src={demoImage}
              alt={content.demoLabel}
              unoptimized
              className="block aspect-video w-full object-cover object-top"
            />
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">01 / FIRST RUN</p>
          <h2 className="mt-3 text-2xl font-semibold text-fd-foreground">{content.setupTitle}</h2>
          <p className="mt-3 leading-7 text-fd-muted-foreground">{content.setupDescription}</p>
        </div>
        <div className="mt-8 grid border-y border-fd-border md:grid-cols-3 md:divide-x">
          {content.setup.map((item, index) => (
            <div key={item[0]} className="relative">
              <span className="absolute left-6 top-6 z-10 text-sm font-medium text-emerald-700 dark:text-emerald-400">0{index + 1}</span>
              <GuideCard item={item} className="pl-16" />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-fd-border bg-fd-muted/35">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">02 / WORKFLOWS</p>
              <h2 className="mt-3 text-2xl font-semibold text-fd-foreground">{content.workflowsTitle}</h2>
            </div>
            <Link href={`/${language}/docs/feature`} className="hidden items-center gap-2 text-sm font-semibold text-fd-foreground hover:text-emerald-700 sm:inline-flex">
              <Languages className="size-4" />
              {language === 'zh' ? '浏览全部功能' : 'Browse all features'}
            </Link>
          </div>
          <div className="mt-8 grid border-y border-fd-border sm:grid-cols-2 sm:divide-x sm:divide-y lg:grid-cols-4 lg:divide-y-0">
            {content.workflows.map((item) => <GuideCard key={item[0]} item={item} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">03 / RESOURCES</p>
            <h2 className="mt-3 text-2xl font-semibold text-fd-foreground">{content.exploreTitle}</h2>
          </div>
          <a
            href="https://github.com/SwaggyMacro/EasyChat"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-fd-foreground hover:text-emerald-700"
          >
            {content.source}
            <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="mt-8 grid border-y border-fd-border md:grid-cols-3 md:divide-x">
          {content.explore.map((item) => <GuideCard key={item[0]} item={item} />)}
        </div>
      </section>
    </main>
  );
}
