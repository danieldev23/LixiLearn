type Tense = {
  title: string;
  use: string;
  link: string;
};
export const tenses: Tense[] = [
  {
    title: "Simple Present",
    use: "S + to be/V + O",
    link: "/tenses/simple_present",
  },
  {
    title: "Present Continuous",
    use: "S + to be + V-ing + O",
    link: "/tenses/present_continuous",
  },
  {
    title: "Present Perfect",
    use: "S + have/has + V3 + O",
    link: "/tenses/present_perfect",
  },
  {
    title: "Present Perfect Continuous",
    use: "S + have/has + been + V-ing + O",
    link: "/tenses/present_perfect_continuous",
  },
  { title: "Simple Past", use: "S + V2 + O", link: "/tenses/simple_past" },
  {
    title: "Past Continuous",
    use: "S + was/were + V-ing + O",
    link: "/tenses/past_continuous",
  },
  {
    title: "Past Perfect",
    use: "S + had + V3 + O",
    link: "/tenses/past_perfect",
  },
  {
    title: "Past Perfect Continuous",
    use: "S + had + been + V-ing + O",
    link: "/tenses/past_perfect_continuous",
  },
  {
    title: "Simple Future",
    use: "S + will + V + O",
    link: "/tenses/future_simple",
  },
  {
    title: "Future Continuous",
    use: "S + will + be + V-ing + O",
    link: "/tenses/future_continuous",
  },
  {
    title: "Future Perfect",
    use: "S + will + have + V3 + O",
    link: "/tenses/future_perfect",
  },
  {
    title: "Future Perfect Continuous",
    use: "S + will + have + been + V-ing + O",
    link: "/tenses/future_perfect_continuous",
  },
  {
    title: "Near Future",
    use: "S + to be + going to + V + O",
    link: "/tenses/near_future",
  },
];

export const getTense = (tense: string): string | undefined => {
  switch (tense) {
    case "simple_present": {
      return `#### **Definition**

The **Present Simple Tense** describes actions that happen regularly, general truths, habits, fixed arrangements, and states.

#### **Usage**

1. **General truths and facts**
    - The sun rises in the east.
    - Water boils at 100°C.
2. **Habits and routines**
    - She drinks coffee every morning.
    - I go to school by bus.
3. **Fixed schedules and timetables**
    - The train leaves at 7:00 AM.
    - The shop opens at 9 AM and closes at 10 PM.
4. **States, emotions, and senses**
    - I love this song.
    - She knows the answer.

#### **Structure**

✅ **Affirmative:**  

👉 **S + V(s/es) + O.**

- He **likes** football.
- They **work** in a bank.

❌ **Negative:**  

👉 **S + do/does not + V (bare infinitive) + O.**

- She **does not (doesn't) like** chocolate.
- We **do not (don’t) play** tennis on Sundays.

❓ **Interrogative:**  

👉 **Do/Does + S + V (bare infinitive) + O?**

- **Do** you like reading books?
- **Does** she work here?
#### Adverbs of Frequency:
Here’s a percentage breakdown of **Adverbs of Frequency** to show how often they indicate an action occurs:

| **Adverb**       | **Percentage (%)** | **Example Sentence**                     |
| ---------------- | ------------------ | ---------------------------------------- |
| **Always**       | 100%               | She **always** wakes up early.           |
| **Usually**      | 80-90%             | He **usually** goes to the gym.          |
| **Often**        | 60-80%             | They **often** visit their grandparents. |
| **Sometimes**    | 30-50%             | I **sometimes** eat fast food.           |
| **Occasionally** | 20-30%             | She **occasionally** goes hiking.        |
| **Rarely**       | 5-10%              | He **rarely** watches TV.                |
| **Seldom**       | 5-10%              | We **seldom** go to the beach.           |
| **Never**        | 0%                 | She **never** drinks coffee.             |

📌 **Position**: Adverbs usually come before the main verb but after the verb "to be".

- **She always arrives** on time.
- **He is never** late.

#### **Notes

1. **Adding -s or -es in the third-person singular**
    - Most verbs: **Add -s** → **She works.**
    - Verbs ending in **-ch, -sh, -x, -ss, -o**: **Add -es** → **He watches TV.**
    - Verbs ending in **consonant + y**: **Change "y" to "ies"** → **She studies English.**
2. **Do/Does in negative and question forms**
    - Use **"does"** for **he/she/it**, and the main verb stays in **base form**.
    - ❌ He **doesn't likes** football.
    - ✅ He **doesn't like** football.
3. **Stative verbs**
    - ❌ I **am loving** this song.
    - ✅ I **love** this song.

#### **Examples**
- **I read** books every night.
- **My mom doesn’t eat** spicy food.
- **Do you like** ice cream?
- **The bus arrives** at 6 PM every day.
- **She rarely goes** out at night.
`;
    }
    case "future_continuous": {
      return `#### **Definition**
The **Future continuous tense** describes an action that will be in progress at a specific time in the future. It is often used to indicate planned or expected actions.

#### **Usage**
1. An action that will be in progress at a specific time in the future
	1. At 8 PM tomorrow, I will be studying.
	2. This time next week, I will be traveling to Japan.
2. Planned or expected future actions
	1. She will be attending a conference next Monday.
	2. They will be visiting their grandparents next weekend.
3. Polite inquiries about someone's plan (less direct than Simple Future)
	1. Will you be joining us for dinner?
	2. Will she be using the car tomorrow?
4. Ongoing actions in the future that overlap with another event
	1. When you arrive, I will be waiting for you.
	2. By the time she calls, we will be having dinner.
#### **Structure**

✅ **Affirmative:**  
👉 **S + will be + V-ing + O.**

- He **will be working** late tonight.
- They **will be celebrating** their anniversary next month.

✅ **Negative:**  
👉 **S + will not (won’t) be + V-ing + O.**

- She **won’t be coming** to the party.
- I **won’t be using** my laptop tomorrow morning.

✅ **Interrogative:**  
👉 **Will + S + be + V-ing + O?**

- **Will** you **be waiting** for me?
- **Will** she **be cooking** dinner when we arrive?

#### **Adverbs Commonly Used**

| **Adverb**                     | **Example Sentence**                                 |
| ------------------------------ | ---------------------------------------------------- |
| At this time tomorrow          | At this time tomorrow, I will be flying to New York. |
| Next (week, month, year, etc.) | Next Week, she will be presenting her project.       |
| When + another action          | When you arrive, We will be eating dinner.           |
| By (specific time)             | By noon, they will be working on the report.         |
| All day/night                  | He will be studying all day.                         |

📌 **Position:** These adverbs usually appear at the beginning or end of the sentence.
#### **Notes**

1. **Future Continuous vs. Future Simple**
    - **Future Simple** → Focuses on a completed future action.
    - **Future Continuous** → Focuses on an ongoing action at a specific future time.
    - ✅ I **will call** you at 7 PM. (Completed action)
    - ✅ I **will be calling** you at 7 PM. (Ongoing action at that time)
2. **Not used with stative verbs**
    - ❌ I **will be knowing** the answer soon.
    - ✅ I **will know** the answer soon.`;
    }
    case "present_continuous": {
      return `#### **Definition**

The **Present Continuous Tense** describes actions happening at the moment of speaking, temporary situations, future arrangements, or changing trends.

#### **Usage**

1. **Action happening now**
    - She is reading a book.
    - They are playing football.
2. **Temporary Situations**
    - I am staying at my friend's house this week.
    - He is working on a new project.
3. **Future arrangements (with a specific time)**
    - We are meeting them at 7:00 AM.
    - She is traveling to Japan next week.
4. **Trends and changes**
    - The world is getting warmer.
    - More people are using electric cars.

#### **Structure**

✅ **Affirmative:**  

👉 **S + am/is/are + V-ing + O.**

- He is watching TV.
- They are studying English

❌ **Negative:**  

👉 **S + am/is/are + not + V-ing + O.**

- She **isn’t sleeping**.
- We **aren't going** to the party.

❓ **Interrogative:**  

👉 **Am/Is/Are + S + V-ing + O?**

- **Is** she cooking?
- **Are** they coming to the meeting?
#### Adverbs of Frequency:
Here’s a percentage breakdown of **Adverbs of Frequency** to show how often they indicate an action occurs:

| **Adverb**               | **Example Sentence**                          |
| ------------------------ | --------------------------------------------- |
| **Now**                  | She is working **now**.                       |
| **At the moment**        | They are watching a movie **at the moment**.  |
| **Right now**            | I'm writing an email **right now**.           |
| **Nowadays**             | More people are learning coding **nowadays**. |
| **This week/month/year** | He is traveling a lot **this month**.         |


📌 **Position**: These adverbs usually appear at the end or beginning of a sentence.

- **Nowadays**, more people are learning coding.
- I'm coding **right now**.
#### **Notes
1. **Spelling rules for -ing forms**
    - Most verbs: **Add -ing**: **play → playing**
    - Verbs ending in **-e**: Drop **-e**, add **-ing**: **make** → **making**
    - **Short verbs (CVC pattern):** Double the last consonant → **run → running**

#### **Examples**
- **I am studying** for my exam.
- **She isn’t listening** to music.
- **Are they coming** to the party?
- **The weather is getting** colder.
- **We are having** lunch right now.
`;
    }
    case "present_perfect": {
      return `#### **Definition**
The **Present Perfect Tense** describes actions that happened at an unspecified time but have a connection to the present, experiences, changes, or actions that started in the past and continue until now.

#### **Usage**
1. Unspecified past actions with present relevance
	- I have finished my work. (The job done, and the result matters now)
	- She has lost the key. (She doesn't have them now)
2. Life experiences (without specific time)
	- They have visited Japan.
	- He has never tried sushi.
3. Changes over time
	- The city has grown a lot in recent years.
	- My English has improved since I started practicing.
4. Actions that started in the past and continue until now
	- I have lived here for five years.
	- She has worked at this company since 2020.

#### **Structure**

✅ **Affirmative:**  
👉 **S + has/have + V3 (past participle) + O.**

- She **has visited** France.
- We **have known** each other for years.

✅ **Negative:**  
👉 **S + has/have not + V3 + O.**

- He **has not (hasn't) finished** his homework.
- They **have not (haven’t) seen** this movie.

✅ **Interrogative:**  
👉 **Has/Have + S + V3 + O?**

- **Have** you **ever eaten** sushi?
- **Has** she **called** you yet?

#### **Adverbs** 

| **Adverb**            | **Example Sentence**                  |
| --------------------- | ------------------------------------- |
| Just                  | I have just finished my homework.     |
| Already               | She has already left the office.      |
| Yet                   | Have you finished your work yet?      |
| Ever                  | Have you ever been to Paris?          |
| Never                 | I have never met him before.          |
| For + period          | We have lived here for five years.    |
| Since + point in time | She has worked here since 2019.       |
| So far                | They have made great progress so far. |
| Recently/Lately       | He has started a new job lately.      |

📌 **Position:**

- **Just, already, ever, never**: Before the main verb (past participle).
- **Yet**: At the end of the sentence (in negatives & questions).

#### **Notes**
1. **For vs. Since**
    - **For** + a period of time → **I have lived here for 3 years.**
    - **Since** + a specific point in time → **I have lived here since 2020.**
2. **Present Perfect vs. Past Simple**
    - Present Perfect: **Unspecified time / Still relevant** → **I have seen that movie.**
    - Past Simple: **Specific past time** → **I saw that movie last night.**

#### **Examples**
- She has just arrived at the airport.
- Have you ever met a famous person.
- We haven't finished the project yet.
- They have worked here for ten years.
- The weather has changed a lot this month.`;
    }
    case "present_perfect_continuous": {
      return `#### **Definition**

The **Present Perfect Continuous Tense** describes actions that started in the past and are still happening now or actions that have recently stopped but have visible effects.

#### **Usage**

1. **Actions that started in the past and continue until now**
    
    - I **have been working** here for five years.
    - She **has been studying** since morning.
2. **Recent actions with visible effects**

    - He **has been running**, so he is out of breath.
    - It **has been raining**, the ground is wet.

#### **Structure**

✅ **Affirmative:**  
👉 **S + has/have + been + V-ing + O.**

- They **have been waiting** for an hour.
- She **has been practicing** the piano.

✅ **Negative:**  
👉 **S + has/have not + been + V-ing + O.**

- He **has not (hasn't) been feeling** well.
- We **haven’t been sleeping** much lately.

✅ **Interrogative:**  
👉 **Has/Have + S + been + V-ing + O?**

- **Have** you **been exercising** regularly?
- **Has** she **been studying** hard?

#### **Adverbs Commonly Used**

| **Adverb**               | **Example Sentence**                             |
| ------------------------ | ------------------------------------------------ |
| **For**                  | I **have been working** here **for** 3 hours.    |
| **Since**                | She **has been living** here **since** 2020.     |
| **Lately/Recently**      | They **have been traveling** a lot **recently**. |
| **All day/morning/week** | He **has been studying** all morning.            |

📌 **Position:** These adverbs usually appear at the end of the sentence.

#### **Notes**
1. **Present Perfect Continuous vs. Present Perfect**
    - **Present Perfect** → Focus on result → **I have written three reports.**
    - **Present Perfect Continuous** → Focus on duration → **I have been writing reports all day.**
2. **Stative Verbs Are Not Used in Continuous Form**
    - ❌ I **have been knowing** her for years.
    - ✅ I **have known** her for years.

#### **Examples**

- **She has been learning** French for two years.
- **It has been raining** since morning.
- **Have you been feeling** okay lately?
- **We haven’t been sleeping** well these days.`;
    }
    case "simple_past": {
      return `#### **Definition**

The **Simple Past Tense** describes completed actions in the past. These actions happened at a specific time and are no longer occurring.

#### **Usage**

1. Completed actions in the past (with a specific time)
	- She visited Paris last summer.
	- He watched a movie yesterday.
2. A sequence of past actions
	- He woke up, brushed his teeth, and left for work.
	- She entered the room and sat down.
3. Past habits or repeated actions
	- When I was a child, I played outside every day.
	- He always carried a notebook.
4. Pasts facts or general truths
	- The Wright brothers invented the airplane.
	- Dinosaurs lived millions of years ago. 

#### **Structure**

✅ **Affirmative:**  
👉 **S + V2 (past form) + O.**

- She **bought** a new car.
- They **traveled** to Japan last year.

✅ **Negative:**  
👉 **S + did not (didn’t) + V (bare infinitive) + O.**

- She **did not (didn’t) go** to the party.
- We **did not (didn’t) finish** the project.

✅ **Interrogative:**  
👉 **Did + S + V (bare infinitive) + O?**

- **Did** you **watch** the match yesterday?
- **Did** she **call** you last night?

#### **Adverbs Commonly Used**

| **Adverb**                     | **Example Sentence**                  |
| ------------------------------ | ------------------------------------- |
| Yesterday                      | I met her yesterday.                  |
| Last (week, month, year, etc.) | He went to London last summer.        |
| Ago                            | He left the company two years ago.    |
| In (specific past time period) | She was born in 2020.                 |
| When (past time clause)        | We went home when it started raining. |
| Once, twice, three times, etc. | I called him twice.                   |

📌 **Position:** These adverbs usually appear at the end of the sentence.

#### **Notes**
1. **Regular vs. Irregular Verbs**
    - **Regular verbs:** Add **-ed** → **work → worked**, **play → played**
    - **Irregular verbs:** Change form → **go → went**, **buy → bought**, **see → saw**
2. **Did + Bare Infinitive in Questions & Negatives**
    - ❌ She **didn’t went** to school.
    - ✅ She **didn’t go** to school.

#### **Examples**

- I studied English last night.
- She didn't like this movie.
- Did you visited grandparents.
- They travelled to Spain two year ago.
- He finished his work before dinner.`;
    }
    case "past_continuous": {
      return `#### **Definition**

The **Past Continuous Tense** describes actions that were happening at a specific time in the past. It is used to show an ongoing action that was interrupted or to set the background scene in a story.
#### **Usage**

1. An action in progress at a specific time in the past
	- At 8 PM last night, I was watching TV.
	- She was sleeping at midnight.
2. Two actions happening at the same time in the past
	- While he was reading, I was cooking.
	- They were dancing when the brand was playing.
3. An ongoing action interrupted by a shorter actions
	- 
#### **Structure**

✅ **Affirmative:**  
👉 **S + has/have + been + V-ing + O.**

- They **have been waiting** for an hour.
- She **has been practicing** the piano.

✅ **Negative:**  
👉 **S + has/have not + been + V-ing + O.**

- He **has not (hasn't) been feeling** well.
- We **haven’t been sleeping** much lately.

✅ **Interrogative:**  
👉 **Has/Have + S + been + V-ing + O?**

- **Have** you **been exercising** regularly?
- **Has** she **been studying** hard?

#### **Adverbs Commonly Used**

| **Adverb**               | **Example Sentence**                             |
| ------------------------ | ------------------------------------------------ |
| **For**                  | I **have been working** here **for** 3 hours.    |
| **Since**                | She **has been living** here **since** 2020.     |
| **Lately/Recently**      | They **have been traveling** a lot **recently**. |
| **All day/morning/week** | He **has been studying** all morning.            |

📌 **Position:** These adverbs usually appear at the end of the sentence.

#### **Notes**
1. **Present Perfect Continuous vs. Present Perfect**
    - **Present Perfect** → Focus on result → **I have written three reports.**
    - **Present Perfect Continuous** → Focus on duration → **I have been writing reports all day.**
2. **Stative Verbs Are Not Used in Continuous Form**
    - ❌ I **have been knowing** her for years.
    - ✅ I **have known** her for years.

#### **Examples**

- **She has been learning** French for two years.
- **It has been raining** since morning.
- **Have you been feeling** okay lately?
- **We haven’t been sleeping** well these days.`;
    }
    case "past_perfect": {
      return `#### **Definition**

The **Past Perfect Tense** describes an action that happened before another past action or before a specific time in the past. It shows which event occurred first

#### **Usage**

1. An action completed before another past action
	1. When I arrived. she had already left.
	2. He had finished his homework before dinner.
2. An action completed before a specific time in the past.
	1. By 10 AM, they had already eaten breakfast.
	2. She had never seen the ocean before 2010.
3. Reported Speech (indirect speech)
	1. She said she had visited Paris before.
	2. He told me he had lost his phone.
4. Third conditional (Unreal past situations)
	1. If I had studied, I would have passed the exam.
	2. They would have arrived earlier if they had taken a taxi.
#### **Structure**

✅ **Affirmative:**  
👉 **S + had + V3 (past participle) + O.**

- She **had left** before I called.
- They **had finished** the project by noon.

✅ **Negative:**  
👉 **S + had not (hadn’t) + V3 + O.**

- She **had not (hadn’t) seen** that movie before.
- We **hadn’t met** him before the party.

✅ **Interrogative:**  
👉 **Had + S + V3 + O?**

- **Had** you **ever traveled** abroad before 2015?
- **Had** she **finished** her work before the deadline?

#### **Adverbs Commonly Used**

| **Adverb**  | **Example Sentence**                  |
| ----------- | ------------------------------------- |
| Before      | She had left before I arrived.        |
| After       | After he had eaten, he went to bed.   |
| Already     | They had already finished the exam.   |
| By the time | By the time I arrived, they had left. |
| Never       | I had never seen snow before.         |
| Just        | He had just gone out when I called.   |


📌 **Position:** These adverbs usually appear before the **main verb** or at the end of the sentence.

#### **Notes**
1. **Past Perfect vs. Simple Past**
    - **Past Perfect** → Action that happened first
    - **Simple Past** → Action that happened later
    - ✅ I **had studied** before I **took** the test.
2. **Past Perfect is often used with time expressions like "before," "after," and "by the time."**
    - **Before** I arrived, she **had left**.
    - **After** he **had finished** lunch, he took a nap.

#### **Examples**

- **She had never traveled** abroad before 2020.
- **Had you studied** English before moving to the UK?
- **By the time we reached** the station, the train **had already left**.
- **He hadn’t eaten** anything before the meeting.
- **If they had prepared** better, they would have won the competition.`;
    }
    case "past_perfect_continuous": {
      return `#### **Definition**

The **Past Perfect Continuous Tense** describes an action that **was ongoing for a period of time before another past action or a specific time in the past**. It emphasizes the duration of the action.

#### **Usage**

1. **An action that was happening over time before another past action**
    
    - He **had been studying** for hours before he took a break.
    - They **had been waiting** for an hour before the bus arrived.
2. **An action that was happening before a specific time in the past**
    
    - By 8 PM, she **had been working** for five hours.
    - I **had been running** for 30 minutes before it started raining.
3. **Cause of a past event (showing a reason for something in the past)**
    
    - She was tired because she **had been working** all day.
    - His hands were dirty because he **had been painting** the walls.

#### **Structure**

✅ **Affirmative:**  
👉 **S + had been + V-ing + O.**

- She **had been reading** for two hours before she slept.
- They **had been playing** football before it started raining.

✅ **Negative:**  
👉 **S + had not (hadn’t) been + V-ing + O.**

- He **had not (hadn’t) been sleeping** well before the trip.
- We **hadn’t been waiting** long when the taxi arrived.

✅ **Interrogative:**  
👉 **Had + S + been + V-ing + O?**

- **Had** she **been studying** before the exam?
- **Had** they **been working** together for a long time?

#### **Adverbs Commonly Used**

|**Adverb**|**Example Sentence**|
|---|---|
|**For (a duration of time)**|She **had been studying** for three hours.|
|**Since (a specific point in time)**|They **had been living** there since 2010.|
|**Before**|He **had been working** before he got sick.|
|**By the time**|By the time we arrived, they **had been waiting** for an hour.|
|**All day/morning/week**|She **had been cooking** all day.|

📌 **Position:** These adverbs usually appear at the end of the sentence or after "had been."

#### **Notes**

1. **Difference between Past Perfect and Past Perfect Continuous**
    - **Past Perfect** → Focuses on the completion of an action.
    - **Past Perfect Continuous** → Focuses on the duration of an action.
    - ✅ I **had studied** before the test. (Completed action)
    - ✅ I **had been studying** for three hours before the test. (Duration emphasized)
2. **Stative verbs are not used in continuous tenses**
    - ❌ He **had been knowing** the answer.
    - ✅ He **had known** the answer.

#### **Examples**

- **She had been working** at the company for five years before she quit.
- **Had you been waiting** long before the train arrived?
- **By the time we got home**, it **had been raining** for hours.
- **I was exhausted because** I **had been running** for an hour.
- **They hadn’t been sleeping** well before their vacation.`;
    }
    case "future_simple": {
      return `#### **Definition**

The **Future Simple Tense** describes actions that will happen in the future, predictions, promises, offers, decisions made at the moment, or general facts about the future.
#### **Usage**

1. **Decisions made at the moment of speaking**
    - I **will help** you with your homework.
    - She **will call** you later.
2. **Predictions (often with _think, believe, probably, etc._)
    - It will likely rain** tomorrow.
    - He **will probably pass** the exam.
3. **Promises, offers, and requests**
    - I **will always love** you. (Promise)
    - **Will you help** me with this? (Request)
    - Don’t worry, I **will carry** your bag. (Offer)
4. **Future facts or general truths**
    - The sun **will rise** at 6 AM.
    - In 50 years, people **will travel** to Mars.

#### **Structure**

✅ **Affirmative:**  
👉 **S + will + V (bare infinitive) + O.**

- She **will visit** her grandmother next weekend.
- They **will finish** their project soon.

✅ **Negative:**  
👉 **S + will not (won’t) + V (bare infinitive) + O.**

- He **will not (won’t) come** to the party.
- I **won’t forget** your birthday.

✅ **Interrogative:**  
👉 **Will + S + V (bare infinitive) + O?**

- **Will** you **join** us for dinner?
- **Will** she **be** there on time?

#### **Adverbs Commonly Used**

| **Adverb**                        | **Example Sentence**                    |
| --------------------------------- | --------------------------------------- |
| **Tomorrow**                      | She **will go** shopping tomorrow.      |
| **Next (week/month/year)**        | We **will travel** next summer.         |
| **Soon**                          | I **will finish** the report soon.      |
| **In (time period)**              | They **will arrive** in an hour.        |
| **Probably/Definitely/Certainly** | He **will probably win** the game.      |
| **I think/I believe**             | I **think** she **will like** the gift. |

📌 **Position:** These adverbs usually appear before the **main verb** or at the end of the sentence.

#### **Notes**
1. **Will vs. Going to**
    - **Will** → Used for spontaneous decisions, promises, predictions without evidence.
    - **Going to** → Used for planned actions or predictions with evidence.
    - ✅ I **will help** you. (Decision at the moment)
    - ✅ I **am going to travel** to Paris next month. (Planned action)
2. **Shall** (more formal, used with _I/we_)
    - **Shall we go** to the cinema? (Suggestion)
    - **I shall return** soon. (Formal promise)

#### **Examples**

- **She will study** abroad next year.
- **Will you visit** your parents this weekend?
- **They won’t be** at the meeting.
- **I think he will get** the job.
- **By 2050, people will use** flying cars.`;
    }
    case "future_perfect": {
      return `#### **Definition**

The **Future Perfect Tense** describes an action that **will be completed before a specific time in the future**. It emphasizes the **completion** of the action.
#### **Usage**

1. **An action that will be completed before a specific future time**
    - By next year, I **will have graduated** from university.
    - She **will have finished** the project before the deadline.
2. **An action completed before another future action**
    - By the time you arrive, we **will have left**.
    - He **will have cooked** dinner before she gets home.
3. **To express certainty about the past from a future perspective**
    - They **will have reached** their destination by now.
    - You **will have heard** the news by tomorrow.
#### **Structure**

✅ **Affirmative:**  
👉 **S + will have + V3 (past participle) + O.**

- He **will have written** the report by Friday.
- They **will have completed** the project before the meeting.

✅ **Negative:**  
👉 **S + will not (won’t) have + V3 (past participle) + O.**

- She **won’t have arrived** by 10 PM.
- I **won’t have finished** my work before noon.

✅ **Interrogative:**  
👉 **Will + S + have + V3 (past participle) + O?**

- **Will** you **have completed** the task by tomorrow?
- **Will** she **have finished** the book before the exam?

#### **Adverbs Commonly Used**

|**Adverb**|**Example Sentence**|
|---|---|
|**By (time)**|By next week, she **will have moved** to a new house.|
|**Before (specific event/time)**|She **will have arrived** before dinner.|
|**By the time + another action**|By the time he wakes up, we **will have left**.|
|**In (duration)**|In two years, I **will have completed** my degree.|
|**Already**|By next month, they **will have already finished** the project.|

📌 **Position:** These adverbs usually appear at the beginning or end of the sentence.
#### **Notes**

1. **Future Perfect vs. Future Simple**
    
    - **Future Simple** → Focuses on an action that will happen.
    - **Future Perfect** → Focuses on an action that will be completed before a certain time.
    - ✅ She **will submit** the report tomorrow. (Action happens in the future)
    - ✅ She **will have submitted** the report by tomorrow. (Action is completed before tomorrow)
2. **Not used with stative verbs**
    
    - ❌ He **will have been knowing** the answer by then.
    - ✅ He **will have known** the answer by then.

#### **Examples**

- **By 2026, I will have finished** my studies.
- **Will you have completed** the assignment by Monday?
- **She won’t have arrived** before noon.
- **By the time we reach the station, the train will have left**.
- **In five years, they will have built** a new hospital.`;
    }
    case "future_perfect_continuous": {
      return `#### **Definition**

The **Future Perfect Continuous Tense** describes an action that **will have been happening for a duration of time before a specific point in the future**. It emphasizes **both the duration and the completion of the action**.

#### **Usage**

1. **An action continuing up to a specific time in the future**
    - By next month, I **will have been working** here for five years.
    - In 2026, she **will have been living** in New York for a decade.
2. **An action that will be ongoing before another future action or event**
    - By the time he arrives, we **will have been waiting** for two hours.
    - She **will have been studying** all night before the exam.
3. **Emphasizing the duration of a future action**
    
    - When they retire, they **will have been teaching** for 40 years.
    - By next summer, I **will have been traveling** around the world for a year.

#### **Structure**

✅ **Affirmative:**  
👉 **S + will have been + V-ing + O.**

- He **will have been working** here for ten years by next July.
- By this time next year, they **will have been studying** English for three years.

✅ **Negative:**  
👉 **S + will not (won’t) have been + V-ing + O.**

- She **won’t have been waiting** long when we arrive.
- By December, I **won’t have been working** at this company for a full year yet.

✅ **Interrogative:**  
👉 **Will + S + have been + V-ing + O?**

- **Will** you **have been living** here for a year by December?
- **Will** she **have been practicing** for long before the competition?

#### **Adverbs Commonly Used**

|**Adverb**|**Example Sentence**|
|---|---|
|**By (time)**|By 2030, he **will have been working** at the company for 20 years.|
|**For (duration)**|By next year, she **will have been studying** for five years.|
|**By the time + another action**|By the time they arrive, we **will have been waiting** for an hour.|
|**Before (specific event)**|Before the concert starts, they **will have been rehearsing** for weeks.|
|**In (duration)**|In three months, I **will have been training** for a year.|

📌 **Position:** These adverbs usually appear at the beginning or end of the sentence.

#### **Notes**

1. **Future Perfect Continuous vs. Future Perfect**
    - **Future Perfect** → Focuses on the completion of an action.
    - **Future Perfect Continuous** → Focuses on the duration of an action before a future time.
    - ✅ By 5 PM, I **will have finished** my work. (Completed action)
    - ✅ By 5 PM, I **will have been working** for eight hours. (Ongoing action for a duration)
2. **Not used with stative verbs**
    - ❌ He **will have been knowing** her for years.
    - ✅ He **will have known** her for years.

#### **Examples**
- **By the end of this year, I will have been working** at this company for five years.
- **Will she have been studying** English for long before she moves to the UK?
- **They won’t have been traveling** for a full month before they return home.
- **By the time you call, I will have been sleeping** for a few hours.
- **In two months, we will have been building** this house for a year.`;
    }
    case "near_future": {
      return `#### **Definition**

The **Near Future** refers to actions or events that are planned, expected, or about to happen soon. It is commonly expressed using:

1. **"Be going to"** → Used for planned actions or predictions based on present evidence.
2. **Present Continuous** → Used for fixed arrangements shortly.

---

### **1. "Be Going To" for the Near Future**
#### **Usage**
1. **Planned actions (intentions)**
    - I **am going to visit** my grandma this weekend.
    - She **is going to start** a new job next month.
2. **Predictions based on evidence**
    - Look at those clouds! It **is going to rain** soon.
    - He **is going to fall** if he keeps running like that!

#### **Structure**

✅ **Affirmative:**  
👉 **S + am/is/are + going to + V (base form) + O.**

- They **are going to travel** to Japan next summer.
- He **is going to buy** a new phone.

✅ **Negative:**  
👉 **S + am/is/are + not + going to + V (base form) + O.**

- I **am not going to eat** junk food anymore.
- She **isn’t going to attend** the meeting.

✅ **Interrogative:**  
👉 **Am/Is/Are + S + going to + V (base form) + O?**

- **Are you going to watch** the movie tonight?
- **Is she going to move** to a new apartment?

---

### **2. Present Continuous for the Near Future**
#### **Usage**
1. **Fixed arrangements with a specific time**
    - I **am meeting** my friends at 7 PM.
    - She **is flying** to Paris tomorrow morning.
2. **Official schedules or appointments**
    - The CEO **is arriving** at 10 AM for the meeting.
    - We **are having** dinner with our parents this weekend.
#### **Structure**

✅ **Affirmative:**  
👉 **S + am/is/are + V-ing + O.**

- I **am having** lunch with my boss tomorrow.
- They **are leaving** for Spain next week.

✅ **Negative:**  
👉 **S + am/is/are + not + V-ing + O.**

- He **isn’t coming** to the party tonight.
- We **aren’t meeting** the client tomorrow.

✅ **Interrogative:**  
👉 **Am/Is/Are + S + V-ing + O?**

- **Are you coming** to the meeting?
- **Is she having** a party this Saturday?

---

#### **Notes**

1. **"Be going to" vs. Present Continuous for Future**
    - **"Be going to"** → Used for general plans or predictions.
    - **Present Continuous** → Used for fixed plans with a specific time.
    - ✅ We **are going to visit** Italy next year. (General plan)
    - ✅ We **are visiting** Italy next Monday. (Fixed schedule)
2. **Not used for timetables**
    - ❌ The train **is leaving** at 5 PM.
    - ✅ The train **leaves** at 5 PM. (Use Present Simple for timetables)

---

#### **Examples**
- I **am going to buy** a new laptop next week.
- She **is meeting** her professor at 2 PM.
- **Are you going to study** abroad next year?
- **Is he coming** to the office tomorrow?
- Look at the sky! It **is going to snow** soon.`;
    }
  }
};
