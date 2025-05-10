
export const sentences = [
  {
    id: 1,
    title: "Passive Voice",
    use: "Emphasize the action rather than the doer",
    link: "/sentences/passive_voice",
    premium: false,
    icon: 'repeat',
    bgColor: '#E5EDFF',
    iconColor: '#4A89DC'
  },
  {
    id: 2,
    title: "Reported Speech",
    use: "Report what someone else said",
    link: "/sentences/reported_speech",
    premium: false,
    icon: 'message-circle',
    bgColor: '#E5F8FF',
    iconColor: '#1DA1F2'
  },
  {
    id: 3,
    title: "Conditional Sentences",
    use: "4 types of conditional sentences",
    link: "/sentences/conditional_sentences",
    premium: false,
    icon: 'git-branch',
    bgColor: '#FFE8E5',
    iconColor: '#FF5252'
  },
  {
    id: 4,
    title: "Wish Sentences",
    use: "Express regret or desire",
    link: "/sentences/wish_sentences",
    premium: true,
    icon: 'star',
    bgColor: '#FFF5E5',
    iconColor: '#FFC107'
  },
  {
    id: 5,
    title: "Question Tags",
    use: "Short questions at the end of a sentence",
    link: "/sentences/question_tags",
    premium: true,
    icon: 'help-circle',
    bgColor: '#E5F9FF',
    iconColor: '#00BCD4'
  },
  {
    id: 6,
    title: "Imperative Sentences",
    use: "Give orders or instructions",
    link: "/sentences/imperative_sentences",
    premium: true,
    icon: 'command',
    bgColor: '#EFE5FF',
    iconColor: '#7C4DFF'
  },
  {
    id: 7,
    title: "Comparison Sentences",
    use: "Compare two or more things",
    link: "/sentences/comparison_sentences",
    premium: true,
    icon: 'bar-chart-2',
    bgColor: '#E5FFEE',
    iconColor: '#4CAF50'
  },
  {
    id: 8,
    title: "Exclamatory Sentences",
    use: "Express strong feelings",
    link: "/sentences/exclamatory_sentences",
    premium: true,
    icon: 'zap',
    bgColor: '#FFE5F2',
    iconColor: '#F50057'
  }
];

export const getSentence = (sentence: string): string | undefined => {
  switch(sentence) {
    case 'passive_voice': {
      return `#### **📜 Definition**

The **passive voice** is used when the **focus is on the action** rather than the person or thing acting.

💡 **Example:**  
✅ _The cake was baked by my grandmother._ 🎂👵 (Focus on _the cake_, not the _grandmother_)

🔹 **Active:** _My grandmother baked the cake._  
🔹 **Passive:** _The cake was baked by my grandmother._

---

#### **1️⃣ Structure of Passive Voice**

📝 **Form:**

- **Subject + BE (in the correct tense) + Past Participle (+ by agent, if needed)**

💡 **Example:**  
✅ _The book was written by J.K. Rowling._ 📖✍️

---

#### **2️⃣ Passive Voice in Different Tenses**

|**Tense**|**Active Voice**|**Passive Voice**|
|---|---|---|
|**Present Simple**|_She writes a letter._ 📝|_A letter is written._|
|**Past Simple**|_He built a house._ 🏡|_A house was built._|
|**Future Simple**|_They will finish the project._ 🏗️|_The project will be finished._|
|**Present Continuous**|_She is cleaning the room._ 🧹|_The room is being cleaned._|
|**Past Continuous**|_They were painting the wall._ 🎨|_The wall was being painted._|
|**Present Perfect**|_He has solved the problem._ 🔍|_The problem has been solved._|
|**Past Perfect**|_She had written the letter._ 📝|_The letter had been written._|
|**Future Perfect**|_They will have completed the task._ ✅|_The task will have been completed._|

---

#### **3️⃣ When to Use the Passive Voice**

##### **🔹 When the doer is unknown or unimportant**

✅ _A new bridge was built last year._ 🌉 (Who built it is not important)  
✅ _The room has been decorated beautifully._ 🏠🎨import { sentences } from './sentences';


##### **🔹 When focusing on the result, not the doer**

✅ _The Mona Lisa is displayed in the Louvre._ 🖼️  
✅ _The homework was submitted on time._ 📚

##### **🔹 When the doer is obvious**

✅ _He was arrested last night._ 🚔 (By the police)  
✅ _The match was postponed due to rain._ ☔

---

#### **4️⃣ Passive Voice with Modals**

📝 **Form:**

- **Modal + be + past participle**

💡 **Examples:**  
✅ _The rules must be followed._ 📜✔️  
✅ _The package can be delivered tomorrow._ 📦

---

#### **5️⃣ Passive Voice with "By" vs. "With"**

🔹 **"By"** → Used for the **doer** of the action  
✅ _The song was sung by Taylor Swift._ 🎤🎶

🔹 **"With"** → Used for the **instrument or method**  
✅ _The door was opened with a key._ 🔑🚪

---

#### **6️⃣ Common Mistakes in Passive Voice**

✅ **Correct:** _The email was sent yesterday._ 📧  
❌ **Incorrect:** _The email sent yesterday._

✅ **Correct:** _The windows are cleaned every week._ 🪟  
❌ **Incorrect:** _The windows clean every week._

✅ **Correct:** _The cake has been eaten._ 🎂  
❌ **Incorrect:** _The cake is eaten by me has._

---

#### **7️⃣ Changing Active to Passive Voice**

**Step 1:** Identify the object in the active sentence.  
**Step 2:** Move it to the subject position.  
**Step 3:** Change the verb to the correct passive form.  
**Step 4:** Add "by" + the doer (optional).

💡 **Example:**  
🔹 **Active:** _They cleaned the house._ 🏠  
🔹 **Passive:** _The house was cleaned (by them)._

---

#### **8️⃣ Special Cases**

🔹 **Passive with Two Objects**  
✅ _She gave me a gift._ 🎁  
➡️ _A gift was given to me._  
➡️ _I was given a gift._

🔹 **Passive with "It is said..."** (Reporting verbs)  
✅ _People say that she is kind._  
➡️ _It is said that she is kind._`
    }
    case 'reported_speech': {
      return `#### **📜 Definition**

**Reported speech (Indirect speech)** reports what someone said without using their exact words.

💡 **Example:**  
✅ _Direct Speech:_ She said, **"I am tired."**  
✅ _Indirect Speech:_ She said **she was tired.**

---

## **1️⃣ Changes in Reported Speech**

When changing direct speech to reported speech, we usually:  
🔹 **Change the tense** (backshift)  
🔹 **Change pronouns and time expressions**

💡 **Example:**  
✅ _He said, **"I will help you tomorrow."**_  
✅ _He said **he would help me the next day.**_

---

## **2️⃣ Verb Tense Changes (Backshift Rule)**

|**Direct Speech**|**Reported Speech**|
|---|---|
|**Present Simple** → _am/is/are_|**Past Simple** → _was/were_|
|**Present Continuous** → _is/are + V-ing_|**Past Continuous** → _was/were + V-ing_|
|**Past Simple** → _V2/ed_|**Past Perfect** → _had + V3_|
|**Present Perfect** → _have/has + V3_|**Past Perfect** → _had + V3_|
|**Will** → _will_|**Would** → _would_|
|**Can** → _can_|**Could** → _could_|

💡 **Examples:**  
✅ _"I **am** happy," she said._ → _She said she **was** happy._  
✅ _"They **are playing** football," he said._ → _He said they **were playing** football._

---

## **3️⃣ Changes in Pronouns & Time Expressions**

|**Direct Speech**|**Reported Speech**|
|---|---|
|I|he/she|
|we|they|
|my|his/her|
|our|their|
|this|that|
|these|those|
|now|then|
|today|that day|
|tomorrow|the next day|
|yesterday|the previous day|
|next week|the following week|
|last week|the previous week|

💡 **Example:**  
✅ _"I will call you **tomorrow**," she said._  
✅ _She said she would call me **the next day**._

---

## **4️⃣ Reporting Questions**

For **Yes/No Questions**, use **if** or **whether**:  
✅ _"Do you like coffee?" she asked._ → _She asked **if** I liked coffee._ ☕

For **Wh- Questions**, use the question word (who, what, when, where, why, how) but change the sentence structure:  
✅ _"Where do you live?" he asked._ → _He asked **where** I lived._ 🏠

🚫 **Don’t use "do/does/did" in reported questions!**  
❌ _He asked where did I live._ (Incorrect)  
✅ _He asked where I lived._ (Correct)

---

## **5️⃣ Reporting Imperatives (Commands & Requests)**

For **commands**, use **tell + (someone) + to + verb**:  
✅ _"Close the door," he said._ → _He **told** me to close the door._ 🚪

For **negative commands**, use **tell + (someone) + not to + verb**:  
✅ _"Don’t be late," she said._ → _She **told** me not to be late._ ⏰

For **requests**, use **ask + (someone) + to + verb**:  
✅ _"Please help me," she said._ → _She **asked** me to help her._ 🙏

---

## **6️⃣ Special Cases: Say vs. Tell**

🔹 **Use "say" without an object**  
✅ _She said she was tired._  
❌ _She said me she was tired._ (Incorrect)

🔹 **Use "tell" with an object**  
✅ _She told me she was tired._  
❌ _She told that she was tired._ (Incorrect)

---

## **7️⃣ Summary**

✅ **Change tenses** (backshift rule)  
✅ **Change pronouns & time expressions**  
✅ **Use "if/whether" for Yes/No questions**  
✅ **Use Wh- words for reported questions**  
✅ **Use "tell" for commands & requests**`
    }
    case 'conditional_sentences': {
      return `#### **📜 Definition**

Conditional sentences describe possible situations and their consequences. They are formed using an "if-clause" (condition) and a "main clause" (result).

💡 **Example:**  
✅ _If it rains, we will stay indoors._ ☔🏠

---

#### **1️⃣ Types of Conditional Sentences**

##### **🔹 Zero Conditional (General Truths & Facts)**

Used for universal truths, scientific facts, and general habits.

📝 **Form:**

- **If + present simple, present simple**

💡 **Examples:**  
✅ _If you heat ice, it melts._ ❄️🔥➡️💧  
✅ _If water reaches 100°C, it boils._ ♨️💨

🚫 **Not for future possibilities!**

---

##### **🔹 First Conditional (Real & Likely Situations)**

Used for possible future events based on a present or future condition.

📝 **Form:**

- **If + present simple, will + base verb**

💡 **Examples:**  
✅ _If you study hard, you will pass the exam._ 📚✅  
✅ _If it rains, we will cancel the picnic._ 🌧️🚫🧺

🔄 **Variations:**

- **"Will" can be replaced with "may," "can," "might," or "should"**  
    ✅ _If you eat too much, you might feel sick._ 🤢

---

##### **🔹 Second Conditional (Hypothetical & Unreal Situations)**

Used for imaginary or unlikely situations in the present or future.

📝 **Form:**

- **If + past simple, would + base verb**

💡 **Examples:**  
✅ _If I had a million dollars, I would travel the world._ 💰✈️🌍  
✅ _If she knew French, she would work in Paris._ 🇫🇷

🔄 **Variations:**

- "Would" can be replaced with "could" or "might"  
    ✅ _If he practiced more, he could be a great musician._ 🎸🎶

🚫 **Use "were" instead of "was" in formal writing**  
✅ _If I were you, I would take the job._ 👔✔️

---

##### **🔹 Third Conditional (Past Hypothetical Situations)**

Used for past situations that did not happen and their possible results.

📝 **Form:**

- **If + past perfect, would have + past participle**

💡 **Examples:**  
✅ _If I had studied harder, I would have passed the test._ 📖✅  
✅ _If she had left earlier, she wouldn’t have missed the flight._ 🛫🕒

🔄 **Variations:**

- Replace "would have" with "could have" or "might have"  
    ✅ _If you had called me, I could have helped you._ 📞🤝

---

#### **2️⃣ Mixed Conditionals**

When the condition refers to one time, but the result refers to another.

##### **🔹 Present result of a past condition**

📝 **Form:**

- **If + past perfect, would + base verb**

💡 **Example:**  
✅ _If she had studied medicine, she would be a doctor now._ 👩‍⚕️💉

##### **🔹 Past result of a present condition**

📝 **Form:**

- **If + past simple, would have + past participle**

💡 **Example:**  
✅ _If I were taller, I would have joined the basketball team._ 🏀

---

#### **3️⃣ Inverted Conditionals (Formal & Emphatic)**

Used for a more formal or literary tone by omitting "if."

💡 **Examples:**  
✅ _Had I known, I would have helped you._ (Instead of _If I had known…_)  
✅ _Were I you, I would accept the offer._ (Instead of _If I were you…_)

---

#### **4️⃣ Common Mistakes in Conditionals**

✅ **Correct:** If she **had studied**, she **would have passed**. 📖✔️  
❌ **Incorrect:** If she **would have studied**, she **would have passed**.

✅ **Correct:** If I **were** rich, I **would** buy a mansion. 🏡💵  
❌ **Incorrect:** If I **was** rich, I **would** buy a mansion.

✅ **Correct:** If it **rains**, we **will** stay inside. ☔  
❌ **Incorrect:** If it **will rain**, we **will** stay inside.

---

#### **5️⃣ Special Expressions with Conditionals**

🔹 **Unless = If not**  
✅ _Unless you study, you will fail the exam._ (Same as _If you don’t study, you will fail._)

🔹 **As long as / Provided that** (Strong condition)  
✅ _You can go out as long as you finish your homework._ 📚✅

🔹 **In case** (Precaution)  
✅ _Take an umbrella in case it rains._ ☔`
    }
    case 'wish_sentences': {
      return `#### **📜 Definition**

**Wish sentences** express **desires, regrets, or hypothetical situations** about the past, present, or future.

💡 **Example:**  
✅ _I wish I had more time to travel._ ✈️🌍 (A regret about the present)  
✅ _She wishes she had studied harder._ 📚😞 (A regret about the past)

---

#### **1️⃣ Types of Wish Sentences**

There are **three main types** of wish sentences:

|**Type**|**Use**|**Example**|
|---|---|---|
|**Wish about the Present**|Expresses a desire for things to be different now|_I wish I were taller._ 📏|
|**Wish about the Past**|Expresses regret about something that already happened|_I wish I had studied more._ 📖|
|**Wish about the Future**|Expresses a desire for something to happen (unreal or unlikely)|_I wish it would stop raining._ ☔|

---

#### **2️⃣ Wish for the Present (Unreal Present Situations)**

📝 **Form:**

- **I wish + subject + past simple** (even though it's about the present!)

💡 **Examples:**  
✅ _I wish I **had** a car._ 🚗 (But I don’t have one)  
✅ _She wishes she **were** here._ 😞 (But she isn’t)  
✅ _I wish it **wasn’t** so cold today._ ❄️

💡 **Note:** Use **"were"** instead of "was" for **formal grammar**:  
✅ _I wish I **were** taller._ (More formal)  
✅ _I wish I **was** taller._ (Common in spoken English)

---

#### **3️⃣ Wish for the Past (Regrets About the Past)**

📝 **Form:**

- **I wish + subject + past perfect**

💡 **Examples:**  
✅ _I wish I **had studied** more for the exam._ 📖 (I didn’t study enough)  
✅ _She wishes she **hadn’t said** that._ 🗣️😬 (She regrets saying it)  
✅ _I wish I **had gone** to the party._ 🎉 (I didn’t go)

---

#### **4️⃣ Wish for the Future (Unreal or Unlikely Situations)**

📝 **Form:**

- **I wish + subject + would + verb**

💡 **Examples:**  
✅ _I wish it **would stop** raining._ ☔ (But it keeps raining)  
✅ _He wishes she **would call** him._ 📞 (But she doesn’t)  
✅ _I wish they **would arrive** on time._ ⏳ (They are always late)

🔹 **When NOT to use "would"**

- Don't use **"wish + would"** when talking about yourself.  
    ❌ _I wish I would be taller._ (Incorrect)  
    ✅ _I wish I were taller._ (Correct)

---

#### **5️⃣ Special Cases in Wish Sentences**

🔹 **"If only" for Stronger Emphasis**  
💡 **Examples:**  
✅ _If only I **had more money**!_ 💰 (Strong desire)  
✅ _If only he **had studied** harder!_ 📖😞 (Strong regret)

🔹 **Wishing About Other People’s Actions**  
💡 **Examples:**  
✅ _I wish you **would listen** to me._ 👂 (But you don’t)  
✅ _She wishes he **would stop** smoking._ 🚭

🔹 **Wish vs. Hope**  
✅ _I **hope** you pass the exam._ (Possible)  
✅ _I **wish** you passed the exam._ (Impossible/Too late)

---

#### **6️⃣ Common Mistakes in Wish Sentences**

✅ **Correct:** _I wish I **had a new phone**._ 📱  
❌ **Incorrect:** _I wish I **have** a new phone._

✅ **Correct:** _I wish I **had studied** more._ 📖  
❌ **Incorrect:** _I wish I **studied** more._

✅ **Correct:** _I wish it **would stop** raining._ ☔  
❌ **Incorrect:** _I wish it **stops** raining._`
    }
    case 'question_tags': {
      return `#### **📜 Definition**

A **question tag** is a **short question at the end of a statement** to confirm information or seek agreement.

💡 **Example:**  
✅ _You like coffee, **don’t you**?_ ☕✅  
✅ _She isn’t coming, **is she**?_ ❌👩

---

#### **1️⃣ Structure of Question Tags**

📝 **Form:**

- **Positive statement → Negative tag**
- **Negative statement → Positive tag**

💡 **Examples:**  
✅ _You are a teacher, **aren’t you**?_ 🎓  
✅ _He doesn’t like spicy food, **does he**?_ 🌶️

---

#### **2️⃣ Rules for Forming Question Tags**

##### **🔹 Rule 1: Use Auxiliary Verbs from the Statement**

The question tag **must match** the auxiliary (helping) verb in the statement.

💡 **Examples:**  
✅ _She **has** finished the work, **hasn’t she**?_ ✔️  
✅ _They **will** come to the party, **won’t they**?_ 🎉

---

##### **🔹 Rule 2: If There’s No Auxiliary Verb, Use "do/does/did"**

If the main verb is in **Present Simple or Past Simple**, use **do/does/did** in the tag.

💡 **Examples:**  
✅ _She **likes** chocolate, **doesn’t she**?_ 🍫  
✅ _They **went** home early, **didn’t they**?_ 🏡

---

##### **🔹 Rule 3: "I am" Uses "Aren’t I"**

Although grammatically "amn't I" would be correct, **"aren’t I"** is used instead.

💡 **Example:**  
✅ _I am your friend, **aren’t I**?_ 🤝

---

##### **🔹 Rule 4: Imperatives Use "Will You?" or "Won’t You?"**

💡 **Examples:**  
✅ _Close the door, **will you**?_ 🚪🔒  
✅ _Help me with this, **won’t you**?_ 🤝

For **negative imperatives**, use **"will you?"**  
✅ _Don’t be late, **will you**?_ ⏰❌

---

##### **🔹 Rule 5: "Let's" Uses "Shall We?"**

💡 **Examples:**  
✅ _Let’s go to the park, **shall we**?_ 🌳  
✅ _Let’s not argue, **shall we**?_ 🤫

---

#### **3️⃣ Common Question Tag Examples**

|**Statement**|**Question Tag**|
|---|---|
|_She is happy,_ 😊|_isn’t she?_|
|_They aren’t coming,_ ❌|_are they?_|
|_You have finished,_ ✅|_haven’t you?_|
|_He doesn’t know,_ 🤷‍♂️|_does he?_|
|_She can swim,_ 🏊‍♀️|_can’t she?_|
|_Tom won’t be late,_ ⏰❌|_will he?_|
|_Let’s go out,_ 🚶‍♂️|_shall we?_|

---

#### **4️⃣ Special Cases in Question Tags**

🔹 **Nobody, Somebody, Everybody, No one → "they" in the tag**  
✅ _Nobody called, **did they**?_ 📞❌  
✅ _Everybody likes pizza, **don’t they**?_ 🍕

🔹 **Nothing, Everything → "it" in the tag**  
✅ _Nothing matters, **does it**?_ 🤷‍♂️  
✅ _Everything is fine, **isn’t it**?_ ✅

🔹 **"Few", "Little" (Negative meaning) → Positive tag**  
✅ _Few people know the truth, **do they**?_ 🤔

🔹 **"A few", "A little" (Positive meaning) → Negative tag**  
✅ _A little sugar is left, **isn’t it**?_ 🍬

---

#### **5️⃣ Common Mistakes in Question Tags**

✅ **Correct:** _She likes ice cream, **doesn’t she**?_ 🍦  
❌ **Incorrect:** _She likes ice cream, **don’t she**?_

✅ **Correct:** _You’re coming, **aren’t you**?_ ✅  
❌ **Incorrect:** _You’re coming, **isn’t it**?_

✅ **Correct:** _Tom won’t mind, **will he**?_ 🤔  
❌ **Incorrect:** _Tom won’t mind, **won’t he**?_`
    }
    case 'imperative_sentences': {
      return `#### **📜 Definition**

Imperative sentences are used to give **commands, instructions, requests, or advice**. They usually begin with the **base form of a verb** and often omit the subject, as it is understood to be "you."

💡 **Example:**  
✅ _Close the door!_ 🚪🔒

---

#### **1️⃣ Functions of Imperative Sentences**

##### **🔹 Giving Commands**

Used to **order or instruct** someone to do something.

💡 **Examples:**  
✅ _Sit down._ 🪑  
✅ _Turn off the lights._ 💡❌  
✅ _Stop talking!_ 🛑🗣️

---

##### **🔹 Making Requests (Polite Imperatives)**

To sound **polite**, add **"please"** or a phrase like **"Could you..."**

💡 **Examples:**  
✅ _Please pass the salt._ 🧂🙏  
✅ _Could you open the window?_ 🌬️🪟  
✅ _Do help me with this project._ 📝🤝

---

##### **🔹 Giving Instructions**

Used in **manuals, recipes, or directions**.

💡 **Examples:**  
✅ _Mix the flour with water._ 🥣  
✅ _Press the power button to start._ 🔘  
✅ _Take a left at the next traffic light._ 🚦

---

##### **🔹 Giving Advice or Warnings**

Used to **caution or suggest something**.

💡 **Examples:**  
✅ _Be careful when crossing the street._ 🚶‍♂️⚠️  
✅ _Don’t touch that, it’s hot!_ 🔥🙅‍♂️  
✅ _Always wear a seatbelt._ 🚗✅

---

##### **🔹 Making Invitations & Offers**

Used to **invite** or **encourage** someone.

💡 **Examples:**  
✅ _Come in and make yourself comfortable._ 🏡☕  
✅ _Join us for dinner tonight._ 🍽️  
✅ _Have some cake!_ 🎂

---

#### **2️⃣ Forms of Imperative Sentences**

##### **🔹 Affirmative Imperatives (Positive Commands)**

Begin with the **base verb**.

💡 **Examples:**  
✅ _Listen carefully._ 🎧  
✅ _Try this new dish._ 🍲

---

##### **🔹 Negative Imperatives (Prohibitions)**

Use **"Don't" + base verb** to express **what NOT to do**.

💡 **Examples:**  
✅ _Don’t run in the hallway._ 🏃‍♂️🚫  
✅ _Do not touch the artwork._ 🎨✋❌

---

#### **3️⃣ Softening Imperatives (More Polite & Formal)**

Using **modifiers** makes imperatives less direct and more polite.

💡 **Examples:**  
🔹 Instead of _"Sit down!"_ → Use _"Please have a seat."_ 🪑🙏  
🔹 Instead of _"Give me your ID."_ → Use _"Could you show me your ID, please?"_ 🆔🤝

---

#### **4️⃣ Inverted Imperatives (With Subject "You")**

Imperatives usually **omit "you"**, but it can be used for **emphasis**.

💡 **Examples:**  
✅ _You stay here!_ (Strong emphasis)  
✅ _You mind your own business!_

---

#### **5️⃣ Common Mistakes in Imperative Sentences**

✅ **Correct:** _Turn off the TV._ 📺❌  
❌ **Incorrect:** _You turn off the TV._ (Unless emphasizing)

✅ **Correct:** _Don't be late!_ ⏰🚫  
❌ **Incorrect:** _Not be late!_

---

#### **6️⃣ Special Expressions with Imperatives**

🔹 **Let’s (Let us) + base verb** → Used to **suggest an action for a group**  
✅ _Let’s go for a walk!_ 🚶‍♂️🌳  
✅ _Let’s not argue._ ❌🗣️

🔹 **Do + base verb** → Adds **emphasis**  
✅ _Do listen to me!_ 👂  
✅ _Do be careful!_ ⚠️

🔹 **Shall we…?** → A polite way to make a suggestion  
✅ _Shall we begin the meeting?_ 🏢📑`
    }
    case 'comparison_sentences': {
      return `#### **📜 Definition**
Comparison sentences are used to show similarities and differences between two or more people, things, or ideas. They follow specific grammatical structures depending on the type of comparison.

---

#### **1️⃣ Types of Comparisons**

##### **🔹 Comparative Form (Comparing Two Things)**

When comparing two things, we use comparative adjectives or adverbs, often followed by "than."

📝 **Form:**

- **Short adjectives:** _adjective + -er + than_
- **Long adjectives:** _more + adjective + than_
- **Adverbs:** _more/less + adverb + than_

💡 **Examples:**  
✅ This book is **thicker than** that one. 📚  
✅ She runs **faster than** her brother. 🏃‍♀️💨  
✅ Today is **more interesting than** yesterday. 🎉

---

##### **🏆 Superlative Form (Comparing Three or More Things)**

The superlative is used to show the highest or lowest degree of a quality among three or more things.

📝 **Form:**

- **Short adjectives:** _the + adjective + -est_
- **Long adjectives:** _the most/least + adjective_
- **Adverbs:** _the most/least + adverb_

💡 **Examples:**  
✅ This is **the tallest** building in the city. 🏢🏗️  
✅ He is **the most talented** player on the team. ⚽🏆  
✅ She works **the hardest** in our group. 💪📖

---

##### **🤝 Equal Comparisons (Showing Similarities)**

We use “as...as” to show that two things are equal in some way.

📝 **Form:**

- **as + adjective/adverb + as**

💡 **Examples:**  
✅ This chair is **as comfortable as** that one. 🪑😌  
✅ He speaks **as fluently as** a native speaker. 🗣️🇬🇧

---

##### **⚖️ Unequal Comparisons (Showing Differences)**

If two things are not equal, we use "not as...as" or comparatives.

💡 **Examples:**  
✅ This restaurant is **not as busy as** it used to be. 🍽️🚶‍♂️  
✅ My car is **less expensive than** his. 🚗💸

---

#### **2️⃣ Irregular Comparisons**

Some adjectives and adverbs have irregular forms.

|✅ **Positive**|🔄 **Comparative**|🏆 **Superlative**|
|---|---|---|
|good 👍|better ✔️|best 🥇|
|bad 👎|worse ❌|worst 🚨|
|far 📏|farther/further 🚗|farthest/furthest 🌍|
|little 🤏|less ➖|least ⏬|
|much/many 📦|more 🔼|most 🔝|

💡 **Examples:**  
✅ This coffee is **better than** the one I had yesterday. ☕👌  
✅ He has the **worst** handwriting in class. ✍️🚨

---

#### **3️⃣ Advanced Comparative Structures**

##### **📈 Double Comparatives (Continuous Change)**

Used to show a continuous increase or decrease.

📝 **Form:**

- **comparative + and + comparative**

💡 **Examples:**  
✅ The weather is getting **colder and colder**. ❄️🥶  
✅ She is becoming **more and more confident**. 💃🔥

---

##### **🔗 The + Comparative, The + Comparative (Cause & Effect)**

Used to show cause and effect.

📝 **Form:**

- **The + comparative + subject + verb, the + comparative + subject + verb**

💡 **Examples:**  
✅ **The harder** you work, **the more successful** you become. 💼📈  
✅ **The more** you practice, **the better** you get. 🎸🎶

---

#### **4️⃣ Common Mistakes in Comparisons**

✅ **Correct:** This book is **more interesting than** that one. 📚  
❌ **Incorrect:** This book is **most interesting than** that one.

✅ **Correct:** She is **as smart as** her brother. 🧠  
❌ **Incorrect:** She is **so smart as** her brother.

✅ **Correct:** This is the **best** movie I have ever seen. 🎬🏆  
❌ **Incorrect:** This is the **most best** movie I have ever seen.

---

#### **5️⃣ Special Expressions with Comparisons**

🔹 **No sooner … than** → Used to show one action happens immediately after another.  
✅ **No sooner** had I arrived **than** it started raining. ☔🏃‍♂️

🔹 **As … as ever** → Emphasizes no change over time.  
✅ She is **as kind as ever**. ❤️

🔹 **By far the + superlative** → Used for emphasis.  
✅ This is **by far the most exciting** game of the season. ⚽🔥`
    }
    case 'exclamatory_sentences': {
      return `#### **📜 Definition**

Exclamatory sentences express strong emotions such as excitement, surprise, anger, or happiness. They often end with an exclamation mark (!).

💡 **Example:**  
✅ _What a beautiful day!_ ☀️🎉

---

#### **1️⃣ Structure of Exclamatory Sentences**

There are two main ways to form exclamatory sentences:

##### **🔹 Using "What" + Noun Phrase**

📝 **Form:**

- **What + (a/an) + adjective + noun (+ subject + verb)!**

💡 **Examples:**  
✅ _What a wonderful surprise!_ 🎁😲  
✅ _What an interesting book you gave me!_ 📖🤩  
✅ _What delicious food this is!_ 🍕😋

---

##### **🔹 Using "How" + Adjective/Adverb**

📝 **Form:**

- **How + adjective/adverb (+ subject + verb)!**

💡 **Examples:**  
✅ _How amazing this place is!_ 🏞️😲  
✅ _How quickly she solved the puzzle!_ 🧩🎯  
✅ _How wonderful it feels to be here!_ 🌟💖

---

#### **2️⃣ Exclamatory Sentences with Interjections**

Interjections add emotion and are often followed by an exclamation mark.

💡 **Examples:**  
✅ _Wow! That was incredible!_ 🤯🔥  
✅ _Oh no! I forgot my keys!_ 😱🔑  
✅ _Yay! We won the game!_ 🎉🏆

---

#### **3️⃣ Exclamatory Sentences Expressing Strong Commands**

Exclamatory sentences can be used as emphatic imperatives to give strong commands or warnings.

💡 **Examples:**  
✅ _Stop right there!_ 🚦  
✅ _Get out of my room!_ 🚪😡  
✅ _Watch out for that car!_ 🚗⚠️

---

#### **4️⃣ Common Mistakes in Exclamatory Sentences**

✅ **Correct:** _What a beautiful view this is!_ 🌅  
❌ **Incorrect:** _What a beautiful view is this!_

✅ **Correct:** _How cold it is today!_ ❄️🥶  
❌ **Incorrect:** _How cold is it today!_

---

#### 5️⃣ Special Expressions with Exclamatory Sentences**

🔹 **What on earth…?!** → Strong surprise or frustration  
✅ _What on earth are you doing?!_ 🤯

🔹 **Boy, do I…!** → Emphasizing a strong feeling  
✅ _Boy, do I love this movie!_ 🎬🍿

🔹 **Goodness gracious! / My goodness!** → Expressing shock or amazement  
✅ _Goodness gracious! That’s a huge cake!_ 🎂😲`
    }
  }
}