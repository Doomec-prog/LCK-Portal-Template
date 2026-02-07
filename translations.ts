
export const translations = {
  en: {
    wizard: {
      steps: {
        personal: "Personal Info",
        professional: "Professional Data",
        documents: "Documents",
        review: "Review"
      },
      headers: {
        personal: "Personal Information",
        professional: "Professional Data",
        documents: "Verification Documents",
        review: "Final Review"
      },
      fields: {
        fullName: "Full Name",
        city: "City / Base",
        email: "Email Address",
        phone: "Phone Number",
        role: "Primary Role",
        education: "Education / Film School",
        imdb: "IMDb or Portfolio",
        uploadTitle: "Click to Upload Documents",
        uploadDesc: "Drag & drop files here (PDF, JPG, PNG)",
        ready: "Ready for submission",
        requirementsTitle: "Required for registration:",
        requirements: [
          "Application form (signed)",
          "Copy of identification document",
          "Copy of film education diploma OR proof of >1 year professional experience",
          "Certificate of no criminal record",
          "Certificate from narcological dispensary",
          "Certificate from psychiatric dispensary",
          "Professional Resume (CV)"
        ],
        labels: {
          name: "Full Name",
          city: "City",
          email: "Email",
          role: "Role",
          education: "Education"
        }
      },
      buttons: {
        next: "Next Step",
        back: "Back",
        submit: "Submit",
        downloadTemplate: "Download Application Template"
      },
      loading: {
        title: "Processing Application",
        desc: "Verifying credentials with the Filmmakers League..."
      }
    },
    dashboard: {
      title: "Filmmakers Union",
      membersOnly: "DIGITAL ECOSYSTEM",
      nav: {
        dashboard: "Dashboard",
        market: "Marketplace",
        locations: "Locations Map",
        ai: "AI Lawyer",
        profile: "My Profile",
        dues: "Dues",
        logout: "Sign Out"
      },
      widgets: {
        memberCard: {
          title: "Digital Member Card",
          id: "MEMBER ID",
          status: "STATUS",
          active: "ACTIVE",
          valid: "VALID THROUGH"
        },
        profile: {
          title: "My Profile",
          sub: "View & Edit Info.",
          status: "85% Complete"
        },
        dues: {
          title: "Membership Dues",
          sub: "Payment Status: Paid.",
          next: "Next Due: Jan 15, 2025"
        },
        networking: {
          title: "Production Market",
          sub: "Find Crew & Gear.",
          count: "15 New Listings"
        },
        legal: {
          title: "AI Legal Council",
          sub: "Ask about grants.",
          pending: "Online 24/7"
        },
        events: {
          title: "Location Scouting",
          sub: "New spots added:",
          event: "Charyn Canyon Update"
        }
      },
      market: {
        title: "Production Marketplace",
        tabs: {
          jobs: "Find Work",
          talent: "Find Crew",
          rental: "Equipment Rental"
        },
        cards: {
          job1: "Director of Photography needed for Commercial",
          job2: "Sound Engineer for Feature Film",
          gear1: "ARRI Alexa Mini LF Package",
          gear2: "Cooke S4/i Lens Set"
        }
      },
      locations: {
        title: "Interactive Location Map",
        subtitle: "Scout Kazakhstan's most cinematic landscapes.",
        listHeader: "Featured Locations",
        places: [
          { name: "Charyn Canyon", type: "Nature", desc: "Red sedimentary rock formations, similar to Grand Canyon." },
          { name: "Bozjyra Tract", type: "Nature", desc: "Alien-like chalk landscapes in Ustyurt Plateau." },
          { name: "Kaindy Lake", type: "Nature", desc: "Submerged birch forest in the Tian Shan mountains." },
          { name: "Almaty City", type: "Urban", desc: "Modern architecture mixed with Soviet modernism." }
        ]
      },
      ai: {
        title: "AI Legal Consultant",
        subtitle: "Your personal 24/7 expert on Kazakh film law, grants, and contracts.",
        inputPlaceholder: "Ask about tax rebates, filming permits, or copyright...",
        welcome: "Hello! I am the League's AI Legal Assistant. How can I help you with your production today?",
        exampleQ: "How do I apply for the State Support Centre (GSCP) grant?"
      },
      resources: {
        title: "Member Resources",
        download: "Download",
        items: {
          logo: "League Logo Pack",
          release: "Legal: Talent Release",
          location: "Legal: Location Agreement",
          insurance: "Production Insurance Guide",
          grant: "Grant Application Template",
          festivals: "Festival Submission List 2024"
        }
      },
      profile: {
        headers: {
          about: "Biography",
          showreel: "Showreel / Portfolio",
          skills: "Skills & Equipment",
          credits: "Filmography"
        },
        mockBio: "Visual storyteller with over 10 years of experience in feature films and commercials. Specialized in low-light cinematography and anamorphic formats. Member of the League since 2019.",
        skills: ["Arri Alexa Mini", "Steadicam", "Color Grading", "DaVinci Resolve", "Anamorphic Lenses", "Underwater Shooting"],
        table: {
          year: "Year",
          project: "Project",
          role: "Role",
          type: "Type"
        }
      },
      dues: {
        title: "Membership Status",
        cardTitle: "GOLD MEMBER",
        paidUntil: "Paid Until",
        autoRenew: "Auto-renewal enabled",
        history: "Payment History",
        downloadInvoice: "Invoice",
        table: {
          date: "Date",
          desc: "Description",
          amount: "Amount",
          status: "Status"
        }
      }
    }
  },
  ru: {
    wizard: {
      steps: {
        personal: "Личные данные",
        professional: "Профессия",
        documents: "Документы",
        review: "Проверка"
      },
      headers: {
        personal: "Личная Информация",
        professional: "Профессиональные Данные",
        documents: "Подтверждающие Документы",
        review: "Финальная Проверка"
      },
      fields: {
        fullName: "ФИО",
        city: "Город / База",
        email: "Email адрес",
        phone: "Номер телефона",
        role: "Основная роль",
        education: "Образование / Киношкола",
        imdb: "Ссылка на IMDb / Портфолио",
        uploadTitle: "Нажмите для загрузки",
        uploadDesc: "Перетащите файлы сюда (PDF, JPG, PNG)",
        ready: "Готово к отправке",
        requirementsTitle: "Для регистрации нам потребуются следующие документы:",
        requirements: [
          "Заявление",
          "Копия документа, удостоверяющего личность",
          "Копия документа об образовании в киносфере либо документ, подтверждающий стаж работы по профилю не менее 1 года",
          "Справка об отсутствии судимости",
          "Справка об отсутствии сведений о состоянии на учете в наркологическом диспансере",
          "Справка об отсутствии сведений о состоянии на учете в психиатрическом диспансере",
          "Резюме"
        ],
        labels: {
          name: "ФИО",
          city: "Город",
          email: "Email",
          role: "Роль",
          education: "Образование"
        }
      },
      buttons: {
        next: "Далее",
        back: "Назад",
        submit: "Отправить",
        downloadTemplate: "Скачать бланк заявления"
      },
      loading: {
        title: "Обработка заявки",
        desc: "Проверка данных в Лиге Кинематографистов..."
      }
    },
    dashboard: {
      title: "Filmmakers Union",
      membersOnly: "ЦИФРОВАЯ ЭКОСИСТЕМА",
      nav: {
        dashboard: "Дэшборд",
        market: "Биржа",
        locations: "Локации",
        ai: "AI Юрист",
        profile: "Профиль",
        dues: "Взносы",
        logout: "Выйти"
      },
      widgets: {
        memberCard: {
          title: "Цифровая Карта Члена",
          id: "ID ЧЛЕНА",
          status: "СТАТУС",
          active: "АКТИВЕН",
          valid: "ДЕЙСТВУЕТ ДО"
        },
        profile: {
          title: "Мой Профиль",
          sub: "Просмотр и Ред.",
          status: "85% Заполнено"
        },
        dues: {
          title: "Членские Взносы",
          sub: "Статус: Оплачено.",
          next: "След. взнос: 15 Янв 2025"
        },
        networking: {
          title: "Биржа Проектов",
          sub: "Поиск команды и техники.",
          count: "15 Новых лотов"
        },
        legal: {
          title: "AI Юрист",
          sub: "Гранты и законы.",
          pending: "Онлайн 24/7"
        },
        events: {
          title: "Скаутинг Локаций",
          sub: "Карта Казахстана:",
          event: "Обновление: Чарын"
        }
      },
      market: {
        title: "Биржа Талантов и Ресурсов",
        tabs: {
          jobs: "Найти Работу",
          talent: "Найти Команду",
          rental: "Аренда Техники"
        },
        cards: {
          job1: "Оператор-постановщик для рекламы",
          job2: "Звукорежиссер на полный метр",
          gear1: "Комплект ARRI Alexa Mini LF",
          gear2: "Объективы Cooke S4/i (Набор)"
        }
      },
      locations: {
        title: "Карта Локаций",
        subtitle: "Весь кинематографичный Казахстан: степи, каньоны, аулы.",
        listHeader: "Популярные Локации",
        places: [
          { name: "Чарынский Каньон", type: "Природа", desc: "Красные осадочные породы, аналог Гранд-Каньона." },
          { name: "Урочище Бозжыра", type: "Природа", desc: "Инопланетные меловые ландшафты плато Устюрт." },
          { name: "Озеро Каинды", type: "Природа", desc: "Затопленный березовый лес в горах Тянь-Шаня." },
          { name: "Алматы", type: "Урбан", desc: "Современная архитектура и советский модернизм." }
        ]
      },
      ai: {
        title: "AI Юрист-Консультант",
        subtitle: "Ваш личный эксперт по законам о кино, грантам ГЦПНК и договорам. 24/7.",
        inputPlaceholder: "Спросите про рибейты, разрешения на съемку или авторское право...",
        welcome: "Здравствуйте! Я ИИ-помощник Лиги. Подскажу по законам РК, помогу оформить заявку на питчинг или проверю договор.",
        exampleQ: "Как подать заявку на грант ГЦПНК?"
      },
      resources: {
        title: "Ресурсы Участника",
        download: "Скачать",
        items: {
          logo: "Логотипы Лиги (Пак)",
          release: "Юр: Согласие актера (Release)",
          location: "Юр: Соглашение о локации",
          insurance: "Гайд по страхованию",
          grant: "Шаблон заявки на грант",
          festivals: "Список фестивалей 2024"
        }
      },
      profile: {
        headers: {
          about: "Биография",
          showreel: "Шоурил / Портфолио",
          skills: "Навыки и Оборудование",
          credits: "Фильмография"
        },
        mockBio: "Визуальный рассказчик с более чем 10-летним опытом работы в художественных фильмах и рекламе. Специализируюсь на съемках при слабом освещении и анаморфотных форматах. Член Лиги с 2019 года.",
        skills: ["Arri Alexa Mini", "Steadicam", "Цветокоррекция", "DaVinci Resolve", "Анаморфотная оптика", "Подводная съемка"],
        table: {
          year: "Год",
          project: "Проект",
          role: "Роль",
          type: "Тип"
        }
      },
      dues: {
        title: "Статус Членства",
        cardTitle: "GOLD MEMBER",
        paidUntil: "Оплачено до",
        autoRenew: "Автопродление включено",
        history: "История Платежей",
        downloadInvoice: "Чек",
        table: {
          date: "Дата",
          desc: "Описание",
          amount: "Сумма",
          status: "Статус"
        }
      }
    }
  }
};
