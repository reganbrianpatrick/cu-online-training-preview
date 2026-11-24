/*
 * Course: The GENIUS Act: what credit union staff need to know
 *
 * Every factual claim below comes from a source listed in `sources` at the
 * bottom. Each screen names its source in `cite`. Read the enrolled bill
 * (S. 1582, P.L. 119-27) before changing anything that quotes the law.
 * Content is current as of `asOf`. Re-check NCUA's rulemaking status before
 * sending this out: when this was written, NCUA had proposed rules but not
 * finalized them.
 */
window.CU_COURSES = window.CU_COURSES || [];
window.CU_COURSES.push({
  id: "genius-act",
  title: "The GENIUS Act: what credit union staff need to know",
  subtitle: "The new federal stablecoin law in plain language, and what to say when members ask about it",
  format: "Interactive walkthrough",
  minutes: 20,
  audience: "All staff. The last module, for leaders and compliance, is optional.",
  asOf: "November 24, 2026",
  passMark: 0.8,
  disclaimer:
    "This is staff education, not legal advice. Rules under the GENIUS Act are still being written. Check with your compliance team or counsel before making product or policy decisions.",
  // Short notice shown on every page of the course.
  notice:
    "Not legal advice. NCUA's GENIUS Act rules are proposed, not final, as of November 24, 2026. Details may change.",
  // Screens that cite any of these get a "proposal, not final" flag.
  proposedSources: ["ncua-feb", "ncua-may", "ncua-fintech", "dwt", "troutman-supp"],

  modules: [
    // ---------------------------------------------------------------- 1
    {
      id: "why",
      title: "Why this matters",
      screens: [
        {
          type: "text",
          heading: "Before you begin: two notices",
          body: [
            "<strong>1. This is not legal advice.</strong> This course is general education for credit union staff. It does not tell your credit union what to do. For decisions about products, policies or compliance, talk to your compliance team or legal counsel.",
            "<strong>2. NCUA's rules are not final.</strong> Congress passed the GENIUS Act in 2025, but NCUA is still writing the rules that apply it to credit unions. As of <strong>November 24, 2026</strong>, NCUA had <em>proposed</em> rules and posted FAQs, but had <strong>not finalized</strong> them. Anything in this course about how NCUA will apply the law is based on those proposals and may change.",
            "Pages that rely on NCUA proposals are marked <span class=\"flag\">NCUA proposal, not final</span>.",
          ],
          callout: {
            kind: "warn",
            text: "Before you act on anything in this course, check NCUA's current rules and ask your compliance team.",
          },
          cite: ["ncua-fintech", "ncua-feb", "ncua-may"],
        },
        {
          type: "text",
          heading: "A new federal law for stablecoins",
          body: [
            "The <strong>GENIUS Act</strong> (short for <em>Guiding and Establishing National Innovation for U.S. Stablecoins</em>) was signed into law on <strong>July 18, 2025</strong>. It is the first federal law that sets rules for <strong>payment stablecoins</strong>.",
            "A payment stablecoin is a digital token that is meant to be used to pay for things and to stay worth a fixed amount, usually one U.S. dollar.",
            "Members will hear about stablecoins from the news, apps and family. This walkthrough gives you the basics so you can answer simple questions correctly and know when to pass a question on.",
          ],
          callout: {
            kind: "info",
            text: "Bill number S. 1582. Public Law 119-27.",
          },
          cite: ["bill", "ncua-fintech"],
        },
        {
          type: "reveal",
          heading: "What you will be able to do",
          intro: "Tap each card.",
          cards: [
            { front: "Explain", back: "Explain in one sentence what a payment stablecoin is." },
            { front: "Correct", back: "Correct the most common myth: stablecoins are <strong>not</strong> insured by NCUA or FDIC." },
            { front: "Spot", back: "Spot a scam that uses the law's name to sound official." },
            { front: "Route", back: "Know which questions to pass to a manager or compliance." },
          ],
        },
        {
          type: "check",
          question: "What is a payment stablecoin designed to do?",
          options: [
            { text: "Rise in value over time, like a stock", correct: false, why: "That describes an investment. A payment stablecoin is designed to keep a stable value." },
            { text: "Be used for payments while holding a fixed value, such as $1", correct: true, why: "Right. The law defines it as a digital asset used for payment or settlement that the issuer must redeem for a fixed amount of money." },
            { text: "Replace the U.S. dollar", correct: false, why: "No. National currencies are excluded from the definition. A stablecoin is a token that tracks a currency." },
          ],
          cite: ["bill"],
        },
      ],
    },

    // ---------------------------------------------------------------- 2
    {
      id: "what",
      title: "What counts as a payment stablecoin",
      screens: [
        {
          type: "text",
          heading: "The legal definition, in plain words",
          body: [
            "Under Section 2 of the Act, a payment stablecoin is a digital asset that:",
          ],
          list: [
            "is used, or designed to be used, <strong>to pay or settle</strong> transactions;",
            "the issuer is <strong>obligated to redeem</strong> for a fixed amount of money; and",
            "the issuer says will <strong>keep a stable value</strong> against that fixed amount.",
          ],
          after: [
            "The definition <strong>does not include</strong> national currencies, bank deposits (including deposits recorded on a blockchain), or securities.",
          ],
          cite: ["bill"],
        },
        {
          type: "text",
          heading: "What about credit union shares?",
          body: [
            "Section 16 of the Act says it does not limit a credit union's existing authority to accept shares and to issue <strong>digital assets that represent those shares</strong>.",
            "According to a July 2026 legal analysis of NCUA's supplemental proposal, NCUA reads <strong>tokenized share accounts</strong> as falling outside the Act's definition of a payment stablecoin, and asked for comment on whether to write that into the rule. The proposal is not final.",
          ],
          callout: {
            kind: "tip",
            text: "Short version for members: a stablecoin is <em>not</em> a share account, even if both can be digital.",
          },
          cite: ["bill", "troutman-supp"],
        },
        {
          type: "check",
          question: "Which of these is NOT a payment stablecoin under the Act?",
          options: [
            { text: "A dollar-pegged token a licensed issuer must redeem at $1", correct: false, why: "That fits the definition." },
            { text: "A bank deposit recorded using blockchain technology", correct: true, why: "Right. Deposits, including deposits recorded on a distributed ledger, are carved out of the definition." },
            { text: "A token used to settle payments that the issuer promises to keep at $1", correct: false, why: "That fits the definition." },
          ],
          cite: ["bill"],
        },
      ],
    },

    // ---------------------------------------------------------------- 3
    {
      id: "who",
      title: "Who can issue them, and who checks",
      screens: [
        {
          type: "text",
          heading: "Only permitted issuers",
          body: [
            "Section 3 makes it <strong>unlawful for anyone other than a permitted payment stablecoin issuer</strong> to issue a payment stablecoin in the United States. Knowing violations can bring fines of up to $1,000,000 per violation and up to 5 years in prison.",
            "Section 2 names three kinds of permitted issuer:",
          ],
          list: [
            "a <strong>subsidiary of an insured depository institution</strong>, including an insured credit union, approved under Section 5;",
            "a <strong>Federal qualified</strong> issuer (a nonbank supervised by the OCC); or",
            "a <strong>State qualified</strong> issuer.",
          ],
          cite: ["bill"],
        },
        {
          type: "reveal",
          heading: "Who regulates whom",
          intro: "The Act names a \"primary Federal payment stablecoin regulator\" for each kind of issuer. Tap each card.",
          cards: [
            { front: "Credit union subsidiaries", back: "<strong>NCUA</strong> regulates insured credit unions and their subsidiaries that issue stablecoins." },
            { front: "Bank subsidiaries", back: "The bank's own federal regulator: the <strong>OCC, FDIC or Federal Reserve</strong>." },
            { front: "Federal nonbank issuers", back: "The <strong>OCC</strong>." },
            { front: "State issuers", back: "A state issuer with <strong>$10 billion or less</strong> outstanding may choose a state regime, if that regime is \"substantially similar\" to the federal one." },
          ],
          cite: ["bill"],
        },
        {
          type: "text",
          heading: "Big tech companies face an extra step",
          body: [
            "A public company that is not mainly in the business of financial activities cannot issue a payment stablecoin unless the <strong>Stablecoin Certification Review Committee</strong> approves it by <strong>unanimous vote</strong>. The Treasury Secretary chairs that committee, and the Federal Reserve and FDIC chairs sit on it.",
            "The company must also agree to limits on how it uses consumer data and on tying products together.",
          ],
          cite: ["bill"],
        },
        {
          type: "check",
          question: "If a credit union wanted to issue a stablecoin, which agency would be its primary regulator for that activity?",
          options: [
            { text: "The SEC", correct: false, why: "The Act says payment stablecoins from permitted issuers are not securities, so the SEC is not the issuing regulator." },
            { text: "NCUA", correct: true, why: "Right. NCUA is named for insured credit unions and their subsidiaries. Under NCUA's proposal, the credit union would need a separate, NCUA-approved subsidiary to issue." },
            { text: "The OCC", correct: false, why: "The OCC covers federal nonbank issuers and national banks, not credit unions." },
          ],
          cite: ["bill", "dwt"],
        },
      ],
    },

    // ---------------------------------------------------------------- 4
    {
      id: "protections",
      title: "Rules that protect holders",
      screens: [
        {
          type: "text",
          heading: "1-to-1 reserves",
          body: [
            "Section 4 requires every permitted issuer to hold <strong>identifiable reserves of at least $1 for every $1</strong> of stablecoins outstanding. Reserves are limited to safe, liquid assets:",
          ],
          list: [
            "U.S. coins and currency, or money held at a Federal Reserve Bank;",
            "demand deposits or <strong>insured shares</strong> at an insured depository institution, including credit unions (subject to FDIC and NCUA limits);",
            "Treasury bills, notes or bonds with 93 days or less to maturity;",
            "overnight repurchase and reverse repurchase agreements backed by Treasuries;",
            "government money market funds that hold only the assets above;",
            "other similarly liquid federal government assets a regulator approves; and",
            "tokenized forms of certain of these assets.",
          ],
          after: [
            "Reserves generally <strong>cannot be pledged, rehypothecated or reused</strong>.",
          ],
          callout: {
            kind: "tip",
            text: "Note for credit unions: insured shares are on the list of allowed reserve assets, so issuers could hold some reserves at credit unions, within NCUA limits.",
          },
          cite: ["bill"],
        },
        {
          type: "reveal",
          heading: "Transparency and safeguards",
          intro: "Tap each card.",
          cards: [
            { front: "Monthly report", back: "Issuers must post, each month, how many coins are outstanding and what the reserves are made of." },
            { front: "Outside check", back: "A registered public accounting firm must examine the monthly report. The CEO and CFO must certify it. A knowingly false certification carries criminal penalties." },
            { front: "Clear redemption", back: "Issuers must publish their redemption policy and all fees in plain language, and give at least 7 days' notice before changing fees." },
            { front: "First in line", back: "If an issuer fails, stablecoin holders have priority over other creditors for the required reserves (Section 11)." },
            { front: "Anti-money laundering", back: "Issuers are treated as financial institutions under the Bank Secrecy Act: AML program, customer identification, record keeping and suspicious activity reporting." },
            { front: "Lawful orders", back: "An issuer may issue only if it has the technical ability to comply with lawful orders, for example to freeze or block coins." },
          ],
          cite: ["bill"],
        },
        {
          type: "check",
          question: "How often must a permitted issuer publish the makeup of its reserves?",
          options: [
            { text: "Every month", correct: true, why: "Right. Section 4 requires a monthly report, examined by a registered public accounting firm and certified by the CEO and CFO." },
            { text: "Once a year", correct: false, why: "Issuers with more than $50 billion outstanding (that don't already file with the SEC) also need an annual audited financial statement, but the reserve report is monthly." },
            { text: "Only when a regulator asks", correct: false, why: "The report is public and monthly." },
          ],
          cite: ["bill"],
        },
      ],
    },

    // ---------------------------------------------------------------- 5
    {
      id: "not",
      title: "What stablecoins are not",
      screens: [
        {
          type: "text",
          heading: "Not insured. Not government-backed.",
          body: [
            "This is the most important part for member conversations. Section 4(e) says payment stablecoins <strong>shall not be</strong>:",
          ],
          list: [
            "backed by the full faith and credit of the United States;",
            "guaranteed by the U.S. government;",
            "covered by FDIC deposit insurance; or",
            "covered by <strong>NCUA share insurance</strong>.",
          ],
          after: [
            "It is <strong>unlawful to claim</strong> that a stablecoin has any of those protections. NCUA says the same thing in its own guidance: digital assets and cryptocurrencies are not shares and are not covered by the Share Insurance Fund.",
          ],
          callout: {
            kind: "warn",
            text: "Never tell a member a stablecoin is \"insured\" or \"just like savings.\" It isn't, and saying so can be illegal.",
          },
          cite: ["bill", "ncua-fintech"],
        },
        {
          type: "text",
          heading: "No interest from the issuer",
          body: [
            "Section 4(a)(11) says no permitted issuer may pay a holder <strong>\"any form of interest or yield (whether in cash, tokens, or other consideration) solely in connection with the holding, use, or retention\"</strong> of the stablecoin.",
            "The ban is written for <em>issuers</em>: permitted issuers and foreign issuers. If a member mentions \"rewards\" offered on stablecoins by an app or exchange, don't guess whether that is allowed. Pass the question on.",
          ],
          callout: {
            kind: "info",
            text: "Why credit unions care: if members can earn rewards on stablecoins elsewhere, some may move money out of share accounts. That is a question for leaders, not front-line staff.",
          },
          cite: ["bill", "genius-summary"],
        },
        {
          type: "text",
          heading: "Not a security, and not a commodity",
          body: [
            "Section 17 amends the federal securities and commodities laws so that a payment stablecoin from a permitted issuer is <strong>not a security</strong> and <strong>not a commodity</strong>, and the issuer is not an investment company.",
            "Also, under Section 3(g), a stablecoin from an issuer that is <em>not</em> permitted cannot be treated as cash or a cash equivalent for accounting purposes.",
          ],
          cite: ["bill"],
        },
        {
          type: "check",
          question: "A member asks: \"If the stablecoin company goes under, will NCUA cover my coins like it covers my savings?\" What is accurate?",
          options: [
            { text: "Yes, up to $250,000", correct: false, why: "No. The Act says payment stablecoins are not subject to NCUA share insurance, and it is unlawful to say they are." },
            { text: "No. Stablecoins are not insured, though holders do get priority on the reserves if an issuer fails.", correct: true, why: "Right. No federal insurance, but Section 11 gives holders first claim on required reserves in insolvency." },
            { text: "Only if the stablecoin is issued by a credit union subsidiary", correct: false, why: "No. Even a credit union subsidiary's stablecoin is not covered by share insurance." },
          ],
          cite: ["bill"],
        },
      ],
    },

    // ---------------------------------------------------------------- 6
    {
      id: "practice",
      title: "Practice: member conversations",
      screens: [
        {
          type: "scenario",
          heading: "At the teller line",
          setup: "Dolores, a long-time member, says: \"My grandson says I should move my savings into a stablecoin. He says the new law makes them insured now, just like here.\"",
          prompt: "What do you say?",
          options: [
            {
              text: "\"That's right, the new law made them safe and insured.\"",
              result: "bad",
              feedback: "This is wrong, and the Act makes it unlawful to say a stablecoin is federally insured. Stablecoins are not covered by NCUA share insurance.",
            },
            {
              text: "\"The new law adds rules for stablecoins, but they are not insured the way your savings are here. I can connect you with someone who can walk through your options.\"",
              result: "good",
              feedback: "Good answer. It's accurate, it doesn't give investment advice, and it offers a next step.",
            },
            {
              text: "\"Stablecoins are a scam. Don't touch them.\"",
              result: "ok",
              feedback: "It's well-meant, but it isn't accurate. Licensed stablecoins are legal and regulated. Stick to the facts: they are not insured, and you can refer her to someone for more help.",
            },
          ],
          cite: ["bill"],
        },
        {
          type: "scenario",
          heading: "On the phone",
          setup: "A caller says: \"I'm with the Credit Union Stablecoin Program created by the GENIUS Act. Your member account has been selected for conversion. I just need you to confirm the member's account number so we can move the funds.\"",
          prompt: "What do you do?",
          options: [
            {
              text: "Give the account number. It sounds official.",
              result: "bad",
              feedback: "Never. The law did not create any program that converts member accounts. Using a new law's name to sound official is a classic social-engineering tactic.",
            },
            {
              text: "Decline to share anything, end the call, and report it to your supervisor or BSA/fraud contact the way your credit union's procedures require.",
              result: "good",
              feedback: "Follow your credit union's fraud and information-security procedures and report the attempt.",
            },
            {
              text: "Ask the caller for their employee ID first.",
              result: "ok",
              feedback: "Still risky. A fraudster can make up an ID. Don't verify through the caller. End the call and report it.",
            },
          ],
        },
        {
          type: "scenario",
          heading: "At the new accounts desk",
          setup: "A member asks: \"Does this credit union offer stablecoins?\"",
          prompt: "What's the best answer if you don't know your credit union's plans?",
          options: [
            {
              text: "\"Not yet, but we will soon.\"",
              result: "bad",
              feedback: "Don't guess about future products. Under NCUA's proposal, a credit union would need a separate, NCUA-approved subsidiary to issue one, and those rules are not final.",
            },
            {
              text: "\"I'm not sure what our plans are. Let me find out and follow up with you.\"",
              result: "good",
              feedback: "Good. It's honest, and it lets you route the question to the right person.",
            },
            {
              text: "\"Credit unions aren't allowed to do anything with stablecoins.\"",
              result: "ok",
              feedback: "Not accurate. The Act names NCUA as the regulator for credit union subsidiaries that issue stablecoins, and insured shares can hold issuer reserves. When unsure, say so and follow up.",
            },
          ],
          cite: ["bill", "dwt"],
        },
      ],
    },

    // ---------------------------------------------------------------- 7
    {
      id: "leaders",
      title: "For leaders and compliance",
      optional: true,
      screens: [
        {
          type: "text",
          heading: "What a credit union can and can't do today",
          body: [
            "Under NCUA's February 2026 proposal, a credit union that wants to issue a stablecoin would set up a <strong>separate subsidiary</strong>, which must be approved by NCUA. Credit unions could invest only in NCUA-licensed issuers. NCUA's FAQ notes that, historically, it has read federal credit union investment authority as limited to CUSOs, and it asked in the proposal whether to revisit that.",
            "<strong>Custody:</strong> NCUA's FAQ says federal credit unions are <strong>not currently authorized</strong> to act as custodians for cryptocurrencies and other digital assets. Some state-chartered credit unions may be able to under state law, and share insurance would not apply.",
            "Section 16 of the Act says it does not limit existing authority to hold custody of stablecoins and their reserves, or to issue digital assets that represent shares. It also directs regulators to review their rules and guidance.",
          ],
          callout: {
            kind: "warn",
            text: "Check NCUA's current position before acting. These are proposals and FAQs, not final rules.",
          },
          cite: ["ncua-feb", "dwt", "ncua-fintech", "bill"],
        },
        {
          type: "reveal",
          heading: "Questions to put on your next leadership agenda",
          intro: "Use these as prompts. They are not recommendations.",
          cards: [
            { front: "Members", back: "Do our members ask about stablecoins? Who answers, and with what script?" },
            { front: "Share balances", back: "If platforms pay rewards on stablecoins, which member segments could move balances out of shares?" },
            { front: "Fraud and BSA", back: "Have we updated fraud training for scams that use \"GENIUS Act\" or \"stablecoin\" language?" },
            { front: "Partners", back: "Do our core, card or payments providers plan to support stablecoins? What would that mean for us?" },
            { front: "Reserves", back: "Insured shares are an allowed reserve asset. Is holding issuer reserves an opportunity we would consider, within NCUA limits?" },
          ],
          cite: ["bill"],
        },
        {
          type: "timeline",
          heading: "Key dates",
          items: [
            { date: "July 18, 2025", text: "GENIUS Act signed into law." },
            { date: "Feb. 11, 2026", text: "NCUA proposes the application and licensing framework. Comments closed April 13, 2026." },
            { date: "May 15, 2026", text: "NCUA proposes operating and risk-management standards for licensed issuers. Comments closed July 17, 2026." },
            { date: "July 18, 2026", text: "The Act's one-year deadline for regulators to issue rules." },
            { date: "Oct. 21, 2026", text: "OCC issues its final rule for the banks and nonbanks it supervises, effective January 18, 2027." },
            { date: "Nov. 2026", text: "NCUA's digital assets page still describes its rules as in progress." },
            { date: "Jan. 18, 2027", text: "Latest date the Act takes effect: 18 months after enactment, or 120 days after final rules if that comes first." },
            { date: "July 18, 2028", text: "Three years after enactment, digital asset service providers may no longer offer stablecoins from non-permitted issuers to people in the U.S." },
          ],
          cite: ["bill", "ncua-feb", "ncua-may", "occ-final", "ncua-fintech"],
        },
        {
          type: "check",
          question: "Under NCUA's proposal, how would a credit union issue its own payment stablecoin?",
          options: [
            { text: "Directly, from its own balance sheet", correct: false, why: "Not under the proposal. The issuer must be a separate subsidiary." },
            { text: "Through a separate subsidiary approved by NCUA", correct: true, why: "Right. The Act lets subsidiaries of insured credit unions apply, and NCUA's proposal requires a separate, NCUA-approved subsidiary." },
            { text: "By registering the coin with the SEC", correct: false, why: "Payment stablecoins from permitted issuers are not securities under Section 17." },
          ],
          cite: ["bill", "dwt"],
        },
      ],
    },
  ],

  // Final assessment. Pass mark is `passMark` above.
  quiz: [
    {
      question: "When was the GENIUS Act signed into law?",
      options: ["January 18, 2025", "July 18, 2025", "January 18, 2027"],
      answer: 1,
      why: "It was signed July 18, 2025. January 18, 2027 is the latest date it takes effect.",
    },
    {
      question: "Who may lawfully issue a payment stablecoin in the U.S.?",
      options: ["Any company with a website", "Only a permitted payment stablecoin issuer", "Only the Federal Reserve"],
      answer: 1,
      why: "Section 3 makes issuance by anyone else unlawful.",
    },
    {
      question: "Which agency is the primary federal regulator for a credit union subsidiary that issues stablecoins?",
      options: ["NCUA", "CFPB", "SEC"],
      answer: 0,
      why: "Section 2(25) names NCUA for insured credit unions and their subsidiaries.",
    },
    {
      question: "At minimum, how much in reserves must back each $1 of stablecoins?",
      options: ["$0.10", "$0.50", "$1.00"],
      answer: 2,
      why: "Reserves must be at least 1 to 1.",
    },
    {
      question: "Are payment stablecoins covered by NCUA share insurance?",
      options: ["Yes, up to $250,000", "No", "Only at credit unions"],
      answer: 1,
      why: "Section 4(e) says they are not, and it is unlawful to claim they are.",
    },
    {
      question: "May a permitted issuer pay interest just for holding its stablecoin?",
      options: ["Yes, at any rate", "Yes, if disclosed", "No"],
      answer: 2,
      why: "Section 4(a)(11) bans issuers from paying interest or yield solely for holding, using or keeping the coin.",
    },
    {
      question: "How often must an issuer publish its reserve composition?",
      options: ["Monthly", "Quarterly", "Annually"],
      answer: 0,
      why: "Monthly, examined by a registered public accounting firm.",
    },
    {
      question: "If a permitted issuer fails, what does the Act give stablecoin holders?",
      options: ["Nothing", "Priority claim on the required reserves", "A government bailout"],
      answer: 1,
      why: "Section 11 gives holders priority over other creditors on required reserves.",
    },
    {
      question: "A caller cites the GENIUS Act and asks for a member's account number to \"convert\" their account. What do you do?",
      options: ["Provide it", "Verify the caller's ID, then provide it", "Share nothing, end the call and report it"],
      answer: 2,
      why: "The Act created no account-conversion program. Treat it as social engineering and follow your fraud procedures.",
    },
    {
      question: "A member asks whether a stablecoin is \"just like savings.\" Which response is accurate?",
      options: [
        "\"Yes, it's the same thing in digital form.\"",
        "\"No. It's regulated now, but it isn't a share account and it isn't insured.\"",
        "\"No, they're all illegal.\"",
      ],
      answer: 1,
      why: "Licensed stablecoins are legal and regulated, but they are not shares and not insured.",
    },
  ],

  sources: [
    {
      id: "bill",
      label: "GENIUS Act, S. 1582 (enrolled bill), 119th Congress. GPO.",
      url: "https://www.govinfo.gov/content/pkg/BILLS-119s1582enr/html/BILLS-119s1582enr.htm",
    },
    {
      id: "ncua-fintech",
      label: "NCUA: Financial Technology and Digital Assets (GENIUS Act FAQs). Last modified Nov. 18, 2026.",
      url: "https://ncua.gov/regulation-supervision/regulatory-compliance-resources/financial-technology-and-digital-assets",
    },
    {
      id: "ncua-feb",
      label: "NCUA press release: NCUA Proposes Rule for Permitted Payment Stablecoin Issuer Applications. Feb. 11, 2026.",
      url: "https://ncua.gov/newsroom/press-release/2026/ncua-proposes-rule-permitted-payment-stablecoin-issuer-applications",
    },
    {
      id: "ncua-may",
      label: "NCUA press release: NCUA Announces Proposed Rule for Permitted Payment Stablecoin Issuer Standards. May 15, 2026.",
      url: "https://ncua.gov/newsroom/press-release/2026/ncua-announces-proposed-rule-permitted-payment-stablecoin-issuer-standards",
    },
    {
      id: "occ-final",
      label: "OCC Bulletin 2026-50: GENIUS Act Regulations: Final Rule. Oct. 21, 2026.",
      url: "https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-50.html",
    },
    {
      id: "dwt",
      label: "Davis Wright Tremaine: NCUA Proposes Application Process for GENIUS Act Compliance. March 2026.",
      url: "https://www.dwt.com/blogs/financial-services-law-advisor/2026/03/ncua-genius-act-compliance-proposal",
    },
    {
      id: "troutman-supp",
      label: "Troutman Pepper Locke: NCUA Issues Supplemental Proposed Rule on Stablecoin Issuance by Credit Union Subsidiaries. July 23, 2026.",
      url: "https://www.troutmanfinancialservices.com/2026/07/ncua-issues-supplemental-proposed-rule-on-stablecoin-issuance-by-credit-union-subsidiaries/",
    },
    {
      id: "genius-summary",
      label: "Morrison Foerster: The GENIUS Act: A New Federal Regulatory Framework for Payment Stablecoins. July 2025.",
      url: "https://www.mofo.com/resources/insights/250721-the-genius-act-a-new-federal-regulatory",
    },
  ],
});
