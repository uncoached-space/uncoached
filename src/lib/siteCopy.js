// Every piece of editable site copy, in one place.
//
// `text` is the original wording and acts as the fallback: if the database has
// no override (or Johanna clears a field) the site keeps showing this. That
// means adding a field here is safe — nothing breaks before it's ever edited.
//
// To make a new bit of copy editable: add an entry here, then use
// copy('its.key') in the component.

export const SITE_COPY_FIELDS = [
    // ── Home · Hero ──────────────────────────────────────────────────────
    { key: 'home.hero.title', group: 'Home — Hero', label: 'Headline', text: 'Where insight finally becomes' },
    { key: 'home.hero.title_emphasis', group: 'Home — Hero', label: 'Headline (italic ending)', text: 'lived.' },
    { key: 'home.hero.subtitle', group: 'Home — Hero', label: 'Subheadline', multiline: true, text: 'A quiet, intelligent space for integrating what you already know into real life, real moments, and real change.' },
    { key: 'home.hero.cta_primary', group: 'Home — Hero', label: 'Main button', text: 'Start Your Journey' },
    { key: 'home.hero.cta_secondary', group: 'Home — Hero', label: 'Second button', text: "What's Inside" },
    { key: 'home.hero.note', group: 'Home — Hero', label: 'Small note under buttons', text: 'App coming soon.' },

    // ── Home · How We Help You Integrate ────────────────────────────────
    { key: 'home.integrate.title', group: 'Home — How We Help You Integrate', label: 'Section heading', text: 'How We Help You Integrate' },
    { key: 'home.integrate.intro', group: 'Home — How We Help You Integrate', label: 'Intro paragraph', multiline: true, text: 'Uncoached helps insight from therapy, coaching, and inner work settle into real choices and real life, right when you need it, so you can move on with your day.' },
    { key: 'home.integrate.card1_title', group: 'Home — How We Help You Integrate', label: 'Card 1 title', text: 'Find Clarity' },
    { key: 'home.integrate.card1_body', group: 'Home — How We Help You Integrate', label: 'Card 1 text', multiline: true, text: "Get oriented with what's actually going on, without overthinking." },
    { key: 'home.integrate.card2_title', group: 'Home — How We Help You Integrate', label: 'Card 2 title', text: 'Regulate Gently' },
    { key: 'home.integrate.card2_body', group: 'Home — How We Help You Integrate', label: 'Card 2 text', multiline: true, text: 'Settle your body so your next step feels possible.' },
    { key: 'home.integrate.card3_title', group: 'Home — How We Help You Integrate', label: 'Card 3 title', text: 'Turn Insight Into Action' },
    { key: 'home.integrate.card3_body', group: 'Home — How We Help You Integrate', label: 'Card 3 text', multiline: true, text: 'Apply awareness to real decisions as they happen.' },
    { key: 'home.integrate.footnote', group: 'Home — How We Help You Integrate', label: 'Footnote', text: 'Designed to complement therapy and coaching, not replace it.' },

    // ── Home · Deeper Work ──────────────────────────────────────────────
    { key: 'home.deeper.title', group: 'Home — Deeper Work', label: 'Section heading', multiline: true, text: 'Deeper work, on your own timing' },
    { key: 'home.deeper.subtitle', group: 'Home — Deeper Work', label: 'Subheading', text: 'Because insight matters most when it becomes part of how you live.' },
    { key: 'home.deeper.body1', group: 'Home — Deeper Work', label: 'Paragraph 1', multiline: true, text: 'Uncoached offers a quiet, supportive space for integrating therapy, coaching, and personal work into specific moments in everyday life.' },
    { key: 'home.deeper.body2', group: 'Home — Deeper Work', label: 'Paragraph 2', multiline: true, text: 'No rushing. No fixing. Just tools that help awareness take root gently, privately, and at your own pace.' },
    { key: 'home.deeper.bullet1', group: 'Home — Deeper Work', label: 'Bullet 1', text: 'Building emotional resilience for real life.' },
    { key: 'home.deeper.bullet2', group: 'Home — Deeper Work', label: 'Bullet 2', text: 'Grounded tools for everyday regulation and clarity.' },
    { key: 'home.deeper.bullet3', group: 'Home — Deeper Work', label: 'Bullet 3', text: 'A judgment-free space for honest self-connection.' },
    { key: 'home.deeper.cta', group: 'Home — Deeper Work', label: 'Button', text: 'Our Approach' },

    // ── Home · What You'll Find Inside ──────────────────────────────────
    { key: 'home.services.title', group: "Home — What You'll Find Inside", label: 'Section heading', text: "What You'll Find Inside" },
    { key: 'home.services.subtitle', group: "Home — What You'll Find Inside", label: 'Subheading', text: 'Tools for moving through your days more mindfully.' },
    { key: 'home.services.intro', group: "Home — What You'll Find Inside", label: 'Intro paragraph', multiline: true, text: 'Uncoached offers a growing collection of tools designed to support you across many moments, moods, and seasons. You can reach for what you need, when you need it.' },
    { key: 'home.services.cta', group: "Home — What You'll Find Inside", label: 'Button', text: 'Unlock Everything' },
    { key: 'home.services.footnote', group: "Home — What You'll Find Inside", label: 'Footnote', text: 'Designed to complement therapy and coaching between the sessions, not replace it.' },

    // Thoughtful Resources
    { key: 'home.resources.title', group: 'Home — Thoughtful Resources', label: 'Section heading', multiline: true, text: 'Thoughtful Resources\nfor Real-Life Moments' },
    { key: 'home.resources.intro', group: 'Home — Thoughtful Resources', label: 'Intro paragraph', multiline: true, text: 'Our resources are built by Uncoached, informed by relevant research, professional expertise, and a range of reflective and spiritual perspectives, then shaped into practical support you can actually use.' },
    { key: 'home.resources.card1_title', group: 'Home — Thoughtful Resources', label: 'Highlight 1 title', text: 'The Science Behind It' },
    { key: 'home.resources.card1_body', group: 'Home — Thoughtful Resources', label: 'Highlight 1 text', multiline: true, text: 'Explore relevant research and what it tells us.' },
    { key: 'home.resources.card2_title', group: 'Home — Thoughtful Resources', label: 'Highlight 2 title', text: 'Another Perspective' },
    { key: 'home.resources.card2_body', group: 'Home — Thoughtful Resources', label: 'Highlight 2 text', multiline: true, text: 'Explore ideas from spiritual writers, teachers, and traditions.' },
    { key: 'home.resources.card3_title', group: 'Home — Thoughtful Resources', label: 'Highlight 3 title', text: 'Take It Further' },
    { key: 'home.resources.card3_body', group: 'Home — Thoughtful Resources', label: 'Highlight 3 text', multiline: true, text: 'Practical tools to use long after the moment passes.' },

    // The eight cards in the carousel. Titles support *stars* for a sage italic
    // highlight — that is what makes the "for" in Af*for*mations stand out.
    { key: 'home.services.card1_title', group: "Home — What You'll Find Inside", label: 'Card 1 title', text: "Field" },
    { key: 'home.services.card1_body', group: "Home — What You'll Find Inside", label: 'Card 1 text', multiline: true, text: "Chat with Field in real time, like reflecting with a trusted friend that helps you hear yourself more clearly, without advice or pressure." },
    { key: 'home.services.card2_title', group: "Home — What You'll Find Inside", label: 'Card 2 title', text: "Audio Breaths" },
    { key: 'home.services.card2_body', group: "Home — What You'll Find Inside", label: 'Card 2 text', multiline: true, text: "Soft, short audio practices to help regulate your nervous system and ground your body in the moment." },
    { key: 'home.services.card3_title', group: "Home — What You'll Find Inside", label: 'Card 3 title', text: "Clarity Cards" },
    { key: 'home.services.card3_body', group: "Home — What You'll Find Inside", label: 'Card 3 text', multiline: true, text: "Journaling cards with thoughtful questions and exercises to untangle your mind and spark a deeper clarity." },
    { key: 'home.services.card4_title', group: "Home — What You'll Find Inside", label: 'Card 4 title', text: "Pocket Prompts" },
    { key: 'home.services.card4_body', group: "Home — What You'll Find Inside", label: 'Card 4 text', multiline: true, text: "Structured prompt experiences that guide reflection and next steps, helping insight turn into real change over time." },
    { key: 'home.services.card5_title', group: "Home — What You'll Find Inside", label: 'Card 5 title', text: "Guided Shifts" },
    { key: 'home.services.card5_body', group: "Home — What You'll Find Inside", label: 'Card 5 text', multiline: true, text: "Short, guided experiences that help you reset your state and reconnect with yourself in the moment." },
    { key: 'home.services.card6_title', group: "Home — What You'll Find Inside", label: 'Card 6 title', help: 'Anything between *stars* shows in sage italic.', text: "Af*for*mations" },
    { key: 'home.services.card6_body', group: "Home — What You'll Find Inside", label: 'Card 6 text', multiline: true, text: "Empowering questions to ask yourself, designed to guide your brain toward supportive answers." },
    { key: 'home.services.card7_title', group: "Home — What You'll Find Inside", label: 'Card 7 title', text: "Grounding Voice Notes" },
    { key: 'home.services.card7_body', group: "Home — What You'll Find Inside", label: 'Card 7 text', multiline: true, text: "Brief, supportive voice notes offering gentle reminders of who you are in moments when you need steadiness, encouragement, or perspective." },
    { key: 'home.services.card8_title', group: "Home — What You'll Find Inside", label: 'Card 8 title', text: "More Coming Soon" },
    { key: 'home.services.card8_body', group: "Home — What You'll Find Inside", label: 'Card 8 text', multiline: true, text: "A growing space, shaped with care. New tools and experiences will be added intentionally, always with the same focus on safety, integration, and self-trust." },

    // ── Home · Meet Field ───────────────────────────────────────────────
    { key: 'home.field.title', group: 'Home — Meet Field', label: 'Section heading', text: 'Meet Field' },
    { key: 'home.field.subtitle', group: 'Home — Meet Field', label: 'Subheading', text: 'A different way to be with yourself.' },
    { key: 'home.field.body1', group: 'Home — Meet Field', label: 'Paragraph 1', multiline: true, text: 'Field is not here to coach, advise, or analyze you.' },
    { key: 'home.field.body2', group: 'Home — Meet Field', label: 'Paragraph 2', multiline: true, text: 'It listens, reflects, and stays with what you bring, helping you slow down and hear yourself more clearly in moments that matter.' },
    { key: 'home.field.body3', group: 'Home — Meet Field', label: 'Paragraph 3', multiline: true, text: 'You can talk things through, explore gentle prompts, try short grounding rituals, or simply pause and be with what is present.' },
    { key: 'home.field.body4', group: 'Home — Meet Field', label: 'Paragraph 4', multiline: true, text: 'You decide how deep to go, when to pause, and what comes next. Field follows your lead.' },
    { key: 'home.field.cta', group: 'Home — Meet Field', label: 'Button', text: 'Enter Uncoached' },
    { key: 'home.field.disclaimer', group: 'Home — Meet Field', label: 'Disclaimer', multiline: true, text: 'Field is an AI-powered companion designed to support self-led reflection, not replace human care.' },

    // ── Home · Gift ─────────────────────────────────────────────────────
    { key: 'home.gift.title', group: 'Home — Give the Gift of Calm', label: 'Section heading', text: 'Give the Gift of Calm' },
    { key: 'home.gift.subtitle', group: 'Home — Give the Gift of Calm', label: 'Subheading', text: 'Send a thoughtful gift card and support someone in their journey.' },
    { key: 'home.gift.body', group: 'Home — Give the Gift of Calm', label: 'Paragraph', multiline: true, text: 'Choose a stress-free, meaningful gift for the ones in your life who crave more self-connection.' },
    { key: 'home.gift.cta', group: 'Home — Give the Gift of Calm', label: 'Button', text: 'Send a Gift Card Now' },
    { key: 'home.gift.redeem_link', group: 'Home — Give the Gift of Calm', label: 'Redeem link (under the button)', text: 'Received a gift card? Redeem it here' },

    // ── Home · Newsletter ───────────────────────────────────────────────
    { key: 'home.subscribe.title', group: 'Home — Newsletter', label: 'Heading', text: 'Not another newsletter.' },
    { key: 'home.subscribe.body', group: 'Home — Newsletter', label: 'Paragraph', multiline: true, text: "Sign up to receive thoughtful reflections that support real integration. From gentle affirmations and grounding voice notes to early access to new behind-the-scenes tools and Field's powerful features." },
    { key: 'home.subscribe.cta', group: 'Home — Newsletter', label: 'Button', text: 'Stay Connected' },
    { key: 'home.subscribe.success', group: 'Home — Newsletter', label: 'Thank-you message', text: "You're in. Thank you for staying connected. 🌿" },


    // ── About ───────────────────────────────────────────────────────────
    { key: 'about.hero.title', group: 'About — Hero', label: 'Headline (line 1)', text: "It's not about what you know." },
    { key: 'about.hero.title_emphasis', group: 'About — Hero', label: 'Headline (italic line 2)', text: "It's about how you live." },
    { key: 'about.hero.intro', group: 'About — Hero', label: 'Intro line', text: 'Uncoached is for people who have genuinely tried:' },
    { key: 'about.hero.checklist', group: 'About — Hero', label: 'Checklist (things people have tried)', multiline: true, list: true, rows: 4, help: 'One item per line.', text: 'The therapy.\nThe books.\nThe courses.\nThe podcasts.' },
    { key: 'about.hero.closing', group: 'About — Hero', label: 'Closing line', multiline: true, text: 'And yet, in the middle of real life, it often feels hard to actually live them.' },
    { key: 'about.hero.cta', group: 'About — Hero', label: 'Button', text: 'Start Your Journey' },

    { key: 'about.gap.title', group: 'About — The Gap', label: 'Section heading', text: 'The Gap No One Talks About' },
    { key: 'about.gap.intro', group: 'About — The Gap', label: 'Intro', multiline: true, text: 'Most personal growth focuses on understanding. But understanding alone does not create change.' },
    { key: 'about.gap.emphasis', group: 'About — The Gap', label: 'Emphasised line', text: 'Change happens in ordinary moments.' },
    { key: 'about.gap.moments', group: 'About — The Gap', label: 'Moment cards', multiline: true, list: true, rows: 4, help: 'One card per line.', text: "When emotions rise unexpectedly.\nWhen old patterns return.\nWhen something feels good and you want to stay with it.\nWhen something feels heavy and you don't want it to derail your life." },
    { key: 'about.gap.support', group: 'About — The Gap', label: 'Boxed text', multiline: true, rows: 3, help: 'Anything between *stars* is emphasised.', text: "Without support in those moments, even the deepest insights fade.\n*Not because you're failing. But because integration was never built into the process.*" },
    { key: 'about.gap.closing', group: 'About — The Gap', label: 'Closing line', multiline: true, text: 'You don\'t need more advice, you need something that helps you come back to yourself in the moment.' },

    { key: 'about.why.title', group: 'About — Why Uncoached Exists', label: 'Section heading', text: 'Why Uncoached Exists' },
    { key: 'about.why.body1', group: 'About — Why Uncoached Exists', label: 'Paragraph 1', multiline: true, text: 'Uncoached was created as a response to a culture of outsourced authority, endless consumption, and the belief that discomfort needs to be eliminated rather than understood;' },
    { key: 'about.why.body2', group: 'About — Why Uncoached Exists', label: 'Paragraph 2', multiline: true, text: 'One that prioritises insight over integration, hierarchy over self-trust, and fixing emotions instead of learning how to live with them.' },
    { key: 'about.why.emphasis', group: 'About — Why Uncoached Exists', label: 'Closing emphasis', multiline: true, text: 'Uncoached exists to support the part of the journey that usually happens alone.' },

    { key: 'about.shift.title', group: 'About — The Shift', label: 'Section heading', text: 'The Shift' },
    { key: 'about.shift.intro', group: 'About — The Shift', label: 'Intro', text: 'When support becomes available in real time, something changes.' },
    { key: 'about.shift.point1', group: 'About — The Shift', label: 'Point 1', text: 'You stop treating “bad” moments as problems.' },
    { key: 'about.shift.point2', group: 'About — The Shift', label: 'Point 2', text: 'You stop chasing “good” moments for relief.' },
    { key: 'about.shift.point3', group: 'About — The Shift', label: 'Point 3', multiline: true, text: 'You learn how to meet whatever life brings with more steadiness, clarity, and self-trust.' },

    { key: 'about.quote', group: 'About — Core Message', label: 'Quote', multiline: true, text: 'Uncoached exists to turn insight into lived experience by helping people build self-trust, repetition, and support in real time.' },

    { key: 'about.philosophy.title', group: 'About — Philosophy', label: 'Section heading', text: 'A Philosophy of Self-Leadership' },
    { key: 'about.philosophy.belief', group: 'About — Philosophy', label: 'Opening paragraph', multiline: true, help: 'Anything between *stars* is emphasised.', text: 'Uncoached is built on the belief that *you are the only one who truly understands your life*, your timing, and your inner landscape.' },
    { key: 'about.philosophy.lead', group: 'About — Philosophy', label: 'Line before the emphasised line', text: 'The work is not about becoming someone else.' },
    { key: 'about.philosophy.emphasis', group: 'About — Philosophy', label: 'Emphasised line', text: 'It is about coming home to yourself.' },
    { key: 'about.philosophy.intro', group: 'About — Philosophy', label: 'Lead-in line', multiline: true, text: 'When you learn how to support yourself in both the messy moments and the expansive ones:' },
    { key: 'about.philosophy.point1', group: 'About — Philosophy', label: 'Point 1', text: 'You stop outsourcing your authority.' },
    { key: 'about.philosophy.point_middle', group: 'About — Philosophy', label: 'Point 2', text: 'You stop waiting to be fixed.' },
    { key: 'about.philosophy.point2', group: 'About — Philosophy', label: 'Point 3', multiline: true, text: 'You start trusting your own capacity to move through life.' },

    { key: 'about.closing.title1', group: 'About — Closing', label: 'Heading 1', text: 'This Is Not For Everyone' },
    { key: 'about.closing.body1', group: 'About — Closing', label: 'Paragraph 1', multiline: true, text: 'Uncoached is not for people looking for quick fixes or answers outside themselves.' },
    { key: 'about.closing.no_pill', group: 'About — Closing', label: 'Bold line after Paragraph 1', text: 'There is no magic pill here.' },
    { key: 'about.closing.body2', group: 'About — Closing', label: 'Paragraph 2', multiline: true, text: 'It is for those who are willing to practice, stay present, and integrate what they already know into daily life until it becomes automatic.' },
    { key: 'about.closing.body3', group: 'About — Closing', label: 'Paragraph 3', multiline: true, text: 'It is for people who are ready to live their growth, not just understand it.' },
    { key: 'about.closing.title2', group: 'About — Closing', label: 'Heading 2', text: 'A Quiet Invitation' },
    { key: 'about.closing.invite1', group: 'About — Closing', label: 'Invitation 1', text: 'If you feel tired of consuming and ready to embody.' },
    { key: 'about.closing.invite2', group: 'About — Closing', label: 'Invitation 2', multiline: true, text: 'If you want support that meets you in real life, not just in theory.' },
    { key: 'about.closing.invite3', group: 'About — Closing', label: 'Invitation 3', text: 'If you are ready to become your own most trusted guide.' },
    { key: 'about.closing.signoff', group: 'About — Closing', label: 'Gold sign-off line', text: 'Uncoached is here.' },
    { key: 'about.closing.cta', group: 'About — Closing', label: 'Button', text: 'Start Your Journey' },

    // ── Legal pages — whole documents, so sections can be added freely ───
    { key: 'legal.terms.effective', group: 'Legal — Terms of Use', label: 'Effective date line', text: 'Effective: August 2025' },
    { key: 'legal.terms.version', group: 'Legal — Terms of Use', label: 'Version (recorded when a member accepts)', help: 'Changing this asks every member to accept again. Use 1.0, 1.1, and so on. Leave it for small typo fixes.', text: '1.0' },
    {
        key: 'legal.terms.body', group: 'Legal — Terms of Use', label: 'Full document', document: true,
        help: 'Start a line with ## to make it a heading. Leave a blank line between paragraphs.',
        text: `Welcome to Uncoached, a product of Emergyng Energy (a sole proprietorship registered in Canada). These Terms of Use govern your access to and use of our digital tools, including Field, our AI companion, and the Clarity Toolkit.

## 1. Acceptance of Terms
By using our website and digital tools, and downloadable resources (“Services”), you agree to be bound by these Terms of Use. If you do not agree, please do not use the site.

## 2. Description of Services & Disclaimers
Uncoached offers self-guided digital wellness tools, including downloadable content and AI-powered reflections. Our tools are designed to support personal reflection. They are not a substitute for professional therapy, counseling, or medical advice. Emergyng Energy is not liable for any damages, emotional or otherwise, that result from use of our tools or platform.

Our Services are for self-reflection and clarity-building only. They are not intended to diagnose, treat, or cure any condition. If you're experiencing emotional distress, please seek support from a qualified professional.

Use of Uncoached does not create a therapist-client, coach-client, healthcare provider-patient, fiduciary, or other professional relationship between you and Emergyng Energy.

Our AI assistant, Field, offers reflective conversation support but is not a therapist, coach, or licensed professional. You use Field at your own discretion, and we make no guarantees about outcomes. Field may occasionally generate inaccurate, incomplete, or inappropriate information. You should use your own judgment and should not rely on Field for medical, legal, financial, or other professional advice.

Features, tools, and content available may evolve over time as part of ongoing updates to the service.

## 3. Payment & Access
Except where required by applicable law, all sales are final. Due to the digital nature of our Services, we do not offer refunds once a payment has been processed.

Your subscription provides access to Field and the Clarity Toolkit, and other tools and add-on tools for the duration of your active billing cycle. If you choose to cancel, you will retain access until the end of your current paid month(s) or paid year. Future tools, expansions, or card bundles may be included in your subscription or offered separately at our discretion.

## 4. User Conduct
You agree not to misuse our tools. You will not share copyrighted content outside of its intended use or engage in any behavior that harms the experience for others. Reproduction, resale, redistribution, or unauthorized sharing is prohibited without written permission.

You agree not to use Field or any part of the Uncoached experience to share harmful, illegal, threatening, or abusive content. Any such use is strictly prohibited.

## 5. Intellectual Property
All content provided by Uncoached, including AI tools, printable cards, and digital experiences are owned by Emergyng Energy. You're granted a limited, non-transferable license for personal use only. Reproduction, resale, redistribution, or unauthorized sharing is prohibited without written permission.

## 6. Eligibility
You must be at least 18 years old to use Uncoached. If you are under 18, you may only use the Services with the permission and supervision of a parent or legal guardian, where permitted by applicable law.

## 7. Modifications to Terms
We may revise these Terms, including subscription pricing, at any time. Continued use of the service after changes implies acceptance of the updated terms.

## 8. Limitation of Liability
Emergyng Energy is not liable for any indirect or incidental damages, emotional or otherwise, that result from use (or inability to use) of our tools or platform.

## 9. Contact
For support, email us at hello@uncoached.space.

## 10. Governing Law
These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law principles.`
    },

    // ── Legal · User Agreement ──────────────────────────────────────────
    // Shown once, the first time a member enters the members area. Changing
    // the version below asks every member to accept again, and records it.
    { key: 'legal.agreement.version', group: 'Legal — User Agreement', label: 'Version (recorded when a member accepts)', help: 'Changing this asks every member to accept again. Use 1.0, 1.1, and so on.', text: '1.0' },
    { key: 'legal.agreement.title', group: 'Legal — User Agreement', label: 'Heading', text: 'Before you begin' },
    { key: 'legal.agreement.intro', group: 'Legal — User Agreement', label: 'Line under the heading', multiline: true, text: 'Please read and accept this to use your membership. It only takes a moment, and you will only be asked again if the wording changes.' },
    { key: 'legal.agreement.accept_label', group: 'Legal — User Agreement', label: 'Checkbox wording', multiline: true, text: 'I have read and agree to the User Agreement, the Terms of Use, the Privacy Policy and the Billing & Refunds policy.' },
    { key: 'legal.agreement.button', group: 'Legal — User Agreement', label: 'Button', text: 'I agree' },
    {
        key: 'legal.agreement.body', group: 'Legal — User Agreement', label: 'Full document', document: true,
        help: 'Start a line with ## to make it a heading, or • to make a bullet. Leave a blank line between paragraphs. Replace this with your lawyer’s wording.',
        text: `## What Uncoached is
Uncoached is a self-guided space for reflection. It is not therapy, counselling, coaching, or medical care, and it does not replace them. Nothing here is professional advice, diagnosis or treatment.

## Using it well
Uncoached is designed to support you between sessions with your own professionals. If you are struggling, please reach out to a qualified professional or your local emergency service.

## Your account
Your membership is for you alone. Please keep your sign-in details private and do not share access with anyone else.

## Field, and what you write
Field is an AI companion. It is not a person, not a professional, and its replies are not advice. Your Field conversation stays in your browser for that session only and is not stored by Uncoached.

## Practitioners
Practitioners listed on Uncoached work independently. Uncoached does not employ them and is not responsible for their services. Any arrangement you make with a practitioner is between you and them.

## Changes
If this agreement changes in a meaningful way, you will be asked to read and accept the new version the next time you sign in.`
    },

    // ── Legal · Billing & Refunds ───────────────────────────────────────
    { key: 'legal.billing.effective', group: 'Legal — Billing & Refunds', label: 'Effective date line', text: 'Effective: September 2026' },
    { key: 'legal.billing.version', group: 'Legal — Billing & Refunds', label: 'Version (recorded when a member accepts)', help: 'Changing this asks every member to accept again. Use 1.0, 1.1, and so on. Leave it for small typo fixes.', text: '1.0' },
    {
        key: 'legal.billing.body', group: 'Legal — Billing & Refunds', label: 'Full document', document: true,
        help: 'Start a line with ## to make it a heading, or • to make a bullet. Leave a blank line between paragraphs.',
        text: `## Payment Processing
All payments for Uncoached are securely processed through Stripe. Your membership renews automatically at the end of each billing period, according to the plan you chose, unless you cancel before your next renewal date.

Gift memberships are different: they are paid for once, they do not renew, and they end by themselves on the date shown when the gift is redeemed.

## Refund Policy
Except where required by applicable law, all sales are final. Because our Services are digital and available immediately, we do not offer refunds for membership payments once a payment has been processed.

If you no longer wish to continue, you can cancel at any time. Cancellation takes effect at the end of the period you have already paid for, so you keep your access until then, and no further payments are taken.

## Managing Your Membership
You can view and download your invoices, update your payment method, or cancel your membership at any time from the Billing page inside your membership area.

Signed in? Open Billing & invoices from your membership area, or from your Profile page.

## Questions
If you believe a charge was made in error, or you have any billing concern, please write to us at hello@uncoached.space and we will look into it.`
    },

    { key: 'legal.privacy.effective', group: 'Legal — Privacy Policy', label: 'Effective date line', text: 'Effective Date: September 2025' },
    { key: 'legal.privacy.version', group: 'Legal — Privacy Policy', label: 'Version (recorded when a member accepts)', help: 'Changing this asks every member to accept again. Use 1.0, 1.1, and so on. Leave it for small typo fixes.', text: '1.0' },
    {
        key: 'legal.privacy.body', group: 'Legal — Privacy Policy', label: 'Full document', document: true,
        help: 'Start a line with ## to make it a heading, or • to make a bullet. Leave a blank line between paragraphs.',
        text: `Uncoached (“we,” “our,” “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website, downloadable tools, and our AI companion, Field.

By using Uncoached, you agree to the terms of this Privacy Policy.

## 1. Information We Collect
We collect two main types of information.

Information you provide:
• When you purchase The Uncoached Essentials (via Stripe), we collect your name, email address, and payment details. Payment information is processed securely by Stripe and is never stored by us.
• When you interact with Field, you may provide personal reflections, journal-like entries, or other text responses.
• When you apply to the Practitioner Partnership, we collect the details and headshot you submit in the application form.

Automatically collected information:
• Basic usage data, such as browser type, device type, IP address, and pages visited on our site.
• Email opt-ins (if you subscribe), which include your name and email address.

## 2. How We Use Your Information
• Provide and deliver Uncoached products (printable toolkits, add-on tools, rituals, AI access).
• Enable and improve your experience with Field, our AI companion.
• Review Practitioner Partnership applications and administer the partnership.
• Send you updates you've opted into (e.g., new cards, behind-the-scenes tools, or Field's secret features).
• Maintain and improve site performance and user experience.

## 3. AI Assistant (Field) and Chatbase
When you interact with Field, your entries are processed by our service provider Chatbase, which hosts the AI model on our behalf.
• You do not need a Chatbase account; everything happens directly inside the Uncoached website.
• Your messages are used to generate responses within Field and to operate, maintain, and improve the functionality and quality of the Services. Your entries are not used to train public AI models.
• Chatbase processes information on our behalf in accordance with its applicable privacy and security practices.
• If you delete your cookies, Field will refresh and you will lose any previously stored memories within Field.

We recommend avoiding sensitive personal details (such as medical, financial, or legal information) when using Field.

## 4. How We Share Information
We do not sell your personal data. We only share information in the following limited ways:
• Service providers: With trusted partners like Stripe (for payments) and Chatbase (for Field's AI responses).
• Legal compliance: If required by law or to protect our rights and safety.

## 5. Data Retention
• Email and purchase details are retained as long as necessary for customer support, tax, and legal obligations.
• Entries shared with Field are processed by Chatbase and may be stored for a limited period as necessary to provide the Service and improve reliability.
• Practitioner applications are retained so we can review them and maintain the practitioner community.

## 6. Your Rights
Depending on your location, you may have the right to:
• Access, correct, or delete your personal information.
• Opt out of communications at any time (unsubscribe link provided in every email).
• Request that we limit or stop processing your data.

To exercise these rights, email us at hello@uncoached.space.

## 7. Security
We use reasonable measures to protect your personal information. However, no system is 100% secure, and we cannot guarantee absolute security of your data.

## 8. Children's Privacy
Uncoached is not intended for individuals under 18. We do not knowingly collect personal information from children.

## 9. Updates to This Policy
We may update this Privacy Policy from time to time. When we do, we'll update the effective date at the top of this page. Significant changes will be communicated clearly.

## 10. Contact
For privacy concerns, email us at hello@uncoached.space.`
    },

    // ── Pricing ─────────────────────────────────────────────────────────
    { key: 'pricing.title', group: 'Pricing', label: 'Page heading', text: 'Choose your path' },
    { key: 'pricing.subtitle', group: 'Pricing', label: 'Subheading', text: "There's no right pace. Take what you need." },
    { key: 'pricing.universal', group: 'Pricing', label: 'Line above the dropdowns', text: "There's no right pace. Take what you need." },
    { key: 'pricing.disclaimer', group: 'Pricing', label: 'Disclaimer', multiline: true, text: "Uncoached is not therapy or coaching. It's a self-guided space designed to support awareness, regulation, and integration in everyday life. All memberships renew automatically at the end of each billing period. You can cancel at any time before renewal to stop future charges. There's no right pace. Stay for a moment, or make it a rhythm." },
    { key: 'pricing.closing', group: 'Pricing', label: 'Closing statement', multiline: true, text: "You don't need to fix yourself. You just need a place to stay connected to yourself." },
    { key: 'pricing.gift_link', group: 'Pricing', label: 'Gift card link (bottom of page)', text: 'Have a gift card? Redeem it here' },

    // ── Redeem a Gift Card ──────────────────────────────────────────────
    { key: 'redeem.title', group: 'Redeem a Gift Card', label: 'Page heading', text: 'Redeem your gift card' },
    { key: 'redeem.subtitle', group: 'Redeem a Gift Card', label: 'Subheading', text: 'Enter the code from your gift card email and your membership begins today.' },
    { key: 'redeem.help', group: 'Redeem a Gift Card', label: 'Help text (bottom of page)', multiline: true, text: "Can't find your code? It's in the email GiftUp sent you, just under the card. If anything isn't working, write to hello@uncoached.space and we'll sort it out." },

    // ── Practitioners · Hero ────────────────────────────────────────────
    { key: 'practitioners.hero.eyebrow', group: 'Practitioners — Hero', label: 'Small line above the headline', text: "Trusted Practitioners Around the World" },
    { key: 'practitioners.hero.title', group: 'Practitioners — Hero', label: 'Headline', text: "Find someone whose approach" },
    { key: 'practitioners.hero.title_emphasis', group: 'Practitioners — Hero', label: 'Headline (italic ending)', text: "resonates." },
    { key: 'practitioners.hero.intro', group: 'Practitioners — Hero', label: 'Intro paragraph', multiline: true, text: "The professionals listed here are people personally trusted or worked with. There are no affiliate links and no commissions. This page exists simply to help you find practitioners whose approach may resonate with you." },

    // ── Practitioners · Our Promise ─────────────────────────────────────
    { key: 'practitioners.promise.card1_title', group: 'Practitioners — Our Promise', label: 'Card 1 title', text: "No affiliate links" },
    { key: 'practitioners.promise.card1_body', group: 'Practitioners — Our Promise', label: 'Card 1 text', text: "Nothing here is a paid placement." },
    { key: 'practitioners.promise.card2_title', group: 'Practitioners — Our Promise', label: 'Card 2 title', text: "No commissions or kickbacks" },
    { key: 'practitioners.promise.card2_body', group: 'Practitioners — Our Promise', label: 'Card 2 text', text: "We never earn from a referral." },
    { key: 'practitioners.promise.card3_title', group: 'Practitioners — Our Promise', label: 'Card 3 title', text: "Included on trust, not payment" },
    { key: 'practitioners.promise.card3_body', group: 'Practitioners — Our Promise', label: 'Card 3 text', text: "Listed only when the work aligns." },

    // ── Practitioners · The Directory ───────────────────────────────────
    { key: 'practitioners.directory.link_website', group: 'Practitioners — The Directory', label: 'Website link wording on a profile card', text: "Visit website" },
    { key: 'practitioners.directory.resource_label', group: 'Practitioners — The Directory', label: 'Label above a practitioner’s Uncoached resource', help: 'Only shows on profiles where you have filled that in.', text: "Contributed to Uncoached" },
    { key: 'practitioners.directory.show_more', group: 'Practitioners — The Directory', label: 'Button to show more practitioners', help: 'The number remaining is added automatically.', text: "Show more practitioners" },
    { key: 'practitioners.directory.show_fewer', group: 'Practitioners — The Directory', label: 'Button to collapse the list again', text: "Show fewer" },
    { key: 'practitioners.directory.empty', group: 'Practitioners — The Directory', label: 'Message when nobody is listed yet', multiline: true, help: 'Shown only while the directory is empty.', text: "Our first practitioners are being welcomed in. Check back soon." },
    { key: 'practitioners.directory.empty_category', group: 'Practitioners — The Directory', label: 'Message when a filter has no one in it', multiline: true, text: "No practitioners in this category yet." },

    // ── Practitioners · Disclaimer ────────────────────────────────
    { key: 'practitioners.disclaimer.body', group: 'Practitioners — Disclaimer', label: 'Disclaimer paragraph', multiline: true, rows: 6, help: 'Shown in italics under the practitioner profiles.', text: "Practitioners featured on Uncoached operate independently and are responsible for their own services, qualifications, fees, policies, and client relationships. Their inclusion on Uncoached does not guarantee or endorse their services or suitability for any individual. Any professional relationship you choose to enter into with a practitioner is between you and that practitioner, independently of Uncoached." },
    { key: 'practitioners.disclaimer.link', group: 'Practitioners — Disclaimer', label: 'Link at the end of the paragraph', help: 'Opens the Practitioner Disclaimer section of your Terms page.', text: "Read full Practitioner Disclaimer" },

    // ── Practitioners · How Practitioners Are Chosen ────────────────────
    { key: 'practitioners.process.title', group: 'Practitioners — How Practitioners Are Chosen', label: 'Section heading', text: "How practitioners are chosen" },
    { key: 'practitioners.process.intro', group: 'Practitioners — How Practitioners Are Chosen', label: 'Line under the heading', multiline: true, text: "A small, intentional process to keep this list trustworthy." },
    { key: 'practitioners.process.step1_title', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 1 title', text: "Initial Contact" },
    { key: 'practitioners.process.step1_body', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 1 text', multiline: true, text: "A short introduction and a website or professional profile is shared." },
    { key: 'practitioners.process.step2_title', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 2 title', text: "Connection Conversation" },
    { key: 'practitioners.process.step2_body', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 2 text', multiline: true, text: "If aligned, we schedule a brief conversation or sample session to experience the work directly." },
    { key: 'practitioners.process.step3_title', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 3 title', text: "Alignment Review" },
    { key: 'practitioners.process.step3_body', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 3 text', multiline: true, text: "Practitioners are selected based on alignment with Uncoached's spirit and values — not payment." },
    { key: 'practitioners.process.step4_title', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 4 title', text: "Curated Listing" },
    { key: 'practitioners.process.step4_body', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 4 text', multiline: true, text: "Not everyone who reaches out is included. The list stays intentionally small and curated." },

    // ── Practitioners · Interested In Being Featured ────────────────────
    { key: 'practitioners.featured.title', group: 'Practitioners — Interested In Being Featured', label: 'Section heading', text: "Interested in being featured?" },
    { key: 'practitioners.featured.body', group: 'Practitioners — Interested In Being Featured', label: 'Paragraph', multiline: true, text: "Uncoached occasionally adds new practitioners to this list when their work aligns with the values and approach of the platform. If you are a therapist, counselor, somatic practitioner, nervous system specialist, or other wellbeing professional and feel your work may be a good fit, you're welcome to reach out." },
    { key: 'practitioners.featured.cta', group: 'Practitioners — Interested In Being Featured', label: 'Button', text: "Apply Here" },

    // ── Partnership Guide · Cover ───────────────────────────────────────
    { key: 'partnership.header.cta', group: 'Partnership Guide — Cover', label: 'Button in the top corner', fixed: true, text: "Apply now" },
    { key: 'partnership.cover.title', group: 'Partnership Guide — Cover', label: 'Cover title', multiline: true, list: true, rows: 4, fixed: true, help: 'One line per line of the title.', text: "Uncoached\nPractitioner\nPartnership\nGuide" },
    { key: 'partnership.cover.tagline', group: 'Partnership Guide — Cover', label: 'Tagline under the line', multiline: true, list: true, rows: 2, fixed: true, help: 'One line per line.', text: "Helping clients between\nthe breakthroughs." },
    { key: 'partnership.cover.footer', group: 'Partnership Guide — Cover', label: 'Green bar at the bottom', fixed: true, text: "uncoached.space" },

    // ── Partnership Guide · Welcome ─────────────────────────────────────
    { key: 'partnership.welcome.heading', group: 'Partnership Guide — Welcome', label: 'Heading', fixed: true, text: "Welcome" },
    { key: 'partnership.welcome.lead', group: 'Partnership Guide — Welcome', label: 'Line above the handwriting', fixed: true, text: "Before anything else," },
    { key: 'partnership.welcome.script', group: 'Partnership Guide — Welcome', label: 'Handwritten line', fixed: true, text: "thank you." },
    { key: 'partnership.welcome.p1', group: 'Partnership Guide — Welcome', label: 'Paragraph 1', multiline: true, fixed: true, text: "One thing I've realized over the years is that insight doesn't automatically become change." },
    { key: 'partnership.welcome.p2', group: 'Partnership Guide — Welcome', label: 'Paragraph 2', multiline: true, fixed: true, text: "Someone can leave a session feeling lighter, clearer, and committed to doing things differently. But lasting change isn't built in the hour you spend together. It happens afterwards, in everyday life, when they're trying to remember what they learned and put it into practice." },
    { key: 'partnership.welcome.p3', group: 'Partnership Guide — Welcome', label: 'Paragraph 3 (bold)', multiline: true, fixed: true, text: "That's what inspired Uncoached." },
    { key: 'partnership.welcome.p4', group: 'Partnership Guide — Welcome', label: 'Paragraph 4', multiline: true, fixed: true, text: "I wanted to create something practitioners would genuinely be excited to share with their clients. A place where clients could reconnect with what they've already learned and continue building on the work they've already started." },
    { key: 'partnership.welcome.p5', group: 'Partnership Guide — Welcome', label: 'Paragraph 5 (bold)', multiline: true, fixed: true, text: "Not to replace the work you're already doing, but to help it stick." },
    { key: 'partnership.welcome.p6', group: 'Partnership Guide — Welcome', label: 'Paragraph 6', multiline: true, fixed: true, text: "That's what the Practitioner Partnership is all about." },
    { key: 'partnership.welcome.p7', group: 'Partnership Guide — Welcome', label: 'Paragraph 7', multiline: true, fixed: true, text: "Together, we can take the tools and ideas that are already changing lives and give them a home where they can continue helping people long after the session ends." },

    // ── Partnership Guide · What Is The Partnership ─────────────────────
    { key: 'partnership.what.title', group: 'Partnership Guide — What Is The Partnership', label: 'Page title', multiline: true, list: true, rows: 2, fixed: true, help: 'One line per line of the title.', text: "What is the Practitioner\nPartnership?" },
    { key: 'partnership.what.p1', group: 'Partnership Guide — What Is The Partnership', label: 'Paragraph 1 (bold)', multiline: true, fixed: true, text: "One of the most rewarding parts of this work is watching someone take what they've learned and truly make it part of their life." },
    { key: 'partnership.what.p2', group: 'Partnership Guide — What Is The Partnership', label: 'Paragraph 2', multiline: true, fixed: true, text: "Every practitioner has exercises, perspectives, and practical tools that make a real difference. Together, we'll turn some of those into polished Uncoached resources that people can return to whenever they need a reminder, a reset, or a different perspective." },
    { key: 'partnership.what.p3_bold', group: 'Partnership Guide — What Is The Partnership', label: 'Paragraph 3 — bold opening', multiline: true, fixed: true, text: "These resources aren't designed to replace your work. They're designed to reinforce it." },
    { key: 'partnership.what.p3_rest', group: 'Partnership Guide — What Is The Partnership', label: 'Paragraph 3 — rest of the paragraph', multiline: true, fixed: true, text: "They give your clients a trusted place to return to the tools, exercises, and perspectives you've already introduced, while also discovering complementary perspectives that may deepen what they're learning or help something finally click." },
    { key: 'partnership.what.p4', group: 'Partnership Guide — What Is The Partnership', label: 'Paragraph 4', multiline: true, fixed: true, text: "They're also there for the moments when you need to step away, so your clients still have something meaningful to lean on until you're back." },
    { key: 'partnership.what.p5', group: 'Partnership Guide — What Is The Partnership', label: 'Paragraph 5 — opening', multiline: true, fixed: true, text: "As part of the partnership, your expertise becomes a part of a growing library that supports people long after the session ends." },
    { key: 'partnership.what.p5_bold', group: 'Partnership Guide — What Is The Partnership', label: 'Paragraph 5 — bold ending', multiline: true, fixed: true, text: "You'll also have a professional profile where visitors and members can discover your work, learn about your approach, and connect with you independently." },
    { key: 'partnership.what.icon1', group: 'Partnership Guide — What Is The Partnership', label: 'Icon 1 caption', multiline: true, list: true, rows: 2, fixed: true, help: 'Two short lines.', text: "You share\nyour expertise." },
    { key: 'partnership.what.icon2', group: 'Partnership Guide — What Is The Partnership', label: 'Icon 2 caption', multiline: true, list: true, rows: 2, fixed: true, help: 'Two short lines.', text: "We create a\nresource together." },
    { key: 'partnership.what.icon3', group: 'Partnership Guide — What Is The Partnership', label: 'Icon 3 caption', multiline: true, list: true, rows: 2, fixed: true, help: 'Two short lines.', text: "Members get\npractical support." },
    { key: 'partnership.what.icon4', group: 'Partnership Guide — What Is The Partnership', label: 'Icon 4 caption', multiline: true, list: true, rows: 2, fixed: true, help: 'Two short lines.', text: "Your practice\ngets visibility." },

    // ── Partnership Guide · How Our Partnership Works ───────────────────
    { key: 'partnership.how.title', group: 'Partnership Guide — How Our Partnership Works', label: 'Page title', fixed: true, text: "How our partnership works" },
    { key: 'partnership.how.subtitle', group: 'Partnership Guide — How Our Partnership Works', label: 'Italic line under the title', fixed: true, text: "An exchange that creates impact." },
    { key: 'partnership.how.step1_title', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 1 title', fixed: true, text: "You bring" },
    { key: 'partnership.how.step1_body', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 1 text', multiline: true, fixed: true, text: "Your expertise, favorite client exercises, practical tools, and the wisdom you find yourself sharing again and again." },
    { key: 'partnership.how.step2_title', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 2 title', fixed: true, text: "Together we build" },
    { key: 'partnership.how.step2_body', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 2 text', multiline: true, fixed: true, text: "We help shape your expertise into a beautiful, practical resource that feels at home inside the Uncoached Library." },
    { key: 'partnership.how.step3_title', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 3 title', fixed: true, text: "Members receive" },
    { key: 'partnership.how.step3_body', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 3 text', multiline: true, fixed: true, text: "A growing library of practical tools and resources from a diverse community of practitioners, giving them support they can return to whenever they need it." },
    { key: 'partnership.how.step4_title', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 4 title', fixed: true, text: "You receive" },
    { key: 'partnership.how.step4_body', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 4 text', multiline: true, fixed: true, text: "A Community Practitioner profile introducing visitors and members to your independent practice." },
    { key: 'partnership.how.callout', group: 'Partnership Guide — How Our Partnership Works', label: 'Tan box at the bottom', multiline: true, list: true, rows: 2, fixed: true, help: 'One line per line.', text: "Every collaboration looks a little different.\nThat's the beauty of it." },

    // ── Partnership Guide · What You Could Share ────────────────────────
    { key: 'partnership.share.title', group: 'Partnership Guide — What You Could Share', label: 'Page title', fixed: true, text: "What you could share" },
    { key: 'partnership.share.script', group: 'Partnership Guide — What You Could Share', label: 'Handwritten line on the green brush stroke', multiline: true, fixed: true, text: "Something that's already helping the people you work with." },
    { key: 'partnership.share.intro', group: 'Partnership Guide — What You Could Share', label: 'Intro paragraph', multiline: true, fixed: true, text: "Think about the practical things you already teach, practice, or send home with clients. The exercises they come back to. The tools that help something click. The things you wish they remembered when real life happens between sessions." },
    { key: 'partnership.share.list_heading', group: 'Partnership Guide — What You Could Share', label: 'Heading above the list', fixed: true, text: "It could be…" },
    { key: 'partnership.share.bullets', group: 'Partnership Guide — What You Could Share', label: 'The bullet list', multiline: true, list: true, rows: 12, fixed: true, help: 'One bullet per line. Adding lines will make this page overflow — swap a line out rather than adding to the list.', text: "A favorite client exercise\nA body-based or grounding practice\nA conversation or communication tool\nA way to recognize or map a recurring pattern\nA skill you regularly teach clients to practice\nA check-in you use to help someone take stock\nAn exercise for partners to do together\nA practical coping or regulation strategy\nA decision-making or problem-solving framework\nA reflection or journal prompt that consistently creates insight\nA piece of between-session practice you frequently suggest\nA simple tool that helps clients apply what they've learned in real life" },
    { key: 'partnership.share.callout_bold', group: 'Partnership Guide — What You Could Share', label: 'Tan box — bold opening', fixed: true, text: "You bring the expertise." },
    { key: 'partnership.share.callout_body', group: 'Partnership Guide — What You Could Share', label: 'Tan box — paragraph', multiline: true, fixed: true, text: "Share the idea, practice or approach with me and help me understand how you use it. Together, we'll translate it into a polished Uncoached resource that's clear, practical and easy to use." },

    // ── Partnership Guide · Your Practitioner Profile ───────────────────
    { key: 'partnership.profile.title', group: 'Partnership Guide — Your Practitioner Profile', label: 'Page title', fixed: true, text: "Your practitioner profile" },
    { key: 'partnership.profile.intro', group: 'Partnership Guide — Your Practitioner Profile', label: 'Intro paragraph', multiline: true, fixed: true, text: "Your profile is featured on the public Uncoached website, making it visible to both visitors and members who want to learn more about your work before reaching out." },
    { key: 'partnership.profile.panel_heading', group: 'Partnership Guide — Your Practitioner Profile', label: 'Tan panel heading', fixed: true, text: "Here's what people will see:" },
    { key: 'partnership.profile.panel_items', group: 'Partnership Guide — Your Practitioner Profile', label: 'Tan panel list', multiline: true, list: true, rows: 7, fixed: true, help: 'One item per line. Seven lines fit this panel.', text: "Professional photo\nArea(s) of focus\nCountries you work in\nVirtual and/or in-person availability\nLanguages spoken\nWebsite and/or booking link\nSocial media (optional)" },
    { key: 'partnership.profile.script1', group: 'Partnership Guide — Your Practitioner Profile', label: 'Handwritten line 1', multiline: true, fixed: true, text: "You don't need to be a copywriter." },
    { key: 'partnership.profile.script2', group: 'Partnership Guide — Your Practitioner Profile', label: 'Handwritten line 2', multiline: true, fixed: true, text: "I'll help bring your profile to life." },
    { key: 'partnership.profile.notes_heading', group: 'Partnership Guide — Your Practitioner Profile', label: 'Bottom panel heading', fixed: true, text: "A few important things to know:" },
    { key: 'partnership.profile.notes_items', group: 'Partnership Guide — Your Practitioner Profile', label: 'Bottom panel list', multiline: true, list: true, rows: 6, fixed: true, help: 'One item per line. Six lines fit this panel.', text: "Your practice remains completely independent.\nYou manage your own clients, fees, and scheduling.\nNo referral commissions.\nWe'll professionally polish and brand every resource together.\nYour contribution becomes part of the Uncoached Library.\nWe periodically review profiles to keep information current." },

    // ── Partnership Guide · Building Something Meaningful ───────────────
    { key: 'partnership.meaning.title', group: 'Partnership Guide — Building Something Meaningful', label: 'Page title', fixed: true, text: "Building" },
    { key: 'partnership.meaning.script', group: 'Partnership Guide — Building Something Meaningful', label: 'Handwritten line under the title', fixed: true, text: "Something Meaningful" },
    { key: 'partnership.meaning.body', group: 'Partnership Guide — Building Something Meaningful', label: 'The letter', multiline: true, list: true, rows: 8, fixed: true, help: 'One paragraph per line. Leave a line blank and it disappears.', text: "I don't want Uncoached to become another platform filled with endless content that people scroll past and never use.\nI want it to become a living library built by practitioners who genuinely care about helping people long after the session ends.\nEvery practitioner brings a different perspective.\nEvery contribution gives someone another way to navigate a difficult day, see themselves differently, or take one small step forward.\nWe'll probably never know all the lives those resources will touch.\nI think that's pretty special.\nIf that sounds like something you'd like to be part of, I'd love to welcome you to the Uncoached community." },
    { key: 'partnership.meaning.closing', group: 'Partnership Guide — Building Something Meaningful', label: 'Handwritten sign-off', multiline: true, list: true, rows: 2, fixed: true, help: 'One line per line.', text: "Thank you for considering it.\nI'd love to build this with you." },
    { key: 'partnership.meaning.signature_caption', group: 'Partnership Guide — Building Something Meaningful', label: 'Caption under your signature', fixed: true, text: "Founder, Uncoached" },

    // ── Partnership Guide · Ready To Join ───────────────────────────────
    { key: 'partnership.join.title', group: 'Partnership Guide — Ready To Join', label: 'Page title', fixed: true, text: "Ready to join?" },
    { key: 'partnership.join.subtitle', group: 'Partnership Guide — Ready To Join', label: 'Line under the divider', fixed: true, text: "Here's what happens next." },
    { key: 'partnership.join.step1_title', group: 'Partnership Guide — Ready To Join', label: 'Step 01 title', fixed: true, text: "Tell us about you" },
    { key: 'partnership.join.step1_body', group: 'Partnership Guide — Ready To Join', label: 'Step 01 text', multiline: true, fixed: true, text: "Share a little about your practice, your expertise, and the work you do. This helps us get to know you and how you could fit into the Uncoached community." },
    { key: 'partnership.join.step2_title', group: 'Partnership Guide — Ready To Join', label: 'Step 02 title', fixed: true, text: "Share your idea" },
    { key: 'partnership.join.step2_body', group: 'Partnership Guide — Ready To Join', label: 'Step 02 text', multiline: true, fixed: true, text: "Have an idea already? Amazing. If not, we'll figure it out together and find something from your expertise that would genuinely add value to the Uncoached Library." },
    { key: 'partnership.join.step3_title', group: 'Partnership Guide — Ready To Join', label: 'Step 03 title', fixed: true, text: "We'll build it together" },
    { key: 'partnership.join.step3_body', group: 'Partnership Guide — Ready To Join', label: 'Step 03 text', multiline: true, fixed: true, text: "We'll work with you to shape your idea into a polished Uncoached resource, create your Practitioner profile, and get everything ready to become part of Uncoached." },
    { key: 'partnership.join.closing', group: 'Partnership Guide — Ready To Join', label: 'Cream text on the green background', multiline: true, list: true, rows: 2, fixed: true, help: 'One line per line.', text: "If you care deeply about helping people create real change,\nlet's build something that helps them keep going." },
    { key: 'partnership.join.cta', group: 'Partnership Guide — Ready To Join', label: 'The big button', fixed: true, help: 'The arrow is added automatically.', text: "I'M IN!" },

    // ── Application Form · Introduction ─────────────────────────────────
    { key: 'apply.title', group: 'Application Form — Introduction', label: 'Headline', text: "Tell us about you" },
    { key: 'apply.intro', group: 'Application Form — Introduction', label: 'Intro paragraph', multiline: true, text: "Share a few details about your practice, the work you do, and what you'd like to bring to Uncoached. We'll review your submission to make sure the partnership feels like a good fit. If approved, we'll be in touch with next steps." },

    // ── Application Form · Questions ────────────────────────────────────
    { key: 'apply.name.label', group: 'Application Form — Questions', label: 'Full name — question', text: "Full name" },
    { key: 'apply.credentials.label', group: 'Application Form — Questions', label: 'Credentials — question', text: "Credentials / Training" },
    { key: 'apply.credentials.hint', group: 'Application Form — Questions', label: 'Credentials — hint', multiline: true, text: "Licences, certifications, professional designations, or relevant training." },
    { key: 'apply.email.label', group: 'Application Form — Questions', label: 'Email — question', text: "Email" },
    { key: 'apply.email.hint', group: 'Application Form — Questions', label: 'Email — hint', multiline: true, text: "Where we'll contact you about your submission." },
    { key: 'apply.photo.label', group: 'Application Form — Questions', label: 'Photo — question', text: "Professional photo" },
    { key: 'apply.photo.hint', group: 'Application Form — Questions', label: 'Photo — hint', multiline: true, text: "A clear headshot. JPG or PNG, under 5MB." },
    { key: 'apply.bio.label', group: 'Application Form — Questions', label: 'Bio — question', text: "Short bio" },
    { key: 'apply.bio.hint', group: 'Application Form — Questions', label: 'Bio — hint', multiline: true, text: "Tell us a little about your work, who you support, and your approach." },
    { key: 'apply.focus.label', group: 'Application Form — Questions', label: 'Areas of focus — question', text: "Area(s) of focus" },
    { key: 'apply.focus.hint', group: 'Application Form — Questions', label: 'Areas of focus — hint', multiline: true, text: "Choose up to 5 areas that best represent the work you do." },
    { key: 'apply.countries.label', group: 'Application Form — Questions', label: 'Countries — question', text: "Country / countries you can work in" },
    { key: 'apply.languages.label', group: 'Application Form — Questions', label: 'Languages — question', text: "Languages" },
    { key: 'apply.delivery.label', group: 'Application Form — Questions', label: 'Virtual or in-person — question', text: "How do you work with clients?" },
    { key: 'apply.website.label', group: 'Application Form — Questions', label: 'Website — question', text: "Website / booking link or email" },
    { key: 'apply.social.label', group: 'Application Form — Questions', label: 'Social media — question', text: "Social media" },
    { key: 'apply.expertise.label', group: 'Application Form — Questions', label: 'Expertise — question', multiline: true, text: "What expertise would you most like to contribute from?" },
    { key: 'apply.expertise.hint', group: 'Application Form — Questions', label: 'Expertise — hint', multiline: true, text: "The thing you find yourself teaching again and again." },
    { key: 'apply.ideas.label', group: 'Application Form — Questions', label: 'Resource idea — question', multiline: true, text: "Do you already have a resource or practice in mind?" },
    { key: 'apply.ideas.hint', group: 'Application Form — Questions', label: 'Resource idea — hint', multiline: true, text: "No idea yet? That's completely fine. We can explore it together during your Partnership Chat." },

    // ── Application Form · Consent & Submit ─────────────────────────────
    { key: 'apply.consent1', group: 'Application Form — Consent & Submit', label: 'First tick box', multiline: true, text: "If accepted into the Practitioner Partnership, I give Uncoached permission to publish the practitioner profile information and headshot I provide on the Uncoached website." },
    { key: 'apply.consent2', group: 'Application Form — Consent & Submit', label: 'Second tick box', multiline: true, text: "I understand that the Practitioner Partnership includes collaborating with Uncoached on at least one practical resource for the Uncoached Library if my application is accepted." },
    { key: 'apply.submit', group: 'Application Form — Consent & Submit', label: 'Submit button', text: "Submit application" },
    { key: 'apply.privacy_note', group: 'Application Form — Consent & Submit', label: 'Line under the button', multiline: true, help: 'The Privacy Policy link is added to the end of this sentence automatically.', text: "We'll review your application and be in touch with next steps if it feels like a good fit. By submitting this application, you acknowledge that the information you provide will be collected and used to review your application and administer the Practitioner Partnership in accordance with the" },
    { key: 'apply.privacy_link', group: 'Application Form — Consent & Submit', label: 'Wording of the Privacy Policy link', text: "Uncoached Privacy Policy" },
    { key: 'apply.back', group: 'Application Form — Consent & Submit', label: 'Link back to the guide', help: 'The arrow is added automatically.', text: "Back to the guide" },

    // ── Application Form · After Submitting ─────────────────────────────
    { key: 'apply.thanks.title', group: 'Application Form — After Submitting', label: 'Thank you headline', text: "Thank you." },
    { key: 'apply.thanks.body', group: 'Application Form — After Submitting', label: 'Thank you paragraph', multiline: true, text: "Your application is with Johanna. She reads every one personally and will be in touch by email — if it feels like a fit, she'll send you a link to book a call." },
    { key: 'apply.thanks.back', group: 'Application Form — After Submitting', label: 'Link back to the guide', help: 'The arrow is added automatically.', text: "Back to the Partnership Guide" },


    // ── Members Area · Dashboard Cards ──────────────────────────
    // The tiles a member sees after signing in.
    { key: 'member.card1_title', group: 'Members Area — Dashboard Cards', label: 'Card 1 title', text: "Field" },
    { key: 'member.card1_body', group: 'Members Area — Dashboard Cards', label: 'Card 1 text', multiline: true, text: "Support in the moment." },
    { key: 'member.card2_title', group: 'Members Area — Dashboard Cards', label: 'Card 2 title', text: "Audio Breaths" },
    { key: 'member.card2_body', group: 'Members Area — Dashboard Cards', label: 'Card 2 text', multiline: true, text: "Breathe, then continue." },
    { key: 'member.card3_title', group: 'Members Area — Dashboard Cards', label: 'Card 3 title', text: "Guided Shifts" },
    { key: 'member.card3_body', group: 'Members Area — Dashboard Cards', label: 'Card 3 text', multiline: true, text: "Small practices, real shifts." },
    { key: 'member.card4_title', group: 'Members Area — Dashboard Cards', label: 'Card 4 title', text: "Pocket Prompts" },
    { key: 'member.card4_body', group: 'Members Area — Dashboard Cards', label: 'Card 4 text', multiline: true, text: "Clarity through questions." },
    { key: 'member.card5_title', group: 'Members Area — Dashboard Cards', label: 'Card 5 title', text: "Clarity Cards" },
    { key: 'member.card5_body', group: 'Members Area — Dashboard Cards', label: 'Card 5 text', multiline: true, text: "Work it out on paper." },
    { key: 'member.card6_title', group: 'Members Area — Dashboard Cards', label: 'Card 6 title', help: 'Anything between *stars* shows in sage italic.', text: "Af*for*mations" },
    { key: 'member.card6_body', group: 'Members Area — Dashboard Cards', label: 'Card 6 text', multiline: true, text: "Generate a positive response in your mind." },
    { key: 'member.card7_title', group: 'Members Area — Dashboard Cards', label: 'Card 7 title', text: "Voice Notes" },
    { key: 'member.card7_body', group: 'Members Area — Dashboard Cards', label: 'Card 7 text', multiline: true, text: "Remember who you are." },


    // ── Guided Shifts Page: Hero ──
    { key: 'shifts.back_link', group: 'Guided Shifts Page — Hero', label: 'Back link (top left)', text: "Back to Portal" },
    { key: 'shifts.hero.title', group: 'Guided Shifts Page — Hero', label: 'Headline', text: "Shift your state." },
    { key: 'shifts.hero.subtitle', group: 'Guided Shifts Page — Hero', label: 'Subheadline', text: "In minutes. In real life." },
    { key: 'shifts.hero.description', group: 'Guided Shifts Page — Hero', label: 'Description', multiline: true, text: "Guided Shifts are short, precise audio experiences that help your nervous system settle, reset, or reorient when life feels loud, heavy, fast, or stuck." },
    { key: 'shifts.hero.checklist', group: 'Guided Shifts Page — Hero', label: 'Checklist', multiline: true, list: true, rows: 3, help: 'One item per line.', text: "No long meditations.\nNo breath-counting.\nNo fixing yourself." },
    { key: 'shifts.hero.supporting', group: 'Guided Shifts Page — Hero', label: 'Supporting text', multiline: true, text: "Just guided internal shifts you can use\nwhen it actually matters." },
    { key: 'shifts.hero.cta', group: 'Guided Shifts Page — Hero', label: 'Button', text: "Browse the Guided Shifts" },
    // ── Guided Shifts Page: Why This Works ──
    { key: 'shifts.why.title', group: 'Guided Shifts Page — Why This Works', label: 'Section heading', text: "Why This Works" },
    { key: 'shifts.why.left_title', group: 'Guided Shifts Page — Why This Works', label: 'Left card heading', text: "Why these tiny shifts matter" },
    { key: 'shifts.why.left_p1', group: 'Guided Shifts Page — Why This Works', label: 'Left card paragraph 1', multiline: true, text: "Most tools talk to your mind.\nGuided Shifts work with your body." },
    { key: 'shifts.why.left_p2', group: 'Guided Shifts Page — Why This Works', label: 'Left card paragraph 2', multiline: true, text: "They use sensation, attention, and subtle nervous system cues to help you move out of urgency, shutdown, or overwhelm and back into steadiness." },
    { key: 'shifts.why.left_list', group: 'Guided Shifts Page — Why This Works', label: 'Left card checklist', multiline: true, list: true, rows: 3, help: 'One item per line.', text: "The nervous system responds faster than thought\nSmall internal shifts create immediate relief\nRegulation comes from safety, not effort" },
    { key: 'shifts.why.left_closing', group: 'Guided Shifts Page — Why This Works', label: 'Left card closing line', multiline: true, text: "This isn't about going deeper.\nIt's about coming back online." },
    { key: 'shifts.why.right_title', group: 'Guided Shifts Page — Why This Works', label: 'Right card heading', text: "What these shifts can do" },
    { key: 'shifts.why.dysregulated_intro', group: 'Guided Shifts Page — Why This Works', label: 'Right card first list intro', text: "When your state is dysregulated:" },
    { key: 'shifts.why.dysregulated_list', group: 'Guided Shifts Page — Why This Works', label: 'Right card first list (crosses)', multiline: true, list: true, rows: 3, help: 'One item per line.', text: "thinking gets narrow\nemotions feel bigger than they are\ndecisions feel urgent or impossible" },
    { key: 'shifts.why.regulated_intro', group: 'Guided Shifts Page — Why This Works', label: 'Right card second list intro', text: "A regulated state restores:" },
    { key: 'shifts.why.regulated_list', group: 'Guided Shifts Page — Why This Works', label: 'Right card second list (ticks)', multiline: true, list: true, rows: 3, help: 'One item per line.', text: "perspective\nchoice\naccess to your inner signals" },
    { key: 'shifts.why.right_closing', group: 'Guided Shifts Page — Why This Works', label: 'Right card closing line', multiline: true, text: "These shifts help you meet the moment you're in without getting swallowed by it." },
    // ── Guided Shifts Page: Built For Real Life ──
    { key: 'shifts.real_life.title', group: 'Guided Shifts Page — Built For Real Life', label: 'Heading', text: "Built for real life moments" },
    { key: 'shifts.real_life.intro', group: 'Guided Shifts Page — Built For Real Life', label: 'List intro', text: "Use them when:" },
    { key: 'shifts.real_life.list', group: 'Guided Shifts Page — Built For Real Life', label: 'Checklist', multiline: true, list: true, rows: 5, help: 'One item per line.', text: "you're spiralling before a conversation\nyou can't shut your mind off at night\ntherapy stirred something up\ngrief, pressure, or fear hits suddenly\nyou need to move forward but feel stuck" },
    { key: 'shifts.real_life.highlight', group: 'Guided Shifts Page — Built For Real Life', label: 'Highlighted line', text: "Most are under 5 minutes." },
    { key: 'shifts.real_life.body', group: 'Guided Shifts Page — Built For Real Life', label: 'Paragraph', multiline: true, text: "With practice, these learned techniques can land in your body in under 60 seconds." },
    { key: 'shifts.real_life.closing', group: 'Guided Shifts Page — Built For Real Life', label: 'Closing line', text: "No setup required." },
    // ── Guided Shifts Page: How To Use Them ──
    { key: 'shifts.how.title', group: 'Guided Shifts Page — How To Use Them', label: 'Heading', text: "How to Use Them" },
    { key: 'shifts.how.steps', group: 'Guided Shifts Page — How To Use Them', label: 'Steps', multiline: true, list: true, rows: 3, help: 'One item per line.', text: "Choose the series that matches what you're experiencing\nPress play\nLet the guidance do the work" },
    { key: 'shifts.how.body', group: 'Guided Shifts Page — How To Use Them', label: 'Paragraph', multiline: true, text: "Use them seated, standing, in bed, between meetings, or in the car before you go inside." },
    { key: 'shifts.how.closing', group: 'Guided Shifts Page — How To Use Them', label: 'Closing line', text: "Repeat as needed. There is no right way." },
    // ── Guided Shifts Page: Shift Families ──
    { key: 'shifts.families.title', group: 'Guided Shifts Page — Shift Families', label: 'Heading', text: "Guided Shift Families" },
    { key: 'shifts.families.intro', group: 'Guided Shifts Page — Shift Families', label: 'Intro', multiline: true, text: "Small, precise resets for your nervous system, built for real moments in real life." },
    { key: 'shifts.families.note', group: 'Guided Shifts Page — Shift Families', label: 'Small note under intro', text: "More coming soon." },
    { key: 'shifts.families.soon_label', group: 'Guided Shifts Page — Shift Families', label: 'Tag after shifts not yet available', text: "(soon)" },

    // ── Audio Breaths Page · Hero ──
    { key: 'breaths.back', group: 'Audio Breaths Page — Hero', label: 'Back link (top left)', help: 'The arrow is added automatically.', text: "Back to Portal" },
    { key: 'breaths.hero.eyebrow', group: 'Audio Breaths Page — Hero', label: 'Small word above the headline', text: "uncoached" },
    { key: 'breaths.hero.title', group: 'Audio Breaths Page — Hero', label: 'Headline', text: "Audio Breaths" },
    { key: 'breaths.hero.subtitle', group: 'Audio Breaths Page — Hero', label: 'Paragraph under the headline', multiline: true, rows: 2, help: 'Each new line starts a new line on the page.', text: "Tiny, guided pauses to help your body settle,\nreset, or gently shift state." },
    { key: 'breaths.hero.supporting', group: 'Audio Breaths Page — Hero', label: 'Small italic line', multiline: true, rows: 2, help: 'Each new line starts a new line on the page.', text: "Designed for real life. About five minutes each.\nNo fixing required." },
    { key: 'breaths.hero.button', group: 'Audio Breaths Page — Hero', label: 'Button', text: "Browse Audio Breaths" },
    { key: 'breaths.hero.scroll_hint', group: 'Audio Breaths Page — Hero', label: 'Line under the button', text: "Or scroll to explore" },

    // ── Audio Breaths Page · Why This Works ──
    { key: 'breaths.why.eyebrow', group: 'Audio Breaths Page — Why This Works', label: 'Section heading', text: "Why This Works" },
    { key: 'breaths.why.card1_title', group: 'Audio Breaths Page — Why This Works', label: 'Left card title', text: "Why these tiny breaths matter" },
    { key: 'breaths.why.card1_body', group: 'Audio Breaths Page — Why This Works', label: 'Left card paragraphs', multiline: true, list: true, rows: 3, help: 'One paragraph per line.', text: "Your breath is one of the fastest ways to communicate safety to your nervous system.\nA slow, steady exhale tells your body it's safe enough to soften.\nA gentle inhale brings just enough energy online to stay present." },
    { key: 'breaths.why.card2_title', group: 'Audio Breaths Page — Why This Works', label: 'Right card title', text: "What these breaths can do" },
    { key: 'breaths.why.card2_item1', group: 'Audio Breaths Page — Why This Works', label: 'Right card point 1 (heart icon)', text: "Slows a racing heart and breath" },
    { key: 'breaths.why.card2_item2', group: 'Audio Breaths Page — Why This Works', label: 'Right card point 2 (moon icon)', text: "Signals safety through the vagus nerve" },
    { key: 'breaths.why.card2_item3', group: 'Audio Breaths Page — Why This Works', label: 'Right card point 3 (sun icon)', text: "Improves emotional regulation and focus" },
    { key: 'breaths.why.card2_item4', group: 'Audio Breaths Page — Why This Works', label: 'Right card point 4 (plant icon)', text: "Helps you respond instead of react" },
    { key: 'breaths.why.closing', group: 'Audio Breaths Page — Why This Works', label: 'Closing line', multiline: true, rows: 2, help: 'Each new line starts a new line on the page.', text: "When stress hits, your body often moves first.\nThese breaths meet you there." },

    // ── Audio Breaths Page · Built For Real Life ──
    { key: 'breaths.real.title', group: 'Audio Breaths Page — Built For Real Life', label: 'Headline', text: "Built for real life moments" },
    { key: 'breaths.real.subtitle', group: 'Audio Breaths Page — Built For Real Life', label: 'Line under the headline', multiline: true, text: "Not meditations. Just small resets for when you need one." },
    { key: 'breaths.real.list', group: 'Audio Breaths Page — Built For Real Life', label: 'Checklist', multiline: true, list: true, rows: 5, help: 'One item per line.', text: "Before a difficult or charged conversation\nBetween meetings, tasks, or mental gear shifts\nWhen anxiety spikes out of nowhere\nIn bed when your mind won't settle\nWhen you want to strengthen a good or joyful feeling" },
    { key: 'breaths.real.closing', group: 'Audio Breaths Page — Built For Real Life', label: 'Closing line', multiline: true, text: "Press play and let your body find its way back." },

    // ── Audio Breaths Page · How To Use ──
    { key: 'breaths.how.title', group: 'Audio Breaths Page — How To Use', label: 'Headline', text: "How to use Audio Breaths" },
    { key: 'breaths.how.subtitle', group: 'Audio Breaths Page — How To Use', label: 'Line under the headline', text: "Three simple steps" },
    { key: 'breaths.how.step1_title', group: 'Audio Breaths Page — How To Use', label: 'Step 1 title', text: "Choose what matches your current state" },
    { key: 'breaths.how.step1_body', group: 'Audio Breaths Page — How To Use', label: 'Step 1 text', multiline: true, text: "Not what you think you should feel. What's actually here." },
    { key: 'breaths.how.step2_title', group: 'Audio Breaths Page — How To Use', label: 'Step 2 title', text: "Press play and follow the voice" },
    { key: 'breaths.how.step2_body', group: 'Audio Breaths Page — How To Use', label: 'Step 2 text', multiline: true, text: "Let the pacing guide you. Your body will take it from there." },
    { key: 'breaths.how.step3_title', group: 'Audio Breaths Page — How To Use', label: 'Step 3 title', text: "Stop anytime" },
    { key: 'breaths.how.step3_body', group: 'Audio Breaths Page — How To Use', label: 'Step 3 text', multiline: true, text: "There's no right way to do this. No finishing line." },
    { key: 'breaths.how.note', group: 'Audio Breaths Page — How To Use', label: 'Safety note', multiline: true, text: "Headphones are optional. Keep your eyes open if needed, especially if you're driving or on the move." },
    { key: 'breaths.how.closing1', group: 'Audio Breaths Page — How To Use', label: 'Closing line 1', text: "These won't solve everything." },
    { key: 'breaths.how.closing2', group: 'Audio Breaths Page — How To Use', label: 'Closing line 2', multiline: true, text: "They'll help you settle enough to choose your next step." },

    // ── Audio Breaths Page · Find Your Breath ──
    { key: 'breaths.families.title', group: 'Audio Breaths Page — Find Your Breath', label: 'Headline', text: "Find the breath your body is asking for" },
    { key: 'breaths.families.subtitle', group: 'Audio Breaths Page — Find Your Breath', label: 'Line under the headline', multiline: true, text: "Four families of short Audio Breaths, each designed for a different state." },
    { key: 'breaths.families.use_when', group: 'Audio Breaths Page — Find Your Breath', label: 'Label at the bottom of each family card', help: 'The text after it comes from each family in Audio Breaths.', text: "Use when:" },
    { key: 'breaths.families.button', group: 'Audio Breaths Page — Find Your Breath', label: 'Button at the bottom', text: "Return to the membership space" },

    // ── Clarity Cards Page · Hero ───────────────────────────────────────
    { key: 'clarity.hero.back', group: 'Clarity Cards Page — Hero', label: 'Back link', help: 'The arrow is added automatically.', text: 'Back to Portal' },
    { key: 'clarity.hero.title', group: 'Clarity Cards Page — Hero', label: 'Headline', text: 'Clarity Cards' },
    { key: 'clarity.hero.body1', group: 'Clarity Cards Page — Hero', label: 'Paragraph 1', multiline: true, text: "Printable journaling cards designed to help you reflect, process, and notice patterns over time, or simply meet the moment you're in." },
    { key: 'clarity.hero.body2', group: 'Clarity Cards Page — Hero', label: 'Paragraph 2', multiline: true, text: "Each card includes thoughtful prompts and simple activities you can respond to in your own way. Use them once, revisit them often, or add them to a journal to track what's shifting." },
    { key: 'clarity.hero.body3', group: 'Clarity Cards Page — Hero', label: 'Paragraph 3', multiline: true, text: "There's no prescribed path. Just tools you can return to when it feels useful." },
    { key: 'clarity.hero.cta', group: 'Clarity Cards Page — Hero', label: 'Button', text: 'Choose a Card' },

    // ── Clarity Cards Page · How to Use ─────────────────────────────────
    { key: 'clarity.howto.title', group: 'Clarity Cards Page — How to Use', label: 'Section heading', text: 'How to use the Clarity Cards' },
    { key: 'clarity.howto.intro', group: 'Clarity Cards Page — How to Use', label: 'Intro paragraph', multiline: true, rows: 2, help: 'Each new line starts on its own line on wider screens.', text: "Some people print them and keep a small stack nearby.\nOthers add them to a journal or revisit the same card over time." },
    { key: 'clarity.howto.list_intro', group: 'Clarity Cards Page — How to Use', label: 'Line above the list', text: 'You might use one to:' },
    { key: 'clarity.howto.list', group: 'Clarity Cards Page — How to Use', label: 'Ticked list', multiline: true, list: true, rows: 4, help: 'One item per line.', text: "capture how you're feeling today\nnotice patterns across days or weeks\nwork through a moment that feels sticky\nground yourself before or after something meaningful" },
    { key: 'clarity.howto.closing1', group: 'Clarity Cards Page — How to Use', label: 'Closing line 1', help: 'Anything between *stars* is emphasised.', text: 'Use them *in whatever way* fits your life right now.' },
    { key: 'clarity.howto.closing2', group: 'Clarity Cards Page — How to Use', label: 'Closing line 2', text: "That's it. No rules. No pressure." },

    // ── Clarity Cards Page · Card Grid ──────────────────────────────────
    { key: 'clarity.grid.view_card', group: 'Clarity Cards Page — Card Grid', label: 'Card link (shown on hover)', help: 'The arrow is added automatically.', text: 'View Card' },

    // ── Clarity Cards Page · Use Them Your Way ──────────────────────────
    { key: 'clarity.closing.title', group: 'Clarity Cards Page — Use Them Your Way', label: 'Section heading', text: 'Use them your way' },
    { key: 'clarity.closing.body1', group: 'Clarity Cards Page — Use Them Your Way', label: 'Paragraph 1', multiline: true, rows: 2, text: "There's no system to follow and no pressure to use them daily.\nThese cards are here for the moments you need them." },
    { key: 'clarity.closing.body2', group: 'Clarity Cards Page — Use Them Your Way', label: 'Paragraph 2', multiline: true, text: 'Come back whenever you want to go deeper with a pen and paper.' },

    // ── Field Page · Header ─────────────────────────────────────────────
    { key: 'fieldpage.header.back', group: 'Field Page — Header', label: 'Back link', help: 'The arrow is added automatically.', text: 'Back to Portal' },
    { key: 'fieldpage.header.name', group: 'Field Page — Header', label: 'Name next to the icon', text: 'Field' },

    // ── Field Page · Intro ──────────────────────────────────────────────
    { key: 'fieldpage.intro.title', group: 'Field Page — Intro', label: 'Headline', text: "You're here. Take your time." },
    { key: 'fieldpage.intro.subtitle', group: 'Field Page — Intro', label: 'Line under the headline', text: "Field is listening. There's no right way to start." },

    // ── Field Page · Greeting ───────────────────────────────────────────
    { key: 'fieldpage.chat.greeting', group: 'Field Page — Greeting', label: "Field's opening messages", multiline: true, list: true, rows: 5, help: 'What Field says before the member types anything. One message bubble per line.', text: "Hey, you made it! I’ve been waiting for you. 😊 I’m Field.\nYou don’t need to have anything figured out to be here.\nWhat’s going on for you today?\n(Oh, and what's your name, so I know what to call you?)" },

    { key: 'fieldpage.chat.footer', group: 'Field Page — Greeting', label: 'Small line under the message box', text: "This is a private space. Your entries don't leave this chat." },

    // ── Field Page · Below the Chat ─────────────────────────────────────
    { key: 'fieldpage.chat.come_back', group: 'Field Page — Below the Chat', label: 'Line under the chat', text: "You can come back whenever you're ready." },
    { key: 'fieldpage.chat.disclaimer', group: 'Field Page — Below the Chat', label: 'Small italic note', multiline: true, text: 'Field is an AI-powered companion designed to support self-led reflection, not replace human care.' },

    // ── Afformations Page · Hero ────────────────────────────────────────
    { key: 'afformations.hero.back', group: 'Afformations Page — Hero', label: 'Back link', help: 'The arrow is added automatically.', text: 'Back to Portal' },
    { key: 'afformations.hero.title', group: 'Afformations Page — Hero', label: 'Headline', help: 'Anything between *stars* is emphasised.', text: 'Af*for*mations' },
    { key: 'afformations.hero.subtitle', group: 'Afformations Page — Hero', label: 'Subheadline', multiline: true, text: 'Afformations are empowering questions you ask yourself, designed to guide your brain toward supportive answers.' },
    { key: 'afformations.hero.body', group: 'Afformations Page — Hero', label: 'Paragraph', multiline: true, rows: 5, text: 'When the brain hears a question, it naturally begins searching for an answer. This simple shift invites your mind to notice evidence that supports growth, possibility, and self-trust. Instead of forcing yourself to believe something new, afformations gently guide your brain to explore the possibility that the belief may already be true. Over time, these small questions reshape what your mind pays attention to, helping you build new patterns of thinking and identity.' },
    { key: 'afformations.hero.invitation', group: 'Afformations Page — Hero', label: 'Italic closing line', multiline: true, text: 'Sit with one of these questions for a moment and notice what answers your mind begins to offer.' },

    // ── Afformations Page · Filters ─────────────────────────────────────
    { key: 'afformations.filters.all', group: 'Afformations Page — Filters', label: '"Show everything" filter button', help: 'The other filter buttons come from the card tags.', text: 'All' },

    // ── Pocket Prompts Page · Intro ─────────────────────────────────────
    { key: 'prompts.back', group: 'Pocket Prompts Page — Intro', label: 'Back link (top left)', help: 'The arrow is added automatically.', text: 'Back to Portal' },
    { key: 'prompts.hero.title', group: 'Pocket Prompts Page — Intro', label: 'Headline', text: 'Pocket Prompts' },
    { key: 'prompts.hero.subtitle', group: 'Pocket Prompts Page — Intro', label: 'Subheadline', multiline: true, text: 'Clarity through questions. Sometimes, the right question is all you need.' },
    { key: 'prompts.hero.body', group: 'Pocket Prompts Page — Intro', label: 'Paragraph', multiline: true, text: 'These prompts are designed to help you cut through the noise and get to what matters. Copy them to your notes, journal with them, or just sit with them for a moment.' },
    { key: 'prompts.hero.note', group: 'Pocket Prompts Page — Intro', label: 'Italic closing line', multiline: true, text: "You don't need to answer right away—sometimes just holding the question is enough." },

    // ── Pocket Prompts Page · Category Filters ──────────────────────────
    { key: 'prompts.filters.all', group: 'Pocket Prompts Page — Category Filters', label: 'First filter button (shows every prompt)', text: 'All Prompts' },

    // ── Pocket Prompts Page · Prompt Cards ──────────────────────────────
    { key: 'prompts.card.uncategorized', group: 'Pocket Prompts Page — Prompt Cards', label: 'Tag for a prompt with no category', text: 'Uncategorized' },
    { key: 'prompts.card.when_to_use', group: 'Pocket Prompts Page — Prompt Cards', label: '"Use this when" heading', help: 'The emoji is added automatically.', text: 'Use This When' },
    { key: 'prompts.card.purpose', group: 'Pocket Prompts Page — Prompt Cards', label: '"Purpose" heading', help: 'The emoji is added automatically.', text: 'Purpose' },
    { key: 'prompts.card.example', group: 'Pocket Prompts Page — Prompt Cards', label: '"Example scenario" heading', help: 'The emoji is added automatically.', text: 'Example Scenario' },
    { key: 'prompts.card.acknowledgement', group: 'Pocket Prompts Page — Prompt Cards', label: '"Acknowledgement" heading', help: 'The emoji is added automatically. The text itself is edited on each Pocket Prompt.', text: 'Acknowledgement' },
    { key: 'prompts.card.versions_title', group: 'Pocket Prompts Page — Prompt Cards', label: '"What each version does" heading', help: 'The emoji is added automatically.', text: 'What Each Version Does' },
    { key: 'prompts.card.free_title', group: 'Pocket Prompts Page — Prompt Cards', label: 'Free version box title', text: 'Free Version' },
    { key: 'prompts.card.premium_title', group: 'Pocket Prompts Page — Prompt Cards', label: 'High-level version box title', help: 'The star is added automatically.', text: 'High-Level Version' },
    { key: 'prompts.free.label', group: 'Pocket Prompts Page — Prompt Cards', label: 'Label above the free prompt', text: 'Free Prompt' },
    { key: 'prompts.free.copy', group: 'Pocket Prompts Page — Prompt Cards', label: 'Copy button (free prompt)', text: 'Copy Free' },
    { key: 'prompts.copied', group: 'Pocket Prompts Page — Prompt Cards', label: 'Copy button, just after copying', text: 'Copied!' },

    // ── Pocket Prompts Page · High-Level Version ────────────────────────
    { key: 'prompts.premium.label', group: 'Pocket Prompts Page — High-Level Version', label: 'Label above the high-level prompt', help: 'Followed by the "unlocked" or "preview" word below.', text: 'High-Level Version' },
    { key: 'prompts.premium.preview', group: 'Pocket Prompts Page — High-Level Version', label: 'Label ending, before she buys', text: '— Preview' },
    { key: 'prompts.premium.unlocked', group: 'Pocket Prompts Page — High-Level Version', label: 'Label ending, once unlocked', text: '— Unlocked' },
    { key: 'prompts.premium.unlock', group: 'Pocket Prompts Page — High-Level Version', label: 'Unlock button', help: 'Changing the price here only changes the wording — the amount charged is set separately.', text: 'Unlock full prompt — $2' },
    { key: 'prompts.premium.unlock_note', group: 'Pocket Prompts Page — High-Level Version', label: 'Note beside the unlock button', text: 'One-time payment · yours to keep' },
    { key: 'prompts.premium.copy', group: 'Pocket Prompts Page — High-Level Version', label: 'Copy button (unlocked prompt)', text: 'Copy Prompt' },

    // ── Voice Notes Page · Intro ────────────────────────────────────────
    { key: 'voicenotes.back', group: 'Voice Notes Page — Intro', label: 'Back link (top left)', help: 'The arrow is added automatically.', text: 'Back to Portal' },
    { key: 'voicenotes.hero.title', group: 'Voice Notes Page — Intro', label: 'Headline', text: 'Voice Notes' },
    { key: 'voicenotes.hero.subtitle', group: 'Voice Notes Page — Intro', label: 'Subheadline', multiline: true, text: 'Remember who you are. Personal messages for when you need to hear it.' },
    { key: 'voicenotes.hero.body', group: 'Voice Notes Page — Intro', label: 'Paragraph', multiline: true, text: 'These are like voice memos from a friend — short, personal recordings for specific moments. Listen when you need a reminder, a perspective shift, or just to feel less alone.' },
    { key: 'voicenotes.hero.note', group: 'Voice Notes Page — Intro', label: 'Italic closing line', multiline: true, text: 'Press play and let yourself be held for a moment.' },

    // ── Site-wide · Top Menu ────────────────────────────────────────────
    { key: 'nav.link_home', group: 'Site-wide — Top Menu', label: 'Menu link: Home', text: 'Home' },
    { key: 'nav.link_about', group: 'Site-wide — Top Menu', label: 'Menu link: About', text: 'About' },
    { key: 'nav.link_practitioners', group: 'Site-wide — Top Menu', label: 'Menu link: Practitioners', text: 'Practitioners' },
    { key: 'nav.link_gift', group: 'Site-wide — Top Menu', label: 'Menu link: Gift', text: 'Gift' },
    { key: 'nav.link_contact', group: 'Site-wide — Top Menu', label: 'Menu link: Contact', text: 'Contact Us' },
    { key: 'nav.signin', group: 'Site-wide — Top Menu', label: 'Sign In button', text: 'Sign In', help: 'Shows on the desktop menu and in the phone menu.' },

    // ── Site-wide · Footer ──────────────────────────────────────────────
    { key: 'footer.copyright', group: 'Site-wide — Footer', label: 'Copyright line', text: '© 2026 Emergyng Energy Inc. All rights reserved.' },
    { key: 'footer.link_terms', group: 'Site-wide — Footer', label: 'Link: Terms', text: 'Terms' },
    { key: 'footer.link_privacy', group: 'Site-wide — Footer', label: 'Link: Privacy', text: 'Privacy' },
    { key: 'footer.link_billing', group: 'Site-wide — Footer', label: 'Link: Billing & Refunds', text: 'Billing & Refunds' },

    // ── Site-wide · Mobile Button ───────────────────────────────────────
    { key: 'stickycta.button', group: 'Site-wide — Mobile Button', label: 'Button pinned to the bottom on phones', text: 'Start your journey', help: 'Only visitors who are not signed in see this button.' },

    // ── Page Not Found ──────────────────────────────────────────────────
    { key: 'notfound.code', group: 'Page Not Found — Message', label: 'Big number', text: '404' },
    { key: 'notfound.title', group: 'Page Not Found — Message', label: 'Heading', text: 'This page wandered off' },
    { key: 'notfound.body', group: 'Page Not Found — Message', label: 'Text', multiline: true, text: "The page you were looking for isn't here. Let's get you back to a calm place." },
    { key: 'notfound.cta_home', group: 'Page Not Found — Message', label: 'Button: home', text: 'Back home' },
    { key: 'notfound.cta_membership', group: 'Page Not Found — Message', label: 'Button: membership', text: 'See membership' },

    // ── Sign In & Sign Up · Sign In ─────────────────────────────────────
    { key: 'signin.title', group: 'Sign In & Sign Up — Sign In', label: 'Heading', text: 'Welcome back' },
    { key: 'signin.subtitle', group: 'Sign In & Sign Up — Sign In', label: 'Line under the heading', text: 'Sign in to continue your journey' },
    { key: 'signin.google_button', group: 'Sign In & Sign Up — Sign In', label: 'Google button', text: 'Continue with Google' },
    { key: 'signin.divider', group: 'Sign In & Sign Up — Sign In', label: 'Divider text (between Google and email)', text: 'or sign in with email' },
    { key: 'signin.email_placeholder', group: 'Sign In & Sign Up — Sign In', label: 'Email box (grey hint text)', text: 'Email address' },
    { key: 'signin.password_placeholder', group: 'Sign In & Sign Up — Sign In', label: 'Password box (grey hint text)', text: 'Password' },
    { key: 'signin.submit', group: 'Sign In & Sign Up — Sign In', label: 'Sign-in button', text: 'Sign In' },
    { key: 'signin.submit_busy', group: 'Sign In & Sign Up — Sign In', label: 'Sign-in button (while it works)', text: 'Signing in...' },
    { key: 'signin.forgot_link', group: 'Sign In & Sign Up — Sign In', label: 'Forgot password link', text: 'Forgot your password?' },
    { key: 'signin.forgot_need_email', group: 'Sign In & Sign Up — Sign In', label: 'Message when Forgot password is clicked with no email', text: 'Enter your email above first, then click "Forgot your password?"' },
    { key: 'signin.signup_prompt', group: 'Sign In & Sign Up — Sign In', label: 'Sign-up line (before the link)', text: "Don't have an account?" },
    { key: 'signin.signup_link', group: 'Sign In & Sign Up — Sign In', label: 'Sign-up link', text: 'Sign up' },

    // ── Sign In & Sign Up · Sign Up ─────────────────────────────────────
    { key: 'signup.title', group: 'Sign In & Sign Up — Sign Up', label: 'Heading', text: 'Create your account' },
    { key: 'signup.subtitle', group: 'Sign In & Sign Up — Sign Up', label: 'Line under the heading', text: 'Begin your journey to self-connection' },
    { key: 'signup.success_plan', group: 'Sign In & Sign Up — Sign Up', label: 'Success message', multiline: true, text: 'Account created! Check your email to confirm, then choose a plan.' },
    { key: 'signup.success_gift', group: 'Sign In & Sign Up — Sign Up', label: 'Success message (when they came with a gift card)', multiline: true, text: 'Account created! Check your email to confirm, then redeem your gift card.' },
    { key: 'signup.error_exists', group: 'Sign In & Sign Up — Sign Up', label: 'Message when the email already has an account', multiline: true, text: 'An account with this email already exists. Please sign in instead.' },
    { key: 'signup.google_button', group: 'Sign In & Sign Up — Sign Up', label: 'Google button', text: 'Continue with Google' },
    { key: 'signup.divider', group: 'Sign In & Sign Up — Sign Up', label: 'Divider text (between Google and email)', text: 'or sign up with email' },
    { key: 'signup.name_placeholder', group: 'Sign In & Sign Up — Sign Up', label: 'Name box (grey hint text)', text: 'Your name' },
    { key: 'signup.email_placeholder', group: 'Sign In & Sign Up — Sign Up', label: 'Email box (grey hint text)', text: 'Email address' },
    { key: 'signup.password_placeholder', group: 'Sign In & Sign Up — Sign Up', label: 'Password box (grey hint text)', text: 'Password (min 6 characters)' },
    { key: 'signup.submit', group: 'Sign In & Sign Up — Sign Up', label: 'Create-account button', text: 'Create Account' },
    { key: 'signup.submit_busy', group: 'Sign In & Sign Up — Sign Up', label: 'Create-account button (while it works)', text: 'Creating account...' },
    { key: 'signup.signin_prompt', group: 'Sign In & Sign Up — Sign Up', label: 'Sign-in line (before the link)', text: 'Already have an account?' },
    { key: 'signup.signin_link', group: 'Sign In & Sign Up — Sign Up', label: 'Sign-in link', text: 'Sign in' },

    // ── Sign In & Sign Up · Reset Password ──────────────────────────────
    { key: 'resetpw.title', group: 'Sign In & Sign Up — Reset Password', label: 'Heading', text: 'Set a new password' },
    { key: 'resetpw.not_ready', group: 'Sign In & Sign Up — Reset Password', label: 'Note when the page is opened without the email link (before the link)', multiline: true, text: 'Open this page from the password-reset link in your email. If you got here by mistake,' },
    { key: 'resetpw.not_ready_link', group: 'Sign In & Sign Up — Reset Password', label: 'Note link (back to sign in)', text: 'go back to sign in' },
    { key: 'resetpw.password_placeholder', group: 'Sign In & Sign Up — Reset Password', label: 'New password box (grey hint text)', text: 'New password' },
    { key: 'resetpw.confirm_placeholder', group: 'Sign In & Sign Up — Reset Password', label: 'Confirm password box (grey hint text)', text: 'Confirm new password' },
    { key: 'resetpw.submit', group: 'Sign In & Sign Up — Reset Password', label: 'Save button', text: 'Update password' },
    { key: 'resetpw.submit_busy', group: 'Sign In & Sign Up — Reset Password', label: 'Save button (while it works)', text: 'Saving…' },
    { key: 'resetpw.error_too_short', group: 'Sign In & Sign Up — Reset Password', label: 'Message when the password is too short', text: 'Password must be at least 6 characters.' },
    { key: 'resetpw.error_mismatch', group: 'Sign In & Sign Up — Reset Password', label: 'Message when the two passwords differ', text: 'Passwords do not match.' },
    { key: 'resetpw.success', group: 'Sign In & Sign Up — Reset Password', label: 'Success message', text: 'Password updated! Taking you in…' },

    // ── Sign In & Sign Up · Email Link Page ─────────────────────────────
    { key: 'authconfirm.loading', group: 'Sign In & Sign Up — Email Link Page', label: 'Waiting text (while the link is checked)', text: 'One moment…' },
    { key: 'authconfirm.error_title', group: 'Sign In & Sign Up — Email Link Page', label: 'Heading when the link fails', text: "That link didn't work" },
    { key: 'authconfirm.error_incomplete', group: 'Sign In & Sign Up — Email Link Page', label: 'Explanation: link is incomplete', multiline: true, text: 'This link is incomplete. Please use the button in the email again.' },
    { key: 'authconfirm.error_expired', group: 'Sign In & Sign Up — Email Link Page', label: 'Explanation: link expired or already used', multiline: true, text: 'This link has expired or has already been used. Links only work once, for a short time.' },
    { key: 'authconfirm.signin_button', group: 'Sign In & Sign Up — Email Link Page', label: 'Sign-in button', text: 'Sign in' },
    { key: 'authconfirm.new_link_button', group: 'Sign In & Sign Up — Email Link Page', label: 'New-link button', text: 'Send a new link' },

    // ── Clarity Card Page · Card ────────────────────────────────────────
    { key: 'carddetail.back', group: 'Clarity Card Page — Card', label: 'Back link (top left)', text: "Back to Deck" },
    { key: 'carddetail.badge', group: 'Clarity Card Page — Card', label: 'Small label above the card title', text: "Clarity Card" },
    { key: 'carddetail.fallback_body', group: 'Clarity Card Page — Card', label: 'Text shown when a card has no body text', multiline: true, text: "Take a few moments to journal or reflect on this card. Let whatever comes up simply be there without judgment." },

    // ── Clarity Card Page · Printable Version ───────────────────────────
    { key: 'carddetail.print_heading', group: 'Clarity Card Page — Printable Version', label: 'Heading', text: "Printable Version" },
    { key: 'carddetail.print_body', group: 'Clarity Card Page — Printable Version', label: 'Text under heading', multiline: true, text: "Download the beautifully designed PDF to print or save to your journal." },
    { key: 'carddetail.download_button', group: 'Clarity Card Page — Printable Version', label: 'Download button', text: "Download PDF" },
    { key: 'carddetail.no_pdf', group: 'Clarity Card Page — Printable Version', label: 'Greyed-out button when no PDF is uploaded', text: "PDF Not Uploaded Yet" },

    // ── Members Area · Billing ──────────────────────────────────────────
    { key: 'memberbilling.back', group: 'Members Area — Billing', label: 'Back link (top bar)', text: "Back to your space" },
    { key: 'memberbilling.title', group: 'Members Area — Billing', label: 'Page title', text: "Billing & invoices" },
    { key: 'memberbilling.intro', group: 'Members Area — Billing', label: 'Intro line', multiline: true, text: "Your membership, your receipts, and where to make changes." },
    { key: 'memberbilling.membership_heading', group: 'Members Area — Billing', label: 'Membership box heading', text: "Your membership" },
    { key: 'memberbilling.plan_label', group: 'Members Area — Billing', label: 'Label: plan', text: "Plan" },
    { key: 'memberbilling.status_label', group: 'Members Area — Billing', label: 'Label: status', text: "Status" },
    { key: 'memberbilling.renews_label', group: 'Members Area — Billing', label: 'Label: renewal date (paid plans)', text: "Renews on" },
    { key: 'memberbilling.until_label', group: 'Members Area — Billing', label: 'Label: end date (gift memberships)', text: "Access until" },
    { key: 'memberbilling.cancelled_status', group: 'Members Area — Billing', label: 'Status after a member cancels', help: 'Shown until the paid period ends.', text: "Cancelled" },
    { key: 'memberbilling.ends_label', group: 'Members Area — Billing', label: 'Label: end date after a member cancels', text: "Access ends on" },
    { key: 'memberbilling.none_text', group: 'Members Area — Billing', label: 'Text when there is no membership', multiline: true, text: "You don't have an active membership right now." },
    { key: 'memberbilling.none_cta', group: 'Members Area — Billing', label: 'Button when there is no membership', text: "Choose a plan" },
    { key: 'memberbilling.gift_note', group: 'Members Area — Billing', label: 'Note shown for gift memberships', multiline: true, text: "This is a gift membership. It ends by itself on the date above, with no renewal and no charge. If you'd like to continue afterwards, you can choose a plan any time." },
    { key: 'memberbilling.invoices_heading', group: 'Members Area — Billing', label: 'Invoices box heading', text: "Invoices & payment" },
    { key: 'memberbilling.invoices_body', group: 'Members Area — Billing', label: 'Invoices box text', multiline: true, text: "View and download every receipt, including any one-time high-level prompt unlocks, update your payment method, or cancel your membership. If you cancel, you keep full access until the end of the period you've already paid for." },
    { key: 'memberbilling.portal_button', group: 'Members Area — Billing', label: 'Billing portal button', text: "Open billing portal" },
    { key: 'memberbilling.stripe_note', group: 'Members Area — Billing', label: 'Small note under button', text: "Secure billing powered by Stripe." },

    // ── Members Area · Profile ──────────────────────────────────────────
    { key: 'profile.back', group: 'Members Area — Profile', label: 'Back link (top bar)', text: "Back to Dashboard" },
    { key: 'profile.nav_title', group: 'Members Area — Profile', label: 'Top bar title', text: "Profile Settings" },
    { key: 'profile.photo_change', group: 'Members Area — Profile', label: 'Word on the photo when you hover', text: "Change" },
    { key: 'profile.photo_help', group: 'Members Area — Profile', label: 'Line under the photo', text: "Click the image to change your profile picture." },
    { key: 'profile.details_heading', group: 'Members Area — Profile', label: 'Details box heading', text: "Personal Details" },
    { key: 'profile.name_label', group: 'Members Area — Profile', label: 'Name field label', text: "Display Name" },
    { key: 'profile.name_placeholder', group: 'Members Area — Profile', label: 'Name field placeholder (grey text in the empty box)', text: "How should we call you?" },
    { key: 'profile.name_help', group: 'Members Area — Profile', label: 'Line under the name field', text: "This is the name that will appear on your dashboard." },
    { key: 'profile.email_label', group: 'Members Area — Profile', label: 'Email field label', text: "Email Address" },
    { key: 'profile.email_help', group: 'Members Area — Profile', label: 'Line under the email field', text: "Your email address cannot be changed from this page." },
    { key: 'profile.save_button', group: 'Members Area — Profile', label: 'Save button', text: "Save Profile" },
    { key: 'profile.billing_heading', group: 'Members Area — Profile', label: 'Subscription box heading', text: "Managing Your Subscription" },
    { key: 'profile.billing_body', group: 'Members Area — Profile', label: 'Subscription box text', multiline: true, text: "See your plan, download invoices for memberships and any add-ons, update your payment method, or cancel — all in one place." },
    { key: 'profile.billing_button', group: 'Members Area — Profile', label: 'Subscription box button', text: "Billing & invoices" },

    // ── Members Area · Dashboard Welcome ────────────────────────────────
    { key: 'dashboard.profile_tooltip', group: 'Members Area — Dashboard Welcome', label: 'Tooltip on the profile photo', text: "Edit Profile" },
    { key: 'dashboard.billing_link', group: 'Members Area — Dashboard Welcome', label: 'Billing link under the photo', text: "Billing & invoices" },
    { key: 'dashboard.greeting', group: 'Members Area — Dashboard Welcome', label: "Greeting (the member's name follows it)", text: "Welcome," },
    { key: 'dashboard.subtitle', group: 'Members Area — Dashboard Welcome', label: 'Line under the greeting', text: "It's good to have you here." },
    { key: 'dashboard.search_placeholder', group: 'Members Area — Dashboard Welcome', label: 'Search box placeholder', text: "Search the portal..." },

    // ── Members Area · Dashboard Sign Out ───────────────────────────────
    { key: 'dashboard.sign_out', group: 'Members Area — Dashboard Sign Out', label: 'Sign out button', text: "Sign Out" },

    // ── Guided Shift Player: Top ──
    { key: 'shiftplayer.back_link', group: 'Guided Shift Player — Top', label: 'Back link (top left)', text: "Back to Guided Shifts" },
    // ── Guided Shift Player: Audio Player ──
    { key: 'shiftplayer.player.loading_note', group: 'Guided Shift Player — Audio Player', label: 'Note under the player while the audio loads', text: "Audio may take a moment to load…" },
    // ── Guided Shift Player: Use This When ──
    { key: 'shiftplayer.use_when.title', group: 'Guided Shift Player — Use This When', label: 'Heading above the list', text: "Use This When" },
    // ── Guided Shift Player: Field Integration Prompt ──
    { key: 'shiftplayer.field.title', group: 'Guided Shift Player — Field Integration Prompt', label: 'Box heading', text: "Field Integration Prompt" },
    { key: 'shiftplayer.field.note', group: 'Guided Shift Player — Field Integration Prompt', label: 'Small note under the heading', text: "(copy and paste into Field)" },
    // ── Guided Shift Player: Science & Spiritual Corners ──
    { key: 'shiftplayer.corners.science_title', group: 'Guided Shift Player — Science & Spiritual Corners', label: 'Science box heading', text: "Science Corner" },
    { key: 'shiftplayer.corners.spiritual_title', group: 'Guided Shift Player — Science & Spiritual Corners', label: 'Spiritual box heading', text: "Spiritual Corner" },
    { key: 'shiftplayer.corners.source_label', group: 'Guided Shift Player — Science & Spiritual Corners', label: 'Word before each source', help: 'The source itself comes from each shift.', text: "Source:" },
    // ── Guided Shift Player: Bottom ──
    { key: 'shiftplayer.footer.part_of', group: 'Guided Shift Player — Bottom', label: 'Words before the family name at the bottom', help: 'The family name is added after these words.', text: "Part of the" },
    // ── Audio Breath Player: Top ──
    { key: 'breathplayer.back_link', group: 'Audio Breath Player — Top', label: 'Back link (top left)', text: "Back to Audio Breaths" },
    // ── Audio Breath Player: Play Button ──
    { key: 'breathplayer.player.listen', group: 'Audio Breath Player — Play Button', label: 'Play button text', text: "Listen" },
    // ── Audio Breath Player: Use This When ──
    { key: 'breathplayer.use_when.title', group: 'Audio Breath Player — Use This When', label: 'Heading above the list', text: "Use this when:" },
    // ── Audio Breath Player: Science & Spiritual Corners ──
    { key: 'breathplayer.corners.science_title', group: 'Audio Breath Player — Science & Spiritual Corners', label: 'Science box heading', text: "Science Corner" },
    { key: 'breathplayer.corners.spiritual_title', group: 'Audio Breath Player — Science & Spiritual Corners', label: 'Spiritual box heading', text: "Spiritual Corner" },
    { key: 'breathplayer.corners.source_label', group: 'Audio Breath Player — Science & Spiritual Corners', label: 'Word before each source', help: 'The source itself comes from each breath.', text: "Source:" },
];

/** Ordered list of group names, for the admin screen. */
export const SITE_COPY_GROUPS = SITE_COPY_FIELDS.reduce((groups, f) => {
    if (!groups.includes(f.group)) groups.push(f.group);
    return groups;
}, []);

export const DEFAULT_COPY = Object.fromEntries(SITE_COPY_FIELDS.map((f) => [f.key, f.text]));

/** Groups read "Page — Section" (or just "Page"), so the admin can nest them. */
export const parseGroup = (group) => {
    const parts = group.split('\u2014').map((s) => s.trim());
    return { page: parts[0], section: parts[1] || 'General' };
};

/** Pages in the order they appear, for the admin's tabs. */
export const SITE_COPY_PAGES = SITE_COPY_FIELDS.reduce((pages, f) => {
    const { page } = parseGroup(f.group);
    if (!pages.includes(page)) pages.push(page);
    return pages;
}, []);

/** Sections belonging to a page, in order. */
export const sectionsForPage = (page) =>
    SITE_COPY_FIELDS.reduce((secs, f) => {
        const g = parseGroup(f.group);
        if (g.page === page && !secs.includes(g.section)) secs.push(g.section);
        return secs;
    }, []);

export const fieldsForSection = (page, section) =>
    SITE_COPY_FIELDS.filter((f) => {
        const g = parseGroup(f.group);
        return g.page === page && g.section === section;
    });
