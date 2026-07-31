const fs = require('fs');

const arRaw = fs.readFileSync('src/messages/ar.json', 'utf8');

let lines = arRaw.split('\n');

let descLineIdx = lines.findIndex(l => l.includes('"شاهد أحدث المؤتمرات الصحفية وتحديثات المجلس."') && l.includes('"desc"'));
console.log("Found at:", descLineIdx);

let missingKeys = `      "watchNow": "شاهد الآن",
      "viewAll": "مشاهدة جميع الإيجازات"
    },
    "news": {
      "heading": "أحدث المقالات الإخبارية",
      "desc": "اقرأ منشوراتنا وقصصنا الأخيرة.",
      "readMore": "اقرأ القصة كاملة",
      "details": "التفاصيل",
      "comingSoon": "المزيد من الأخبار قريباً",
      "comingSoonDesc": "تحقق لاحقاً لمزيد من التحديثات.",
      "noNews": "لم يتم العثور على أخبار منشورة",
      "noNewsDesc": "تحقق قريباً للحصول على أحدث إعلانات سوبكيم.",
      "viewAll": "مشاهدة جميع المقالات الإخبارية"
    },
    "gallery": {
      "title": "معرض الصور",
      "clickToView": "انقر للمشاهدة",
      "close": "إغلاق صندوق الإضاءة",
      "prev": "الصورة السابقة",
      "next": "الصورة التالية"
    },
    "papers": {
      "title": "الصحيفة الإسلامية",
      "desc": "اقرأ أحدث إصداراتنا الصحفية والأرشيف.",
      "issue": "الإصدار",
      "read": "اقرأ",
      "viewAll": "مشاهدة جميع الصحف"
    },
    "article": {
      "back": "العودة إلى الأخبار",
      "press": "صحافة سوبكيم",
      "readMore": "اقرأ المزيد من سوبكيم",
      "browseDesc": "تصفح أحدث أخبارنا وإعلاناتنا.",
      "allArticles": "جميع المقالات"
    },
    "paperView": {
      "notAvailable": "ملف PDF غير متاح",
      "notAvailableDesc": "المستند لهذا الإصدار غير متاح حالياً.",
      "backToNews": "العودة إلى الأخبار",
      "officialPub": "منشور رسمي",
      "councilName": "المجلس الأعلى لمسلمي كينيا (سوبكيم)",
      "download": "تنزيل PDF",
      "issue": "الإصدار"
    }
  },
  "StrategicFocus": {
    "hero": {
      "back": "العودة إلى مجالات التركيز",
      "badge": "الركيزة الاستراتيجية"
    },
    "pillars": {
      "programmes": {
        "title": "البرامج",
        "subtitle": "تنفيذ تدخلات تحويلية",`;

lines.splice(descLineIdx + 1, 0, missingKeys);

fs.writeFileSync('src/messages/ar_temp.json', lines.join('\n'));
