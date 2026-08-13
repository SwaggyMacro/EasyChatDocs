import Link from 'next/link';
import { ArrowRight, GitBranch, MessageSquare, Sparkles, Zap } from 'lucide-react';

import { LanguageSwitcher } from '@/components/language-switcher';

type Language = 'en' | 'zh';

const copy = {
  en: {
    eyebrow: 'Open-source AI chat workspace',
    title: 'A simpler way to build with AI.',
    description:
      'EasyChat is a practical, extensible chat application for bringing models, tools, and everyday workflows together in one focused interface.',
    docs: 'Read the docs',
    github: 'View on GitHub',
    highlights: [
      ['Connect your models', 'Bring your preferred providers into one consistent chat experience.', MessageSquare],
      ['Make it yours', 'Extend prompts, tools, and UI behavior without fighting the framework.', Sparkles],
      ['Move quickly', 'A clean foundation for prototypes, internal tools, and production ideas.', Zap],
    ] as const,
    openSource: 'Built in the open',
    openSourceDescription: 'Explore the source, follow the setup guide, and shape the next version with the community.',
  },
  zh: {
    eyebrow: '开源 AI 对话工作台',
    title: '让 AI 应用开发更简单。',
    description: 'EasyChat 是一个实用且易扩展的聊天应用，将模型、工具和日常工作流汇聚到一个专注的界面中。',
    docs: '阅读文档',
    github: '查看 GitHub',
    highlights: [
      ['连接你的模型', '把喜欢的模型服务接入统一、顺手的对话体验。', MessageSquare],
      ['按需定制', '自由扩展提示词、工具和界面行为，不被框架限制。', Sparkles],
      ['快速推进', '为原型、内部工具和生产级想法提供简洁可靠的起点。', Zap],
    ] as const,
    openSource: '在开源中持续成长',
    openSourceDescription: '查看源码、按照指南完成配置，并和社区一起塑造下一个版本。',
  },
} satisfies Record<Language, unknown>;

export default function HomePage({ language = 'en' }: { language?: Language }) {
  const content = copy[language];

  return (
    <main className="relative flex-1 overflow-hidden">
      <section className="border-b bg-fd-muted/30">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 flex items-center gap-3 text-sm font-medium text-fd-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {content.eyebrow}
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-fd-foreground sm:text-6xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-fd-muted-foreground">{content.description}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={`/${language}/docs`}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-fd-foreground px-5 text-sm font-semibold text-fd-background transition-opacity hover:opacity-85"
              >
                {content.docs}
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://github.com/SwaggyMacro/EasyChat"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-5 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-muted"
              >
                <GitBranch className="size-4" />
                {content.github}
              </a>
            </div>
          </div>

          <div className="relative rounded-2xl border border-fd-border bg-fd-background p-3 shadow-xl shadow-fd-foreground/5">
            <div className="rounded-xl border border-fd-border bg-fd-muted/50 p-5">
              <div className="mb-5 flex items-center justify-between text-xs text-fd-muted-foreground">
                <span className="font-semibold text-fd-foreground">EasyChat</span>
                <LanguageSwitcher language={language} />
              </div>
              <div className="space-y-3">
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-fd-foreground px-4 py-3 text-sm text-fd-background">
                  {language === 'zh' ? '帮我整理一下今天的工作重点' : 'Help me organize today\'s priorities'}
                </div>
                <div className="max-w-[86%] rounded-2xl rounded-bl-md border border-fd-border bg-fd-background px-4 py-3 text-sm leading-6 text-fd-foreground">
                  {language === 'zh'
                    ? '当然。我们可以先按紧急程度和影响范围梳理，再安排下一步。'
                    : 'Of course. Let\'s sort them by urgency and impact, then map the next steps.'}
                </div>
                <div className="flex items-center gap-2 pt-2 text-xs text-fd-muted-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  {language === 'zh' ? '专注于对话，也专注于行动' : 'Focused on conversation, ready for action'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {content.highlights.map(([title, description, Icon]) => (
            <article key={title} className="rounded-xl border border-fd-border bg-fd-background p-6">
              <Icon className="mb-8 size-5 text-fd-foreground" />
              <h2 className="text-base font-semibold text-fd-foreground">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-fd-border pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-fd-foreground">{content.openSource}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-fd-muted-foreground">{content.openSourceDescription}</p>
          </div>
          <a
            href="https://github.com/SwaggyMacro/EasyChat"
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-fd-foreground underline underline-offset-4 hover:opacity-70"
          >
            SwaggyMacro / EasyChat
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
