const fs = require('fs');
const path = require('path');

const enDir = path.join(__dirname, 'src/messages/en/Dashboard/admin');
const arDir = path.join(__dirname, 'src/messages/ar/Dashboard/admin');

// Data
const applications_en = {
  "heading": "Applications Board",
  "desc": "Review and process submissions from across the country.",
  "search": "Search ID or Org...",
  "filters": {
    "ALL": "ALL",
    "PENDING": "PENDING",
    "APPROVED": "APPROVED",
    "REJECTED": "REJECTED"
  },
  "reviewDetails": "Review Details",
  "lastAction": "LAST ACTION",
  "adminReview": "Admin Review",
  "submittedOn": "Submitted on",
  "noApplications": "No applications found",
  "noApplicationsDesc": "Try adjusting your filters or search terms."
};

const applications_ar = {
  "heading": "لوحة الطلبات",
  "desc": "مراجعة ومعالجة الطلبات المقدمة من جميع أنحاء البلاد.",
  "search": "البحث بالمعرف أو المنظمة...",
  "filters": {
    "ALL": "الكل",
    "PENDING": "قيد الانتظار",
    "APPROVED": "تمت الموافقة",
    "REJECTED": "مرفوض"
  },
  "reviewDetails": "مراجعة التفاصيل",
  "lastAction": "الإجراء الأخير",
  "adminReview": "مراجعة إدارية",
  "submittedOn": "تاريخ التقديم",
  "noApplications": "لا توجد طلبات",
  "noApplicationsDesc": "حاول تعديل الفلاتر أو مصطلحات البحث."
};

const certificates_en = {
  "heading": "Certification Registry",
  "desc": "Tracking all {count} active and archived digital certificates.",
  "search": "Search by organization...",
  "issueNew": "Issue New",
  "otherCerts": "OTHER CERTIFICATIONS",
  "activeCert": "ACTIVE CERTIFICATE",
  "digitalCert": "Digital Certificate",
  "serialNumber": "SERIAL NUMBER",
  "issuedDate": "ISSUED DATE",
  "viewRegistryDetails": "View Registry Details"
};

const certificates_ar = {
  "heading": "سجل الشهادات",
  "desc": "تتبع جميع الشهادات الرقمية النشطة والمؤرشفة البالغ عددها {count}.",
  "search": "البحث حسب المنظمة...",
  "issueNew": "إصدار جديد",
  "otherCerts": "شهادات أخرى",
  "activeCert": "شهادة نشطة",
  "digitalCert": "شهادة رقمية",
  "serialNumber": "الرقم التسلسلي",
  "issuedDate": "تاريخ الإصدار",
  "viewRegistryDetails": "عرض تفاصيل السجل"
};

const updateOrganizations = (lang) => {
  const file = path.join(lang === 'en' ? enDir : arDir, 'organizations.json');
  let data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  if (lang === 'en') {
    data.types = {
      "educational": "Educational",
      "cbo": "CBO",
      "mosque": "Mosque",
      "ngo": "NGO",
      "default": "Entity"
    };
    data.location = {
      "nairobi": "Nairobi, Kenya"
    };
  } else {
    data.types = {
      "educational": "تعليمي",
      "cbo": "منظمة مجتمعية",
      "mosque": "مسجد",
      "ngo": "منظمة غير ربحية",
      "default": "كيان"
    };
    data.location = {
      "nairobi": "نيروبي، كينيا"
    };
  }
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

updateOrganizations('en');
updateOrganizations('ar');

fs.writeFileSync(path.join(enDir, 'applications.json'), JSON.stringify(applications_en, null, 2));
fs.writeFileSync(path.join(arDir, 'applications.json'), JSON.stringify(applications_ar, null, 2));

fs.writeFileSync(path.join(enDir, 'certificates.json'), JSON.stringify(certificates_en, null, 2));
fs.writeFileSync(path.join(arDir, 'certificates.json'), JSON.stringify(certificates_ar, null, 2));

const updateIndex = (dir) => {
  const indexFile = path.join(dir, 'index.ts');
  let content = fs.readFileSync(indexFile, 'utf8');
  
  if (!content.includes('applications')) {
    content = `import applications from './applications.json';\nimport certificates from './certificates.json';\n` + content;
    content = content.replace('export default {', 'export default {\n  "applications": applications,\n  "certificates": certificates,');
    fs.writeFileSync(indexFile, content);
  }
};

updateIndex(enDir);
updateIndex(arDir);

console.log("Translations successfully generated and updated.");
