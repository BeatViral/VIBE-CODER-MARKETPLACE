import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Code2,
  GitCompare,
  Grid3X3,
  Heart,
  Layers3,
  Menu,
  MessageCircle,
  Rocket,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  UserRoundCheck,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import {
  appTeachingPairs,
  confidenceMapSections,
  expertCards,
  helpMemoryRows,
  ownerManualSections,
  studioModes,
  studioTranslations,
} from '../data/vibestudio.js';
import CtaBand from '../components/CtaBand.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { Badge, Button } from '../components/ui.jsx';
import { ComparisonList, OwnerModeDashboard, VibeStudioProductGallery, VibeStudioWorkspaceMock } from '../components/VibeStudioMock.jsx';
import { ConfidenceMapPanel, ConversationPanel, HelpMemoryDashboard, VibeGuideInterface } from '../components/VibeGuideMock.jsx';

export default function VibeStudioPage() {
  return (
    <section className="relative z-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[.92fr_1.08fr] lg:px-8 lg:py-20">
        <div className="reveal">
          <Badge tone="amber" icon={Sparkles}>
            Second product
          </Badge>
          <h1 className="mt-6 font-display text-6xl font-bold leading-tight text-white sm:text-8xl">VibeStudio</h1>
          <p className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
            Build it. Ship it. <span className="gradient-text">Own it. Forever.</span>
          </p>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-zinc-200">
            The no-jargon build environment for domain experts.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            VibeStudio is where domain experts build real apps without code, without developer dependency, and without
            being abandoned after launch.
          </p>
          <div className="mt-6 max-w-2xl rounded-lg border border-cyanNeon/20 bg-cyanNeon/10 p-5 text-sm leading-7 text-zinc-200">
            Most AI tools help you create software. VibeStudio helps you understand, maintain, update, hand over, and
            own it.
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button to="/vibestudio" icon={Rocket}>
              Explore VibeStudio
            </Button>
            <Button to="/vibestudio#vibeguide" variant="ghost" icon={MessageCircle}>
              Meet VibeGuide
            </Button>
            <Button to="/builders" variant="ghost" icon={Sparkles}>
              Join the Waitlist
            </Button>
            <Button to="/vibestudio#how-it-works" variant="ghost" icon={Workflow}>
              See How It Works
            </Button>
          </div>
        </div>
        <VibeStudioWorkspaceMock />
      </div>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Why VibeStudio exists"
          title="Coding has evolved into language. But most coding tools still speak like coding tools."
          text="AI has changed how software gets built. A person can describe an app in plain language and AI can help generate the code, but most tools still drop non-coders back into files, errors, dependencies, frameworks, terminals, APIs, commits, environment variables, deployment settings, and build logs."
        />
        <div className="grid gap-5 lg:grid-cols-[1fr_.72fr]">
          <div className="feature-card reveal">
            <p className="text-lg leading-9 text-zinc-300">
              For non-coders, that is where the fear begins. VibeStudio is built for people who know the problem, not
              the jargon. It does not just let you talk to AI. It makes the entire build environment understandable.
            </p>
            <p className="mt-6 text-lg leading-9 text-zinc-300">
              Because if the future of coding is language, the future of the IDE must be plain English.
            </p>
          </div>
          <div className="pull-quote reveal">
            Coding has evolved into language. Now the environment has to evolve too.
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="No-jargon environment"
          title="No jargon. No mystery code. No abandoned app."
          text="VibeStudio does not hide complexity. It translates it. You still get serious software, but the environment speaks in words a real owner can understand."
        />
        <div className="translation-grid reveal">
          {studioTranslations.map(([technical, plain]) => (
            <div key={technical} className="translation-row">
              <span>{technical}</span>
              <ArrowRight className="size-4 text-cyanNeon" />
              <strong>{plain}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Different from AI IDEs"
          title="Most tools help you build. VibeStudio helps you own."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <ComparisonList
            title="Other AI coding tools"
            muted
            items={[
              'Help you generate an app',
              'Focus on code, files, previews, and deployment',
              'Assume you can interpret technical errors',
              'Often stop at launch',
              'Leave maintenance unclear',
              'Make ownership feel fragile',
            ]}
          />
          <ComparisonList
            title="VibeStudio"
            items={[
              'Starts with your lived experience',
              'Builds from real-world workflows',
              'Explains every part in plain English',
              'Creates an Owner Manual automatically',
              'Shows what can break and how to maintain it',
              'Creates handover packs and safe update flows',
            ]}
          />
        </div>
        <div className="reveal mt-8 rounded-lg border border-amberSignal/25 bg-amberSignal/10 p-6 text-center font-display text-3xl font-bold text-white">
          Build is only half the product. Ownership is the other half.
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Product preview"
          title="VibeStudio is a workspace, not a wall of prompts."
          text="Each product layer has a visible interface: maps, prompts, dashboards, manuals, handover packs, and help memory."
        />
        <VibeStudioProductGallery />
      </section>

      <section id="how-it-works" className="section-shell">
        <SectionHeader
          eyebrow="Six modes"
          title="The six modes of VibeStudio"
          text="Each mode turns lived experience into an understandable product, then keeps the owner in control after launch."
        />
        <div className="grid gap-5">
          {studioModes.map((mode, index) => (
            <article key={mode.name} className="studio-mode-card reveal">
              <div>
                <span className="number-mark">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 font-display text-3xl font-bold text-white">
                  {mode.name === 'VibeGuide' ? (
                    <>
                      VibeGuide<sup className="ml-1 text-base text-amberSignal">&trade;</sup>
                    </>
                  ) : (
                    mode.name
                  )}
                </h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{mode.text}</p>
                <p className="mt-5 border-l-2 border-cyanNeon/70 pl-4 text-sm font-bold leading-6 text-cyanNeon">
                  {mode.phrase}
                </p>
              </div>
              <div className="studio-fields">
                {mode.fields.map((field) => (
                  <span key={field}>{field}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="owner-mode" className="section-shell">
        <SectionHeader
          eyebrow="Owner Mode"
          title="Owner Mode is the missing layer every AI IDE forgot."
          text="Most AI coding tools behave like: Here is your app. Good luck. That is not enough for non-coders. The bigger fear is what happens after it is built."
        />
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="feature-card reveal">
            {[
              'Who updates it?',
              'What breaks if something changes?',
              'What does it cost to run?',
              'Where is the data?',
              'What services does it depend on?',
              'What should never be touched?',
              'How do you ask AI to change it safely?',
            ].map((question) => (
              <div key={question} className="question-row">
                <MessageCircle className="size-4 text-cyanNeon" />
                <span>{question}</span>
              </div>
            ))}
          </div>
          <OwnerModeDashboard />
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Safe Update Flow"
          title="Update without breaking everything."
          text="For non-coders, changing an app after launch can feel dangerous. VibeStudio plans, explains, tests, and makes every change reversible."
        />
        <div className="safe-flow reveal">
          {[
            'Describe the change in plain English',
            'Identify affected pages, saved information, and outside services',
            'Explain what might break',
            'Create a safe checkpoint',
            'Apply the change',
            'Run the plain-English test checklist',
            'Launch or go back to the last safe version',
          ].map((step, index) => (
            <div key={step} className="safe-step">
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
        <div className="prompt-card reveal">
          <p className="text-xs font-bold uppercase text-amberSignal">Generated safe prompt</p>
          <p className="mt-3 text-base leading-8 text-zinc-200">
            "I want to add a new booking field. First inspect the current app structure, identify affected pages and
            saved information, explain the plan in plain English, then wait for approval before editing."
          </p>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Owner Manual"
          title="Every app gets an Owner Manual."
          text="This is not technical documentation written for engineers. It is a plain-English guide that helps the owner understand the product, maintain it, update it, and hand it over safely."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
          <div className="owner-manual reveal">
            <div className="manual-toolbar">
              <span>Owner Manual</span>
              <Badge tone="green" icon={CheckCircle2}>
                Living doc
              </Badge>
            </div>
            <h3>KitchenDrop owner guide</h3>
            <p>Plain-English product map, service list, risks, tests, and safe future prompts.</p>
            <div className="manual-lines">
              {ownerManualSections.slice(0, 8).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            {ownerManualSections.map((item) => (
              <div key={item} className="manual-section-chip reveal">
                <CheckCircle2 className="size-4 text-acid" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vibeguide" className="section-shell">
        <div className="vibeguide-shell reveal">
          <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
            <div>
              <Badge tone="amber" icon={MessageCircle}>
                Special feature
              </Badge>
              <h2 className="mt-6 font-display text-5xl font-bold leading-tight text-white sm:text-7xl">
                VibeGuide<sup className="ml-1 text-2xl text-amberSignal sm:text-3xl">&trade;</sup>
              </h2>
              <p className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
                Help that learns how you learn.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                Old help systems answer questions. VibeGuide learns the person asking them.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
                It is a dedicated help conversation inside VibeStudio that understands your app, your project stage,
                your past questions, your repeated stuck points, your skill level, and what you are trying to do next.
              </p>
              <div className="mt-7 rounded-lg border border-cyanNeon/25 bg-cyanNeon/10 p-5 font-display text-2xl font-bold text-white shadow-cyan">
                Help should not be a manual. Help should be a memory.
              </div>
            </div>
            <VibeGuideInterface />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Two conversations"
          title="Two conversations. Two different jobs."
          text="Building and understanding should not be trapped in the same chat."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <ConversationPanel
            title="Build Conversation"
            description="This is where the user talks to AI to create or change the app."
            items={[
              'Add a booking page',
              'Change the dashboard',
              'Create a customer form',
              'Generate the Owner Manual',
              'Prepare a Codex prompt',
              'Build the next feature',
            ]}
          />
          <ConversationPanel
            title="Help Conversation"
            highlight
            description="This is where the user learns, understands, and gets unstuck."
            items={[
              'Explain this like I am not technical',
              'Why did this break?',
              'Have I asked this before?',
              'What do I keep getting stuck on?',
              'Am I safe to change this?',
              'I am scared to touch this',
            ]}
          />
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Help Memory"
          title="VibeGuide remembers what confused you, so it can help you grow."
          text="Most tools treat every help question like a one-off. VibeGuide keeps a running memory of the user's learning journey."
        />
        <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <HelpMemoryDashboard items={helpMemoryRows} />
          <div className="grid gap-4">
            {[
              'Repeated questions',
              'Topic frequency',
              'Last asked date',
              'Unresolved confusion',
              'Confidence level',
              'Project area affected',
              'Explanations that helped',
              'Topics the user stopped asking about',
            ].map((item) => (
              <div key={item} className="memory-chip reveal">
                <Bookmark className="size-4 text-amberSignal" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Builder Confidence Map"
          title="Your Builder Confidence Map"
          text="VibeGuide turns your behaviour into a private confidence map. It shows what you are comfortable with, what still needs guidance, and what to learn next."
        />
        <ConfidenceMapPanel sections={confidenceMapSections} />
        <div className="reveal mt-6 rounded-lg border border-cyanNeon/25 bg-cyanNeon/10 p-6">
          <p className="text-xs font-bold uppercase text-cyanNeon">Recommended next lesson</p>
          <p className="mt-2 font-display text-3xl font-bold text-white">How your app remembers information</p>
          <p className="mt-4 text-base leading-7 text-zinc-300">VibeStudio learns the builder, not just the codebase.</p>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Warm memory"
          title='"You asked this before."'
          text="When a question repeats, VibeGuide gently connects it to a previous explanation without making the owner feel stupid."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            'You asked a similar question last week when we connected Stripe. This is the same idea: secret keys are private passwords that let your app talk to outside services. This time, the key is for email instead of payments.',
            "You used to ask what deployment meant. You have launched three updates since then, so I will keep this short: this change is ready to publish, but test login first.",
          ].map((bubble) => (
            <div key={bubble} className="guide-bubble reveal">
              <MessageCircle className="size-5 text-cyanNeon" />
              <p>{bubble}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Teach me from my own app"
          title="Generic lessons are not enough."
          text="VibeGuide does not teach generic software lessons. It explains concepts using the user's actual project."
        />
        <div className="grid gap-5">
          {appTeachingPairs.map(([generic, guide]) => (
            <div key={generic} className="app-teaching-row reveal">
              <div>
                <span>Generic help says</span>
                <p>{generic}</p>
              </div>
              <ArrowRight className="size-5 text-cyanNeon" />
              <div>
                <span>VibeGuide says</span>
                <p>{guide}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Change memory"
          title="Explain what changed since I last understood it"
          text="As apps evolve, non-coders lose confidence because they no longer know what changed. VibeGuide can summarise changes in plain English."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            'Since your last owner review, we added the builder filter, changed the profile cards, created the VibeStudio page, and updated the navigation. No payment, login, or saved information logic was changed.',
            'This update changed checkout and order confirmation. Test payments, customer emails, and the admin order view before launch.',
          ].map((item) => (
            <div key={item} className="change-summary-card reveal">
              <GitCompare className="size-5 text-amberSignal" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="fear-button-panel reveal">
          <div>
            <Badge tone="coral" icon={ShieldCheck}>
              Safety button
            </Badge>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
              "I am scared to touch this."
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
              This is an actual help button inside VibeStudio. VibeGuide explains what the thing is, why it matters,
              whether it is safe to change, what could break, what to test after, and whether to ask a builder for help.
            </p>
          </div>
          <div className="fear-response">
            <p className="text-xs font-bold uppercase text-coral">VibeGuide response</p>
            <p>
              This touches payments, so we should slow down. I recommend creating a safe checkpoint first. After the
              change, test checkout, order confirmation, and admin payment status. Nothing should be launched until
              those pass.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Human learning moat"
          title="Help that knows the app and the person"
          text="Most AI tools focus on the codebase. VibeGuide focuses on the app, the owner, the owner's understanding, the project stage, repeated questions, and confidence gaps."
        />
        <div className="reveal rounded-lg border border-amberSignal/30 bg-amberSignal/10 p-7 text-center shadow-coral">
          <p className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
            Every app can add AI chat. Very few help systems learn the human building it.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="cta-band reveal">
          <Badge tone="amber" icon={Sparkles}>
            VibeGuide<sup>&trade;</sup>
          </Badge>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
            Help that does not just answer you. It learns you.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
            VibeGuide is the dedicated help conversation for non-coders who want to understand, maintain, and own what
            they build.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/vibestudio#owner-mode" icon={ShieldCheck}>
              Explore Owner Mode
            </Button>
            <Button to="/builders" variant="ghost" icon={Sparkles}>
              Join the VibeStudio Waitlist
            </Button>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Built for domain experts"
          title="Built for people who know the problem, not the jargon."
          text="VibeStudio does not ask you to think like a developer. It asks you to think like the person who has lived the problem."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {expertCards.map(([who, what]) => (
            <div key={who} className="expert-card reveal">
              <Sparkles className="size-5 text-amberSignal" />
              <h3>{who}</h3>
              <p>building {what}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Ecosystem"
          title="Marketplace finds the builder. VibeStudio keeps the build alive."
          text="Together, Vibe Coder Marketplace and VibeStudio create a new ecosystem: find the right builder, build from real-world experience, ship the first useful version, understand what was built, maintain it safely, and own it forever."
        />
        <div className="ecosystem-flow reveal">
          {['Vibe Coder Marketplace', 'VibeStudio', 'Owner Mode', 'VibeGuide', 'Handover Pack', 'Long-term ownership'].map((item, index) => (
            <div key={item} className="ecosystem-node">
              <span>{index + 1}</span>
              <p>
                {item === 'VibeGuide' ? (
                  <>
                    VibeGuide<sup>&trade;</sup>
                  </>
                ) : (
                  item
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Defensibility"
          title="The moat is not only code generation. The moat is ownership and learning memory."
          text="VibeStudio does not just understand the app. It understands the owner's relationship with the app: what they asked before, where they keep getting stuck, what they have learned, and what they need explained next."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <ComparisonList
            title="Before the code"
            items={[
              'Extracts the real-world problem from lived experience',
              'Maps workflows before screens',
              'Asks what a generic coder would miss',
              'Identifies the first useful version',
            ]}
          />
          <ComparisonList
            title="After the code"
            items={[
              'Explains the app in plain English',
              'Creates the Owner Manual',
              'Tracks what can break',
              'Guides safe updates',
              'Creates handover packs',
              'Helps non-coders keep control',
              'Learns where the owner needs help next',
            ]}
          />
        </div>
        <div className="reveal mt-8 rounded-lg border border-cyanNeon/25 bg-cyanNeon/10 p-7 text-center">
          <p className="font-display text-4xl font-bold text-white">Build + Explain + Maintain + Handover.</p>
          <p className="mt-4 text-xl font-bold text-cyanNeon">Current tools generate software. VibeStudio creates software owners.</p>
          <p className="mt-3 text-lg font-bold text-amberSignal">VibeGuide helps those owners grow.</p>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="cta-band reveal">
          <Badge tone="amber" icon={Rocket}>
            VibeStudio
          </Badge>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
            Build it. Ship it. Own it. Forever.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
            VibeStudio is the no-jargon build environment for domain experts who want to turn real-world experience into
            software and keep control after launch.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/builders" icon={Sparkles}>
              Join the VibeStudio Waitlist
            </Button>
            <Button to="/" variant="ghost" icon={Search}>
              Explore Vibe Coder Marketplace
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}
