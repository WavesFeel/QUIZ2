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

// Конфигурация каждого урока
const lessonConfig = {
  1: { count: 9, startsFrom: "index" }, // index.html → lesson1-9.html
  2: { count: 11, startsFrom: 1 },
  3: { count: 8, startsFrom: 1 },
  4: { count: 3, startsFrom: 1 },
  5: { count: 5, startsFrom: 1 },
  6: { count: 6, startsFrom: 1 }
};

// Переход по клику
if (img) {
  const matchLessonTask = currentPage.match(/lesson(\d+)-(\d+)\.html/); // lessonX-Y.html
  const matchOnlyLesson = currentPage.match(/lesson(\d+)\.html/);       // lessonX.html
  const isIndex = currentPage === "index.html";

  img.addEventListener("click", () => {
    let lesson = null;
    let task = null;

    if (isIndex) {
      lesson = 1;
      task = 1;
    } else if (matchOnlyLesson) {
      lesson = parseInt(matchOnlyLesson[1]);
      task = 1;
    } else if (matchLessonTask) {
      lesson = parseInt(matchLessonTask[1]);
      task = parseInt(matchLessonTask[2]);
    }

    const config = lessonConfig[lesson];
    if (!config) {
      alert("Урок не найден в конфигурации");
      return;
    }

    // Определяем следующее задание
    const nextTask = task + 1;

    if (config.startsFrom === "index" && currentPage === "index.html") {
      // Переход с index.html на lesson1-1.html
      window.location.href = `lesson${lesson}-1.html`;
    } else if (nextTask <= config.count) {
      // Переход на следующее задание
      window.location.href = `lesson${lesson}-${nextTask}.html`;
    } else {
      // Все задания пройдены, переходим на следующий урок
      const nextLesson = lesson + 1;
      const nextConfig = lessonConfig[nextLesson];

      if (nextConfig) {
        if (nextConfig.startsFrom === "index") {
          window.location.href = "index.html";
        } else {
          window.location.href = `lesson${nextLesson}.html`;
        }
      } else {
        alert("Вы прошли все уроки!");
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
