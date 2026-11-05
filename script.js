
/* ==============================
   NEW CHAPTER
   Made for Fayrouz ♡
================================ */

// الأسئلة التجريبية - هنغيرها بعدين
const questions = [
  {
    question: "إمتى عيد ميلادي؟",
    answer: ["17/7", "17-7", "17 يوليو", "17 july", "july 17"],
    hint: "في نص شهر يوليو تقريبًا.",
    wrong: "دي المفروض تكون من أسهل الحاجات."
  },
  {
    question: "اسمي بيتكتب إزاي بالإنجليزي؟",
    answer: ["zain", "zein"],
    hint: "أربع حروف، وبيبدأ بحرف Z.",
    wrong: "حتى اسمي؟ فكري تاني."
  },
  {
    question: "إيه اسم المشروع ده؟",
    answer: ["new chapter", "newchapter"],
    hint: "معناه بداية فصل جديد.",
    wrong: "إحنا لسه في أول الحكاية."
  },
  {
    question: "إيه اللون اللي اخترتيه للموقع؟",
    answer: ["burgundy", "برجندي", "black and burgundy", "اسود وبرجندي", "أسود وبرجندي"],
    hint: "لون غامق جدًا، مع لون أحمر مائل للنبيتي.",
    wrong: "اختيارك للألوان كان مميز."
  }
];

let currentQuestion = 0;
let hintUsed = false;

// تغيير الصفحات
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const selectedScreen = document.getElementById(screenId);

  if (selectedScreen) {
    selectedScreen.classList.add("active");
  }
}

// زر Yes
function startQuiz() {
  currentQuestion = 0;
  showScreen("quiz");
  loadQuestion();
}

// زر No
let noCount = 0;

function noAnswer() {
  const message = document.getElementById("no-message");

  const messages = [
    "لا كدابة.",
    "متأكدة من إجابتك؟",
    "مش مصدقك بصراحة.",
    "جربي تاني."
  ];

  message.textContent = messages[Math.min(noCount, messages.length - 1)];
  noCount++;
}

// تحميل السؤال
function loadQuestion() {
  const question = questions[currentQuestion];

  document.getElementById("quiz-question").textContent =
    question.question;

  document.getElementById("question-number").textContent =
    `السؤال ${currentQuestion + 1} من ${questions.length}`;

  document.getElementById("progress-bar").style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  document.getElementById("answer").value = "";
  document.getElementById("hint-text").textContent = "";
  document.getElementById("feedback").textContent = "";

  document.getElementById("wrong-message").textContent =
    question.wrong;

  hintUsed = false;
}

// زر Hint
function showHint() {
  const hintText = document.getElementById("hint-text");

  if (hintUsed) {
    hintText.textContent = "التلميح موجود قدامك بالفعل.";
    return;
  }

  hintText.textContent = questions[currentQuestion].hint;
  hintUsed = true;
}

// تنظيف الإجابة
function normalizeAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[أإآ]/g, "ا")
    .replace(/[ًٌٍَُِّْ]/g, "");
}

// التحقق من الإجابة
function checkAnswer() {
  const input = document.getElementById("answer");

  const userAnswer = normalizeAnswer(input.value);

  if (!userAnswer) {
    document.getElementById("feedback").textContent =
      "اكتبي إجابتك الأول.";
    return;
  }

  const correctAnswers = questions[currentQuestion].answer.map(
    answer => normalizeAnswer(answer)
  );

  if (correctAnswers.includes(userAnswer)) {
    nextQuestion();
  } else {
    showScreen("wrong");
  }
}

// الانتقال للسؤال التالي
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showScreen("quiz");
    loadQuestion();
  } else {
    document.getElementById("progress-bar").style.width = "100%";
    showScreen("final");
  }
}

// إعادة المحاولة
function retryAnswer() {
  showScreen("quiz");
  document.getElementById("answer").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("answer").focus();
}

// فتح الظرف
function openLetter() {
  const letter = document.getElementById("letter");

  letter.style.display = "block";

  letter.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

// السماح بالإجابة باستخدام Enter
document.getElementById("answer").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

// إنشاء نجوم إضافية
const starsContainer = document.getElementById("stars");

for (let i = 0; i < 35; i++) {
  const star = document.createElement("span");

  star.style.position = "absolute";
  star.style.width = Math.random() * 2 + 1 + "px";
  star.style.height = star.style.width;
  star.style.background = "#d7a4b5";
  star.style.borderRadius = "50%";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.opacity = Math.random() * 0.5 + 0.2;
  star.style.boxShadow = "0 0 8px #d7a4b5";

  starsContainer.appendChild(star);
}
