const img = document.querySelector(".content_games_img");
const menuItems = document.querySelectorAll(".lesson-list li");
const currentPage = window.location.pathname.split("/").pop();

// Подсветка активного пункта меню
menuItems.forEach(item => {
  const href = item.getAttribute("data-href");
  if (href === currentPage) item.classList.add("active");
  item.addEventListener("click", () => {
    if (href) window.location.href = href;
  });
});

// Конфигурация 6 класса
const lessonConfig = {
  1: { count: 8 },
  2: { count: 9 },
  3: { count: 9 },
  4: { count: 10 },
  5: { count: 10 },
  6: { count: 11 }
};

if (img) {
  const isLesson1Start = currentPage === "2lesson.html"; // <--- вот это новинка
  const matchLessonTask = currentPage.match(/2lesson(\d+)-(\d+)\.html$/);
  const matchOnlyLesson = currentPage.match(/2lesson(\d+)\.html$/);

  let lesson = null;
  let task = null;

  if (isLesson1Start) {
    lesson = 1;
    task = 1;
  } else if (matchLessonTask) {
    lesson = parseInt(matchLessonTask[1]);
    task = parseInt(matchLessonTask[2]);
  } else if (matchOnlyLesson) {
    lesson = parseInt(matchOnlyLesson[1]);
    task = 1;
  }

  console.log("currentPage:", currentPage);
  console.log("lesson:", lesson, "task:", task);

  img.addEventListener("click", () => {
    const config = lessonConfig[lesson];
    if (!config) {
      alert("Урок не найден в конфигурации");
      return;
    }

    const nextTask = task + 1;

    if (nextTask <= config.count) {
      window.location.href = `2lesson${lesson}-${nextTask}.html`;
    } else {
      const nextLesson = lesson + 1;
      const nextConfig = lessonConfig[nextLesson];

      if (nextConfig) {
        window.location.href = `2lesson${nextLesson}.html`;
      } else {
        alert("Вы прошли все уроки 6 класса!");
      }
    }
  });
}

// Кнопки переключения классов
document.querySelectorAll(".switch-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-href");
        if (target) {
            window.location.href = target;
        }
    });
});

// Выделение активной кнопки класса
const classButtons = document.querySelectorAll(".switch-btn");
classButtons.forEach(btn => {
    const href = btn.getAttribute("data-href");
    if (window.location.pathname.endsWith(href)) {
        btn.classList.add("active");
    }
});

